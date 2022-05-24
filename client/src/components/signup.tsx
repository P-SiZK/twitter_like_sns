import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
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
    <ModalOverlay>
      <ModalBox aria-modal role="dialog" onClick={(e) => e.stopPropagation()}>
        <SignupBody>
          <SignupHeading>アカウント情報の登録</SignupHeading>
          <SignupForm>
            <InputFormBox>
              <FormDescription>ユーザーID</FormDescription>
              <InputForm value={userId} onChange={handleChangeUserId} />
            </InputFormBox>
            <InputFormBox>
              <FormDescription>名前</FormDescription>
              <InputForm value={userName} onChange={handleChangeUserName} />
            </InputFormBox>
            <RegisterButton type="button" onClick={handleClick}>
              登録
            </RegisterButton>
          </SignupForm>
        </SignupBody>
      </ModalBox>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(91, 112, 131, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBox = styled.div`
  width: 100%;
  height: 100%;
  max-width: 600px;
  max-height: 650px;
  background: #152028;
  border-radius: 16px;
`;

const SignupBody = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 80px;
  padding-right: 80px;
  height: 100%;
`;

const SignupHeading = styled.h1`
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 31px;
`;

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const InputFormBox = styled.div`
  margin-top: 12px;
  margin-bottom: 12px;
  height: 60px;
  border: 1px solid #5a5a78;
  border-radius: 4px;
`;

const FormDescription = styled.div`
  padding: 8px 8px 0 8px;
  font-size: small;
  color: rgb(139, 152, 165);
`;

const InputForm = styled.input`
  padding: 0 8px 8px 8px;
  border: none;
  box-sizing: border-box;
  width: 100%;
  font-size: 17px;
  color: #fefffe;
  background-color: transparent;
  &:focus {
    outline: none;
  }
`;

const RegisterButton = styled.button`
  cursor: pointer;
  margin-bottom: 24px;
  padding-left: 32px;
  padding-right: 32px;
  border-radius: 9999px;
  border: 1px solid #5a5a78;
  height: 44px;
  font-size: 15px;
  font-weight: bold;
  color: rgb(15, 20, 25);
  background-color: rgb(239, 243, 244);
  margin-top: auto;
  &:hover {
    opacity: 90%;
  }
  &:active {
    opacity: 70%;
  }
`;
