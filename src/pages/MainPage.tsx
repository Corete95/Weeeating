import axios from "axios";
import React, { useEffect, useState } from "react";
import StoreCard from "../pages/childComponents/StoreCard.";
import "./MainPage.scss";
import { API } from "../config";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Props {
  top: string;
  image: string;
  title: string;
  heart: number;
}
export default function MainPage({ top, image, title, heart }: Props) {
  const [storeData, setStoreData] = useState([]);

  let setting = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    centerMode: true,
    nextArrow: (
      <div>
        <img
          alt="rightArrow"
          className="next-slick-arrow"
          src="./images/right-arrow.png"
         
        ></img>
      </div>
    ),
    prevArrow: (
      <div>
        <img
          alt="leftArrow"
          className="prev-slick-arrow"
          src="./images/left-arrow.png"
        ></img>
      </div>
    ),
    className: "slides"
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
      <div className="mainTop5">
        <h1>E Ranking</h1>
        <div className="rankingDiv">
          <div className="storeCardDiv">
            <Slider {...setting}>
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
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
}
