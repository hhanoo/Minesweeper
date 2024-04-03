import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { SETTING } from "../../modules/game";
import { RESET } from "../../modules/status";

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
  padding: 1rem 0 0 2rem;
`;

const Setting = styled.div`
  font-size: 1.6rem;
  width: 60%;
`;

const InputContainer = styled.input`
  width: 5rem;
  height: 1.5rem;
`;

const AcceptBtn = styled.button`
  width: 5rem;
  height: 2rem;
  margin: 2rem auto 0 auto;

  background-color: black;
  border: none;
  border-radius: 0.5rem;
  color: white;
  cursor: pointer;
`;

interface CustomModalProps {
  isClose: () => void;
}

const CustomModal = ({ isClose }: CustomModalProps) => {
  const dispatch = useDispatch();

  const [weight, setWeight] = useState(10);
  const [height, setHeight] = useState(10);
  const [bomb, setBomb] = useState(10);

  const handleRange = (isWeight: boolean, count: number) => {
    if (isWeight) {
      if (7 < count && count < 101) return setWeight(count);
      else return setWeight(weight);
    } else {
      if (7 < count && count < 101) return setHeight(count);
      else return setHeight(height);
    }
  };

  const handleBomb = (count: number) => {
    const maxBomb = Math.floor((weight * height) / 3);
    if (0 < count && count < maxBomb) return setBomb(count);
    else return setBomb(maxBomb);
  };

  const handleAccept = () => {
    dispatch(SETTING({ row: height, col: weight, bomb: bomb }));
    dispatch(RESET());
    isClose();
  };

  return (
    <Container>
      <Title>
        Custom Game Setup
        <CloseBtn onClick={isClose}>Close</CloseBtn>
      </Title>
      <SettingContainer>
        <Setting>Game Width:</Setting>
        <InputContainer
          type="number"
          min="8"
          max="100"
          value={weight}
          onChange={(e) => handleRange(true, Number(e.target.value))}
        />
      </SettingContainer>
      <SettingContainer>
        <Setting>Game Height:</Setting>
        <InputContainer
          type="number"
          min="8"
          max="100"
          value={height}
          onChange={(e) => handleRange(false, Number(e.target.value))}
        />
      </SettingContainer>
      <SettingContainer>
        <Setting>Number of Bombs:</Setting>
        <InputContainer
          type="number"
          min="1"
          max={`${Math.floor((weight * height) / 3)}`}
          value={bomb}
          onChange={(e) => handleBomb(Number(e.target.value))}
        />
      </SettingContainer>
      <AcceptBtn onClick={() => handleAccept()}>확인</AcceptBtn>
    </Container>
  );
};

export default CustomModal;
