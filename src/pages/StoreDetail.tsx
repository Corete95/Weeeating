import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { API } from "../config";
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
        name: "매장명",
        description: "로딩중 ~~~ 조금만 기다려주세요 !",
        delivery: true,
        address: "서울시 강남구 테헤란로 427"
      }
    ],
    like_count: 0,
    like: false,
    store_images: [
      "https://images.unsplash.com/photo-1607434472257-d9f8e57a643d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1952&q=80"
    ]
  });
  const [currentComment, setCurrentComment] = useState<UserData | any>([]);
  const [address, setAddress] = useState("");
  const [items, setItems] = useState<UserData | any[]>([]);
  const [like, setLike] = useState(false);
  const [commentText, setCommentText] = useState<UserData | any>({
    newComment: null,
    updatedComment: { id: null, content: "기존댓글~~~" }
  });
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  // const userVerified = info.user.id === localStorage.getItem.user.id;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .all([
          axios.get(`${API}/store/detail/${props.match.params.id}`, {
            headers: {
              Authorization: localStorage.getItem("token")
            }
          }),
          axios.get(`${API}/store/detail/${props.match.params.id}/comment`, {
            headers: {
              Authorization: localStorage.getItem("token")
            }
          })
        ])
        .then(
          axios.spread((res1, res2) => {
            console.log("res1", res1);
            setInfo(res1.data);
            setAddress(res1.data.store_info[0].address);
            setCurrentComment(res2.data.comment_list);
            console.log("res2.data.comment_list", res2.data.comment_list);
          })
        );
    } else {
      axios
        .all([
          axios.get(`${API}/store/detail/${props.match.params.id}`),
          axios.get(`${API}/store/detail/${props.match.params.id}/comment`)
        ])
        .then(
          axios.spread((res1, res2) => {
            console.log("res1", res1);
            setInfo(res1.data);
            setAddress(res1.data.store_info[0].address);
            setCurrentComment(res2.data.comment_list);
            console.log("res2.data.comment_list", res2.data.comment_list);
          })
        );
    }
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
    if (localStorage.getItem("token")) {
      setInfo({
        ...info,
        like_count: Number(
          info.like === false ? info.like_count + 1 : info.like_count - 1
        ),
        like: !info.like
      });
      axios
        .post(`${API}/store/like/${props.match.params.id}`, "data", {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then((res) => console.log("좋아요 통신이 완료되었습니다.", res))
        .catch((err) => console.log("좋아요 통신이 완료되지 않았습니다.", err));
      // setTimeout(
      //   // 유저가 계속 하트 클릭할 경우 대비해서, 1초 뒤 통신하도록 변경 예정
      //   axios.patch(`API${}`)
      //     .then(res => console.log("좋아요 통신이 완료되었습니다.", res));
      //     .catch(err => console.log("좋아요 통신이 완료되지 않았습니다.", err))
      // , 1000)
    } else {
      alert("로그인을 해주세요!");
    }
  };

  const submitChangedComment = (crud: string, commentId: number) => {
    if (crud === "INSERT") {
      // location.reload와 해당 방법 사이 고민중..
      // setCurrentComment([
      //   {
      //     comment: commentText.newComment,
      //     created_at: "방금 전",
      //     writer_name: "작성자"
      //   },
      //   ...currentComment
      // ]);
      axios
        .post(
          `${API}/store/detail/${props.match.params.id}/comment`,
          JSON.stringify({
            comment: commentText.newComment
          }),
          { headers: { Authorization: localStorage.getItem("token") } }
        )
        .then((res) => {
          console.log(res);
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
    if (crud === "UPDATE") {
      // setCurrentComment(
      //   currentComment.map((comment: any) =>
      //     comment.id === commentId
      //       ? { ...comment, comment: commentText.updatedComment.content }
      //       : comment
      //   )
      // );
      setEditModal(false);

      axios
        .patch(
          `${API}/store/detail/${props.match.params.id}/comment/${commentText.updatedComment.id}`,
          JSON.stringify({
            comment: commentText.updatedComment.content
          }),
          { headers: { Authorization: localStorage.getItem("token") } }
        )
        .then((res) => {
          console.log(res);
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
    if (crud === "DELETE") {
      // setCurrentComment(
      //   currentComment.filter(
      //     (comment: any) => comment.id !== Number(commentText.updatedComment.id)
      //   )
      // );
      setDeleteModal(false);
      axios
        .delete(
          `${API}/store/detail/${props.match.params.id}/comment/${commentText.updatedComment.id}`,
          {
            headers: {
              Authorization: localStorage.getItem("token")
            }
          }
        )
        .then((res) => {
          console.log(res);
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  const updateComment = (e: any) => {
    const { value } = e.target;

    setCommentText({
      ...commentText,
      updatedComment: {
        ...commentText.updatedComment,
        content: value
      }
    });
  };

  const handleDragStart = (e: any) => e.preventDefault();

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
                ? "⭕ 배달 가능 맛집 ⭕"
                : "❌ 배달 불가 맛집 ❌"}
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
          <form method="post">
            <CommentInput>
              <Input
                onChange={(e) =>
                  setCommentText({ ...commentText, newComment: e.target.value })
                }
                placeholder="여러분의 이야기를 남겨주세요 !"
              />
              <SubmitBtn onClick={() => submitChangedComment("INSERT", 0)}>
                확인
              </SubmitBtn>
            </CommentInput>
          </form>
        </InputWrapper>
        <CommentsWrapper>
          {currentComment &&
            currentComment.map((comment: any, idx: any) => (
              <Comment key={idx}>
                <User>{comment.writer_name}</User>
                <div className="right">
                  <Content>{comment.comment}</Content>
                  <UploadTime>( {comment.created_at} )</UploadTime>
                  {/* 작성자에게만 수정, 삭제가 노출되도록 변경 예정*/}
                  {/* {userVerified && ( */}
                  <ModifyBtn
                    onClick={() => {
                      setEditModal(true);
                      setCommentText({
                        ...commentText,
                        updatedComment: {
                          id: comment.id,
                          content: comment.comment
                        }
                      });
                    }}
                  >
                    수정
                  </ModifyBtn>
                  <ModifyBtn
                    onClick={() => {
                      setDeleteModal(true);
                      setCommentText({
                        ...commentText,
                        updatedComment: {
                          ...commentText.updatedComment,
                          id: comment.id
                        }
                      });
                    }}
                  >
                    삭제
                  </ModifyBtn>
                  {/* )} */}
                </div>
              </Comment>
            ))}
        </CommentsWrapper>
      </CommentSection>
      {editModal && (
        <EditCommentModal
          editModal={editModal}
          setEditModal={setEditModal}
          updatedComment={commentText.updatedComment}
          submitChangedComment={submitChangedComment}
          updateComment={updateComment}
        />
      )}
      {deleteModal && (
        <DeleteCommentModal
          deleteModal={deleteModal}
          setDeleteModal={setDeleteModal}
          submitChangedComment={submitChangedComment}
          commentId={commentText.updatedComment.id}
        />
      )}
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
