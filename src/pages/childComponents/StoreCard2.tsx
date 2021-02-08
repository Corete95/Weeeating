import React, { useState } from "react";
import { useHistory } from "react-router-dom";

interface Props {
  id: number;
  image: string;
  name: string;
  likeCount: number;
  likeState: boolean;
  changeLikedState: (id: any) => void;
}

export default function StoreCard({
  id,
  image,
  name,
  likeCount,
  likeState,
  changeLikedState
}: Props) {
  const [fullLike, setFullLike] = useState<boolean>(true);
  const history = useHistory();

  const heartLike = () => {
    setFullLike(!fullLike);
  };
  console.log("state", likeState);
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
            <span onClick={() => changeLikedState(id)}>
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
