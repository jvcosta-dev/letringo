import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { useUser } from "../contexts/UserContext";

import Splash from "../pages/Splash";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { token, request } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const verifyToken = async () => {
    if (token) {
      setIsAuthenticated(true);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
  };

  useEffect(() => {
    verifyToken();
  }, [token, request]);

  if (isLoading) {
    return <Splash />;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/welcome" />;
}

export default ProtectedRoute;
