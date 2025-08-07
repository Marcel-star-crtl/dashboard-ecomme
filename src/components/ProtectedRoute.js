import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useMemo } from 'react';

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const location = useLocation();

  const authState = useMemo(() => {
    const userFromStorage = localStorage.getItem("user");
    const userData = userFromStorage ? JSON.parse(userFromStorage) : null;
    
    const userRole = userData?.role;
    const hasToken = userData?.token;
    
    if (!hasToken) {
      return {
        isAuthenticated: false,
        isAuthorized: false,
        user: null,
        needsLogin: true
      };
    }
    
    if (!Array.isArray(allowedRoles) || allowedRoles.length === 0) {
      return {
        isAuthenticated: true,
        isAuthorized: true,
        user: userData,
        needsLogin: false
      };
    }
    
    const hasRequiredRole = userRole && allowedRoles.includes(userRole);
    
    return {
      isAuthenticated: true,
      isAuthorized: hasRequiredRole,
      user: userData,
      needsLogin: false
    };
  }, [allowedRoles]); 

  if (authState.needsLogin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (authState.isAuthenticated && !authState.isAuthorized) {
    if (authState.user?.role === 'admin') {
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
    } else {
      return <Navigate to="/login" state={{ from: location, message: "Unauthorized access" }} replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;