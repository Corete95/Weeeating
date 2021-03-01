import React, { useState } from "react";
import { useHistory } from "react-router-dom";

interface Props {
  id: number;
  type: string;
  image: string;
  name: string;
  likeCount: number;
  likeState: boolean;
  changeLikedState: (id: any, type: string) => void;
}

export default function StoreCard({
  id,
  image,
  name,
  type,
  likeCount,
  likeState,
  changeLikedState
}: Props) {
  const history = useHistory();

  return (
    <>
      <div className="storeCard">
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
            <span onClick={() => changeLikedState(id, type)}>
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
