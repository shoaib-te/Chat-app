import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/Auth.context';

function ProtectedRoutes({ children }) {
  // Pull user and loading state from your context
  const { user, loading } = useContext(AuthContext);

  // 1. Prevent premature redirects while the app checks for an active session
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200 text-base-content">
        <span className="loading loading-spinner loading-md mr-2"></span>
        Authenticating...
      </div>
    );
  }

  // 2. If no user is authenticated, redirect directly to the login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3. Render children components if wrapper pattern is used, otherwise fall back to the Outlet
  return children ? children : <Outlet />;
}

export default ProtectedRoutes;
