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
  const [fullLike, setFullLike] = useState<boolean>(true);
  const history = useHistory();

  const heartLike = () => {
    setFullLike(!fullLike);
  };

  const iconLike = fullLike ? "./images/heart.png" : "./images/fullheart.png";
  return (
    <>
      <div className="storeCard">
        <div className="rankingComponents">
          <div
            className="storeHeader"
            onClick={() => history.push(`/store-detail/${id}`)}
          >
            <p>Weeeating</p>
            <hr></hr>
            <img alt="storeImg" src={image}></img>
            <hr></hr>
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
            {/* <img
              alt="Like"
              src={iconLike}
              onClick={() => changeLikedState(id)}
            ></img> */}
            <p className="heartTotal">{likeCount}</p>
          </div>
        </div>
      </div>
    </>
  );
}
