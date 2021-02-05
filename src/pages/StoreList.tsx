import React, { useEffect, useState } from "react";
import { API } from "../config";
import StoreCard2 from "./childComponents/StoreCard2";
import axios from "axios";
import "./StoreList.scss";

export default function StoreList() {
  const [featherFood, setFeatherFood] = useState([]);
  const feather = "feather";
  useEffect(() => {
    axios
      .get(`${API}/store/list`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      .then((res) => {
        console.log("res", res);
        setFeatherFood(res.data.store_list);
      });
  }, []);

  return (
    <>
      <div className="storeList">
        <div className="logoBox">
          <div className="logoBox1">
            <p>위코더 맛집</p>
          </div>
        </div>
        <div className="storeFood">
          {featherFood?.map((feather: any) => {
            return (
              <StoreCard2
                id={feather.id}
                name={feather.name}
                image={feather.image}
                likeCount={feather.like_count}
                likeState={feather.like_state}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
