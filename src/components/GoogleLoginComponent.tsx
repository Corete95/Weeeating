import React, { useRef, useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { API } from "../config";
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
    console.log("구글로그인");
    console.log("response", response);
    const { accessToken } = response;

    axios
      .post(`${API}/user/login/social`, "data", {
        headers: {
          Authorization: accessToken
        }
      })
      .then((res: any) => {
        console.log("res", res);
        localStorage.setItem("token", res.data.Authorization);
        localStorage.setItem("user_id", res.data.user_id);
        localStorage.setItem("isAuthenticated", "true");
        alert("구글 로그인 되었습니다");

        // true일 때 회원가입 모달 창을 띄우면서 (INITIAL_STATE.first === true)면, 다른 API 주소로 통신하게끔 변경하기
        if (res.data.first_visit === true) {
          dispatch(setFirstLogin(true));
          dispatch(setSignupActive(true));
          dispatch(setLoginActive(false));
        } else {
          history.push("/");
        }
      })
      .catch((err: any) => {
        console.log("ERRORS! ===>", err);
        alert("구글 로그인에 Error가 발생하였습니다");
      });
  };

  return (
    <Container>
      <GoogleLogin
        // render={(renderProps) => (
        //   <span className="googleBtn">구글로 로그인하기</span>
        // )}
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
  font-size: 1.15em;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3.5em;
  text-align: center;
  cursor: pointer;

  .googleBtn {
    /* border: 2px solid ${({ theme }) => theme.mainYellow}; */
    /* background-color: ${({ theme }) => theme.lightYellow}; */
    font-size: 1.05rem;
    font-weight: 700;
    color: black;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
