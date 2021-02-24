import React, { useEffect, useState } from "react";
import { API } from "../config";
import { useDispatch } from "react-redux";
import { setSignupActive, setFirstLogin } from "../store/actions";
import StoreCard2 from "./childComponents/StoreCard2";
import axios from "axios";
import "./StoreList.scss";

interface UserData {
  storeList: any;
}

export default function StoreList() {
  const [storeList, setStoreList] = useState<UserData | any>([]);
  const feather = "feather";
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (localStorage.getItem("token")) {
      axios
        .get(`${API}/store/list`, {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then((res) => {
          console.log("res", res);
          setStoreList(res.data.store_list);
        });
    } else {
      axios.get(`${API}/store/list`).then((res) => {
        setStoreList(res.data.store_list);
      });
    }
  }, []);

  const changeLikedState = (id: any, type: string) => {
    if (localStorage.getItem("token")) {
      axios
        .post(`${API}/store/like/${id}`, "data", {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then((res) => {
          if (res.data.MESSAGE === "NEED_USER_NAME") {
            alert("회원정보 입력 후 댓글 작성이 가능합니다.");
            dispatch(setFirstLogin(true));
            dispatch(setSignupActive(true));
          } else {
            setStoreList(
              storeList?.map((data: any) => {
                if (data.id === id) {
                  if (data.like_state) {
                    return {
                      ...data,
                      like_state: !data.like_state,
                      like_count: data.like_count - 1
                    };
                  } else {
                    return {
                      ...data,
                      like_state: !data.like_state,
                      like_count: data.like_count + 1
                    };
                  }
                } else {
                  return data;
                }
              })
            );
            console.log("좋아요 통신이 완료되었습니다.", res);
          }
        })
        .catch((err) => console.log("좋아요 통신이 완료되지 않았습니다.", err));
    } else {
      alert("로그인을 해주세요!");
    }
  };

  return (
    <>
      <div className="storeList">
        <div className="storeListLogo">
          <img src="./images/storelist.png"></img>
        </div>
        <div className="storeFood">
          {storeList?.map((feather: any) => {
            return (
              <StoreCard2
                id={feather.id}
                name={feather.name}
                image={feather.image}
                type={"soju"}
                likeCount={feather.like_count}
                likeState={feather.like_state}
                changeLikedState={changeLikedState}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
