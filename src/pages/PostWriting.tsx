import React, { useState } from "react";
import styled from "styled-components";
import wemeok from "../images/wemeoktalk_2.png";
import { COLORS } from "../styles/themeColor";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { API } from "../config";
import ReactQuill from "react-quill"; // Typescript
import "react-quill/dist/quill.snow.css";

export default function PostWriting() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const history = useHistory();

  const contentResult = content.replace(/(<([^>]+)>)/gi, "")

  let data = {
    title: title,
    content: contentResult
  };

  const uploadData = () => {
    axios
      .post(`${API}/board`, JSON.stringify(data), {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": `application/json`
        }
      })
      .then((res) => {
        history.push("/post-list");
      });
  };

  const createPost = (value:string) => {    
      setContent(value);
  };
  
  console.log(contentResult)
  return (
    <>
      <Container>
        <Img src={wemeok} alt="" />
        <InnerContainer>
          <ImgText>개발자 공유문화 잊지말자, 그러니까 맛집도 공유하자</ImgText>
          <TitleContainer>
            <TitleText>제목</TitleText>
            <TitleInput
              type="text/html"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목"
            ></TitleInput>
          </TitleContainer>
          <ContentContainer>
            <TitleText>내용</TitleText>
            <QuillContainer>
              <ReactQuill value={content} onChange={createPost} />
            </QuillContainer>
          </ContentContainer>
          <Button onClick={uploadData}>
            <Link to="/post-writing">작성</Link>
          </Button>
        </InnerContainer>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
  width: 45.2rem;
  border: 4px solid ${COLORS.mainYellow};
  height:30rem;
`;

const Img = styled.img`
  position: relative;
  top: 1rem;
  margin: 5rem 3.3rem 0 0;
  width:49rem;
`;

const ImgText = styled.p`
  position: absolute;
  top: 13rem;
  z-index: 10;
  font-size: 2rem;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 1.5rem;
  width: 35rem;
`;

const TitleText = styled.p`
  width: 4rem;
  height: 1.5rem;
`;

const TitleInput = styled.input`
  margin-left: 1rem;
  width: 35rem;
  height: 1.5rem;
`;

const ContentContainer = styled.div`
  margin-top: 2rem;
  width:35rem;
`;

const Button = styled.button`
  width: 4rem;
  height: 2rem;
  background: ${COLORS.mainYellow};
`;

const QuillContainer = styled.div`
  height: 15rem;

  .quill {
    height: 10rem;
  }
`;
