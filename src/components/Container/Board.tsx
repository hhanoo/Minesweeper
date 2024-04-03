import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  START,
  RESET_COMPLETE,
  DEATH,
  STATUS_UPDATE,
  SUCCESS,
} from "../../modules/status";
import { RootState } from "../../modules";
import { gameType } from "../../modules/game";
import ReactModal from "react-modal";

import styled from "styled-components";

import { Block } from "../Block";
import { SuccessModal } from "../Modal";

const BoardContainer = styled.div<{ $row: number; $col: number }>`
  display: grid;

  grid-template-rows: repeat(${(props) => props.$row}, 1.6rem);
  grid-template-columns: repeat(${(props) => props.$col}, 1.6rem);
  gap: 0.1rem;

  font-size: 1.2rem;
  font-weight: 600;

  background-color: rgb(104, 104, 104);
  border-top: 0.2rem solid rgb(104, 104, 104);
  border-left: 0.2rem solid rgb(104, 104, 104);
  border-right: 0.2rem solid #ffffff;
  border-bottom: 0.2rem solid #ffffff;
`;

const customModalStyles = {
  overlay: {
    backgroundColor: "black",
  },
  content: {
    width: "40rem",
    height: "17rem",

    fontSize: "2rem",
    fontWeight: "500",

    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",

    borderRadius: "1rem",
  },
};

const Board = () => {
  const dispatch = useDispatch();

  const setting: gameType = useSelector(
    (state: RootState) => state.gameSetting
  );
  const isStart = useSelector((state: RootState) => state.gameStatus.isStart);
  const isReset = useSelector((state: RootState) => state.gameStatus.isReset);
  const isDeath = useSelector((state: RootState) => state.gameStatus.isDeath);
  const isSuccess = useSelector(
    (state: RootState) => state.gameStatus.isSuccess
  );

  const [flagCount, setFlagCount] = useState(0);
  const [collectFlag, setCollectFlag] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const [blocks, setBlocks] = useState(
    Array.from({ length: setting.row }, () =>
      Array.from({ length: setting.col }, () => ({
        isOpen: false,
        isFlag: false,
        isBomb: false,
        aroundCount: 0,
      }))
    )
  );

  useEffect(() => {
    if (isReset) {
      setBlocks(
        Array.from({ length: setting.row }, () =>
          Array.from({ length: setting.col }, () => ({
            isOpen: false,
            isFlag: false,
            isBomb: false,
            aroundCount: 0,
          }))
        )
      );
      setFlagCount(0);
      setCollectFlag(0);
      setClickCount(0);
      dispatch(RESET_COMPLETE());
    }
  }, [isReset]);

  useEffect(() => {
    if (collectFlag === setting.bomb) {
      dispatch(SUCCESS());
      setModalOpen(true);
    }
  }, [clickCount]);

  // 첫 클릭시 폭탄 배치와 주변 업데이트
  const deployBombs = (row: number, col: number) => {
    const clickPlaceNumber = row * setting.col + col;
    const boardSize = setting.col * setting.row;
    const bombList = new Set<number>();

    // --- 폭탄 생성 ---
    while (bombList.size < setting.bomb) {
      const random = Math.floor(Math.random() * boardSize);
      if (random !== clickPlaceNumber) bombList.add(random);
    }

    // --- 폭탄 위치에 따른 정보 업데이트 ---
    const dx = [-1, -1, -1, 0, 0, 1, 1, 1];
    const dy = [-1, 0, 1, -1, 1, -1, 0, 1];
    const updatedBlocks = blocks.map((items) => {
      return [...items];
    });

    bombList.forEach((bomb) => {
      const bombX = Math.floor(bomb / setting.col);
      const bombY = bomb % setting.col;

      updatedBlocks[bombX][bombY].isBomb = true;

      for (let i = 0; i < 8; i++) {
        const nx = bombX + dx[i];
        const ny = bombY + dy[i];

        if (nx >= 0 && nx < setting.row && ny >= 0 && ny < setting.col) {
          updatedBlocks[nx][ny].aroundCount++;
        }
      }
    });

    setBlocks(updatedBlocks);
  };

  // 블럭 변경
  const blockChange = (
    row: number,
    col: number,
    openClick: boolean,
    flagClick: boolean
  ) => {
    if (blocks[row][col].isBomb && openClick) dispatch(DEATH());

    const updatedBlocks = blocks.map((items) => {
      return [...items];
    });

    if (flagClick) {
      updatedBlocks[row][col].isFlag = !updatedBlocks[row][col].isFlag;
      const updatedFlag = updatedBlocks[row][col].isFlag
        ? flagCount + 1
        : flagCount - 1;

      dispatch(STATUS_UPDATE({ remain: setting.bomb - updatedFlag }));

      setCollectFlag((prev) =>
        updatedBlocks[row][col].isBomb ? updatedFlag : prev
      );
      setFlagCount(updatedFlag);
    } else if (openClick) {
      updatedBlocks[row][col].isOpen = true;

      // 주변에 폭탄이 없을 경우 주변 오픈 (BFS)
      if (
        !updatedBlocks[row][col].isBomb &&
        updatedBlocks[row][col].aroundCount == 0
      ) {
        const queue: { x: number; y: number }[] = [{ x: row, y: col }];
        const dx = [-1, 1, 0, 0];
        const dy = [0, 0, -1, 1];

        while (queue.length > 0) {
          const current = queue.shift();
          if (!current) continue;

          const { x, y } = current;
          updatedBlocks[x][y].isOpen = true;

          // 해당 칸 주변에 폭탄이 있을 경우 오픈하고 주변은 오픈하지 않음
          if (updatedBlocks[x][y].aroundCount > 0) continue;
          // 그렇지 않은 경우 주변도 오픈하기 위해 queue에 추가
          else {
            for (let i = 0; i < 4; i++) {
              const nx = x + dx[i];
              const ny = y + dy[i];

              if (
                nx >= 0 &&
                nx < setting.row &&
                ny >= 0 &&
                ny < setting.col &&
                updatedBlocks[nx][ny].isOpen == false &&
                updatedBlocks[nx][ny].isFlag == false
              ) {
                queue.push({ x: nx, y: ny });
              }
            }
          }
        }
      }
    }
    setBlocks(updatedBlocks);
  };

  // 블럭 클릭 이벤트
  const handleBlockClick = (row: number, col: number, isRight: boolean) => {
    setClickCount((prev) => prev + 1);
    if (isRight) {
      if (!blocks[row][col].isOpen) {
        blockChange(row, col, false, true);
      } else return;
    } else {
      if (!isStart) {
        dispatch(START());
        deployBombs(row, col);
      }
      if (!blocks[row][col].isOpen && !blocks[row][col].isFlag) {
        blockChange(row, col, true, false);
      } else return;
    }
    return;
  };

  return (
    <>
      <ReactModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        onAfterClose={() => setModalOpen(false)}
        style={customModalStyles}
      >
        <SuccessModal
          isClose={() => setModalOpen(false)}
          clickCount={clickCount}
        />
      </ReactModal>
      <BoardContainer $row={setting.row} $col={setting.col}>
        {blocks.map((line, row) =>
          line.map((block, col) => (
            <div
              key={`${row}:${col}`}
              onClick={() => {
                if (!isDeath && !isSuccess) handleBlockClick(row, col, false);
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                if (!isDeath && isStart && !isSuccess)
                  handleBlockClick(row, col, true);
              }}
              style={{ cursor: "default" }}
            >
              <Block
                isOpen={block.isOpen}
                isFlag={block.isFlag}
                isBomb={block.isBomb}
                isDeath={isDeath}
                aroundCount={block.aroundCount}
              />
            </div>
          ))
        )}
      </BoardContainer>
    </>
  );
};

export default Board;
