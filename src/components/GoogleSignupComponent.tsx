import React from "react";
import { GoogleLogin } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { API } from "../config";
import { setSignupActive, setFirstLogin } from "../store/actions";

export default function GoogleLoginComponent() {
  const history = useHistory();
  const dispatch = useDispatch();

  const displayGoogle = useSelector(
    ({ setFirstReducer }) => setFirstReducer.first
  );

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

        if (res.data.FIRST_VISIT === true) {
          alert("기수와 이름을 입력한 후, 회원가입 버튼을 클릭해주세요!");
          dispatch(setFirstLogin(true));
        } else {
          dispatch(setSignupActive(false));
          history.push("/");
          alert("구글 회원가입 되었습니다.");
        }
      })
      .catch((err: any) => {
        console.log("ERRORS! ===>", err);
        alert("구글 회원가입에 Error가 발생하였습니다.");
      });
  };

  return !displayGoogle ? (
    <Container>
      <GoogleLogin
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            className="googleLogin"
            disabled={renderProps.disabled}
          >
            구글 회원가입
          </button>
        )}
        clientId="675033028389-t4ff8ilfoffg5f3pcrkrcg88tqvqisv7.apps.googleusercontent.com"
        buttonText="구글 회원가입"
        onSuccess={responseGoogle}
        onFailure={(err) => console.log("Google Error", err)}
        cookiePolicy={"single_host_origin"}
      />
    </Container>
  ) : null;
}

const Container = styled.div`
  font-family: sans-serif;
  margin-left: 0.7em;
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
    font-size: 1.15rem;
    font-weight: 700;
    color: black;
    width: 100%;
    height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;
