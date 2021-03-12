import React, { useEffect, useState, useCallback } from "react";
import { API } from "../config";
import { useDispatch } from "react-redux";
import {
  setSignupActive,
  setLoginActive,
  setFirstLogin
} from "../store/actions";
import StoreCard2 from "./childComponents/StoreCard2";
import axios from "axios";
import "./StoreList.scss";

interface UserData {
  storeList: any;
}

export default function StoreList() {
  const [storeList, setStoreList] = useState<UserData | any>([]);
  const [item, setItem] = useState<UserData | any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  const fetchMoreData = async () => {
    setIsLoading(true);
    setStoreList(storeList.concat(item.slice(0, 15)));
    setItem(item.slice(15));
    setIsLoading(false);
  };

  const getFetchData = async () => {
    if (localStorage.getItem("token")) {
      await axios
        .get(`${API}/store/list`, {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then((res) => {
          let response = res.data.store_list;
          setStoreList(response.slice(0, 15));
          response = response.slice(15);
          setItem(response);
          setIsLoading(false);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    } else {
      await axios
        .get(`${API}/store/list`)
        .then((res) => {
          let response = res.data.store_list;
          setStoreList(response.slice(0, 15));
          response = response.slice(15);
          setItem(response);
          setIsLoading(false);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }
  };

  const infiniteScroll = useCallback(() => {
    let scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    let scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    let clientHeight = document.documentElement.clientHeight;
    scrollHeight -= 100;
    if (scrollTop + clientHeight >= scrollHeight && isLoading === false) {
      setTimeout(() => {
        fetchMoreData();
        if (item < 1) {
          setIsLoading(true);
        }
      }, 700);
    }
  }, [fetchMoreData, isLoading, item]);

  useEffect(() => {
    getFetchData();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", infiniteScroll, true);
    return () => window.removeEventListener("scroll", infiniteScroll, true);
  }, [infiniteScroll]);

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
      dispatch(setLoginActive(true));
    }
  };
  console.log("로딩", isLoading);

  return (
    <>
      <div className="storeList">
        <div className="storeListLogo">
          <img src="./images/storelist.png"></img>
        </div>
        <div className="storeFood">
          {storeList?.map((store: any) => {
            return (
              <StoreCard2
                id={store.id}
                name={store.name}
                image={store.image}
                type={"soju"}
                likeCount={store.like_count}
                likeState={store.like_state}
                changeLikedState={changeLikedState}
              />
            );
          })}
        </div>
        {isLoading ? null : <div className="loading">로딩중입니다.</div>}
      </div>
    </>
  );
}
