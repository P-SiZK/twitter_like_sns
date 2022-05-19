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
        <TimelineHeader>最新ツイート</TimelineHeader>
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

const TimelineHeader = styled.div`
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
