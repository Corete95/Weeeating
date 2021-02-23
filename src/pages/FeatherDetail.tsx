import React, { useEffect, useState } from "react";
import { API } from "../config";
import { useDispatch } from "react-redux";
import { setSignupActive, setFirstLogin } from "../store/actions";
import StoreCard2 from "./childComponents/StoreCard2";
import axios from "axios";
import "./FeatherDetail.scss";

interface UserData {
  featherFood: any;
}

export default function FeatherDetail() {
  const [featherFood, setFeatherFood] = useState<UserData | any>([]);
  const feather = "feather";
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .get(`${API}/store/list?tag=${feather}`, {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then((res) => {
          console.log("res", res);
          setFeatherFood(res.data.store_list.feather);
        });
    } else {
      axios.get(`${API}/store/list?tag=${feather}`).then((res) => {
        setFeatherFood(res.data.store_list.feather);
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
            setFeatherFood(
              featherFood?.map((data: any) => {
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
      <div className="feather">
        <div className="logoBox">
          <img src="./images/gitfoodLogo.png" />
        </div>
        <div className="featherFood">
          {featherFood?.map((feather: any) => {
            return (
              <StoreCard2
                id={feather.id}
                name={feather.name}
                type={"soju"}
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
