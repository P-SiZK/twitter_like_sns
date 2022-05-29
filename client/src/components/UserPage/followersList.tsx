import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useGetFollowersListQuery } from "../../generated/graphql";
import { UserList } from "../userList";
import { NotFound } from "../notFound";
import { Loading } from "../loading";
import { ReactComponent as PageBackIcon } from "../../images/page_back.svg";

type Params = {
  userId: string;
};

export const FollowersList: React.FC = () => {
  const navigate = useNavigate();

  const { userId } = useParams<Params>() as Params;

  const [{ data, fetching, error }] = useGetFollowersListQuery({
    variables: { id: userId },
  });
  if (error) throw new Error(error.message);
  const user = data?.getUser;
  const followers = data?.getFollowers;
  const followerUsers = followers?.map(({ follower }) => ({
    id: follower.id,
    name: follower.name,
    bio: follower.profile?.bio as string,
  }));

  if (fetching) return <Loading />;
  if (!user) return <NotFound />;

  return (
    <Body>
      <UserHeader>
        <PageBackButton type="button" onClick={() => navigate(-1)}>
          <PageBack>
            <PageBackIcon />
          </PageBack>
        </PageBackButton>
        <HeaderInfo>
          <HeaderName>
            {user.name} (@{userId}) さんをフォローしているアカウント
          </HeaderName>
        </HeaderInfo>
      </UserHeader>
      {followerUsers && <UserList users={followerUsers} />}
    </Body>
  );
};

const Body = styled.div`
  width: calc(100% - 20px);
  max-width: 600px;
`;

const UserHeader = styled.div`
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  height: 53px;
  padding: 0 16px;
  border: 1px solid #5a5a78;
  border-width: 0px 1px;
  background: rgba(21, 32, 43, 0.75);
  backdrop-filter: blur(12px);
`;

const HeaderInfo = styled.div``;

const PageBackButton = styled.button`
  cursor: pointer;
  flex: 1;
  margin-right: 16px;
  height: 36px;
  max-width: 36px;
  border: none;
  background: none;
`;

const PageBack = styled.div`
  align-items: center;
  width: 20px;
  padding: 0;
  fill: rgb(239, 243, 244);
`;

const HeaderName = styled.div`
  font-weight: bold;
  color: #fefffe;
`;
