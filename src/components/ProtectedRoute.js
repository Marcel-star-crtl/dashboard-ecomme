// components/ProtectedRoute.js
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ProtectedRoute = ({ allowedRoles }) => {
  const location = useLocation();
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      const userFromStorage = localStorage.getItem("user");
      const userData = userFromStorage ? JSON.parse(userFromStorage) : null;
      
      setUser(userData);
      setIsAuthorized(
        userData?.token && 
        allowedRoles.includes(userData?.role)
      );
      setAuthChecked(true);
    };

    checkAuth();
  }, [allowedRoles]);

  // Show loading state while checking authentication
  if (!authChecked) {
    return <div>Loading...</div>;
  }

  // Not authenticated - redirect to login
  if (!user?.token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Authenticated but not authorized - show read-only version
  if (allowedRoles.includes('ADMIN') && !isAuthorized) {
    return (
      <div className="relative">
        <div className="sticky top-0 z-10 bg-yellow-100 p-3 text-sm border-b border-yellow-200">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <span className="font-medium text-yellow-800">
                View-only mode. Contact administrator for edit permissions.
              </span>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    );
  }

  // Fully authorized - show full access
  return <Outlet />;
};

export default ProtectedRoute;