import React from "react";
import styled from "styled-components";
import { TweetItem } from "./tweetItem";
import { GetTweetsQuery } from "../generated/graphql";

type Props = {
  tweets: GetTweetsQuery["getTweets"];
};

export const TweetItems: React.FC<Props> = ({ tweets }) => (
  <Wrapper>
    <ul>
      {tweets &&
        tweets.map((tweet) => (
          <li key={tweet.id}>
            <TweetItem tweet={tweet} />
          </li>
        ))}
    </ul>
  </Wrapper>
);

const Wrapper = styled.div`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      border: 1px solid #5a5a78;
      border-top: none;
    }
  }
`;
