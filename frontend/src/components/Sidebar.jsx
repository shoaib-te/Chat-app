import React, { useState } from 'react'
import { IoAdd } from 'react-icons/io5'

function Sidebar() {
  const [chatItems, setChatItems] = useState([
    {
      id: 1,
      title: 'Component q...',
      subtitle: 'Which compone...',
      date: 'Mar 15',
      unreadCount: 2,
      isActive: true,
    },
    {
      id: 2,
      title: 'Theme customiza...',
      subtitle: 'How do I override the ...',
      date: 'Mar 15',
      unreadCount: 0,
      isActive: false,
    },
    {
      id: 3,
      title: 'Slot overrides',
      subtitle: 'Replacing the send b...',
      date: 'Mar 14',
      unreadCount: 0,
      isActive: false,
    },
  ]);

  const handleSelectChat = (id) => {
    setChatItems(chatItems.map(item => ({
      ...item,
      isActive: item.id === id,
      unreadCount: item.id === id ? 0 : item.unreadCount
    })));
  };

  return (
    <div className="h-screen  flex flex-col">
      {/* New Chat Button */}
      

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto p-2">
        {chatItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleSelectChat(item.id)}
            className={`w-full text-left p-3 rounded-lg mb-2 transition-colors duration-150 ${
              item.isActive
                ? ' text-gray-900 '
                : 'hover:base-100 text-gray-700'
            }`}
          >
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <div className="avatar placeholder shrink-0">
                <div className="bg-white text-gray-700 w-10 h-10 rounded-full font-semibold text-sm flex items-center justify-center">
                  <span>{item.title.charAt(0).toUpperCase()}</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className={`text-sm truncate font-semibold`}>
                    {item.title}
                  </span>
                  {item.unreadCount > 0 && (
                    <span className="badge badge-sm bg-red-500 text-white border-none shrink-0">
                      {item.unreadCount}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-gray-600 truncate">
                    {item.subtitle}
                  </span>
                  <span className="text-xs text-gray-500 shrink-0">
                    {item.date}
                  </span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 text-xs text-gray-500 text-center">
        © 2026 Chat App
      </div>
    </div>
  )
}

export default Sidebar
