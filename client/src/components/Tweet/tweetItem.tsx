import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { Tweet } from "./tweet";
import { ReactComponent as ReplyIcon } from "../../images/reply.svg";
import { ReactComponent as RetweetIcon } from "../../images/retweet_before.svg";
import { ReactComponent as AfterRetweetIcon } from "../../images/retweet_after.svg";
import { ReactComponent as FavoriteIcon } from "../../images/favorite_before.svg";
import { ReactComponent as AfterFavoriteIcon } from "../../images/favorite_after.svg";
import { ReactComponent as ShareIcon } from "../../images/share.svg";

type TweetProps = {
  tweet: Tweet;
};

export const TweetItem: React.FC<TweetProps> = ({ tweet }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [replyCount, setReplyCount] = useState(0);
  const [retweetCount, setRetweetCount] = useState(0);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [isRetweet, setIsRetweet] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // 実際はリプライが投稿されてから増えるが、取り敢えず…
  const onReplyClick = () => {
    setReplyCount(replyCount + 1);
  };
  const onRetweetClick = () => {
    setRetweetCount(retweetCount + (isRetweet ? -1 : 1));
    setIsRetweet(!isRetweet);
  };
  const onFavoriteClick = () => {
    setFavoriteCount(favoriteCount + (isFavorite ? -1 : 1));
    setIsFavorite(!isFavorite);
  };

  const redirectUserProfile = () => {
    const userLink = `/${tweet.authorId}`;
    if (location.pathname === userLink) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      navigate(`/${tweet.authorId}`);
    }
  };

  return (
    <Wrapper>
      <TweetLabel />
      <TweetBox>
        <UserIcon>
          <IconImg
            src="/twitter_icon.png"
            alt={tweet.authorId}
            onClick={redirectUserProfile}
          />
        </UserIcon>
        <Content>
          <UserInfo>
            <UserName onClick={redirectUserProfile}>
              {tweet.author.name}
            </UserName>
            <UserID onClick={redirectUserProfile}>@{tweet.authorId}</UserID>
          </UserInfo>
          <TweetText>{tweet.content}</TweetText>
          {/*
          {tweet.tweetImageURL && (
            <TweetImage>
              <img src={tweet.tweetImageURL} alt={tweet.authorId} />
            </TweetImage>
          )}
          */}
          <ReactionButtons>
            <ButtonWithCounter>
              <Reply type="button" onClick={onReplyClick}>
                <ReplyIcon />
              </Reply>
              <Counter>{replyCount}</Counter>
            </ButtonWithCounter>
            <ButtonWithCounter>
              <Retweet
                type="button"
                isRetweet={isRetweet}
                onClick={onRetweetClick}
              >
                {isRetweet ? <AfterRetweetIcon /> : <RetweetIcon />}
              </Retweet>
              <Counter>{retweetCount}</Counter>
            </ButtonWithCounter>
            <ButtonWithCounter>
              <Favorite
                type="button"
                isFavorite={isFavorite}
                onClick={onFavoriteClick}
              >
                {isFavorite ? <AfterFavoriteIcon /> : <FavoriteIcon />}
              </Favorite>
              <Counter>{favoriteCount}</Counter>
            </ButtonWithCounter>
            <Share type="button">
              <ShareIcon />
            </Share>
          </ReactionButtons>
        </Content>
      </TweetBox>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.03);
  }
`;

const TweetLabel = styled.div`
  padding-top: 12px;
`;

const TweetBox = styled.div`
  display: flex;
  padding: 0 16px;
`;

const UserIcon = styled.div`
  margin-right: 12px;
`;

const IconImg = styled.img`
  cursor: pointer;
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

const Content = styled.div`
  flex: 1;
  min-width: 0;
  margin-bottom: 12px;
`;

const UserInfo = styled.div`
  display: flex;
`;

const UserName = styled.div`
  font-weight: bold;
`;

const UserID = styled.div`
  margin-left: 4px;
  color: #8899a6;
`;

const TweetText = styled.div`
  overflow-wrap: break-word;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

/*
const TweetImage = styled.div`
  margin-top: 12px;
  img {
    height: 200px;
  }
`;
*/

const ReactionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 425px;
  height: 20px;
  margin-top: 12px;
`;

const ButtonWithCounter = styled.div`
  flex: 1;
  display: flex;
  // justify-content: flex-start;
`;

const Counter = styled.div`
  padding: 0 12px;
  color: #8899a6;
  font-size: 14px;
`;

const Reply = styled.button`
  cursor: pointer;
  flex: 1;
  max-width: 18.75px;
  padding: 0;
  border: none;
  background: none;
  fill: #aab8c2;
  &:hover {
    fill: #1da1f2;
    opacity: 50%;
  }
  &:active {
    opacity: 100%;
  }
`;

const Retweet = styled.button<{ isRetweet: boolean }>`
  cursor: pointer;
  flex: 1;
  max-width: 18.75px;
  padding: 0;
  border: none;
  background: none;

  ${(props) => {
    if (props.isRetweet) {
      return css`
        fill: #19cf86;
        &:hover {
          opacity: 50%;
        }
      `;
    }
    return css`
      fill: #aab8c2;
      &:hover {
        fill: #19cf86;
        opacity: 50%;
      }
      &:active {
        fill: #19cf86;
        opacity: 100%;
      }
    `;
  }}
`;

const Favorite = styled.button<{ isFavorite: boolean }>`
  cursor: pointer;
  flex: 1;
  max-width: 18.75px;
  padding: 0;
  border: none;
  background: none;
  fill: #aab8c2;
  &:hover {
    fill: #e81c4f;
  }

  ${(props) => {
    if (props.isFavorite) {
      return css`
        fill: #e81c4f;
        &:hover {
          opacity: 50%;
        }
      `;
    }
    return css`
      fill: #aab8c2;
      &:hover {
        fill: #e81c4f;
        opacity: 50%;
      }
      &:active {
        fill: #e81c4f;
        opacity: 100%;
      }
    `;
  }}
`;

const Share = styled.button`
  cursor: pointer;
  flex: 1;
  max-width: 18.75px;
  padding: 0;
  border: none;
  background: none;
  fill: #aab8c2;
  &:hover {
    fill: #1da1f2;
    opacity: 50%;
  }
  &:active {
    opacity: 100%;
  }
`;
