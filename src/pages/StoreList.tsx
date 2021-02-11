import React, { useEffect, useState } from "react";
import { API } from "../config";
import StoreCard2 from "./childComponents/StoreCard2";
import axios from "axios";
import "./StoreList.scss";

interface UserData {
  storeList: any;
}

export default function StoreList() {
  const [storeList, setStoreList] = useState<UserData | any>([]);
  const feather = "feather";

  useEffect(() => {
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

  const changeLikedState = (id: any) => {
    if (localStorage.getItem("token")) {
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
      axios
        .post(`${API}/store/like/${id}`, "data", {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then((res) => console.log("좋아요 통신이 완료되었습니다.", res))
        .catch((err) => console.log("좋아요 통신이 완료되지 않았습니다.", err));
    } else {
      alert("로그인을 해주세요!");
    }
  };
  return (
    <>
      <div className="storeList">
        <div className="logoBox">
          <div className="logoBox1">
            <p>위코더 맛집</p>
          </div>
        </div>
        <div className="storeFood">
          {storeList?.map((feather: any) => {
            return (
              <StoreCard2
                id={feather.id}
                name={feather.name}
                image={feather.image}
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
