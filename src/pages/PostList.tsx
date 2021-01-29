import React, { useState, useEffect } from "react";
import Posts from "./childComponents/Posts";
import ReactPaginate from "react-paginate";
import axios from "axios";
import styled from "styled-components";
import wemeok from "../images/wemeoktalk_2.png";
import { COLORS } from "../styles/themeColor";
import { Link } from "react-router-dom";
import { boardAPI } from "../config";

export default function App() {
  const [posts, setPosts] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      await axios
        .get(`${boardAPI}`, {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then((res) => setPosts(res.data.board_list));
    };

    fetchPosts();
  }, []);

  const handlePageChange = (pageNumber: number) => {
    axios
      .get(`${boardAPI}?offset=${(pageNumber - 1) * 5}`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      .then((res) => {
        setPosts(res.data);
      });
    setCurrentPage(pageNumber);
  };

  return (
    <Container>
      <Img src={wemeok} alt="" />
      <InnerContainer>
        <ImgText>개발자 공유문화 잊지말자, 그러니까 맛집도 공유하자</ImgText>
        <Posts posts={posts} />
        <StyledPaginateContainer>
          <ReactPaginate
            pageCount={posts.total_board}
            pageRangeDisplayed={5}
            marginPagesDisplayed={currentPage}
            previousLabel={"<"}
            nextLabel={">"}
          />
        </StyledPaginateContainer>
        <Button>
          <Link to="/post-writing">글 작성</Link>
        </Button>
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

const Button = styled.button`
  width: 4rem;
  height: 2rem;
  background: ${COLORS.mainYellow};
`;

const StyledPaginateContainer = styled.div`
  ul {
    display: flex;
  }
`;
