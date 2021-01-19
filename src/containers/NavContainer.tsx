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
  const [modalActive, setModalActive] = useState({
    signup: false,
    login: false
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

  const changeModalActive = (domain: string) => {
    setModalActive({
      ...modalActive,
      [domain]: true
    });
  };

  const closeModal = () => {
    setModalActive({
      signup: false,
      login: false
    });
  };

  const NavProps = {
    weight,
    modalActive,
    goToPage,
    changeModalActive,
    closeModal
  };

  return <Nav {...NavProps} />;
}
