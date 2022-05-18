import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUserQuery, useCreateUserMutation } from "../generated/graphql";

export const Signup: React.FC = () => {
  const navigate = useNavigate();

  const [{ data }] = useGetUserQuery();

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
