import React from "react";
import styled from "styled-components";

interface blockProps {
  aroundCount: number;
}

const Block = styled.div<{ $textColor: string }>`
  display: flex;
  width: 1.6rem;
  height: 1.6rem;
  background-color: rgb(175, 175, 175);

  font-size: 1.4rem;
  font-weight: 600;

  text-align: center;
  justify-content: center;

  color: ${(props) => props.$textColor};
`;

const BlockOpen = ({ aroundCount }: blockProps) => {
  const getColor = (count: number): string => {
    switch (count) {
      case 1:
        return "rgb(53, 59, 176)";
      case 2:
        return "rgb(26, 91, 1)";
      case 3:
        return "rgb(161, 8, 25)";
      case 4:
        return "rgb(7, 0, 112)";
      case 5:
        return "rgb(110, 11, 14)";
      case 6:
        return "rgb(32, 106, 121)";
      case 7:
        return "black";
      case 8:
        return "rgb(109, 109, 109)";
      default:
        return "transparent";
    }
  };

  return <Block $textColor={getColor(aroundCount)}>{aroundCount}</Block>;
};

export default BlockOpen;
