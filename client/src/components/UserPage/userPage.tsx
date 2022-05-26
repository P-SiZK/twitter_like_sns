import React from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { UserProfile } from "./userProfile";
import { TweetItems } from "../Tweet/tweetItems";
import { Loading } from "../loading";
import { NotFound } from "../notFound";
import { ReactComponent as PageBackIcon } from "../../images/page_back.svg";
import { useGetUserPageQuery } from "../../generated/graphql";

type Params = {
  userId: string;
};

export const UserPage: React.FC = () => {
  const navigate = useNavigate();

  const { userId } = useParams<Params>() as Params;

  const [{ data, fetching, error }] = useGetUserPageQuery({
    variables: { id: userId },
  });
  if (error) throw new Error(error.message);
  const user = data?.getUser;
  const tweets = data?.getTweets;

  if (fetching) return <Loading />;
  if (!user) return <NotFound />;

  return (
    <>
      <Helmet>
        <title>
          {user.name} (@{user.id}) さん / 7witter
        </title>
      </Helmet>
      <Body>
        <UserHeader>
          <PageBackButton type="button" onClick={() => navigate(-1)}>
            <PageBack>
              <PageBackIcon />
            </PageBack>
          </PageBackButton>
          <HeaderInfo>
            <HeaderName>{user.name}</HeaderName>
            <HeaderTweeetNum>{tweets?.length} 件のツイート</HeaderTweeetNum>
          </HeaderInfo>
        </UserHeader>
        <UserProfile userId={userId} />
        {tweets && <TweetItems tweets={tweets} />}
      </Body>
    </>
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

const HeaderTweeetNum = styled.div`
  color: #8899a6;
`;
