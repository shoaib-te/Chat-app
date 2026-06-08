import React, { useContext } from 'react';
import { Search } from "lucide-react";
import assets, { userDummyData } from '../assets/assets';
import { AuthContext } from '../contexts/Auth.context';

function Sidebar() {
  const{ selectedUser, setSelectedUser,searchFilter,setSearchFilter }=useContext(AuthContext)
  
  const filterResponse= userDummyData.filter((user)=>user.fullName.toLowerCase().includes(searchFilter.toLowerCase()))
  
  
  const handleSearch = (e) => {
    setSearchFilter(e.target.value);
  };

  
  return (
    <div className="  bg-gradient-to-b from-white to-gray-50/50 border-r border-gray-200 shadow-sm flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <img src={assets.logo_big || "/assets/logo_big.svg"} alt="Logo" className="h-8 w-auto" />
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 z-10 text-gray-600" />
            <input 
              value={searchFilter}
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
        {filterResponse.map((chat) => {
          const isSelected = selectedUser === chat._id;
          return (
            <div 
              key={chat._id} 
              className={`flex items-center gap-4 p-4 cursor-pointer transition-all duration-200 ${
                isSelected
                  ? 'bg-purple-50 border-l-4 border-purple-500' 
                  : 'hover:bg-gray-50 border-l-4 border-transparent'
              }`} 
              onClick={() => setSelectedUser(chat)}
            >
              <div className="relative flex-shrink-0">
                <img 
                  // Change this to profilePic if that's what's in your assets.js
                  src={chat.avatar || chat.profilePic} 
                  alt={chat.fullName} 
                  className={`w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm transition-transform ${isSelected ? 'scale-110' : ''}`} 
                />
                {chat.online && (
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full shadow-sm"></div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <h4 className={`text-sm truncate ${isSelected ? 'font-bold text-purple-900' : 'font-semibold text-gray-900'}`}>
                    {chat.fullName}
                  </h4>
                  <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">{chat.time}</span>
                </div>
                
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs text-gray-500 truncate leading-relaxed">
                    {chat.bio}
                  </p>
                  {chat.unread > 0 && (
                    <span className="flex-shrink-0 bg-purple-600 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
