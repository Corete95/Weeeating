import React, { useState } from "react";
import { useHistory } from "react-router-dom";

interface Props {
  id: number;
  top: string;
  image: string;
  name: string;
  likeCount: number;
  likeState: boolean;
}

export default function StoreCard({
  id,
  top,
  image,
  name,
  likeCount,
  likeState
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
        <div className="ranking">
          <img className="iconCrown" src="./images/crown.png"></img>
          <p>{top}</p>
        </div>
        <div className="rankingComponents">
          <div
            className="storeHeader"
            onClick={() => history.push(`/store-detail/${id}`)}
          >
            <p>Weeeating</p>
            <hr></hr>
            <img src={image}></img>
            <hr></hr>
          </div>
          <div className="storeFooter">
            <p className="foodName">{name}</p>
            <img src={iconLike} onClick={heartLike}></img>
            <p className="heartTotal">{likeCount}</p>
          </div>
        </div>
      </div>
    </>
  );
}
