import React from "react";
import styled from "styled-components";
import wemeok from "../images/wemeoktalk_2.png";

export default function PostWriting() {
  return (
    <Container>
      <Img src={wemeok} alt="" />
      <Title>
        <span>제목</span>
        <input />
      </Title>
      <Content>
        <span>내용</span>
        <textarea></textarea>
      </Content>
      <Attachments>
        <span>첨부파일</span>
        <input disabled />
      </Attachments>
    </Container>
  );
}

const Container = styled.div`
  border: 1px solid black;
`;

const Img = styled.img`
  margin-top: 5rem;
`;

const Title = styled.div`
  display: flex;

  input {
    width: 100%;
    background: lightgray;
  }
`;

const Content = styled.div`
  display: flex;
  margin-top: 5rem;

  textarea {
    width: 100%;
    height: 100%;
    background: lightgray;
  }
`;

const Attachments = styled.div`
  input {
    width: 100%;
    background: lightgray;
  }
`;
