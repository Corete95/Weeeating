import React from "react";

interface Props {
  top: string;
  image: string;
  title: string;
  heart: number;
}

export default function StoreCard({ top, image, title, heart }: Props) {
  return (
    <>
      <div className="storeCard">
        <div className="ranking">
          <img className="iconCrown" src="./images/crown.png"></img>
          <p>{top}</p>
        </div>
        <div className="rankingComponents">
          <p>Weeeating</p>
          <hr></hr>
          <img src={image}></img>
          <hr></hr>
          <div className="storeFooter">
            <p className="foodName">{title}</p>
            <img src="./images/heart.png"></img>
            <p>{heart}</p>
          </div>
        </div>
      </div>
    </>
  );
}
