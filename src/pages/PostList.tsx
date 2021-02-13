import React, { useState, useEffect } from "react";
import Posts from "./childComponents/Posts";
import Pagination from "react-js-pagination";
import axios from "axios";
import wemeok from "../images/wemeoktalk_2.png";
import { Link, useHistory } from "react-router-dom";
import { API } from "../config";
import "./PostList.scss";

interface PostData {
  posts: any;
}
export default function App() {
  const [posts, setPosts] = useState<PostData | any>([]);
  const [activePage, setActivePage] = useState<any>(1);
  const history = useHistory();
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
  console.log(posts);

  return (
    <>
      <div className="postList">
        <div className="weMeokTalkLogo">
          <img src={wemeok}></img>
          <p>개발자 공유 문화 잊지 말자. 그러니까 맛집도 공유하자.</p>
        </div>
        <div className="weMeokTalkList">
          <div className="listDiv">
            <div className="listTitleBold">
              <p className="titleBold">제목</p>
              <p className="writerBold">작성자</p>
              <p className="createdAtBold">등록일</p>
              <p className="commentsBold">댓글</p>
            </div>
            <div className="listSolidBold"></div>
            {posts.board_list?.map((post: any) => {
              return (
                <Posts
                  id={post.id}
                  title={post.title}
                  writer={post.writer}
                  created_at={post.created_at}
                  comments={post.comments}
                />
              );
            })}
            <div className="writerButton">
              <button onClick={() => history.push("./post-writing")}>
                글쓰기
              </button>
            </div>
            <Pagination
              activePage={activePage}
              itemsCountPerPage={5}
              totalItemsCount={posts.total_board}
              pageRangeDisplayed={5}
              hideFirstLastPages
              itemClassPrev={"prevPageText"}
              itemClassNext={"nextPageText"}
              prevPageText={"◀"}
              nextPageText={"▶"}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}
