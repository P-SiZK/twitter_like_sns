import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const Login: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button type="button" onClick={loginWithRedirect}>
      Log in
    </button>
  );
};
