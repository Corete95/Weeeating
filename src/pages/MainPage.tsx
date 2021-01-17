import axios from "axios";
import React, { useEffect, useState } from "react";
import StoreCard from "../pages/childComponents/StoreCard.";
import "./MainPage.scss";
import { API } from "../config";

interface Props {
  top: string;
  image: string;
  title: string;
  heart: number;
}
export default function MainPage({ top, image, title, heart }: Props) {
  const [storeData, setStoreData] = useState([]);

  useEffect(() => {
    axios.get(`${API}`).then((response) => {
      console.log(response.data);
      setStoreData(response.data);
    });
  }, []);
  console.log(setStoreData);
  return (
    <>
      <div className="mainNav">NAV</div>
      <div className="mainTop5">
        <h1>E Ranking</h1>
        <div className="rankingDiv">
          {storeData?.map((store: any) => {
            return (
              <StoreCard
                top={store.top}
                image={store.image}
                title={store.title}
                heart={store.heart}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
