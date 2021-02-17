import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { API } from "../config";
import { EditCommentModal, DeleteCommentModal } from "../components";
import {
  setSignupActive,
  setLoginActive,
  setFirstLogin
} from "../store/actions";
import ReactQuill, { Quill } from "react-quill"; // Typescript
import axios from "axios";
import Pagination from "react-js-pagination";
import wemeok from "../images/wemeoktalk3.png";
import PostReply from "../pages/childComponents/PostReply";
import "react-quill/dist/quill.snow.css";
import "./PostDetail.scss";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactHtmlParser from "react-html-parser";
// import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
// import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
// import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
// import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
interface UserData {
  info: any;
  items: any[];
}
// const editorConfiguration = {
//   plugins: [Essentials, Bold, Italic, Paragraph],
//   toolbar: ["bold", "italic"]
// };
export default function PostDetail({ match }: any) {
  const [posts, setPosts] = useState<any>([]);
  const [comments, setComments] = useState<any>([]);
  const [comment, setComment] = useState<string>("");
  const [title, setTitle] = useState<any>({ newTitle: null });
  const [postTitle, setPostTitle] = useState<any>(null);
  const [postContent, setPostContent] = useState<any>(null);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [commentText, setCommentText] = useState<UserData | any>({
    newComment: null,
    updatedComment: { id: null, content: "기존댓글~~~" }
  });
  const [activeInput, setActiveInput] = useState(false);
  const [countComments, setCountComments] = useState(0);
  const [activePage, setActivePage] = useState<any>(1);
  const history = useHistory();
  const dispatch = useDispatch();

  const modules = {
    toolbar: [
      //[{ 'font': [] }],
      [{ header: [1, 2, 3, 4, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" }
      ],
      ["link", "image"],
      [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
      ["clean"]
    ]
  };

  const formats = [
    //'font',
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "color",
    "background"
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      await axios
        .get(`${API}/board/${match.params.id}`, {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then((res) => {
          console.log("test", res.data);
          setPosts(res.data.board_info);
          setComments(res.data.board_comments);
          setCountComments(res.data.count_comments);
          setTitle(res.data.board_info[0].title);
          setPostContent(res.data.board_info[0].content);
        });
    };
    fetchPosts();
  }, [match.params.id]);

  const onChangeComment = (e: any) => {
    setComment(e.target.value);
  };

  const submitChangedComment = (crud: string, commentId: number) => {
    if (localStorage.getItem("token")) {
      if (crud === "INSERT") {
        axios
          .post(
            `${API}/board/${match.params.id}/comment`,
            JSON.stringify({
              comment
            }),
            { headers: { Authorization: localStorage.getItem("token") } }
          )
          .then((res) => {
            if (res.data.MESSAGE === "NEED_USER_NAME") {
              alert("회원정보 입력 후 댓글 작성이 가능합니다.");
              dispatch(setFirstLogin(true));
              dispatch(setSignupActive(true));
            } else {
              console.log(res);
              window.location.reload();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }

      if (crud === "UPDATE") {
        setEditModal(false);

        axios
          .patch(
            `${API}/board/${match.params.id}/${commentId}`,
            JSON.stringify({
              comment: commentText.updatedComment.content
            }),
            { headers: { Authorization: localStorage.getItem("token") } }
          )
          .then((res) => {
            window.location.reload();
          })
          .catch((err) => console.log(err));
      }

      if (crud === "DELETE") {
        setDeleteModal(false);
        axios
          .delete(`${API}/board/${match.params.id}/${commentId}`, {
            headers: {
              Authorization: localStorage.getItem("token")
            }
          })
          .then((res) => {
            window.location.reload();
          })
          .catch((err) => console.log(err));
      }
    } else {
      alert("로그인을 해주세요!");
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

  const clickEdit = (comment: any) => {
    setEditModal(true);
    setCommentText({
      ...commentText,
      updatedComment: {
        id: comment.comment_id,
        content: comment.comment_content
      }
    });
  };

  const clickDeleteComment = (commentId: any) => {
    setDeleteModal(true);
    setCommentText({
      ...commentText,
      updatedComment: {
        ...commentText.updatedComment,
        id: commentId
      }
    });
  };

  // const contentResult = postContent.replace(/(<([^>]+)>)/gi, "");
  // const test = postContent.replace(/<br\s*\/?>/gm, "\n");
  // const test1 = postContent.replace(/(?:\r\n|\r|\n)/g, "<br/>");

  const patchPost = (): void => {
    const data = {
      title: postTitle,
      content: postContent
    };

    axios.patch(`${API}/board/${match.params.id}`, JSON.stringify(data), {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    });
    window.location.reload();
  };

  const deletePost = (): void => {
    if (window.confirm("게시물을 삭제하시겠습까?")) {
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
      .get(`${API}/board/${match.params.id}?offset=${(pageNumber - 1) * 5}`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      .then((res) => {
        setComments(res.data.board_comments);
      });
    setActivePage(pageNumber);
  };

  const changePostTitle = (e: any) => {
    const { value } = e.target;
    setPostTitle(value);
  };

  const changePostContent = (html: any) => {
    setPostContent(html);
  };
  console.log("test", postContent);
  return (
    <>
      <div className="postDetail">
        <div className="weMeokTalkLogo">
          <img src={wemeok}></img>
        </div>
        <div className="weMeokTalkList">
          <div className="listDiv">
            {activeInput ? (
              <>
                <div className="editListDiv">
                  <div className="writingTitle">
                    <p>제목</p>
                    <input
                      type="text/html"
                      value={postTitle}
                      onChange={changePostTitle}
                    ></input>
                  </div>
                  <div className="solidLine"></div>
                  <div className="writerCreated">
                    <p>{posts[0]?.writer}</p>
                    <p>|</p>
                    <p>{posts[0]?.created_at}</p>
                  </div>
                  <div className="writingCenter">
                    <p className="textBold">내용</p>
                    {/* <CKEditor
                      editor={ClassicEditor}
                      data={postContent}
                      onReady={(editor: any) => {
                        // You can store the "editor" and use when it is needed.
                        console.log("Editor is ready to use!", editor);
                      }}
                      onChange={(event: any, editor: any) => {
                        const data = editor.getData();
                        console.log({ event, editor, data });
                        setPostContent(data);
                        console.log("제발", postContent);
                      }}
                      onBlur={(event: any, editor: any) => {
                        console.log("Blur.", editor);
                      }}
                      onFocus={(event: any, editor: any) => {
                        console.log("Focus.", editor);
                      }}
                      config={custom_config}
                    /> */}
                    <ReactQuill
                      bounds={".quill"}
                      theme={"snow"}
                      value={postContent}
                      onChange={(content, delta, source, editor) =>
                        changePostContent(editor.getHTML())
                      }
                      modules={modules}
                      formats={formats}
                    />
                  </div>
                  <div className="writerButton">
                    <button
                      onClick={() => {
                        patchPost();
                        setActiveInput(false);
                      }}
                    >
                      수정
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="detailTitle">
                  <p className="titleBold">제목</p>
                  <p className="title">{posts[0]?.title}</p>
                </div>
                <div className="solidLine"></div>
                <div className="writerCreated">
                  <p className="wirter">{posts[0]?.writer}</p>
                  <p className="created">{posts[0]?.created_at}</p>
                </div>
                <div
                  className="contentDiv"
                  dangerouslySetInnerHTML={{ __html: posts[0]?.content }}
                />
                {/* <div className="contentDiv">
                  {ReactHtmlParser(posts[0]?.content)}
                </div> */}
                {/* <div className="contentDiv">{posts[0]?.content}</div> */}
                {posts[0]?.writer_id ===
                  Number(localStorage.getItem("user_id_number")) && (
                  <>
                    <div className="editDeleteDiv">
                      <p
                        className="edit"
                        onClick={() => {
                          setActiveInput(true);
                          setPostTitle(posts[0]?.title);
                        }}
                      >
                        수정
                      </p>

                      <p className="delete" onClick={deletePost}>
                        삭제
                      </p>
                    </div>
                  </>
                )}
              </>
            )}
            <div className="solidLine"></div>
            <div className="commentsInputDiv">
              <p>댓글 ({countComments})</p>
              <input
                maxLength={149}
                value={comment}
                onChange={onChangeComment}
              ></input>
              <span onClick={() => submitChangedComment("INSERT", 0)}>
                등록
              </span>
            </div>
            {comments?.map((comments: any) => {
              return (
                <PostReply
                  comments={comments}
                  id={comments.comment_id}
                  writer={comments.comment_writer}
                  content={comments.comment_content}
                  created_at={comments.comment_created_at}
                  writer_id={comments.comment_writer_id}
                  clickEdit={clickEdit}
                  clickDeleteComment={clickDeleteComment}
                />
              );
            })}
            <Pagination
              activePage={activePage}
              itemsCountPerPage={5}
              totalItemsCount={countComments}
              pageRangeDisplayed={5}
              hideFirstLastPages
              itemClassPrev={"prevPageText"}
              itemClassNext={"nextPageText"}
              prevPageText={"◀"}
              nextPageText={"▶"}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>

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
    </>
  );
}
