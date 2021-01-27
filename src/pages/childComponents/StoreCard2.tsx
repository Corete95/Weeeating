import React from "react";

interface Props {
  image: string;
  title: string;
  heart: number;
}

export default function StoreCard2({ image, title, heart }: Props) {
  return (
    <>
      <div className="storeCard">
        <div className="rankingComponents">
          <div className="storeHeader">
            <p>Weeeating</p>
            <hr></hr>
            <img src={image}></img>
            <hr></hr>
          </div>
          <div className="storeFooter">
            <p className="foodName">{title}</p>
            <img src="./images/heart.png"></img>
            <p className="heartTotal">{heart}</p>
          </div>
        </div>
      </div>
    </>
  );
}
