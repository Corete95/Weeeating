import React, { useEffect } from "react";
import styled from "styled-components";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
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

    var callback = (result: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        console.log(result);
        var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
        var marker = new window.kakao.maps.Marker({
          map: map,
          position: coords
        });
        var infowindow = new window.kakao.maps.InfoWindow({
          content: `<div style="width:150px;text-align:center;padding:6px 0;"><div style="font-weight: bold;">"위코드"</div><div>"국내 최고 부트캠프"</div></div>`
        });
        infowindow.open(map, marker);
        map.setCenter(coords);
      }
      if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        console.log("카카오맵의 검색 결과가 없습니다.");
      }
      if (status === window.kakao.maps.services.Status.ERROR) {
        console.log("카카오맵 서버 응답에 문제가 있습니다.");
      }
    };

    // 주소-좌표간 변환 서비스 객체 생성: 번지나 도로명 주소가 필요함. 정확도 높음
    /*
    var geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch("서울특별시 강남구 테헤란로 427", callback);
    */

    // 입력한 키워드로 검색: 검색할 키워드 필요. 매장이름 중복될 시 정확도 낮음. 그러나 주소 크롤링 과정이 생략되어 편리하기도 함.
    var places = new window.kakao.maps.services.Places();
    places.keywordSearch("wecode", callback);
  }, []);

  const handleDragStart = (e: any) => e.preventDefault();

  const items = [
    <img
      src="https://dimg.donga.com/a/500/0/90/5/ugc/CDB/29STREET/Article/5e/b2/04/e8/5eb204e81752d2738236.jpg"
      onDragStart={handleDragStart}
      className="food"
    />,
    <img
      src="https://dimg.donga.com/a/500/0/90/5/ugc/CDB/29STREET/Article/5e/b2/04/e8/5eb204e81752d2738236.jpg"
      onDragStart={handleDragStart}
      className="food"
    />,
    <img
      src="https://dimg.donga.com/a/500/0/90/5/ugc/CDB/29STREET/Article/5e/b2/04/e8/5eb204e81752d2738236.jpg"
      onDragStart={handleDragStart}
      className="food"
    />
  ];

  return (
    <Container>
      <DescSection>
        <Images>
          <AliceCarousel
            mouseTracking
            infinite
            autoPlay
            animationDuration={1400}
            items={items}
          />
        </Images>
        <StoreDesc>
          <StoreTitle>
            <DecoTitle>"</DecoTitle>
            <Title>할머니 떡볶이</Title>
            <DecoTitle>"</DecoTitle>
          </StoreTitle>
          <Desc>
            <div className="deli">배달 가능 맛집 🛵</div>
            겨울엔 방어가 제철이지 진짜 쫀맛탱인데 이걸 말로 어떻게 설명해야할지
            모르겠네 나도 26년만에 먹어봤는데 진짜로 맛있어여 진짜로 맛있으니까
            다들 꼭 먹어줘 … 겨울엔 방어가 제철이지 진짜 쫀맛탱인데 이걸 말로
            어떻게 설명해야할지 모르겠네 나도 26년만에 먹어봤는데 진짜로
            맛있어여 진짜로 맛있으니까 다들 꼭 먹어줘 …
          </Desc>
          <Liked>
            <IoIosHeartEmpty id="icon" />
            <span className="amount">100</span>
            명의 위코더가 좋아해요 :-)
          </Liked>
        </StoreDesc>
      </DescSection>
      <MapSection>
        <Map id="map" style={{ width: "65rem", height: "28rem" }}></Map>
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
            <div className="right">
              <Content>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laborum, labore quas quis optio suscipit voluptatum? Et a est in
                ratione. Provident expedita eveniet vero quae dolores minus sint
                commodi fuga.
              </Content>
              <UploadTime>(2021.01.22 3:10)</UploadTime>
            </div>
          </Comment>
        </CommentsWrapper>
      </CommentSection>
    </Container>
  );
}

const Container = styled.div`
  margin: 10rem auto;
  width: 65rem;
`;

const DescSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Images = styled.div`
  width: 28rem;

  .food {
    width: 28rem;
    height: 28rem;
    border: 2px solid ${({ theme }) => theme.borderGray};
  }
`;

const StoreDesc = styled.div`
  width: 32rem;
`;

const StoreTitle = styled.div`
  font-size: 2.3rem;
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
  font-size: 1.1rem;
  padding: 1.5rem 0.7rem;
  width: 100%;
  height: 23.8rem;
  overflow-y: scroll;
  overflow-x: hidden;
  border-top: 1px solid ${({ theme }) => theme.borderGray};
  border-bottom: 1px solid ${({ theme }) => theme.borderGray};
  letter-spacing: 0.1rem;
  word-spacing: 0.1rem;
  line-height: 1.7rem;

  .deli {
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 1rem;
  }
`;

const Liked = styled.p`
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

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

const CommentSection = styled.div`
  width: 65rem;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1.3rem;
`;

const CommentDesc = styled.span`
  width: 5.5rem;
  margin-right: 1rem;
  font-size: 1.5rem;
`;

const CommentInput = styled.form`
  position: relative;
`;

const Input = styled.input`
  padding: 0.5rem;
  outline: none;
  width: 59.5rem;
`;

const SubmitBtn = styled.span`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
`;

const CommentsWrapper = styled.ul``;

const Comment = styled.li`
  display: flex;
  flex-direction: row;
  margin-bottom: 0.7rem;

  .right {
    width: 59.5rem;
    line-height: 1.4rem;
  }
`;

const User = styled.span`
  width: 5.5rem;
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
