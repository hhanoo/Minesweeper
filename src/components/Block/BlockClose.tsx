import React from "react";
import styled from "styled-components";

const Block = styled.div`
  display: flex;
  width: 1.2rem;
  height: 1.2rem;

  background-color: rgb(175, 175, 175);
  border-top: 0.2rem solid #ffffff;
  border-left: 0.2rem solid #ffffff;
  border-right: 0.2rem solid rgb(104, 104, 104);
  border-bottom: 0.2rem solid rgb(104, 104, 104);
`;

const BlockClose = () => {
  return <Block />;
};

export default BlockClose;
