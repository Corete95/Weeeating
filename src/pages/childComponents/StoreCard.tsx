import React, { useState } from "react";

interface Props {
  top: string;
  image: string;
  title: string;
  heart: number;
}

export default function StoreCard({ top, image, title, heart }: Props) {
  const [fullLike, setFullLike] = useState<boolean>(true);

  const heartLike = () => {
    setFullLike(!fullLike);
  };
  const iconLike = fullLike ? "./images/heart.png" : "./images/fullheart.png";
  return (
    <>
      <div className="storeCard">
        <div className="ranking">
          <img className="iconCrown" src="./images/crown.png"></img>
          <p>{top}</p>
        </div>
        <div className="rankingComponents">
          <div className="storeHeader">
            <p>Weeeating</p>
            <hr></hr>
            <img src={image}></img>
            <hr></hr>
          </div>
          <div className="storeFooter">
            <p className="foodName">{title}</p>
            <img src={iconLike} onClick={heartLike}></img>
            <p className="heartTotal">{heart}</p>
          </div>
        </div>
      </div>
    </>
  );
}
