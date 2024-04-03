import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../modules";
import { RESET } from "../../modules/status";

import styled from "styled-components";

import { ReactComponent as Death } from "../../assets/dissatisfied.svg";
import { ReactComponent as DeathFill } from "../../assets/dissatisfied_fill.svg";
import { ReactComponent as Smile } from "../../assets/smile.svg";
import { ReactComponent as SmileFill } from "../../assets/smile_fill.svg";
import { ReactComponent as Satisfied } from "../../assets/satisfied.svg";
import { ReactComponent as SatisfiedFill } from "../../assets/satisfied_fill.svg";
import { BEST_TIME, DURING_TIME } from "../../modules/game";

const ResetTimerContainer = styled.div`
  display: flex;
  height: 3rem;
  align-items: center;
  justify-content: space-between;

  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;

  background-color: rgb(175, 175, 175);
  border-top: 0.2rem solid rgb(104, 104, 104);
  border-left: 0.2rem solid rgb(104, 104, 104);
  border-right: 0.2rem solid #ffffff;
  border-bottom: 0.2rem solid #ffffff;
`;

const ResetButton = styled.div`
  position: relative;
  width: 2.5rem;
  height: 2.5rem;

  background-color: rgb(175, 175, 175);
  border-top: 0.2rem solid #ffffff;
  border-left: 0.2rem solid #ffffff;
  border-right: 0.2rem solid rgb(104, 104, 104);
  border-bottom: 0.2rem solid rgb(104, 104, 104);
`;

const NumberLetter = styled.div`
  width: 1.4rem;

  background-color: black;
  padding: 0 0.1rem;

  font-size: 2rem;
  font-weight: 800;
  color: rgb(238, 0, 9);
  text-align: center;
`;

const ResetTimer = () => {
  const dispatch = useDispatch();

  const [remain, setRemain] = useState<string[]>(["0", "0", "0"]);
  const [time, setTime] = useState<number>(0);

  const bestTime = useSelector(
    (state: RootState) => state.gameSetting.bestTime
  );
  const isStatus = useSelector((state: RootState) => state.gameStatus.isStatus);
  const isReset = useSelector((state: RootState) => state.gameStatus.isReset);
  const isStart = useSelector((state: RootState) => state.gameStatus.isStart);
  const isDeath = useSelector((state: RootState) => state.gameStatus.isDeath);
  const isSuccess = useSelector(
    (state: RootState) => state.gameStatus.isSuccess
  );

  useEffect(() => {
    if (isStart) {
      const timerId = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 999 || isDeath || isSuccess) {
            if (isSuccess) {
              if (prevTime < bestTime) dispatch(BEST_TIME(prevTime));
              dispatch(DURING_TIME(prevTime));
            }
            clearInterval(timerId);
            return prevTime;
          }
          return prevTime + 1;
        });
      }, 1000);
      return () => clearInterval(timerId);
    } else {
      setTime(0);
    }
    if (isReset) setTime(0);
  }, [isStart, isReset, isDeath, isSuccess]);

  useEffect(() => {
    setRemain(isStatus.toString().padStart(3, "0").split(""));
  }, [isStatus]);

  return (
    <ResetTimerContainer>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexBasis: "35%",
        }}
      >
        {remain.map((num, index) => {
          return <NumberLetter key={`remain_${index}`}>{num}</NumberLetter>;
        })}
      </div>
      <ResetButton onClick={() => isStart && dispatch(RESET())}>
        {isDeath ? (
          <>
            <Death style={{ position: "absolute", fill: "black" }} />
            <DeathFill style={{ position: "absolute", fill: "yellow" }} />
          </>
        ) : isSuccess ? (
          <>
            <Satisfied style={{ position: "absolute", fill: "black" }} />
            <SatisfiedFill style={{ position: "absolute", fill: "yellow" }} />
          </>
        ) : (
          <>
            <Smile style={{ position: "absolute", fill: "black" }} />
            <SmileFill style={{ position: "absolute", fill: "yellow" }} />
          </>
        )}
      </ResetButton>
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          flexBasis: "35%",
        }}
      >
        <>
          {time
            .toString()
            .padStart(3, "0")
            .split("")
            .reverse()
            .map((num, index) => {
              return <NumberLetter key={`time_${index}`}>{num}</NumberLetter>;
            })}
        </>
      </div>
    </ResetTimerContainer>
  );
};

export default ResetTimer;
