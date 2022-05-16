import React from "react";
import ReactLoading from "react-loading";
import styled from "styled-components";

export const Loading: React.FC = () => (
  <Load>
    <ReactLoading type="spin" />
  </Load>
);

const Load = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;
