import React, { useEffect, useState } from "react";
import { API } from "../config";
import axios from "axios";
import StoreCard2 from "./childComponents/StoreCard2";
import Slider from "react-slick";
import "./AlcoholDetail.scss";
import "./MainPage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function AlcoholDetail({ match, props }: any) {
  const [alcoholData, setAlcoholData] = useState<any>([]);
  const alcohol = "alcohol";
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
  // 백엔드와 맞추기 위해 알콜 리스트 로직 작업
  useEffect(() => {
    axios
      .get(`${API}/store/list?tag=${alcohol}`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      .then((res) => {
        setAlcoholData(res.data.store_list);
      });
  }, []);

  // 백엔드와 맞추기위해 좋아요 로직 작업
  // const changeLikedState = () => {
  //   setAlcoholData({
  //     ...info,
  //     like_count: Number(
  //       info.like === false ? info.like_count + 1 : info.like_count - 1
  //     ),
  //     like: !info.like
  //   });
  //   axios
  //     .post(`${API1}/store/like/${props.match.params.id}`)
  //     .then((res) => console.log("좋아요 통신이 완료되었습니다.", res))
  //     .catch((err) => console.log("좋아요 통신이 완료되지 않았습니다.", err));

  // };

  // useEffect(() => {
  //   axios.get(`${API1}`).then((response) => {
  //     setAlcoholData(response.data);
  //   });
  // }, []);
  console.log(alcoholData);
  console.log(alcoholData.beer);
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
              {alcoholData.soju?.map((alcohol: any) => {
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
              {alcoholData.beer?.map((alcohol: any) => {
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
              {alcoholData.makgeolli?.map((alcohol: any) => {
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
