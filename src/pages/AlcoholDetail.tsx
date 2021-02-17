import React, { useEffect, useState } from "react";
import { API } from "../config";
import axios from "axios";
import StoreCard2 from "./childComponents/StoreCard2";
import Slider from "react-slick";
import "./AlcoholDetail.scss";
import "./MainPage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
interface UserData {
  alcoholData: any;
}
export default function AlcoholDetail({ match, props }: any) {
  const [alcoholData, setAlcoholData] = useState<UserData | any>([]);
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

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .get(`${API}/store/list?tag=${alcohol}`, {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then((res) => {
          console.log("123", res.data.store_list);
          setAlcoholData(res.data.store_list);
        });
    } else {
      axios.get(`${API}/store/list?tag=${alcohol}`).then((res) => {
        setAlcoholData(res.data.store_list);
      });
    }
  }, []);

  const changeLikedState = (id: any, type: string) => {
    if (localStorage.getItem("token")) {
      setAlcoholData({
        ...alcoholData,
        [type]: alcoholData[type].map((data: any) => {
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
      });
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

  return (
    <>
      <div className="alcohol">
        <div className="logoBox">
          <img src="./images/alcoholLogo.png" />
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
                    type={"soju"}
                    image={alcohol.image}
                    likeCount={alcohol.like_count}
                    likeState={alcohol.like_state}
                    changeLikedState={changeLikedState}
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
                    type={"beer"}
                    image={alcohol.image}
                    likeCount={alcohol.like_count}
                    likeState={alcohol.like_state}
                    changeLikedState={changeLikedState}
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
                    type={"makgeolli"}
                    name={alcohol.name}
                    image={alcohol.image}
                    likeCount={alcohol.like_count}
                    likeState={alcohol.like_state}
                    changeLikedState={changeLikedState}
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
