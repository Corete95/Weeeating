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
          <StoreTitle>할머니 떡볶이</StoreTitle>
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
            <IoIosHeartEmpty />
            100명의 위코더가 좋아해요 :-)
          </Liked>
        </StoreDesc>
      </DescSection>
      <MapSection>
        <Map id="map" style={{ width: "43.52rem", height: "25rem" }}></Map>
      </MapSection>
      <CommentSection>댓글</CommentSection>
    </Container>
  );
}

const Container = styled.div`
  border: 1px solid black;
  margin: 10rem 5rem;
`;

const DescSection = styled.div`
  display: flex;
  flex-direction: row;
`;

const StoreDesc = styled.div`
  margin-left: 2rem;
`;

const StoreTitle = styled.header``;

const Desc = styled.article`
  width: 15rem;
  height: 10rem;
  overflow-y: scroll;
  overflow-x: hidden;
  border-top: 1px solid ${({ theme }) => theme.borderGray};
  border-bottom: 1px solid ${({ theme }) => theme.borderGray};
`;

const Liked = styled.p``;

const MapSection = styled.div`
  margin-top: 4rem;
`;

const Map = styled.div`
  border: 2px solid ${({ theme }) => theme.borderGray};
`;

const CommentSection = styled.div``;
