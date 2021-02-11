import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Nav } from "../components";

export default function NavContainer() {
  const history = useHistory();

  const [weight, setWeight] = useState({
    storeList: false,
    todayRandom: false,
    postList: false,
    aboutPage: false
  });

  const goToPage = (path: string, page: string) => {
    const initialState = {
      storeList: false,
      todayRandom: false,
      postList: false,
      aboutPage: false
    };
    history.push(`${path}`);

    if (page === "main") {
      setWeight({
        ...initialState
      });
    } else {
      setWeight({
        ...initialState,
        [page]: true
      });
    }
  };

  const NavProps = {
    weight,
    goToPage
  };

  return <Nav {...NavProps} />;
}
