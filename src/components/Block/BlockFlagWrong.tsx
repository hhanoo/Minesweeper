import React from "react";
import styled from "styled-components";

import { ReactComponent as Bomb } from "../../assets/bomb.svg";
import { ReactComponent as Close } from "../../assets/close.svg";

const Block = styled.div`
  position: relative;
  display: flex;
  width: 1.6rem;
  height: 1.6rem;
  background-color: rgb(175, 175, 175);

  align-items: center;
  justify-content: center;
`;

const BlockFlagWrong = () => {
  return (
    <Block>
      <Bomb
        style={{
          position: "absolute",
          width: "1.2rem",
          fill: "black",
        }}
      />
      <Close
        style={{
          position: "absolute",
          width: "2.4rem",
          fill: "red",
        }}
      />
    </Block>
  );
};

export default BlockFlagWrong;
