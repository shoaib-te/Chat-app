import React from 'react'
import Sidebar from '../components/Sidebar'
import Chatbox from '../components/Chatbox'

function Home() {
  return (
    <div className=" grid grid-cols-2 h-screen">
      <aside className=" hidden md:block">
        <Sidebar />
      </aside>

      <main className="flex bg-base-200 ">
        <div className=" flex-1 ">
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
