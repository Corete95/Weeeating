import React, { useEffect } from "react";
import styled from "styled-components";
import { mixin } from "../styles";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function StoreDetail() {
  useEffect(() => {
    let container = document.getElementById("map");
    let options = {
      center: new window.kakao.maps.LatLng(
        37.506505288645876,
        127.05406759771054
      ),
      level: 3
    };

    let map = new window.kakao.maps.Map(container, options);
  }, []);

  return (
    <Container>
      <DescSection>
        <img
          src="https://dimg.donga.com/a/500/0/90/5/ugc/CDB/29STREET/Article/5e/b2/04/e8/5eb204e81752d2738236.jpg"
          width="300"
          height="300"
        />
        <StoreDesc>
          <StoreTitle>
            <DecoTitle>"</DecoTitle>
            <Title>할머니 떡볶이</Title>
            <DecoTitle>"</DecoTitle>
          </StoreTitle>
          <Desc>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus sit
            unde est nulla in dolore deleniti rerum dolor sapiente architecto,
            vel labore aut nisi soluta veritatis quaerat libero reiciendis illo?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
            doloribus fugiat maiores rem corrupti! Quam soluta laboriosam
            voluptate distinctio, odio odit nemo voluptas velit, sapiente minima
            ducimus itaque amet quis.
          </Desc>
          <Liked>
            <IoIosHeartEmpty id="icon" />
            <span className="amount">100</span>
            명의 위코더가 좋아해요 :-)
          </Liked>
        </StoreDesc>
      </DescSection>
      <MapSection>
        <Map id="map" style={{ width: "70rem", height: "25rem" }}></Map>
      </MapSection>
      <hr style={{ margin: "2rem 0" }}></hr>
      <CommentSection>
        <InputWrapper>
          <CommentDesc>댓글 입력</CommentDesc>
          <CommentInput>
            <Input placeholder="여러분의 이야기를 남겨주세요 !" />
            <SubmitBtn>확인</SubmitBtn>
          </CommentInput>
        </InputWrapper>
        <CommentsWrapper>
          <Comment>
            <User>13기_백은진</User>
            <Content>떡볶이 너무 먹고싶다...</Content>
            <UploadTime>(2021.01.22 3:10)</UploadTime>
          </Comment>
          <Comment>
            <User>13기_백은진</User>
            <Content>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum,
              labore quas quis optio suscipit voluptatum? Et a est in ratione.
              Provident expedita eveniet vero quae dolores minus sint commodi
              fuga.
            </Content>
            <UploadTime>(2021.01.22 3:10)</UploadTime>
          </Comment>
        </CommentsWrapper>
      </CommentSection>
    </Container>
  );
}

const Container = styled.div`
  margin: 10rem auto;
  width: 70rem;
`;

const DescSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StoreDesc = styled.div``;

const StoreTitle = styled.div`
  font-size: 2rem;
  margin: 1rem 0;
  display: flex;
  justify-content: center;
`;

const Title = styled.header`
  display: inline;
`;

const DecoTitle = styled.span`
  margin: 0 1rem;
`;

const Desc = styled.article`
  padding: 1.5rem 0.7rem;
  width: 20rem;
  height: 10rem;
  overflow-y: scroll;
  overflow-x: hidden;
  border-top: 1px solid ${({ theme }) => theme.borderGray};
  border-bottom: 1px solid ${({ theme }) => theme.borderGray};
`;

const Liked = styled.p`
  margin-top: 1.5rem;
  display: flex;
  align-items: center;

  #icon {
    font-size: 2.2rem;
  }

  .amount {
    font-size: 2rem;
    font-weight: 900;
    margin: 0 0.6rem 0 1rem;
  }
`;

const MapSection = styled.div`
  margin-top: 4rem;
`;

const Map = styled.div`
  border: 2px solid ${({ theme }) => theme.borderGray};
`;

const CommentSection = styled.div``;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1.3rem;
`;

const CommentDesc = styled.span`
  margin-right: 1rem;
`;

const CommentInput = styled.form`
  position: relative;
`;

const Input = styled.input`
  padding: 0.5rem;
  outline: none;
  width: 39.65rem;
`;

const SubmitBtn = styled.span`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
`;

const CommentsWrapper = styled.ul`
  margin-left: 1rem;
`;

const Comment = styled.li`
  margin-bottom: 0.7rem;
`;

const User = styled.span`
  font-weight: 900;
  border-right: 1px solid ${({ theme }) => theme.borderGray};
  padding-right: 1rem;
  margin-right: 1rem;
`;

const Content = styled.p`
  display: inline;
  margin-right: 1rem;
`;

const UploadTime = styled.span``;
