import React, { useContext, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ImageMinus, X } from "lucide-react";
import assets from "../assets/assets";
import { AuthContext } from "../contexts/Auth.context";
import { ThemeContext } from "../contexts/Theme.context";
import { ChatContext } from "../contexts/Chat.context";
import { Dategenreate } from "../lib/genreateDate";

function ChatContainer() {
  const { selectedUser, message, selectusermessate, sendmessagesuser } = useContext(ChatContext);
  const { theme = "light", toggleTheme } = useContext(ThemeContext) || {};
  const { user = null, logout, onlineUser = [] } = useContext(AuthContext) || {};

  const [input, setInput] = useState("");
  const [imageFile, setImageFile] = useState(null); 
  const [imagePreview, setImagePreview] = useState(null); 
  const fileInputRef = useRef(null);
  
  // Ref anchor to force auto-scrolling to the latest message
  const messagesEndRef = useRef(null);

  // Effect 1: Handle Initial Message Loading when switching users
  useEffect(() => {
    if (selectedUser?._id) {
      selectusermessate(selectedUser._id);
    }
  }, [selectedUser?._id, selectusermessate]);

  // Effect 2: Auto Scroll down instantly when a new message appends to the array
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);

  const handleInput = (e) => setInput(e.target.value);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      console.log("Please select a valid image file.");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file)); 
  };

  const removeImage = () => {
    setImageFile(null);
    if (imagePreview) URL.revokeObjectURL(imagePreview); 
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() && !imageFile) return;

    const formData = new FormData();
    if (input.trim()) formData.append("content", input.trim());
    if (imageFile) formData.append("image", imageFile); 
    
    await sendmessagesuser(formData);

    setInput("");
    removeImage();
  };

  const handleLogoutClick = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    if (logout) logout();
  };

  const isOnline = selectedUser && onlineUser.includes(selectedUser._id);

  return (
    <>
      {selectedUser ? (
        <div className="flex flex-col flex-1 bg-base-200 h-full shadow-lg overflow-hidden border-l border-base-300">
          
          {/* Chat Header */}
          <div className="h-16 border-b border-base-300 flex items-center px-6 justify-between bg-base-100/95 backdrop-blur-sm z-10 shrink-0">
            <div className="flex items-center gap-3">
              <img
                src={selectedUser.profilePicture || assets.avatar_icon}
                alt={selectedUser.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-primary/20 shadow-sm"
              />
              <div>
                <h3 className="text-sm font-bold text-base-content leading-tight">
                  {selectedUser.name}
                </h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className={`w-2 h-2 rounded-full ${isOnline ? "bg-success" : "bg-base-300"}`}></span>
                  <span className="text-[11px] text-base-content/60 font-medium">
                    {isOnline ? "Online" : "Offline"}
                  </span>
                </div>
              </div>
            </div>

            {/* Global Navbar Integration */}
            <div className="flex-none flex items-center gap-3">
              <button
                type="button"
                aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
                className="btn btn-square btn-ghost swap swap-rotate"
                onClick={toggleTheme}
              >
                {theme === "light" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V22M5.25 12H3m18 0h-2.25m-1.357-6.364-1.591 1.591M6.82 17.18l-1.591 1.591m12.728 0-1.591-1.591M6.82 6.82 5.23 5.23M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z" />
                  </svg>
                )}
              </button>

              {user ? (
                <div className="dropdown dropdown-end">
                  <button type="button" className="btn btn-ghost btn-circle avatar placeholder">
                    <div className="w-9 rounded-full bg-neutral text-neutral-content flex items-center justify-center border border-base-300">
                      {user?.profilePicture ? (
                        <img src={user.profilePicture} alt="Profile" className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <span className="text-xs font-bold">{user?.name?.charAt(0).toUpperCase() || "?"}</span>
                      )}
                    </div>
                  </button>
                  <ul className="mt-3 p-2 shadow-lg menu menu-sm dropdown-content bg-base-100 rounded-box w-52 z-[100] border border-base-200">
                    <li><Link to="/profile" onClick={() => document.activeElement?.blur()}>Profile</Link></li>
                    <li><Link to="/settings" onClick={() => document.activeElement?.blur()}>Settings</Link></li>
                    <div className="divider my-1"></div>
                    <li><button onClick={handleLogoutClick} className="text-error hover:bg-error/10 font-medium w-full text-left">Logout</button></li>
                  </ul>
                </div>
              ) : (
                <Link to="/login" className="btn btn-primary btn-sm px-4 rounded-xl">Login</Link>
              )}
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-base-200">
            {(message || []).map((msg, index) => {
              if (!msg) return null;
              
              const isMe = String(msg?.sender) === String(user?._id);

              
              return (
                <div key={msg._id || index} className={`flex items-end gap-2 ${isMe ? "justify-end" : "justify-start"}`}>
                  {!isMe && (
                    <div className="avatar shrink-0 mb-5">
                      <div className="w-8 h-8 rounded-full">
                        <img src={selectedUser.profilePicture || assets.avatar_icon} alt={selectedUser.name} />
                      </div>
                    </div>
                  )}

                  <div className={`max-w-[70%] flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                    {!isMe && (
                      <span className="text-[10px] font-semibold text-base-content/50 ml-1 mb-1 tracking-wide">
                        {selectedUser.name}
                      </span>
                    )}

                    <div className={`px-4 py-2.5 text-sm shadow-sm flex flex-col gap-2 rounded-2xl ${
                      isMe
                        ? "bg-primary text-primary-content rounded-br-none"
                        : "bg-base-100 text-base-content border border-base-300 rounded-bl-none"
                    }`}>

                      {msg.image && (
                        <div className="rounded-lg overflow-hidden max-w-[260px]">
                          <img src={msg.image} alt="Shared attachment" className="w-full h-auto object-cover max-h-60" />
                        </div>
                      )}
                      {(msg.content || msg.textAfter) && (
                        <p className="leading-relaxed break-words whitespace-pre-wrap">
                          {msg.content || msg.textAfter}
                        </p>
                      )}
                    </div>

                    <div className={`flex items-center gap-1 mt-1 text-[10px] text-base-content/50 ${isMe ? "justify-end" : "justify-start"}`}>
                      <span>{Dategenreate(msg.createdAt)}</span>
                      {isMe && (
                        <span className={msg.read ? "text-primary font-bold" : "text-base-content/40"}>✓✓</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* Auto-scroll target element */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area Container */}
          <div className="p-4 bg-base-100 border-t border-t-base-300 shrink-0">
            {imagePreview && (
              <div className="mb-3 flex items-center gap-2">
                <div className="relative inline-block rounded-xl overflow-hidden border border-base-300 bg-base-200 p-1">
                  <img src={imagePreview} alt="Upload preview" className="w-16 h-16 object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-1 -right-1 p-1 rounded-full bg-error text-error-content hover:scale-105 transition-transform"
                  >
                    <X size={12} />
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="w-full flex items-center gap-3">
              <div className="flex-1 bg-base-200 rounded-2xl px-4 py-2.5 flex items-center focus-within:bg-base-100 focus-within:ring-2 focus-within:ring-primary/30 transition-all">
                <input
                  value={input}
                  onChange={handleInput}
                  type="text"
                  placeholder="Write your message..."
                  className="flex-1 bg-transparent text-sm outline-none text-base-content"
                />

                <label className="cursor-pointer text-base-content/60 hover:text-primary transition-colors ml-2" htmlFor="image">
                  <ImageMinus size={20} />
                </label>
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  id="image"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />
              </div>

              <button
                type="submit"
                className="w-10 h-10 btn btn-primary rounded-xl flex items-center justify-center text-primary-content shadow-md transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!input.trim() && !imageFile}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </form>
          </div>

        </div>
      ) : (
        /* Empty State */
        <div className="flex-1 flex flex-col bg-base-200 h-full shadow-lg border-l border-base-300 overflow-hidden">
          <div className="flex-1 flex flex-col justify-center items-center p-6">
            <div className="text-center flex flex-col items-center gap-4">
              <img src={assets.logo} className="w-24 h-24 object-contain animate-bounce duration-1000" alt="Logo" />
              <p className="text-base-content/60 font-medium">Choose a chat to start messaging</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatContainer;