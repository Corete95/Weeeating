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

interface UserData {
  storeData: any;
}

const RANKING = [
  { top: "TOP 1" },
  { top: "TOP 2" },
  { top: "TOP 3" },
  { top: "TOP 4" },
  { top: "TOP 5" }
];

export default function MainPage({ match }: any) {
  const [storeData, setStoreData] = useState<UserData | any>([]);
  const history = useHistory();
  const like = "like";
  const rankingData = storeData.map((data: any, index: number) => ({
    ...data,
    top: RANKING[index].top
  }));

  useEffect(() => {
    const ranking = async () => {
      if (localStorage.getItem("token")) {
        await axios
          .get(`${API}/store/list?sort=${like}`, {
            headers: {
              Authorization: localStorage.getItem("token")
            }
          })
          .then((res) => {
            setStoreData(res.data.store_list.like);
          });
      } else {
        await axios.get(`${API}/store/list?sort=${like}`).then((res) => {
          setStoreData(res.data.store_list.like);
        });
      }
    };
    ranking();
  }, []);
  console.log("storeData", storeData);

  const changeLikedState = (id: any) => {
    if (localStorage.getItem("token")) {
      setStoreData(
        storeData?.map((data: any) => {
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
      axios
        .post(`${API}/store/like/${id}`, "data", {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then((res) => console.log("좋아요 통신이 완료되었습니다.", res))
        .catch((err) => console.log("좋아요 통신이 완료되지 않았습니다.", err));
    } else {
      alert("로그인을 해주세요!");
    }
  };

  const metorKobbubakSlick = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    focusOnSelect: true,
    autoplay: false,
    autoplaySpeed: 2000
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    centerPadding: "47px",
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
            <Slider {...settings}>
              {rankingData?.map((store: any) => {
                return (
                  <StoreCard
                    id={store.id}
                    top={store.top}
                    name={store.name}
                    image={store.image}
                    likeCount={store.like_count}
                    likeState={store.like_state}
                    changeLikedState={changeLikedState}
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
