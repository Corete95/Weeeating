import React, { useEffect, useState } from "react";
import { PeoplePick } from "../components";

export default function KobbubakDetailContainer() {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    fetch(`/data/kobbubak.json`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then((res: any) => res.json())
      .then((res: any) => setInfo(res));
  }, []);

  const TITLE = ["위코드 지박령", "13기_코뿌박 센빠이들이 추천하는 맛집"];

  const KobbubakDetailProps = {
    info,
    TITLE
  };

  return <PeoplePick {...KobbubakDetailProps} />;
}
