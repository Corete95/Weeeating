import React, { useEffect, useState } from "react";
import axios from "axios";
import { LOCALAPI } from "../config";
import { PeoplePick } from "../components";

export default function KobbubakDetailContainer() {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    axios
      .get(`${LOCALAPI}/data/kobbubak.json`)
      .then((res: any) => setInfo(res.data))
      .catch((err: any) => console.log("Catched Errors!! >>>", err));
  }, []);

  const TITLE = ["위코드 지박령", "13기_코뿌박 센빠이들이 추천하는 맛집"];

  const KobbubakDetailProps = {
    info,
    TITLE
  };

  return <PeoplePick {...KobbubakDetailProps} />;
}
