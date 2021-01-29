import React, { useState, useEffect } from "react";
import styled from "styled-components";
import wemeok from "../images/wemeoktalk_2.png";
import { COLORS } from "../styles/themeColor";
import PostReply from "../pages/childComponents/PostReply";
import axios from "axios";
import { boardAPI } from "../config";
import ReactPaginate from "react-paginate";

export default function PostDetail({ match }: any) {
  const [posts, setPosts] = useState<any>([]);
  const [comments, setComments] = useState<any>([]);
  const [content, setContent] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      await axios
        .get(`${boardAPI}/${match.params.id}`, {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then((res) => {
          console.log(res);
          setPosts(res.data.board_info);
          setComments(res.data.board_comments);
        });
    };
    fetchPosts();
  }, []);

  const onChangeComment = (e: any) => {
    setContent(e.target.value);
  };

  let data = {
    comment: content
  };

  const addComment = (): void => {
    axios
      .post(`${boardAPI}/${match.params.id}/comment`, JSON.stringify(data), {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      .then((res) => {
        console.log(res);
        if (content.length >= 1) {
          setComments([...comments, content]);
          setContent("");
        }
      });
  };

  console.log(comments);
  return (
    <Container>
      <Img src={wemeok} alt="" />
      <InnerContainer>
        <ImgText>개발자 공유문화 잊지말자, 그러니까 맛집도 공유하자</ImgText>
        <TitleContainer>
          <TitleText>제목</TitleText>
          <TitleInput>{posts[0]?.title}</TitleInput>
        </TitleContainer>
        <ContentContainer>
          <Writer>{posts[0]?.writer}</Writer>
          <Content>{posts[0]?.content}</Content>
          <Edit>삭제</Edit>
          <Edit>수정</Edit>
        </ContentContainer>
        <ReplyContainer>
          <ReplyText>댓글</ReplyText>
          <ReplyInput value={content} onChange={onChangeComment}></ReplyInput>
          <Button onClick={addComment}>등록</Button>
        </ReplyContainer>
        <PostReply comments={comments}></PostReply>
        <StyledPaginateContainer>
          <ReactPaginate
            pageCount={posts.total_comment}
            pageRangeDisplayed={5}
            marginPagesDisplayed={currentPage}
            previousLabel={"<"}
            nextLabel={">"}
          />
        </StyledPaginateContainer>
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
  padding-bottom: 0.3rem;
  width: 35rem;
  height: 1.5rem;
  border-bottom: 2px solid black;
`;

const TitleText = styled.p`
  width: 2rem;
  height: 1.5rem;
`;

const TitleInput = styled.p`
  margin-left: 1rem;
  width: 33rem;
  height: 1.5rem;
`;

const Writer = styled.div`
  text-align: right;
`;

const ContentContainer = styled.div`
  margin: 2rem 0;
  border-bottom: 2px solid black;
`;

const Content = styled.p`
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

const Edit = styled.button`
  width: 4rem;
  height: 2rem;
  background: ${COLORS.mainYellow};
  float: right;
`;

const StyledPaginateContainer = styled.div`
  ul {
    display: flex;
  }
`;
