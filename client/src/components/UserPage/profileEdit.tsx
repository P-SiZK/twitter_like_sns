import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  useGetProfileEditQuery,
  useUpdateUserMutation,
  useUpsertProfileMutation,
} from "../../generated/graphql";
import { ReactComponent as CloseIcon } from "../../images/close_button.svg";

export const ProfileEdit: React.FC = () => {
  const navigate = useNavigate();

  const [, updateUserMutation] = useUpdateUserMutation();
  const [, upsertProfileMutation] = useUpsertProfileMutation();

  const [{ data, error }] = useGetProfileEditQuery();
  if (error) throw new Error(error.message);
  const user = data?.getUser;
  const profile = data?.getProfile;

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [url, setUrl] = useState("");

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(event.target.value);
  };
  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };
  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };
  const onCloseClick = () => {
    navigate(-1);
  };

  const onSaveClick = async () => {
    if (name !== user?.name) {
      await updateUserMutation({ name });
    }
    if (
      bio !== profile?.bio ||
      location !== profile?.location ||
      url !== profile?.url
    ) {
      await upsertProfileMutation({ bio, location, url });
    }
    navigate(-1);
  };

  useEffect(() => {
    setName(user?.name || "");
    setBio(profile?.bio || "");
    setLocation(profile?.location || "");
    setUrl(profile?.url || "");
  }, [user, profile]);

  return (
    <ModalOverlay onClick={onCloseClick}>
      <ModalBox aria-modal role="dialog" onClick={(e) => e.stopPropagation()}>
        <ScrollBox>
          <EditHeader>
            <CloseButton type="button" onClick={onCloseClick}>
              <Close>
                <CloseIcon />
              </Close>
            </CloseButton>
            <HeaderText>プロフィールを編集</HeaderText>
            <SaveButton type="button" onClick={onSaveClick}>
              保存
            </SaveButton>
          </EditHeader>
          <EditBody>
            <HeaderImage>
              <img src="/logo512.png" alt={user?.id} />
            </HeaderImage>
            <UserIcon>
              <img src="/twitter_icon.png" alt={user?.id} />
            </UserIcon>
            <InputFormBox>
              <FormDescription>名前</FormDescription>
              <InputForm value={name} onChange={handleUserNameChange} />
            </InputFormBox>
            <TextareaFormBox>
              <FormDescription>自己紹介</FormDescription>
              <TextareaForm value={bio} onChange={handleBioChange} />
            </TextareaFormBox>
            <InputFormBox>
              <FormDescription>場所</FormDescription>
              <InputForm value={location} onChange={handleLocationChange} />
            </InputFormBox>
            <InputFormBox>
              <FormDescription>ウェブサイト</FormDescription>
              <InputForm value={url} onChange={handleUrlChange} />
            </InputFormBox>
          </EditBody>
        </ScrollBox>
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
  overflow: hidden;
`;

const ScrollBox = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const EditHeader = styled.div`
  z-index: 2;
  display: flex;
  position: sticky;
  top: 0;
  align-items: center;
  padding: 0px 16px;
  height: 53px;
  background: rgba(21, 32, 43, 0.75);
  backdrop-filter: blur(12px);
`;

const CloseButton = styled.button`
  cursor: pointer;
  flex: 1;
  margin-right: 16px;
  height: 36px;
  max-width: 36px;
  border: none;
  background: none;
`;

const Close = styled.div`
  align-items: center;
  width: 20px;
  padding: 0;
  fill: rgb(239, 243, 244);
`;

const HeaderText = styled.div`
  font-weight: bold;
`;

const SaveButton = styled.button`
  cursor: pointer;
  height: 32px;
  width: 62px;
  padding: 0 16px;
  border-radius: 9999px;
  border: 1px solid #5a5a78;
  font-size: 14px;
  font-weight: bold;
  color: rgb(15, 20, 25);
  background-color: rgb(239, 243, 244);
  margin-left: auto;
  &:hover {
    opacity: 90%;
  }
  &:active {
    opacity: 70%;
  }
`;

const EditBody = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderImage = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  img {
    width: 193px;
  }
`;

const UserIcon = styled.div`
  margin-top: -3rem;
  margin-left: 15px;
  img {
    width: 112px;
    height: 112px;
    border-radius: 50%;
  }
`;

const InputFormBox = styled.div`
  margin: 12px 16px;
  height: 60px;
  border: 1px solid #5a5a78;
  border-radius: 4px;
`;

const TextareaFormBox = styled.div`
  margin: 12px 16px;
  height: 104px;
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

const TextareaForm = styled.textarea`
  padding: 0 8px 8px 8px;
  border: none;
  box-sizing: border-box;
  width: 100%;
  height: 66px;
  font-size: 17px;
  color: #fefffe;
  background-color: transparent;
  &:focus {
    outline: none;
  }
`;
