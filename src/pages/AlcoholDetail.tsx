import React, { useEffect, useState } from "react";
import { API1 } from "../config";
import axios from "axios";
import StoreCard2 from "./childComponents/StoreCard2";
import Slider from "react-slick";
import "./AlcoholDetail.scss";
import "./MainPage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function AlcoholDetail() {
  const [alcoholData, setAlcoholData] = useState([]);

  const setting = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true,
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
    axios.get(`${API1}`).then((response) => {
      setAlcoholData(response.data);
    });
  }, []);

  return (
    <>
      <div className="alcohol">
        <div className="logoBox">
          <div className="logoBox1">
            <p>술과 함께</p>
          </div>
        </div>
        <div className="sojuDiv">
          <div className="sojuIcon">
            <img src="./images/soju.png"></img>
            <p>소주와</p>
          </div>
        </div>
        <div className="sojuListDiv">
          <div className="sojuCardDiv">
            <Slider {...setting}>
              {alcoholData?.map((alcohol: any) => {
                return (
                  <StoreCard2
                    id={alcohol.id}
                    name={alcohol.name}
                    image={alcohol.image}
                    likeCount={alcohol.like_count}
                    likeState={alcohol.like_state}
                  />
                );
              })}
            </Slider>
          </div>
        </div>
        <div className="beerDiv">
          <div className="beerIcon">
            <img src="./images/beer.png"></img>
            <p>맥주와</p>
          </div>
        </div>
        <div className="beerListDiv">
          <div className="beerCardDiv">
            <Slider {...setting}>
              {alcoholData?.map((alcohol: any) => {
                return (
                  <StoreCard2
                    id={alcohol.id}
                    name={alcohol.name}
                    image={alcohol.image}
                    likeCount={alcohol.like_count}
                    likeState={alcohol.like_state}
                  />
                );
              })}
            </Slider>
          </div>
        </div>
        <div className="riceWineDiv">
          <div className="riceWineIcon">
            <img src="./images/sake.png"></img>
            <p>막걸리와</p>
          </div>
        </div>
        <div className="riceWineDiv">
          <div className="riceWineCardDiv">
            <Slider {...setting}>
              {alcoholData?.map((alcohol: any) => {
                return (
                  <StoreCard2
                    id={alcohol.id}
                    name={alcohol.name}
                    image={alcohol.image}
                    likeCount={alcohol.like_count}
                    likeState={alcohol.like_state}
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
