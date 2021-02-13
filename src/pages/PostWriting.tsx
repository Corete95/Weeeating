import React, { useState } from "react";
import { COLORS } from "../styles/themeColor";
import { Link, useHistory } from "react-router-dom";
import { API } from "../config";
import wemeok from "../images/wemeoktalk_2.png";
import axios from "axios";
import ReactQuill from "react-quill"; // Typescript
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "./PostWriting.scss";

export default function PostWriting() {
  const [title, setTitle] = useState<any>({ newTitle: null });
  const [content, setContent] = useState<any>("");
  const history = useHistory();

  const contentResult = content.replace(/(<([^>]+)>)/gi, "");

  let data = {
    title: title.newTitle,
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

  const createPost = (value: string) => {
    setContent(value);
  };

  return (
    <>
      <div className="postWriting">
        <div className="weMeokTalkLogo">
          <img src={wemeok}></img>
          <p>개발자 공유 문화 잊지 말자. 그러니까 맛집도 공유하자.</p>
        </div>
        <div className="weMeokTalkList">
          <div className="listDiv">
            <div className="writingTitle">
              <p>제목</p>
              <input
                type="text/html"
                onChange={(e) =>
                  setTitle({ ...title, newTitle: e.target.value })
                }
              ></input>
            </div>
            <div className="solidLine"></div>
            <div className="writingCenter">
              <p>내용</p>
              <ReactQuill
                bounds={".quill"}
                theme="snow"
                //value={content}
                onChange={createPost}
              />
            </div>
            <div className="writerButton">
              <button onClick={uploadData}>작성</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
