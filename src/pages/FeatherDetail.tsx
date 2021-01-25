import React, { useEffect, useState } from "react";
import { API1 } from "../config";
import StoreCard2 from "./childComponents/StoreCard2";
import axios from "axios";
import "./FeatherDetail.scss";

export default function FeatherDetail() {
  const [featherFood, setFeatherFood] = useState([]);

  useEffect(() => {
    axios.get(`${API1}`).then((response) => {
      setFeatherFood(response.data);
    });
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
                image={feather.image}
                title={feather.title}
                heart={feather.heart}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
