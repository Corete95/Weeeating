import React from "react";
import styled from "styled-components";
import wemeok from "../images/wemeoktalk_2.png";

export default function PostDetail() {
  return (
    <>
      <Img src={wemeok} alt="" />
    </>
  );
}

const Img = styled.img`
  margin-top: 5rem;
`;
