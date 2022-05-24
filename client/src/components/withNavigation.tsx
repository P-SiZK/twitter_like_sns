import React from "react";
import styled from "styled-components";
import { SideNavigation } from "./sideNavigation";

export const WithNavigation: React.FC<{ element: JSX.Element }> = ({
  element,
}) => (
  <Wrapper>
    <Header>
      <SideNavigation />
    </Header>
    <Main>{element}</Main>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Header = styled.header`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Main = styled.main`
  flex-grow: 3;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
