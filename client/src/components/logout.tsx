import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const Logout: React.FC = () => {
  const { logout } = useAuth0();

  const navigate = useNavigate();

  return (
    <ModalOverlay onClick={() => navigate(-1)}>
      <ModalBox aria-modal role="dialog" onClick={(e) => e.stopPropagation()}>
        <ConfirmBox>
          <LogoutHeading>7witterからログアウトしますか？</LogoutHeading>
          <LogoutDescription>
            いつでもログインし直すことができます。
          </LogoutDescription>
          <Buttons>
            <LogoutButton
              type="button"
              onClick={() =>
                logout({ returnTo: `${window.location.origin}/login` })
              }
            >
              ログアウト
            </LogoutButton>
            <CancelButton type="button" onClick={() => navigate(-1)}>
              キャンセル
            </CancelButton>
          </Buttons>
        </ConfirmBox>
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
  background: #152028;
  border-radius: 16px;
  width: 320px;
`;

const ConfirmBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 32px;
`;

const LogoutHeading = styled.h1`
  margin-top: 0px;
  margin-bottom: 8px;
  font-size: 20px;
  line-height: 24px;
`;

const LogoutDescription = styled.div`
  color: rgb(139, 152, 165);
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 24px;
  width: 100%;
`;

const LogoutButton = styled.button`
  cursor: pointer;
  margin-bottom: 12px;
  padding-left: 32px;
  padding-right: 32px;
  border-radius: 9999px;
  border: 1px solid #5a5a78;
  height: 44px;
  font-size: 15px;
  font-weight: bold;
  color: rgb(15, 20, 25);
  background-color: rgb(239, 243, 244);
  &:hover {
    opacity: 90%;
  }
  &:active {
    opacity: 70%;
  }
`;

const CancelButton = styled.button`
  cursor: pointer;
  margin-bottom: 12px;
  padding-left: 32px;
  padding-right: 32px;
  border-radius: 9999px;
  border: 1px solid #5a5a78;
  height: 44px;
  font-size: 15px;
  font-weight: bold;
  color: #fefffe;
  background-color: transparent;
  &:hover {
    opacity: 90%;
  }
  &:active {
    opacity: 70%;
  }
`;
