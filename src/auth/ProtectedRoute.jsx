import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { CoderContext } from "../context/CoderProvider";

function ProtectedRoute() {
  const navigate = useNavigate();
  const location = useLocation();
  const { coder, loading } = useContext(CoderContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", {
        replace: true,
        state: { from: location.pathname },
      });
      return;
    }

    if (!loading && !coder) {
      navigate("/login", {
        replace: true,
        state: { from: location.pathname },
      });
    }
  }, [loading, coder, navigate, location]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!coder) return null;

  return <Outlet />;
}

export default ProtectedRoute;
