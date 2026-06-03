import React from 'react'
import Sidebar from '../components/Sidebar'
import Chatbox from '../components/Chatbox'

function Home() {
  return (
    <div className="min-h-screen flex">
      <aside className="w-80 hidden md:block">
        <Sidebar />
      </aside>

      <main className="flex-1 bg-base-200 p-4">
        <div className="max-w-4xl mx-auto">
          <Chatbox />
        </div>
      </main>

      {/* Mobile fallback: show sidebar above chat on small screens */}
      <div className="md:hidden">
        <Sidebar />
      </div>
    </div>
  )
}

export default Home
