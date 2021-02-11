import React, { useState, useEffect } from "react";
import styled from "styled-components";
import wemeok from "../images/wemeoktalk_2.png";
import { COLORS } from "../styles/themeColor";
import PostReply from "../pages/childComponents/PostReply";
import axios from "axios";
import { API } from "../config";
import ReactPaginate from "react-paginate";
import { useHistory } from "react-router-dom";
import { EditCommentModal, DeleteCommentModal } from "../components";
import ReactQuill from "react-quill"; // Typescript
import "react-quill/dist/quill.snow.css";

interface UserData {
  info: any;
  items: any[];
}

export default function PostDetail({ match }: any) {
  const [posts, setPosts] = useState<any>([]);
  const [comments, setComments] = useState<any>([]);
  const [comment, setComment] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [commentText, setCommentText] = useState<UserData | any>({
    newComment: null,
    updatedComment: { id: null, content: "기존댓글~~~" }
  });
  const [currentComment, setCurrentComment] = useState<UserData | any>([]);
  const [activeInput, setActiveInput] = useState(false);
  const [updatedPost, setUpdatedPost] = useState(posts[0]?.content);
  const history = useHistory();

  

  useEffect(() => {
    const fetchPosts = async () => {
      await axios
        .get(`${API}/board/${match.params.id}`, {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then((res) => {
          console.log(res.data);
          setPosts(res.data.board_info);
          setComments(res.data.board_comments);
        });
    };
    fetchPosts();
  }, [match.params.id]);

  const onChangeComment = (e: any) => {
    setComment(e.target.value);
  };

  let data = {
    comment: comment
  };

  const addComment = (): any => {
    if (comment.length >= 1) {
      setComments([
        ...comments,
        {
          comment_content: comment,
          comment_writer: "로그인된 사람",
          comment_created_at: "방금 전"
        }
      ]);
      setContent("");
      axios
        .post(`${API}/board/${match.params.id}/comment`, JSON.stringify(data), {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then((res) => {
          window.location.reload();
        });
    }
  };

  const patchComment = (crud: string, comment_id: number) => {
    console.log("댓글수정", comment_id);
    setCurrentComment(
      currentComment.map((comment: any) =>
        comment.id === comment_id
          ? { ...comment, comment: commentText.updatedComment.comment }
          : comment
      )
    );
    setEditModal(false);

    axios
      .patch(
        `${API}/board/${match.params.id}/${comment_id}`,
        JSON.stringify({
          // register 맞춘 후, Authorization: localStorage.getItem("token")으로 변경하기
          comment: commentText.updatedComment.content
        }),
        { headers: { Authorization: localStorage.getItem("token") } }
      )
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const deleteComment = (comment_id: any): void => {
    if (window.confirm("삭제?")) {
      axios
        .delete(`${API}/board/${match.params.id}/${comment_id}`, {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then((res) => {
          window.location.reload();
        });
    }
  };

  const updateComment = (e: any) => {
    const { value } = e.target;
    console.log("updateComment value", value);

    setCommentText({
      ...commentText,
      updatedComment: {
        ...commentText.updatedComment,
        comment: value
      }
    });
    window.location.reload();
  };

  const clickEdit = (comment: any) => {
    setEditModal(true);
    setCommentText({
      ...commentText,
      updatedComment: {
        id: comment.comment_id,
        comment: comment.comment_comment
      }
    });
  };

  const contentResult = content.replace(/(<([^>]+)>)/gi, "")

  const updatePost = (value:string) => {    
    setContent(value);
}
  const patchPost = (): void => {
    const data = {
      title: posts[0].title,
      content: contentResult
    };

    axios.patch(`${API}/board/${match.params.id}`, JSON.stringify(data), {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    });
    window.location.reload();
  };

  const deletePost = (): void => {
    if (window.confirm("삭제?")) {
      axios
        .delete(`${API}/board/${match.params.id}`, {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then((res) => {
          history.push("/post-list");
        });
    }
  };

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
    setCurrentPage(pageNumber);
  };

  return (
    <Container>
      <Img src={wemeok} alt="" />
      <InnerContainer>
        <ImgText>개발자 공유문화 잊지말자, 그러니까 맛집도 공유하자</ImgText>
        <TitleContainer>
          <TitleText>제목</TitleText>
          <TitleInput>{posts[0]?.title}</TitleInput>
        </TitleContainer>
        <ContentContainer>
          <Writer>{posts[0]?.writer}</Writer>
          {activeInput ? (
            <>
            <QuillContainer>
              <ReactQuill value={content} onChange={updatePost} />
            </QuillContainer>
              <Edit
                onClick={() => {
                  patchPost();
                  setActiveInput(false);
                }}
              >
                완료
              </Edit>
            </>
          ) : (
            <>
              <Content>{posts[0]?.content}</Content>
              <Edit onClick={deletePost}>삭제</Edit>
              <Edit
                onClick={() => {
                  setActiveInput(true);
                }}
              >
                수정
              </Edit>
            </>
          )}
        </ContentContainer>
        <ReplyContainer>
          <ReplyText>댓글</ReplyText>
          <ReplyInput value={comment} onChange={onChangeComment}></ReplyInput>
          <Button onClick={addComment}>등록</Button>
        </ReplyContainer>
        <PostReply
          comments={comments}
          match={match}
          setEditModal={setEditModal}
          clickEdit={clickEdit}
          deleteComment={deleteComment}
        ></PostReply>
        <StyledPaginateContainer>
          <ReactPaginate
            pageCount={Math.ceil(posts.total_comment / 10)}
            pageRangeDisplayed={5}
            marginPagesDisplayed={0}
            breakLabel={""}
            previousLabel={"이전"}
            nextLabel={"다음"}
            onPageChange={handlePageChange}
            containerClassName={"pagination-ul"}
            activeClassName={"currentPage"}
            previousClassName={"pageLabel-btn"}
            nextClassName={"pageLabel-btn"}
          />
        </StyledPaginateContainer>
      </InnerContainer>
      {editModal && (
        <EditCommentModal
          editModal={editModal}
          setEditModal={setEditModal}
          // 기존의 commentValue를 {commentText.updatedComment.content}에 setState한 후, 이를 아래처럼 넘겨주기
          updatedComment={commentText.updatedComment}
          submitChangedComment={patchComment}
          updateComment={updateComment}
        />
      )}
      {deleteModal && (
        <DeleteCommentModal
          deleteModal={deleteModal}
          setDeleteModal={setDeleteModal}
          submitChangedComment={deleteComment}
          commentId={commentText.updatedComment.id}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
  width: 45.2rem;
  border: 4px solid ${COLORS.mainYellow};
`;

const Img = styled.img`
  position: relative;
  top: 1rem;
  margin: 5rem 3.3rem 0 0;
  width: 49rem;
`;

const ImgText = styled.p`
  position: absolute;
  top: 13rem;
  z-index: 10;
  font-size: 2rem;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 0.3rem;
  width: 35rem;
  height: 1.5rem;
  border-bottom: 2px solid black;
`;

const TitleText = styled.p`
  width: 2rem;
  height: 1.5rem;
`;

const TitleInput = styled.p`
  margin-left: 1rem;
  width: 33rem;
  height: 1.5rem;
`;

const Writer = styled.div`
  text-align: right;
`;

const ContentContainer = styled.div`
  margin: 2rem 0;
  border-bottom: 2px solid black;
`;

const Content = styled.p`
  width: 36rem;
  height: 20rem;
`;

const ContentInput = styled.input`
  width: 36rem;
  height: 20rem;
`;

const ReplyContainer = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 1.5rem;
  width: 35rem;
`;

const ReplyText = styled.p`
  width: 2rem;
  height: 1.5rem;
`;

const ReplyInput = styled.input`
  margin-left: 1rem;
  width: 35rem;
  height: 1.5rem;
`;

const Button = styled.button`
  width: 4rem;
  height: 2rem;
  background: ${COLORS.mainYellow};
`;

const Edit = styled.button`
  width: 4rem;
  height: 2rem;
  background: ${COLORS.mainYellow};
  float: right;
`;

const StyledPaginateContainer = styled.div`
  ul {
    display: flex;
  }
`;

const QuillContainer = styled.div`
  height: 15rem;
  width: 35rem;

  .quill {
    height: 10rem;
  }
`