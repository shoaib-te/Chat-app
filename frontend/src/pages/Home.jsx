import React from 'react'
import Sidebar from '../components/Sidebar'
import Chatbox from '../components/Chatbox'

function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] h-screen w-full overflow-hidden">
      {/* Sidebar - Hidden on mobile, fixed width on desktop */}
      <aside className="hidden md:block border-r border-base-300 h-full overflow-y-auto">
        <Sidebar />
      </aside>

      {/* Main Content / Chatbox */}
      <main className="flex flex-col bg-base-200 h-full overflow-hidden">
        {/* Mobile Top Bar (Optional: toggle sidebar here if needed) */}
        <div className="md:hidden p-4 bg-base-100 border-b border-base-300">
          <h1 className="font-bold text-lg">Chat App</h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          <Chatbox />
        </div>
      </main>
    </div>
  )
}

export default Home
