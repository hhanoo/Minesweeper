import React from "react";
import styled from "styled-components";

import {
  HeaderContainer,
  GameStatusContianer,
  BoardContainer,
} from "./components/Container";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgb(175, 175, 175);
  border-radius: 1rem;
  padding: 1rem;
`;

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;

  background-color: rgb(175, 175, 175);
  border-top: 0.2rem solid #ffffff;
  border-left: 0.2rem solid #ffffff;
  border-right: 0.2rem solid rgb(104, 104, 104);
  border-bottom: 0.2rem solid rgb(104, 104, 104);
`;

function App() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <MainContainer>
        <HeaderContainer />
        <GameContainer>
          <GameStatusContianer />
          <BoardContainer />
        </GameContainer>
      </MainContainer>
    </div>
  );
}

export default App;
