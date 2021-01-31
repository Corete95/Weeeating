import React from "react";
import { useHistory } from "react-router-dom";

function KobbubakTheme() {
  const history = useHistory();
  return (
    <>
      <div
        className="kobbubakMain"
        onClick={() => history.push("./kobbubak-detail")}
      >
        <div className="kobbubakCenter">
          <p className="pFont">&gt; 코뿌박이</p>
          <p className="pFont recommend">추천한다</p>
        </div>
        <div className="kobbubakText">
          <p>먹는거에</p>
          <p>나만 또 진심이야?</p>
        </div>
      </div>
    </>
  );
}

export default KobbubakTheme;
