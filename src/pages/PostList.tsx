import React, { useState, useEffect } from "react";
import Posts from "./childComponents/Posts";
import Pagination from "react-js-pagination";
import axios from "axios";
import styled from "styled-components";
import wemeok from "../images/wemeoktalk_2.png";
import { COLORS } from "../styles/themeColor";
import { Link } from "react-router-dom";
import { API } from "../config";

export default function App() {
  const [posts, setPosts] = useState<any>([]);
  const [activePage, setActivePage] = useState<any>(1);

  useEffect(() => {
    const fetchPosts = async () => {
      await axios
        .get(`${API}/board`, {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then((res) => {
          setPosts(res.data);
        })
        .catch(function (error) {
          if (error.response) {
            // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // 요청이 이루어 졌으나 응답을 받지 못했습니다.
            // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
            // Node.js의 http.ClientRequest 인스턴스입니다.
            console.log(error.request);
          } else {
            // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    };
    fetchPosts();
  }, []);

  const handlePageChange = (pageNumber: any) => {
    axios
      .get(`${API}/board?offset=${(pageNumber - 1) * 5}`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      .then((res) => {
        setPosts(res.data);
      });
    setActivePage(pageNumber);
  };

  return (
    <Container>
      <Img src={wemeok} alt="" />
      <InnerContainer>
        <ImgText>개발자 공유문화 잊지말자, 그러니까 맛집도 공유하자</ImgText>
        <Posts posts={posts} />
        <StyledPaginateContainer>
          <Pagination
            activePage={activePage}
            itemsCountPerPage={5}
            totalItemsCount={posts.total_board}
            pageRangeDisplayed={5}
            hideFirstLastPages
            itemClassPrev={"prevPageText"}
            itemClassNext={"nextPageText"}
            prevPageText={"<<"}
            nextPageText={">>"}
            onChange={handlePageChange}
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
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2em;
  width: 45.2rem;
  border: 4px solid ${COLORS.mainYellow};
  height:30rem
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

const Button = styled.button`
  position: relative;
  bottom: 1rem;
  left: 15rem;
  width: 5rem;
  height: 2.5rem;
  background: ${COLORS.mainYellow};

`;

const StyledPaginateContainer = styled.div`
  ul {
    display: flex;
    margin: 1em;

    li {
      padding: .5em;
    }
  }
`;
