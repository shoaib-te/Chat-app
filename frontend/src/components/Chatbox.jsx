import React, { useContext, useState } from 'react';
import assets, { userDummyData, messagesDummyData } from '../assets/assets'; // Added messagesDummyData import
import { AuthContext } from '../contexts/Auth.context';
import { Dategenreate } from '../lib/genreateDate';
import { ImageMinus } from 'lucide-react';
function ChatContainer() {
  const { selectedUser } = useContext(AuthContext);
  const [input, setInput] = useState("");

  // 1. Safe search: added optional chaining (?._id)
  const selectedChat = userDummyData.find((user) => user._id === selectedUser?._id);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    console.log("Sending message:", input);
    setInput(""); 
  };

  return (
    <>
      {selectedChat ? (
        <div className="flex flex-col flex-1 bg-base-200 h-full shadow-lg overflow-hidden border-l border-base-300">
          
          {/* Chat Header */}
          <div className="h-16 border-b border-base-300 flex items-center px-6 justify-between bg-base-100/95 backdrop-blur-sm z-10">
            <div className="flex items-center gap-3">
              <img 
                src={selectedChat.profilePic} 
                alt={selectedChat.fullName} 
                className="w-10 h-10 rounded-full object-cover border-2 border-primary/20 shadow-sm"
              />
              <div>
                <h3 className="text-sm font-bold text-base-content leading-tight">{selectedChat.fullName}</h3>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${selectedChat.online ? 'bg-success' : 'bg-base-300'}`}></span>
                  <span className="text-[11px] text-base-content/60 font-medium">{selectedChat.online ? 'Online' : 'Offline'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-base-200">
            {messagesDummyData.map((msg) => (
              <div key={msg._id} className={`flex ${msg.senderId === "680f50e4f10f3cd28382ecf9" ? "justify-end" : "justify-start"}`}>
                <div className="max-w-[75%] flex flex-col">
                  {msg.senderId !== "680f50e4f10f3cd28382ecf9" && (
                    <div className=' flex flex-row  items-center'>
                      <div className=' flex justify-center overflow-hidden h-10 w-10  rounded-full'>
                        <img src={selectedChat.profilePic} alt="" />
                      </div>
                       <p className="text-[11px] font-bold text-primary ml-1 mb-1 uppercase tracking-wider">{selectedChat.fullName}</p>
                    </div>
                   
                  )}
                  
                  <div className={`px-4 py-3 text-sm shadow-sm ${
                    msg.senderId === "680f50e4f10f3cd28382ecf9" 
                    ? "bg-primary text-primary-content rounded-2xl rounded-tr-none" 
                    : "bg-base-100 text-base-content border border-base-300 rounded-2xl rounded-tl-none"
                  }`}>
                    {msg.image? (
                      <div className="mb-2 rounded-lg overflow-hidden">
                        <img src={msg.image} alt="Shared" className="w-full max-w-[280px] h-auto object-cover" />
                      </div>
                    ):(
                     <p className="leading-relaxed">{msg.text || msg.textAfter}</p>  
                    )}
                   
                  </div>

                  <div className={`flex items-center gap-1 mt-1.5 text-[10px] text-base-content/50 ${msg.senderId === "680f50e4f10f3cd28382ecf9" ? "justify-end" : "justify-start"}`}>
                    <span>{Dategenreate(msg.createdAt)}</span>
                    {msg.senderId === "680f50e4f10f3cd28382ecf9" && (
                      <div>
                         <span className={msg.read ? "text-primary-content font-bold" : "text-base-content/80"}>✓✓</span>
                      </div>
                     
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-base-100 border-t border-base-300">
            <form onSubmit={handleSubmit} className="flex items-center gap-3">
              <div className="flex-1 bg-base-200 rounded-2xl px-4 py-2.5 flex items-center focus-within:bg-base-100 focus-within:ring-2 focus-within:ring-primary/30 transition-all">
                <input 
                  value={input}
                  onChange={handleInput}
                  type="text" 
                  placeholder="Write your message..." 
                  className="flex-1 bg-transparent text-sm outline-none text-base-content"
                />
              </div>
              <div>
                <label className=' cursor-pointer' htmlFor="image"> <ImageMinus/></label>
                <input type="file" name="" placeholder='image' hidden id="image" />
              </div>
              <button 
                type="submit" 
                className="w-10 h-10 btn btn-primary rounded-xl flex items-center justify-center text-primary-content shadow-md transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!input.trim()}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className='flex-1 justify-center items-center bg-base-200 flex flex-col h-full shadow-lg border-l border-base-300'>
          <div className="text-center animate-pulse">
            <img src={assets.logo} className='' alt="Logo" />
            <p className="text-base-content/60 font-medium">Choose a chat to start messaging</p>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatContainer;
