import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Loading } from "./loading";

export const RequireAuth: React.FC = () => {
  const { isAuthenticated, isLoading, logout } = useAuth0();

  if (isLoading) return <Loading />;

  if (isAuthenticated)
    return (
      <>
        <button
          type="button"
          onClick={() =>
            logout({ returnTo: `${window.location.origin}/login` })
          }
        >
          logout
        </button>
        <Outlet />
      </>
    );

  return <Navigate to="/login" />;
};
