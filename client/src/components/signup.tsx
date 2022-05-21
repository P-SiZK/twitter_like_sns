import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUserQuery, useCreateUserMutation } from "../generated/graphql";

export const Signup: React.FC = () => {
  const navigate = useNavigate();

  const [{ data }] = useGetUserQuery();

  if (data?.getUser) navigate("/", { replace: true });

  const [, createUserMutation] = useCreateUserMutation();

  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");

  const handleChangeUserId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
  };
  const handleChangeUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleClick = async () => {
    if (userName === "") return;
    await createUserMutation({
      id: userId,
      name: userName,
    });
    navigate("/", { replace: true });
  };

  return (
    <form>
      User ID
      <input type="text" value={userId} onChange={handleChangeUserId} />
      User name
      <input type="text" value={userName} onChange={handleChangeUserName} />
      <button type="button" onClick={handleClick}>
        Register
      </button>
    </form>
  );
};
