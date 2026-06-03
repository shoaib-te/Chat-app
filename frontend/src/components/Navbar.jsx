import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5'
import { AuthContext } from '../contexts/Auth.context';
import { ThemeContext } from '../contexts/Theme.context.jsx';

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext) // Access theme context for toggling;
  
  // Destructure logout alongside user
  const { user, logout } = useContext(AuthContext) 

  return (
    <div className="navbar shadow-sm bg-base-100 px-4">
      {/* Left side: Logo */}
      <div className="flex-1">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
          <IoChatbubbleEllipsesOutline className="h-6 w-6" />
          <span>Chat App</span>
        </Link>
      </div>

      {/* Right side: Actions */}
      <div className="flex-none flex items-center gap-2">
        {/* Theme Toggle Button */}
        <button
          aria-label="Toggle theme"
          className="btn btn-square btn-ghost"
          onClick={toggleTheme}
        >
          {theme === 'light' ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
              <path d="M21.64 13a9 9 0 11-9.64-9.64 7 7 0 109.64 9.64z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
              <path d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.79 1.8-1.79zM1 13h3v-2H1v2zm10 9h2v-3h-2v3zm9-9v-2h-3v2h3zM6.76 19.16l-1.79 1.79 1.79 1.79 1.8-1.79-1.8-1.79zM20.83 4.84l-1.79-1.79-1.8 1.79 1.8 1.79 1.79-1.79zM4.24 6.76L2.45 8.55l1.79 1.8 1.79-1.8L4.24 6.76zM12 6a6 6 0 100 12 6 6 0 000-12z" />
            </svg>
          )}
        </button>

        {/* Conditional User Profile / Login Link */}
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar placeholder">
              <div className="w-8 rounded-full bg-neutral text-neutral-content flex items-center justify-center">
                {user?.profilePicture ? (
                  <img src={user.profilePicture} alt="Profile" className="w-full h-full rounded-full object-cover" />
                ) : (
                  /* Fixed: added optional chaining user?.name to prevent crashes */
                  <span>{user?.name?.charAt(0).toUpperCase() || "?"}</span>
                )}
              </div>
            </label>
            <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 z-[1]">
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/settings">Settings</Link>
              </li>
              <li>
                {/* Linked the context logout method here */}
                <button onClick={logout} className="text-left w-full">Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          /* Show Login button if user state is null or unauthenticated */
          <Link to="/login" className="btn btn-primary btn-sm">
            Login
          </Link>
        )}
      </div>
    </div>
  )
}

export default Navbar