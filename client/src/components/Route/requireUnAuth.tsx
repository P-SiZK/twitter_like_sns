import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Loading } from "../loading";

export const RequireUnAuth: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <Loading />;

  if (isAuthenticated) return <Navigate to="/" />;

  return <Outlet />;
};
