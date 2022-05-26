import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  useGetUserQuery,
  useGetProfileQuery,
  useCreateFollowMutation,
  useDeleteFollowMutation,
  useGetFollowingsQuery,
  useGetFollowersQuery,
} from "../generated/graphql";

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
    const a = await createFollowMutation({ followingId: userId });
    if (a.error) throw new Error(a.error.message);
    setIsFollow(true);
  };
  const onUnFollowClick = async () => {
    await deleteFollowMutation({ followingId: userId });
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

  const [{ data: loginUserData, error: loginUserError }] = useGetUserQuery();
  if (loginUserError) throw new Error(loginUserError.message);
  const loginUserId = loginUserData?.getUser?.id;

  const [{ data: userData, error: userError }] = useGetUserQuery({
    variables: { id: userId },
  });
  if (userError) throw new Error(userError.message);
  const user = userData?.getUser;

  const [{ data: profileData, error: profileError }] = useGetProfileQuery({
    variables: { userId },
  });
  if (profileError) throw new Error(profileError.message);
  const profile = profileData?.getProfile;

  const [{ data: followingsData, error: followingsError }] =
    useGetFollowingsQuery({ variables: { followerId: userId } });
  if (followingsError) throw new Error(followingsError.message);
  const followings = followingsData?.getFollowings;

  const [{ data: followersData, error: followersError }] = useGetFollowersQuery(
    { variables: { followingId: userId } }
  );
  if (followersError) throw new Error(followersError.message);
  const followers = followersData?.getFollowers;

  useEffect(() => {
    if (followers?.find((v) => v.followerId === loginUserId)) setIsFollow(true);
  }, [loginUserId, followers]);

  if (!user) throw new Error(`${userId} is not found`);

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
          <UserName>{user.name}</UserName>
          <UserID>@{userId}</UserID>
        </UserInfo>
        {profile?.bio && <Bio>{profile?.bio}</Bio>}
        <FollowInfo>
          <FollowingInfo>
            <FollowingNumber>{followings?.length}</FollowingNumber>{" "}
            <FollowingString>フォロー中</FollowingString>
          </FollowingInfo>
          <FollowerInfo>
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

const FollowingInfo = styled.div`
  margin-right: 20px;
`;

const FollowingNumber = styled.span`
  font-weight: bold;
  color: #fefffe;
`;

const FollowingString = styled.span`
  color: #8899a6;
`;

const FollowerInfo = styled.div``;

const FollowerNumber = styled.span`
  font-weight: bold;
  color: #fefffe;
`;

const FollowerString = styled.span`
  color: #8899a6;
`;
