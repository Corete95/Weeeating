import React, { useEffect, useState } from "react";
import axios from "axios";
import { LOCALAPI } from "../config";
import { PeoplePick } from "../components";

export default function MetorDetailContainer() {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    axios
      .get(`${LOCALAPI}/data/mentor.json`)
      .then((res: any) => setInfo(res.data))
      .catch((err: any) => console.log("Catched Errors!! >>>", err));
  }, []);

  const TITLE = ["위코드를 이끄는", "멘토들이 뽑은 최고의 맛집"];

  const MentorDetailProps = {
    info,
    TITLE
  };

  return <PeoplePick {...MentorDetailProps} />;
}
