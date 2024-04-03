import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SETTING } from "../../modules/game";
import ReactModal from "react-modal";

import styled from "styled-components";

import { ReactComponent as Check } from "../../assets/check.svg";
import { CustomModal } from "../Modal";
import { RESET } from "../../modules/status";

const HeaderContainer = styled.div`
  position: relative;
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const Menu = styled.div<{ $menuVisible: boolean }>`
  position: absolute;
  top: 3.5rem;
  left: 0.5rem;
  z-index: 100;

  visibility: ${(props) => (props.$menuVisible ? "menuVisible" : "hidden")};

  background-color: rgb(175, 175, 175);
  border-top: 0.2rem solid rgb(109, 109, 109);
  border-left: 0.2rem solid rgb(109, 109, 109);
  border-right: 0.2rem solid rgb(33, 33, 33);
  border-bottom: 0.2rem solid rgb(33, 33, 33);

  padding: 0.5rem;
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: default;
`;

const ItemText = styled.div`
  flex-grow: 1;
`;

const customModalStyles = {
  overlay: {
    backgroundColor: "black",
  },
  content: {
    width: "30rem",
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

const Header = () => {
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [select, setSelected] = useState(0);

  ReactModal.setAppElement("#root");

  useEffect(() => {
    switch (select) {
      case 0:
        setMenuVisible(false);
        dispatch(SETTING({ row: 8, col: 8, bomb: 10 }));
        dispatch(RESET());
        break;
      case 1:
        setMenuVisible(false);
        dispatch(SETTING({ row: 16, col: 16, bomb: 40 }));
        dispatch(RESET());
        break;
      case 2:
        setMenuVisible(false);
        dispatch(SETTING({ row: 16, col: 32, bomb: 100 }));
        dispatch(RESET());
        break;
      case 3:
        break;
      default:
        break;
    }
  }, [select]);

  return (
    <>
      <ReactModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        onAfterClose={() => setModalOpen(false)}
        style={customModalStyles}
      >
        <CustomModal isClose={() => setModalOpen(false)} />
      </ReactModal>
      <HeaderContainer>
        <div
          style={{ display: "inline-block", cursor: "pointer" }}
          onClick={() => setMenuVisible(!menuVisible)}
        >
          Game
        </div>
        <Menu $menuVisible={menuVisible}>
          <Item>
            <Check
              style={{
                width: "1.5rem",
                visibility: `${menuVisible && select === 0 ? "visible" : "collapse"}`,
                paddingRight: "0.5rem",
              }}
            />
            <ItemText onClick={() => setSelected(0)}>Beginner</ItemText>
          </Item>
          <Item>
            <Check
              style={{
                width: "1.5rem",
                visibility: `${menuVisible && select === 1 ? "visible" : "collapse"}`,
                paddingRight: "0.5rem",
              }}
            />
            <ItemText onClick={() => setSelected(1)}>Intermediate</ItemText>
          </Item>
          <Item>
            <Check
              style={{
                width: "1.5rem",
                visibility: `${menuVisible && select === 2 ? "visible" : "collapse"}`,
                paddingRight: "0.5rem",
              }}
            />
            <ItemText onClick={() => setSelected(2)}>Expert</ItemText>
          </Item>
          <Item>
            <Check
              style={{
                width: "1.5rem",
                visibility: `${menuVisible && select === 3 ? "visible" : "collapse"}`,
                paddingRight: "0.5rem",
              }}
            />
            <ItemText
              onClick={() => {
                setMenuVisible(false);
                setModalOpen(true);
              }}
            >
              Custom
            </ItemText>
          </Item>
        </Menu>
      </HeaderContainer>
    </>
  );
};

export default Header;
