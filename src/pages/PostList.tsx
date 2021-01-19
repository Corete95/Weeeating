import React, { useState, useEffect } from "react";
import axios from "axios";
import { boardAPI } from "../config";
import styled from "styled-components";

export default function PostList() {
  interface PostListData {
    id: number;
    title: string;
    writer: string;
    registrationData: string;
    comments: number;
  }
  const [boardDatas, setBoardDatas] = useState<PostListData[]>([]);

  useEffect(() => {
    axios.get(boardAPI).then((res) => setBoardDatas(res.data));
  });
  return (
    <div>
      <ul>
        <Title>
          <li>제목</li>
          <li>작성자</li>
          <li>등록일</li>
          <li>댓글</li>
        </Title>
        {boardDatas?.slice(0, 5).map((list) => {
          return (
            <Content>
              <li>{list.title}</li>
              <li>{list.writer}</li>
              <li>{list.registrationData}</li>
              <li>{list.comments}</li>
            </Content>
          );
        })}
      </ul>
    </div>
  );
}

const Title = styled.div`
  display: flex;
`;

const Content = styled.div`
  display: flex;
`;
