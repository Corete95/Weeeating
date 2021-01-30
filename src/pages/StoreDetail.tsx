import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { BEAPI } from "../config";
import { mixin } from "../styles";
import { EditCommentModal, DeleteCommentModal } from "../components";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";

declare global {
  interface Window {
    kakao: any;
  }
}

interface UserData {
  info: any;
  items: any[];
}

export default function StoreDetail(props: any) {
  const [info, setInfo] = useState<UserData | any>({
    store_info: [
      {
        name: "본죽",
        description:
          "관에 들어가기 전에 염라대왕이 너는 무엇이 먹고 싶으냐고 물으면 주저없이 호박죽이옵니다라고 대답할만큼 죽은 몸에 좋고 맛도 좋은~~~ 죽 최고! 속이 불편하면 코드치기 힘드니까 가볍게 가볍게 먹기 좋아요~~~~",
        delivery: true,
        address: "서울 강남구 선릉로 424 2층"
      }
    ],
    like_count: 0,
    like: false,
    store_images: [
      "https://images.unsplash.com/photo-1607434472257-d9f8e57a643d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1952&q=80"
    ]
  });
  const [currentComment, setCurrentComment] = useState<UserData | any>();
  const [address, setAddress] = useState("");
  const [items, setItems] = useState<UserData | any[]>([]);
  const [like, setLike] = useState(false);
  const [commentText, setCommentText] = useState({
    newComment: null,
    updatedComment: { id: null, content: "기존댓글~~~" }
  });
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  console.log("items", items);

  // const userVerified = info.user.id === localStorage.getItem.user.id;

  useEffect(() => {
    axios
      .all([
        axios.get(`${BEAPI}/store/detail/${props.match.params.id}`),
        axios.get(`${BEAPI}/store/detail/${props.match.params.id}/comment`)
      ])
      .then(
        axios.spread((res1, res2) => {
          setInfo(res1.data);
          setAddress(res1.data.store_info[0].address);
          console.log("res2", res2);
        })
      )
      .catch((err) => console.log("Catched erros!! >>>", err));
  }, [props.match.params.id]);

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

    let callback = (result: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        console.log(result);
        let coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
        let marker = new window.kakao.maps.Marker({
          map: map,
          position: coords
        });
        let infowindow = (info: any) =>
          new window.kakao.maps.InfoWindow({
            content: `<div style="width:10rem;height:2.5rem;display:flex;justify-content:center;align-items:center;padding:6px 0;"><div style="font-weight: bold;">"${info.store_info[0].name}"</div></div>`
          });
        infowindow(info).open(map, marker);
        map.setCenter(coords);
      }
      if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        console.log("카카오맵의 검색 결과가 없습니다.");
      }
      if (status === window.kakao.maps.services.Status.ERROR) {
        console.log("카카오맵 서버 응답에 문제가 있습니다.");
      }
    };

    let geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(info.store_info[0]?.address, callback);
  }, [info]);

  const changeLikedState = () => {
    setInfo({
      ...info,
      like_count: Number(
        info.like === false ? info.like_count + 1 : info.like_count - 1
      ),
      like: !info.like
    });

    // 맛집좋아요 - POST 10.58.0.152:8000/store/like/<store_id></store_id>
    axios
      .post(`${BEAPI}/store/like/${props.match.params.id}`)
      .then((res) => console.log("좋아요 통신이 완료되었습니다.", res))
      .catch((err) => console.log("좋아요 통신이 완료되지 않았습니다.", err));
    // setInfo 안에 있는 like boolean 값을 변경해야함
    // setTimeout(
    //   // 유저가 계속 하트 클릭할 경우 대비해서, 1초 뒤 통신하도록 설정함.
    //   axios.patch(`BEAPI${}`)
    //     .then(res => console.log("좋아요 통신이 완료되었습니다.", res));
    //     .catch(err => console.log("좋아요 통신이 완료되지 않았습니다.", err))
    // , 1000)
  };

  const submitChangedComment = (crud: string, commentId: number) => {
    const currentTime = new Date();

    // info 데이터 양식 확인하고 수정하기
    // insert는 newComment onChange text 받아서, setInfo에 spread로 추가함과 동시에 API POST 할 예정
    // update는 updatedComment onChange text 및 comment_id 받아서, setInfo의 기존 comment_id와 동일한 것과 변경하는 동시에 API PATCH 할 예정
    // delete는 comment_id 받아서, setInfo에서 기존 comment_id와 동일한 것을 삭제함과 동시에 API DELETE 할 예정
    if (crud === "INSERT") {
      // setInfo({
      //   ...info,
      //   comment: info.comment?.map((commentId: number) => commentId === comment.id ? {...comment, comment.content: updatedValue, comment.time: currentTime}) }
      // });
      // return {
      //   ...state,
      //   userDrugsInfo: state.userDrugsInfo?.map((oneInfo: any, idx: number) =>
      //     oneInfo.id === action.id && idx === action.idx
      //       ? {
      //           ...oneInfo,
      //           drug: { ...oneInfo.drug, reimburse: action.payload },
      //         }
      //       : oneInfo
      //   ),
      // };
    }
    if (crud === "UPDATE") {
      // setInfo(...info,
      //     comment: info.comment?.map((commentId: number) => commentId === comment.id ? {...comment, comment.content: updatedValue, comment.time: currentTime}))
      // axios 추가하기
    }
    if (crud === "DELETE") {
      console.log("DELETE is clicked");
    }
  };

  const updateComment = (e: any) => {
    const { name, value } = e.target;

    setCommentText({
      ...commentText,
      updatedComment: {
        ...commentText.updatedComment,
        content: value
      }
    });
  };

  const handleDragStart = (e: any) => e.preventDefault();

  // src 부분 모두 ${info.사진 키값}으로 변경하고, 해당 array에 map 메소드 적용해야 함 (사진 개수만큼 슬라이더 생성되도록)

  // const items = (info: any) =>
  //   info.store_images.map((img: any) =>
  //     <img src={img} onDragStart={handleDragStart} className="food" />)
  //   );
  //   console.log(Array.from(info.store_images, image => `<img src=${image} onDragStart={handleDragStart} className="food" />`));
  // expected output: Array [2, 4, 6]

  // useEffect(() => {
  //   const func = async () => {
  //     const imageItemsFunc = (info: any) =>
  //       Array.from(
  //         info.store_images,
  //         (image) =>
  //           `<img src=${image} onDragStart={handleDragStart} className="food" />`
  //       );
  //     const imageItems = await imageItemsFunc(info);
  //     // setItems(imageItems);
  //   };
  // }, [info]);

  return (
    <Container>
      <DescSection>
        <Images>
          <AliceCarousel
            mouseTracking
            infinite
            autoPlay
            animationDuration={1400}
            disableButtonsControls={true}
          >
            {info.store_images?.map((image: string) => (
              <img src={image} onDragStart={handleDragStart} className="food" />
            ))}
          </AliceCarousel>
        </Images>
        <StoreDesc>
          <StoreTitle>
            <DecoTitle>“</DecoTitle>
            <Title>{info.store_info[0]?.name}</Title>
            <DecoTitle>”</DecoTitle>
          </StoreTitle>
          <Desc>
            <div className="deli">
              {info.store_info[0]?.delivery
                ? "배달 가능 맛집 🛵"
                : "배달 불가 맛집 🏃🏻‍♂️"}
            </div>
            <div className="desc">{info.store_info[0]?.description}</div>
          </Desc>
          <Liked>
            <span onClick={changeLikedState}>
              {info?.like ? (
                <IoIosHeart className="like full" />
              ) : (
                <IoIosHeartEmpty className="like" />
              )}
            </span>
            <span className="amount">{info?.like_count}</span>
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
            <SubmitBtn onClick={() => submitChangedComment("INSERT", 0)}>
              확인
            </SubmitBtn>
          </CommentInput>
        </InputWrapper>
        <CommentsWrapper>
          {/* info.댓글array 에다가 map 메소드 적용하기. 유저이름, 내용, 시간 모두 키값 적용해야 함 */}
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
              {/* 작성자에게만 수정, 삭제가 노출되어야 함 */}
              {/* 수정, 삭제 위치도 회의해서 결정하기 */}
              {/* userVerified 변수 생성한 후 주석 풀기 */}
              {/* {userVerified && ( */}
              <ModifyBtn
                onClick={() => {
                  setEditModal(true);
                  setCommentText({
                    ...commentText,
                    updatedComment: {
                      ...commentText.updatedComment,
                      // id: 유저의 comment_id로 변경하기
                      id: null
                    }
                  });
                }}
              >
                수정
              </ModifyBtn>
              <ModifyBtn onClick={() => setDeleteModal(true)}>삭제</ModifyBtn>
              {/* )} */}
            </div>
          </Comment>
        </CommentsWrapper>
      </CommentSection>
      {editModal && (
        <EditCommentModal
          editModal={editModal}
          setEditModal={setEditModal}
          // 기존의 commentValue를 {commentText.updatedComment.content}에 setState한 후, 이를 아래처럼 넘겨주기
          commentValue={commentText.updatedComment.content}
          submitChangedComment={submitChangedComment}
          updateComment={updateComment}
        />
      )}
      {deleteModal && (
        <DeleteCommentModal
          deleteModal={deleteModal}
          setDeleteModal={setDeleteModal}
          submitChangedComment={submitChangedComment}
        />
      )}
    </Container>
  );
}

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

  .desc {
    font-family: sans-serif;
  }
`;

const Liked = styled.p`
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  .like {
    font-size: 2.2rem;
  }

  .full {
    color: ${({ theme }) => theme.likedRed};
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
`;

const UploadTime = styled.span`
  margin: 0 1rem;
`;

const ModifyBtn = styled.button`
  margin: 0 0.2rem;
  outline: none;
  font-size: 0.75em;
  font-weight: 700;
  cursor: pointer;
  background-color: white;
`;
