import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5'
import { AuthContext } from '../contexts/Auth.context';
import { ThemeContext } from '../contexts/Theme.context.jsx';

function Navbar() {
  // 1. Added fallback definitions to protect context properties from being undefined
  const { theme = 'light', toggleTheme } = useContext(ThemeContext) || {};
  const { user = null, logout } = useContext(AuthContext) || {};

  const handleLogoutClick = (e) => {
    // Blur active element to cleanly dismiss the DaisyUI dropdown overlay container menu on click
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    if (logout) logout();
  };

  return (
    <div className="navbar sticky top-0  shadow-sm  px-4 z-50 shrink-0">
      {/* Left side: Logo */}
      <div className="flex-1">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
          <IoChatbubbleEllipsesOutline className="h-6 w-6" />
          <span>Chat App</span>
        </Link>
      </div>

      {/* Right side: Actions */}
      <div className="flex-none flex items-center gap-3">
        {/* Theme Toggle Button */}
        <button
          type="button"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          className="btn btn-square btn-ghost swap swap-rotate"
          onClick={toggleTheme}
        >
          {theme === 'light' ? (
            /* Moon Icon */
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>
          ) : (
            /* Sun Icon */
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V22M5.25 12H3m18 0h-2.25m-1.357-6.364-1.591 1.591M6.82 17.18l-1.591 1.591m12.728 0-1.591-1.591M6.82 6.82 5.23 5.23M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z" />
            </svg>
          )}
        </button>

        {/* Conditional User Profile / Login Link */}
        {user ? (
          <div className="dropdown dropdown-end">
            <button 
              type="button"
              className="btn btn-ghost btn-circle avatar placeholder"
            >
              <div className="w-9 rounded-full bg-neutral text-neutral-content flex items-center justify-center border border-base-300">
                {user?.profilePicture ? (
                  <img src={user.profilePicture} alt="Profile" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span className="text-xs font-bold">{user?.name?.charAt(0).toUpperCase() || "?"}</span>
                )}
              </div>
            </button>
            <ul className="mt-3 p-2 shadow-lg menu menu-sm dropdown-content bg-base-100 rounded-box w-52 z-[100] border border-base-200">
              <li>
                <Link to="/profile" onClick={() => document.activeElement?.blur()}>Profile</Link>
              </li>
              <li>
                <Link to="/settings" onClick={() => document.activeElement?.blur()}>Settings</Link>
              </li>
              <div className="divider my-1"></div>
              <li>
                <button onClick={handleLogoutClick} className="text-error hover:bg-error/10 font-medium w-full text-left">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary btn-sm px-4 rounded-xl">
            Login
          </Link>
        )}
      </div>
    </div>
  )
}

export default Navbar
