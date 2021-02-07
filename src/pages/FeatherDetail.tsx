import React, { useEffect, useState } from "react";
import { API } from "../config";
import StoreCard2 from "./childComponents/StoreCard2";
import axios from "axios";
import "./FeatherDetail.scss";

export default function FeatherDetail() {
  const [featherFood, setFeatherFood] = useState([]);
  const feather = "feather";

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

  return (
    <>
      <div className="feather">
        <div className="logoBox">
          <div className="logoBox1">
            <p>GIT털 푸드</p>
          </div>
        </div>
        <div className="featherFood">
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
