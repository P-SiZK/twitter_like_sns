import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { Loading } from "../loading";
import { NotFound } from "../notFound";
import {
  useCreateFavoriteMutation,
  useDeleteFavoriteMutation,
  useGetTweetPageQuery,
} from "../../generated/graphql";
import { ReactComponent as PageBackIcon } from "../../images/page_back.svg";
import { ReactComponent as ReplyIcon } from "../../images/reply.svg";
import { ReactComponent as RetweetIcon } from "../../images/retweet_before.svg";
import { ReactComponent as AfterRetweetIcon } from "../../images/retweet_after.svg";
import { ReactComponent as FavoriteIcon } from "../../images/favorite_before.svg";
import { ReactComponent as AfterFavoriteIcon } from "../../images/favorite_after.svg";
import { ReactComponent as ShareIcon } from "../../images/share.svg";

type Params = {
  tweetId: string;
};

export const TweetPage: React.FC = () => {
  const navigate = useNavigate();

  const [retweetCount, setRetweetCount] = useState(0);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [isRetweet, setIsRetweet] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const [, createFavoriteMutation] = useCreateFavoriteMutation();
  const [, deleteFavoriteMutation] = useDeleteFavoriteMutation();

  const { tweetId } = useParams<Params>() as Params;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onReplyClick = () => {};
  const onRetweetClick = () => {
    setRetweetCount(retweetCount + (isRetweet ? -1 : 1));
    setIsRetweet(!isRetweet);
  };
  const onFavoriteClick = async () => {
    if (isFavorite) {
      const { error } = await deleteFavoriteMutation({ tweetId });
      if (error) throw new Error(error.message);
      setFavoriteCount(favoriteCount - 1);
      setIsFavorite(false);
    } else {
      const { error } = await createFavoriteMutation({ tweetId });
      if (error) throw new Error(error.message);
      setFavoriteCount(favoriteCount + 1);
      setIsFavorite(true);
    }
  };

  const [{ data, fetching, error }] = useGetTweetPageQuery({
    variables: { id: tweetId },
  });
  if (error) throw new Error(error.message);
  const tweet = data?.getTweet;
  const userId = data?.getUser?.id;

  useEffect(() => {
    if (tweet?.favorite?.find((v) => v?.favoriteUserId === userId))
      setIsFavorite(true);
    setFavoriteCount(tweet?.favorite?.length || 0);
  }, [userId, tweet]);

  if (fetching) return <Loading />;
  if (!tweet) return <NotFound />;

  const redirectUserProfile = () => {
    navigate(`/${tweet.authorId}`);
  };

  return (
    <Body>
      <Header>
        <PageBackButton type="button" onClick={() => navigate(-1)}>
          <PageBack>
            <PageBackIcon />
          </PageBack>
        </PageBackButton>
        <HeaderName>ツイート</HeaderName>
      </Header>
      <TweetBox>
        <UserInfo>
          <UserIcon>
            <IconImg
              src="/twitter_icon.png"
              alt={tweet.authorId}
              onClick={redirectUserProfile}
            />
          </UserIcon>
          <UserCharacter>
            <UserName onClick={redirectUserProfile}>
              {tweet.author.name}
            </UserName>
            <UserID onClick={redirectUserProfile}>@{tweet.authorId}</UserID>
          </UserCharacter>
        </UserInfo>
        <TweetText>{tweet.content}</TweetText>
        {/*
        {tweet.tweetImageURL && (
          <TweetImage>
            <img src={tweet.tweetImageURL} alt={tweet.authorId} />
          </TweetImage>
        )}
        */}
        <Footer />
        <ReactionCounters>
          <CounterBox to="retweets">
            <Counter>{retweetCount}</Counter>{" "}
            <CounterString>件のリツイート</CounterString>
          </CounterBox>
          <CounterBox to="favorites">
            <Counter>{favoriteCount}</Counter>{" "}
            <CounterString>件のいいね</CounterString>
          </CounterBox>
        </ReactionCounters>
        <ReactionButtons>
          <Reply type="button" onClick={onReplyClick}>
            <ReplyIcon />
          </Reply>
          <Retweet type="button" isRetweet={isRetweet} onClick={onRetweetClick}>
            {isRetweet ? <AfterRetweetIcon /> : <RetweetIcon />}
          </Retweet>
          <Favorite
            type="button"
            isFavorite={isFavorite}
            onClick={onFavoriteClick}
          >
            {isFavorite ? <AfterFavoriteIcon /> : <FavoriteIcon />}
          </Favorite>
          <Share type="button">
            <ShareIcon />
          </Share>
        </ReactionButtons>
      </TweetBox>
    </Body>
  );
};

const Body = styled.div`
  width: calc(100% - 20px);
  max-width: 600px;
`;

const Header = styled.div`
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

const Footer = styled.div`
  margin: 16px 0;
  color: rgb(139, 152, 165);
`;

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

const TweetBox = styled.div`
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

const UserInfo = styled.div`
  display: flex;
`;

const UserCharacter = styled.div``;

const UserName = styled.div`
  font-weight: bold;
`;

const UserID = styled.div`
  color: #8899a6;
`;

const TweetText = styled.div`
  margin-top: 12px;
  font-size: 23px;
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

const ReactionCounters = styled.div`
  display: flex;
  padding: 16px 4px;
  border-top: 1px solid #5a5a78;
`;

const CounterBox = styled(Link)`
  text-decoration: none;
  color: rgb(247, 249, 249);
  margin-right: 20px;
  &:hover {
    text-decoration-line: underline;
  }
  font-size: 14px;
`;

const Counter = styled.span`
  font-weight: bold;
`;

const CounterString = styled.span`
  color: rgb(139, 152, 165);
`;

const ReactionButtons = styled.div`
  display: flex;
  justify-content: space-around;
  height: 48px;
  border: 1px solid #5a5a78;
  border-width: 1px 0;
`;

const Reply = styled.button`
  cursor: pointer;
  flex: 1;
  max-width: 22.5px;
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
  max-width: 22.5px;
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
  max-width: 22.5px;
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
  max-width: 22.5px;
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
