import React, { useState } from "react";
import { COLORS } from "../styles/themeColor";
import { Link, useHistory } from "react-router-dom";
import { API } from "../config";
import wemeok from "../images/wemeoktalk3.png";
import axios from "axios";
import ReactQuill from "react-quill"; // Typescript
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "./PostWriting.scss";

export default function PostWriting() {
  const [title, setTitle] = useState<any>({ newTitle: null });
  const [content, setContent] = useState<any>("");
  const history = useHistory();

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      ["bold", "italic", "underline", "strike"],
      ["clean"]
    ]
  };

  let data = {
    title: title.newTitle,
    content: content
  };

  const uploadData = () => {
    if (title.newTitle === null) {
      alert("제목,내용을 입력해주세요");
    } else {
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
    }
  };

  const createPost = (value: string) => {
    setContent(value);
  };

  return (
    <>
      <div className="postWriting">
        <div className="weMeokTalkLogo">
          <img src={wemeok}></img>
        </div>
        <div className="weMeokTalkList">
          <div className="listDiv">
            <div className="writingTitle">
              <p>제목</p>
              <input
                required
                maxLength={50}
                type="text/html"
                onChange={(e) =>
                  setTitle({ ...title, newTitle: e.target.value })
                }
              />
            </div>
            <div className="solidLine"></div>
            <div className="writingCenter">
              <p className="textBold"> 내용</p>
              <ReactQuill
                bounds={".quill"}
                theme={"snow"}
                value={content}
                onChange={createPost}
                modules={modules}
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
