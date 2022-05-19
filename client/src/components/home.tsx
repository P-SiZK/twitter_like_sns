import React from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import { TweetComposeBox } from "./tweetComposeBox";
import { TweetItems } from "./tweetItems";
import { useGetAllTweetsQuery } from "../generated/graphql";

export const Home: React.FC = () => {
  const [{ data, error }] = useGetAllTweetsQuery();
  if (error) throw new Error(error.message);
  const tweets = data?.getAllTweets;

  return (
    <>
      <Helmet>
        <title>ホーム / 7witter</title>
      </Helmet>
      <Body>
        <HomeHeader>最新ツイート</HomeHeader>
        <TweetComposeBox />
        {tweets && <TweetItems tweets={tweets} />}
      </Body>
    </>
  );
};

const Body = styled.div`
  width: calc(100% - 20px);
  max-width: 600px;
  margin: 0 auto;
`;

const HomeHeader = styled.div`
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
  font-size: 20px;
  font-weight: bold;
`;
