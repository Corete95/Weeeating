import React, { useState, useEffect } from "react";
import Posts from "./childComponents/Posts";
import Pagination from "react-js-pagination";
import axios from "axios";
import wemeok from "../images/wemeoktalk3.png";
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
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
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
  const loginCheck = () => {
    if (localStorage.getItem("token")) {
      history.push("./post-writing");
    } else {
      alert("로그인을 해주세요!");
    }
  };
  console.log("1", posts);
  return (
    <>
      <div className="postList">
        <div className="weMeokTalkLogo">
          <img src={wemeok}></img>
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
              <button onClick={loginCheck}>글쓰기</button>
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
