import React, { useState, useEffect } from "react";
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
import "./PostDetail.scss";

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
  const [countComments, setCountComments] = useState<Number>(0);
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
          setCountComments(res.data.count_comments);
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

  const contentResult = content.replace(/(<([^>]+)>)/gi, "");

  const updatePost = (value: string) => {
    setContent(value);
  };
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
  console.log("123", comments);
  return (
    <>
      <div className="postDetail">
        <div className="weMeokTalkLogo">
          <img src={wemeok}></img>
          <p>개발자 공유 문화 잊지 말자. 그러니까 맛집도 공유하자.</p>
        </div>
        <div className="weMeokTalkList">
          <div className="listDiv">
            <div className="detailTitle">
              <p className="titleBold">제목</p>
              <p className="title">{posts[0]?.title}</p>
            </div>
            <div className="solidLine"></div>
            <div className="writerCreated">
              <p>{posts[0]?.writer}</p>
              <p>|</p>
              <p>{posts[0]?.created_at}</p>
            </div>
            <div className="contentDiv">{posts[0]?.content}</div>
            <div className="editDeleteDiv">
              <p className="edit">수정</p>
              <p>|</p>
              <p className="delete" onClick={deletePost}>
                삭제
              </p>
            </div>
            <div className="solidLine"></div>
            <div className="commentsInputDiv">
              <p>댓글 ({countComments})</p>
              <input value={comment} onChange={onChangeComment}></input>
              <span onClick={addComment}>등록</span>
            </div>
            {comments?.map((comments: any) => {
              return (
                <PostReply
                  id={comments.comment_id}
                  writer={comments.comment_writer}
                  content={comments.comment_content}
                  created_at={comments.comment_created_at}
                  writer_id={comments.comment_writer_id}
                  clickEdit={clickEdit}
                  deleteComment={deleteComment}
                />
              );
            })}
            {/* <div className="comments">
              <p className="commentsWriter">13기_김정현</p>
              <p className="commentContent">랄라블라 여기는 내용이 옵니다</p>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
