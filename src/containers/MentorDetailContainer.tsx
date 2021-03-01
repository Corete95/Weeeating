import React, { useEffect, useState } from "react";
import { PeoplePick } from "../components";

export default function MetorDetailContainer() {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    fetch(`/data/mentor.json`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then((res: any) => res.json())
      .then((res: any) => setInfo(res));
  }, []);

  const TITLE = ["위코드를 이끄는", "멘토들이 뽑은 최고의 맛집"];

  const MentorDetailProps = {
    info,
    TITLE
  };

  return <PeoplePick {...MentorDetailProps} />;
}
