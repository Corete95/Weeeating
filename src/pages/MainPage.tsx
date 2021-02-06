import React, { useEffect, useState } from "react";
import { API } from "../config";
import { useHistory } from "react-router-dom";
import StoreCard from "./childComponents/StoreCard";
import Slider from "react-slick";
import axios from "axios";
import KobbubakTheme from "../pages/childComponents/KobbubakTheme";
import MetorTheme from "./childComponents/MetorTheme";
import "./MainPage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const RANKING = [
  { top: "TOP 1" },
  { top: "TOP 2" },
  { top: "TOP 3" },
  { top: "TOP 4" },
  { top: "TOP 5" }
];

export default function MainPage({ props }: any) {
  const [storeData, setStoreData] = useState([]);
  const history = useHistory();
  const like = "like";

  const rankingData = storeData.map((data: any, index: number) => ({
    ...data,
    top: RANKING[index].top
  }));

  useEffect(() => {
    const ranking = async () => {
      await axios
        .get(`${API}/store/list?sort=${like}`, {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then((res) => {
          setStoreData(res.data.store_list.like);
        });
    };
    ranking();
  }, []);

  // 백엔드와 맞추기위해 좋아요 로직 작업
  // const changeLikedState = () => {
  //   setStoreData({
  //     ...storeData,
  //     like_count: Number(
  //       storeData.like === false
  //         ? storeData.like_count + 1
  //         : storeData.like_count - 1
  //     ),
  //     like: !storeData.like
  //   });
  //   axios
  //     .post(`${API}/store/like/${props.match.params.id}`)
  //     .then((res) => console.log("좋아요 통신이 완료되었습니다.", res))
  //     .catch((err) => console.log("좋아요 통신이 완료되지 않았습니다.", err));
  // };

  const metorKobbubakSlick = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    focusOnSelect: true,
    autoplay: true,
    autoplaySpeed: 2000
  };

  const rankingSlick = {
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
    className: "slides",
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  return (
    <>
      <div className="mainTop5">
        <img
          className="erankingImg"
          src="./images/e_ranking.png"
          alt="랭킹TOP5"
        ></img>
        <div className="rankingDiv">
          <div className="storeCardDiv">
            <Slider {...rankingSlick}>
              {rankingData?.map((store: any) => {
                return (
                  <StoreCard
                    id={store.id}
                    top={store.top}
                    name={store.name}
                    image={store.image}
                    likeCount={store.like_count}
                    likeState={store.like_state}
                  />
                );
              })}
            </Slider>
          </div>
        </div>
        <div className="themList">
          <div className="themListDiv">
            <Slider {...metorKobbubakSlick}>
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
                  <img alt="메인소주" src="./images/soju.png" />
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
