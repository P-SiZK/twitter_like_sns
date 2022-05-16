import React from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import { TweetComposeBox } from "./tweetComposeBox";
import { TweetItems } from "./tweetItems";
import { useGetTimelinesQuery } from "../generated/graphql";

export const Timeline: React.FC = () => {
  const [{ data, error }] = useGetTimelinesQuery();
  if (error) throw new Error(error.message);
  const timelines = data?.getTimelines;

  return (
    <>
      <Helmet>
        <title>タイムライン / 7witter</title>
      </Helmet>
      <Body>
        <TweetComposeBox />
        {timelines && (
          <TweetItems tweets={timelines.map((timeline) => timeline.tweet)} />
        )}
      </Body>
    </>
  );
};

const Body = styled.div`
  width: calc(100% - 20px);
  max-width: 600px;
  margin: 0 auto;
`;
