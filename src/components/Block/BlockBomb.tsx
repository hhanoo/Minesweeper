import React from "react";
import styled from "styled-components";

import { ReactComponent as Bomb } from "../../assets/bomb.svg";

interface blockProps {
  isOpen: boolean;
}

const Block = styled.div<{ $isOpen: boolean }>`
  display: flex;
  width: 1.2rem;
  height: 1.2rem;

  align-items: center;

  background-color: ${(props) =>
    props.$isOpen ? "red" : "rgb(175, 175, 175)"};
  border-top: 0.2rem solid ${(props) => (props.$isOpen ? "red" : "#ffffff")};
  border-left: 0.2rem solid ${(props) => (props.$isOpen ? "red" : "#ffffff")};
  border-right: 0.2rem solid
    ${(props) => (props.$isOpen ? "red" : "rgb(104, 104, 104)")};
  border-bottom: 0.2rem solid
    ${(props) => (props.$isOpen ? "red" : "rgb(104, 104, 104)")};
`;

const BlockBomb = ({ isOpen }: blockProps) => {
  return (
    <Block $isOpen={isOpen}>
      <Bomb style={{ fill: "black" }} />
    </Block>
  );
};

export default BlockBomb;
