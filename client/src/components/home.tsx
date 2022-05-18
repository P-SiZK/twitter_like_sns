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
