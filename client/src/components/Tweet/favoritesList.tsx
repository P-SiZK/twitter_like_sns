import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useGetFavoritesListQuery } from "../../generated/graphql";
import { UserList } from "../userList";
import { NotFound } from "../notFound";
import { Loading } from "../loading";
import { ReactComponent as CloseIcon } from "../../images/close_button.svg";

type Params = {
  tweetId: string;
};

export const FavoritesList: React.FC = () => {
  const navigate = useNavigate();

  const { tweetId } = useParams<Params>() as Params;

  const [{ data, fetching, error }] = useGetFavoritesListQuery({
    variables: { tweetId },
  });
  if (error) throw new Error(error.message);
  const favoriteUsers = data?.getFavorites.map(({ favoriteUser }) => ({
    id: favoriteUser.id,
    name: favoriteUser.name,
    bio: favoriteUser.profile?.bio as string,
  }));

  const onCloseClick = () => {
    navigate(-1);
  };

  if (fetching) return <Loading />;
  if (!favoriteUsers) return <NotFound />;

  return (
    <ModalOverlay onClick={onCloseClick}>
      <ModalBox aria-modal role="dialog" onClick={(e) => e.stopPropagation()}>
        <ScrollBox>
          <FavoritesHeader>
            <CloseButton type="button" onClick={onCloseClick}>
              <Close>
                <CloseIcon />
              </Close>
            </CloseButton>
            <HeaderText>いいねしたユーザー</HeaderText>
          </FavoritesHeader>
          <Body>{favoriteUsers && <UserList users={favoriteUsers} />}</Body>
        </ScrollBox>
      </ModalBox>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(91, 112, 131, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBox = styled.div`
  width: 100%;
  height: 100%;
  max-width: 600px;
  max-height: 650px;
  background: #152028;
  border-radius: 16px;
  overflow: hidden;
`;

const ScrollBox = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const FavoritesHeader = styled.div`
  z-index: 2;
  display: flex;
  position: sticky;
  top: 0;
  align-items: center;
  padding: 0px 16px;
  height: 53px;
  background: rgba(21, 32, 43, 0.75);
  backdrop-filter: blur(12px);
`;

const CloseButton = styled.button`
  cursor: pointer;
  flex: 1;
  margin-right: 16px;
  height: 36px;
  max-width: 36px;
  border: none;
  background: none;
`;

const Close = styled.div`
  align-items: center;
  width: 20px;
  padding: 0;
  fill: rgb(239, 243, 244);
`;

const HeaderText = styled.div`
  font-weight: bold;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
`;
