import React from "react";

import { BlockOpen, BlockClose, BlockFlag, BlockBomb, BlockFlagWrong } from ".";

interface blockProps {
  isOpen: boolean;
  isFlag: boolean;
  isBomb: boolean;
  isDeath: boolean;
  aroundCount: number;
}

const Block = ({
  isOpen,
  isFlag,
  isBomb,
  isDeath,
  aroundCount,
}: blockProps) => {
  if (isFlag) {
    // 깃발 표시했지만 틀렸을 경우 블럭
    if (isDeath && !isBomb) return <BlockFlagWrong />;
    // 깃발 표시 불럭
    else return <BlockFlag />;
  } else {
    // 클릭한 폭탄 빨간 블럭
    if (isOpen && isBomb && isDeath) return <BlockBomb isOpen={true} />;
    // 클릭 안하고 게임이 끝나서 보여지는 폭탄 블럭
    else if (isBomb && isDeath) return <BlockBomb isOpen={false} />;
    // 열린 블럭 (숫자 나타냄)
    else if (isOpen) return <BlockOpen aroundCount={aroundCount} />;
    // 클릭하지 않은 즉, 닫힌 블럭
    else return <BlockClose />;
  }
};

export default Block;
