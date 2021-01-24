import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../config";
import { useHistory } from "react-router-dom";
import StoreCard from "./childComponents/StoreCard";
import Slider from "react-slick";
import KobbubakTheme from "../pages/childComponents/KobbubakTheme";
import MetorTheme from "./childComponents/MetorTheme";
import "./MainPage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Props {}

export default function MainPage({}: Props) {
  const [storeData, setStoreData] = useState([]);
  const history = useHistory();

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    focusOnSelect: true,
    autoplay: true,
    autoplaySpeed: 2000
  };

  const setting = {
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
      setStoreData(response.data);
    });
  }, []);

  return (
    <>
      <div className="mainTop5">
        <img className="erankingImg" src="./images/e_ranking.png"></img>
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
        <div className="themList">
          <div className="themListDiv">
            <Slider {...settings}>
              <MetorTheme />
              <KobbubakTheme />
            </Slider>
            <div className="alcoholFeather">
              <div
                className="alcoholMain"
                onClick={() => history.push("./alcohol-detail")}
              >
                <div className="alcoholCenter">
                  <p className="alcoholWith"> &gt; 술과함께</p>
                  <p>술이랑 먹으면</p>
                  <p>더 맛있어</p>
                  <p>더 짜릿해</p>
                  <p>더 즐거워</p>
                </div>
                <div className="alcoholImg">
                  <img src="./images/soju.png" />
                </div>
              </div>
              <div
                className="featherMain"
                onClick={() => history.push("./feather-detail")}
              >
                <div className="featherCenter">
                  <p className="featherlWith"> &gt; GIT털 푸드</p>
                  <p>깃털처럼 가볍게.</p>
                  <p>코드는 산뜻하게.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
