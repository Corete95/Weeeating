import axios from "axios";
import React, { useEffect, useState } from "react";
import StoreCard from "../pages/childComponents/StoreCard.";
import "./MainPage.scss";
import { API } from "../config";
import Slider from "react-slick";

interface Props {
  top: string;
  image: string;
  title: string;
  heart: number;
}
export default function MainPage({ top, image, title, heart }: Props) {
  const [storeData, setStoreData] = useState([]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

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
          {/* <Slider {...settings}> */}
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
          {/* </Slider> */}
        </div>
      </div>
    </>
  );
}
