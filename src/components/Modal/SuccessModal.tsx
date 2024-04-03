import React from "react";
import { RootState } from "../../modules";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const CloseBtn = styled.button`
  background-color: black;
  border: none;
  border-radius: 0.5rem;
  color: white;
  cursor: pointer;
`;

const SettingContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem 0 0 0;
  font-size: 1.6rem;
  margin-bottom: 1rem;
`;

interface CustomModalProps {
  isClose: () => void;
  clickCount: number;
}

const SuccessModal = ({ isClose, clickCount }: CustomModalProps) => {
  const bestTime = useSelector(
    (state: RootState) => state.gameSetting.bestTime
  );
  const duringTime = useSelector(
    (state: RootState) => state.gameSetting.duringTime
  );

  return (
    <Container>
      <Title>
        <b>SUCCESS!</b>
        <CloseBtn onClick={isClose}>Close</CloseBtn>
      </Title>
      <SettingContainer>
        Congratulations on winning Minesweeper
      </SettingContainer>
      <SettingContainer>Game time: {duringTime} seconds</SettingContainer>
      <SettingContainer style={{ marginBottom: "-0.5rem" }}>
        Your best time is: {bestTime} seconds
      </SettingContainer>
      <SettingContainer style={{ marginBottom: "0" }}>
        Number of clicks was: {clickCount}
      </SettingContainer>
    </Container>
  );
};

export default SuccessModal;
