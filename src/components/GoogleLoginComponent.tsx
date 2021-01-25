import React, { useRef, useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { BEAPI } from "../config";

export default function GoogleLoginComponent() {
  const history = useHistory();
  const googleLoginBtn = useRef(null);
  const [token, setToken] = useState("");

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
        history.push("/");
      })
      .catch((err: any) => {
        console.log("ERRORS! ===>", err);
        alert("Error가 발생하였습니다");
      });
  };

  return (
    <Container>
      <GoogleLogin
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
`;
