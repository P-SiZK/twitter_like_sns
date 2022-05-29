import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import {
  useCreateFollowMutation,
  useDeleteFollowMutation,
  useGetUserProfileQuery,
} from "../../generated/graphql";

type Props = {
  userId: string;
};

export const UserProfile: React.FC<Props> = ({ userId }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isFollow, setIsFollow] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const [, createFollowMutation] = useCreateFollowMutation();
  const [, deleteFollowMutation] = useDeleteFollowMutation();

  const onFollowClick = async () => {
    const { error } = await createFollowMutation({ followingId: userId });
    if (error) throw new Error(error.message);
    setIsFollow(true);
  };
  const onUnFollowClick = async () => {
    const { error } = await deleteFollowMutation({ followingId: userId });
    if (error) throw new Error(error.message);
    setIsFollow(false);
  };
  const onProfileEditClick = () => {
    navigate("/settings/profile", {
      state: { backgroundLocation: location },
    });
  };

  const onMouseEnter = () => {
    setIsHover(true);
  };
  const onMouseLeave = () => {
    setIsHover(false);
  };

  const [{ data, error }] = useGetUserProfileQuery({
    variables: { id: userId },
  });
  if (error) throw new Error(error.message);
  const loginUserId = data?.getLoginUser?.id;
  const user = data?.getUser;
  const profile = data?.getProfile;
  const followings = data?.getFollowings;
  const followers = data?.getFollowers;

  useEffect(() => {
    if (followers?.find((v) => v.followerId === loginUserId)) setIsFollow(true);
  }, [loginUserId, followers]);

  return (
    <Wrapper>
      <HeaderImage>
        <img src="/logo512.png" alt={userId} />
      </HeaderImage>
      <ProfileBox>
        <ProfileHeader>
          <UserIcon>
            <img src="/twitter_icon.png" alt={userId} />
          </UserIcon>
          {(() => {
            if (loginUserId === userId)
              return (
                <ProfileEditButton type="button" onClick={onProfileEditClick}>
                  プロフィールを編集
                </ProfileEditButton>
              );
            if (isFollow)
              return (
                <UnFollowButton
                  type="button"
                  onClick={onUnFollowClick}
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                >
                  {isHover ? "フォロー解除" : "フォロー中"}
                </UnFollowButton>
              );
            return (
              <FollowButton type="button" onClick={onFollowClick}>
                フォロー
              </FollowButton>
            );
          })()}
        </ProfileHeader>
        <UserInfo>
          <UserName>{user?.name}</UserName>
          <UserID>@{userId}</UserID>
        </UserInfo>
        {profile?.bio && <Bio>{profile?.bio}</Bio>}
        <FollowInfo>
          <FollowingInfo to="following">
            <FollowingNumber>{followings?.length}</FollowingNumber>{" "}
            <FollowingString>フォロー中</FollowingString>
          </FollowingInfo>
          <FollowerInfo to="followers">
            <FollowerNumber>{followers?.length}</FollowerNumber>{" "}
            <FollowerString>フォロワー</FollowerString>
          </FollowerInfo>
        </FollowInfo>
      </ProfileBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 1px solid #5a5a78;
`;

const HeaderImage = styled.div`
  background-color: rgb(66, 83, 100);
  img {
    width: 199.328px;
  }
`;

const ProfileBox = styled.div`
  padding: 12px 16px 0 16px;
  margin-bottom: 16px;
`;

const ProfileHeader = styled.div`
  display: flex;
`;

const UserIcon = styled.div`
  margin-top: -15%;
  margin-right: 12px;
  img {
    width: 133.5px;
    height: 133.5px;
    border-radius: 50%;
  }
`;

const ProfileEditButton = styled.button`
  cursor: pointer;
  height: 36px;
  width: 169px;
  padding: 0 16px;
  border-radius: 9999px;
  border: 1px solid #5a5a78;
  font-size: 15px;
  font-weight: bold;
  color: #fefffe;
  background-color: transparent;
  margin-left: auto;
  &:hover {
    opacity: 90%;
  }
`;

const FollowButton = styled.button`
  cursor: pointer;
  height: 36px;
  width: 94px;
  padding: 0 16px;
  border-radius: 9999px;
  border: 1px solid #5a5a78;
  font-size: 15px;
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

const UnFollowButton = styled.button`
  cursor: pointer;
  height: 36px;
  width: 124px;
  padding: 0 16px;
  border-radius: 9999px;
  border: 1px solid #5a5a78;
  font-size: 15px;
  font-weight: bold;
  color: #fefffe;
  background-color: transparent;
  margin-left: auto;
  &:hover {
    border: 1px solid rgb(103, 7, 15);
    color: rgb(244, 33, 46);
    background-color: rgba(244, 33, 46, 0.1);
  }
  &:active {
    background-color: rgba(244, 33, 46, 0.2);
  }
`;

const UserInfo = styled.div`
  margin: 4px 0 12px 0;
`;

const UserName = styled.div`
  font-weight: bold;
  color: #fefffe;
`;

const UserID = styled.div`
  color: #8899a6;
`;

const Bio = styled.div`
  color: #fefffe;
  margin-bottom: 12px;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

const FollowInfo = styled.div`
  display: flex;
`;

const FollowingInfo = styled(Link)`
  text-decoration: none;
  color: rgb(247, 249, 249);
  margin-right: 20px;
  &:hover {
    text-decoration-line: underline;
  }
`;

const FollowingNumber = styled.span`
  font-weight: bold;
  color: #fefffe;
`;

const FollowingString = styled.span`
  color: #8899a6;
`;

const FollowerInfo = styled(Link)`
  text-decoration: none;
  color: rgb(247, 249, 249);
  &:hover {
    text-decoration-line: underline;
  }
`;

const FollowerNumber = styled.span`
  font-weight: bold;
  color: #fefffe;
`;

const FollowerString = styled.span`
  color: #8899a6;
`;
