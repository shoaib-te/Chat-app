import React, { useContext, useState, useEffect } from 'react';
import { Search } from "lucide-react";
import assets from '../assets/assets';
import { AuthContext } from '../contexts/Auth.context';
import { ChatContext } from '../contexts/Chat.context';

function Sidebar() {
  const { onlineUser } = useContext(AuthContext);
  // Destructured with correct casing matching your ChatContext (selectuser / setselectuser)
  const { user, Alluser, selectedUser, setSelectedUser, unsendmessage } = useContext(ChatContext);
  
  // Declared the missing search state variable
  const [input, setInput] = useState('');

  // Automatically fetch users list from API when component mounts
  useEffect(() => {
   
      Alluser();
    
  }, [onlineUser]);

  // Connected the filter function to the 'user' array pulled from context
  const filterResponse = input?user.filter((currUser) => 
    currUser.name?.toLowerCase().includes((input || "").toLowerCase())
  ):user;
  
  const handleSearch = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="h-full bg-gradient-to-b border-r shadow-sm flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-3">
          <img src={assets.logo_big || "/assets/logo_big.svg"} alt="Logo" className="h-8 w-auto" />
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 z-10 text-gray-400" />
            <input 
              value={input}
              onChange={handleSearch}
              type="text" 
              placeholder="Search users..." 
              className="w-full pl-10 pr-4 py-2 bg-white/50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all backdrop-blur-sm"
            />
          </div>
        </div>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto py-2">
        {filterResponse.length === 0 ? (
          <div className="p-6 text-center text-sm text-gray-400">No users found</div>
        ) : (
          filterResponse.map((chat) => {
            // Corrected to match the exact context state variable names
            const isSelected = selectedUser?._id === user._id;
 

            return (
              <div 
                key={chat._id} 
                className={`flex items-center gap-4 p-4 cursor-pointer transition-all duration-200 ${
                  selectedUser?._id === chat._id 
                    ? 'bg-purple-50/80 border-l-4 border-purple-500' 
                    : 'hover:bg-gray-800 border-l-4 border-transparent'
                }`} 
                onClick={() => setSelectedUser(chat)}
              >
                <div className="relative flex-shrink-0">
                  <img 
                    src={chat.profilePicture || assets.avatar_icon} 
                    alt={chat.name} 
                    className={`w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm transition-transform ${isSelected ? 'scale-105' : ''}`} 
                  />
                  {onlineUser.includes(chat._id) && (
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full shadow-sm"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <h4 className={`text-sm truncate ${selectedUser?._id === chat._id? 'font-bold text-purple-900' : 'font-semibold text-gray-900'}`}>
                      {chat.name}
                    </h4>
                    <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">{chat.time}</span>
                  </div>
                  
                  <div className="flex items-center justify-between gap-2">
                   
                    {(() => {
                      const unreadCount = unsendmessage?.[chat._id] || 0;
                      return unreadCount > 0 ? (
                        <span className="flex-shrink-0 text-black text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full">
                          {unreadCount}
                        </span>
                      ) : null;
                    })()}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Sidebar;
