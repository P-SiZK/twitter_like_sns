import React, { useState } from "react";
import styled from "styled-components";
import { useCreateTweetMutation } from "../generated/graphql";
import { ReactComponent as MediaIcon } from "../images/media.svg";

export const TweetComposeBox: React.FC = () => {
  const [, createTweetMutation] = useCreateTweetMutation();

  const [tweetText, setTweetText] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweetText(event.target.value);
  };

  const handleClickTweet = async () => {
    if (tweetText === "") return;
    await createTweetMutation({ content: tweetText });
    setTweetText("");
  };

  return (
    <TweetBox>
      <UserIcon>
        <img src="/twitter_icon.png" alt="Twitter" />
      </UserIcon>
      <TweetForm>
        <TweetTextWrapper>
          <TweetText
            placeholder="いまどうしてる？"
            value={tweetText}
            onChange={handleChange}
          />
        </TweetTextWrapper>
        <TweetButtons>
          <Media type="button">
            <MediaIcon />
          </Media>
          <TweetButton onClick={handleClickTweet} disabled={tweetText === ""}>
            ツイートする
          </TweetButton>
        </TweetButtons>
      </TweetForm>
    </TweetBox>
  );
};

const TweetBox = styled.div`
  display: flex;
  padding: 8px 16px;
  border: 1px solid #5a5a78;
`;

const UserIcon = styled.div`
  margin-right: 12px;
  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }
`;

const TweetForm = styled.form`
  flex: 1;
  min-width: 0;
`;

const TweetTextWrapper = styled.div`
  padding-bottom: 12px;
  border-bottom: 1px solid #5a5a78;
`;

const TweetText = styled.textarea`
  height: 28px;
  width: 100%;
  padding: 12px 0;
  border: none;
  font-size: 20px;
  color: #fefffe;
  background-color: #152028;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #8899a6;
  }
`;

const TweetButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

const Media = styled.button`
  cursor: pointer;
  flex: 1;
  max-width: 20px;
  padding: 0;
  border: none;
  background: none;
  fill: #1da1f2;
  &:hover {
    opacity: 50%;
  }
  &:active {
    opacity: 100%;
  }
`;

const TweetButton = styled.button`
  cursor: pointer;
  height: 34px;
  width: 122px;
  padding: 0 16px;
  border-radius: 9999px;
  border: 0;
  font-weight: bold;
  color: #fefffe;
  background-color: #1da1f2;
  margin-left: auto;
  &:hover {
    opacity: 90%;
  }
  &:active {
    opacity: 80%;
  }
  &:disabled {
    opacity: 50%;
    cursor: default;
  }
`;
