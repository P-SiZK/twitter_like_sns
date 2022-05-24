import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useGetUserQuery } from "../generated/graphql";
import { ReactComponent as GlobalIcon } from "../images/global.svg";
import { ReactComponent as HomeIcon } from "../images/home.svg";
import { ReactComponent as ProfileIcon } from "../images/profile.svg";

export const SideNavigation: React.FC = () => {
  const [{ data, error }] = useGetUserQuery();
  if (error) throw new Error(error.message);
  const user = data?.getUser;

  return (
    <Wrapper>
      <NavigationLinks>
        <NavigationLink to="/home">
          <SVG>
            <HomeIcon />
          </SVG>
          <NavigationText>ホーム</NavigationText>
        </NavigationLink>
        <NavigationLink to="/global">
          <SVG>
            <GlobalIcon />
          </SVG>
          <NavigationText>グローバル</NavigationText>
        </NavigationLink>
        <NavigationLink to={`/${user?.id as string}`}>
          <SVG>
            <ProfileIcon />
          </SVG>
          <NavigationText>プロフィール</NavigationText>
        </NavigationLink>
      </NavigationLinks>
      <ButtonLink to="/logout">
        <LogoutButton type="button">ログアウト</LogoutButton>
      </ButtonLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 250px;
  height: 100vh;
  padding: 0 12px;
`;

const NavigationLinks = styled.div`
  display: flex;
  flex-direction: column;
`;

const NavigationLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  border-radius: 9999px;
  margin: 4px 0;
  border: 0;
  padding: 12px;
  height: 36.25px;
  &:hover {
    background-color: rgba(247, 249, 249, 0.1);
  }
`;

const NavigationText = styled.div`
  margin-left: 20px;
  margin-right: 16px;
  font-weight: bold;
  font-size: 20px;
  color: rgb(247, 249, 249);
`;

const SVG = styled.div`
  flex: 1;
  max-width: 1.75rem;
  padding: 0;
  border: none;
  background: none;
  fill: rgb(247, 249, 249);
`;

/*
const TweetButton = styled.button`
  cursor: pointer;
  border-radius: 9999px;
  font-weight: bold;
`;
*/

const ButtonLink = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 12px auto;
  border-radius: 9999px;
  width: 100%;
`;

const LogoutButton = styled.button`
  cursor: pointer;
  height: 40px;
  width: 80%;
  padding: 0 16px;
  border-radius: 9999px;
  border: 1px solid #5a5a78;
  font-size: 14px;
  font-weight: bold;
  color: rgb(15, 20, 25);
  background-color: rgb(239, 243, 244);
  &:hover {
    opacity: 90%;
  }
  &:active {
    opacity: 70%;
  }
`;
