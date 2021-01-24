import React, { useState, useEffect } from "react";
import styled from "styled-components";
import wemeok from "../images/wemeoktalk_2.png";
import { COLORS } from "../styles/themeColor"; /* 
import PostReply from "../pages/childComponents/PostReply"; */
import Posts from "./childComponents/Posts";
import Pagination from "./childComponents/Pagination";
import axios from "axios";

export default function PostDetail() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setPosts(res.data);
      setLoading(false);
      console.log(res.data);
    };

    fetchPosts();
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber: React.SetStateAction<number>) =>
    setCurrentPage(pageNumber);

  return (
    <Container>
      <Img src={wemeok} alt="" />
      <InnerContainer>
        <ImgText>개발자 공유문화 잊지말자, 그러니까 맛집도 공유하자</ImgText>
        <TitleContainer>
          <TitleText>제목</TitleText>
          <TitleInput></TitleInput>
        </TitleContainer>
        <ContentContainer>
          <Writer>이름 | 날짜</Writer>
          <TitleText>내용</TitleText>
          <Content></Content>
        </ContentContainer>
        <ReplyContainer>
          <ReplyText>댓글</ReplyText>
          <ReplyInput></ReplyInput>
        </ReplyContainer>
        {/* <PostReply></PostReply> */}
        <Posts posts={currentPosts} loading={loading} />
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <Button>작성</Button>
      </InnerContainer>
    </Container>
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
`;

const Img = styled.img`
  position: relative;
  top: 1rem;
  margin: 5rem 3.3rem 0 0;
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

const TitleText = styled.p``;

const TitleInput = styled.input`
  margin-left: 1rem;
  width: 35rem;
  height: 1.5rem;
`;

const Writer = styled.div``;

const ContentContainer = styled.div`
  margin-top: 2rem;
`;

const Content = styled.input`
  width: 36rem;
  height: 20rem;
`;

const ReplyContainer = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 1.5rem;
  width: 35rem;
`;

const ReplyText = styled.p``;
const ReplyInput = styled.input`
  margin-left: 1rem;
  width: 35rem;
  height: 1.5rem;
`;

const Button = styled.button`
  width: 4rem;
  height: 2rem;
  background: ${COLORS.mainYellow};
`;
