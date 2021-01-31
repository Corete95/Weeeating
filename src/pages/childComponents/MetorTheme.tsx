import React from "react";
import { useHistory } from "react-router-dom";

function MetorTheme() {
  const history = useHistory();
  return (
    <>
      <div className="metorMain" onClick={() => history.push("./metor-detail")}>
        <div className="metorCenter">
          <p> &gt; 멘토의 추천</p>
          <p className="pick">PICK</p>
        </div>
        <div className="metorText">
          <p>역대</p>
          <p>멘토들의</p>
          <p>추천 맛집</p>
        </div>
      </div>
    </>
  );
}

export default MetorTheme;
