import React, { useState } from "react";
import { useHistory } from "react-router-dom";

interface Props {
  id: number;
  top: string;
  image: string;
  name: string;
  likeCount: number;
  likeState: boolean;
  changeLikedState: (id: any) => void;
}

export default function StoreCard({
  id,
  top,
  image,
  name,
  likeCount,
  likeState,
  changeLikedState
}: Props) {
  const history = useHistory();

  return (
    <>
      <div className="storeCard">
        <div className="ranking">
          <img
            alt="CrownIcon"
            className="iconCrown"
            src="./images/crown.png"
          ></img>
          <p>{top}</p>
        </div>
        <div className="rankingComponents">
          <div
            className="storeHeader"
            onClick={() => history.push(`/store-detail/${id}`)}
          >
            <p>Weeeating</p>
            <img alt="storeImg" src={image}></img>
          </div>
          <div className="storeFooter">
            <p className="foodName">{name}</p>
            <span onClick={() => changeLikedState(id)}>
              {likeState ? (
                <img alt="Like" src="./images/fullheart.png"></img>
              ) : (
                <img alt="Like" src="./images/heart.png"></img>
              )}
            </span>
            <p className="heartTotal">{likeCount}</p>
          </div>
        </div>
      </div>
    </>
  );
}
