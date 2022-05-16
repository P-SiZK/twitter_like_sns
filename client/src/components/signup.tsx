import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUserQuery, useCreateUserMutation } from "../generated/graphql";

export const Signup: React.FC = () => {
  const navigate = useNavigate();

  const { user } = useAuth0();
  if (user === undefined) throw new Error("Authentication Error");
  const userId = user[
    `${process.env.REACT_APP_AUTH0_MY_NAMESPACE as string}/userid`
  ] as string;
  const [{ data }] = useGetUserQuery({ variables: { id: userId } });

  if (data?.getUser) navigate("/", { replace: true });

  const [, createUserMutation] = useCreateUserMutation();

  const [userName, setUserName] = useState("");

  const handleChangeUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleClick = async () => {
    if (userName === "") return;
    await createUserMutation({
      name: userName,
    });
    navigate("/", { replace: true });
  };

  return (
    <form>
      User name
      <input type="text" value={userName} onChange={handleChangeUserName} />
      <button type="button" onClick={handleClick}>
        Register
      </button>
    </form>
  );
};
