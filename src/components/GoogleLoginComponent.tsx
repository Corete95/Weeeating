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
  };

  const responseGoogle = (response: any) => {
    const { accessToken } = response;

    axios
      .post(`${API}/user/login/social`, "data", {
        headers: {
          Authorization: accessToken
        }
      })
      .then((res: any) => {
        localStorage.setItem("token", res.data.Authorization);
        localStorage.setItem("user_id_number", res.data.user_id);
        localStorage.setItem("isAuthenticated", "true");

        if (res.data.FRIST_VISIT === true) {
          alert("구글 첫 로그인입니다. 회원가입을 해주세요.");
          dispatch(setFirstLogin(true));
          dispatch(setSignupActive(true));
          dispatch(setLoginActive(false));
        } else {
          alert("구글 로그인 되었습니다.");
          history.push("/");
          dispatch(setLoginActive(false));
        }
      })
      .catch((err: any) => {
        console.log("ERRORS! ===>", err);
        alert("구글 로그인에 Error가 발생하였습니다.");
      });
  };

  return (
    <Container>
      <GoogleLogin
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            className="googleLogin"
            disabled={renderProps.disabled}
          >
            구글로 로그인하기
          </button>
        )}
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
  font-family: sans-serif;
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

  .googleLogin {
    outline: none;
    border: 2px solid ${({ theme }) => theme.mainYellow};
    background-color: ${({ theme }) => theme.lightYellow};
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
