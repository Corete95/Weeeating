import React, { useRef, useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { BEAPI } from "../config";
import {
  setSignupActive,
  setLoginActive,
  setFirstLogin
} from "../store/actions";

export default function GoogleLoginComponent() {
  const history = useHistory();
  const dispatch = useDispatch();

  // 구글 로그인 백엔드 통신 확인 후, 필요여부 재확인 예정
  const getGoogleOAuth2 = async () => {
    const oAuth2 = await localStorage.getItem(
      "oauth2_ss::http://localhost:3000::1::DEFAULT::_ss_"
    );

    console.log("oAuth2", oAuth2);
  };

  const responseGoogle = (response: any) => {
    console.log(response);
    const { accessToken } = response;

    axios
      .get(`${BEAPI}/user/login/social`, {
        headers: {
          Authorization: accessToken
        }
      })
      .then((res: any) => {
        localStorage.setItem("token", res.access_token);
        alert("구글 로그인 되었습니다");

        if (res.data.check === "FIRST VISIT") {
          dispatch(setFirstLogin(true));
          dispatch(setSignupActive(true));
          dispatch(setLoginActive(false));
        } else {
          history.push("/");
        }
      })
      .catch((err: any) => {
        console.log("ERRORS! ===>", err);
        alert("Error가 발생하였습니다");
      });
  };

  return (
    <Container>
      <GoogleLogin
        className="googleLogin"
        clientId="675033028389-t4ff8ilfoffg5f3pcrkrcg88tqvqisv7.apps.googleusercontent.com"
        buttonText="구글로 로그인하기"
        onSuccess={responseGoogle}
        onFailure={(err) => console.log("Google Error", err)}
        cookiePolicy={"single_host_origin"}
      />
    </Container>
  );
}

const Container = styled.div`
  margin-top: 2em;
  margin-right: 0.7em;
  width: 28.6em;
  font-size: 1em;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4em;
  text-align: center;
  border: 1px solid black;
  cursor: pointer;

  .googleLogin {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }
`;
