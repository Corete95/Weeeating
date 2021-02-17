import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { API } from "../config";
import { SignupForm } from "./index";

export default function Signup() {
  const [user, setUser] = useState({
    number: null,
    userName: null,
    email: null,
    password: null,
    repassword: null
  });

  const googleSignup = useSelector(
    ({ setFirstReducer }) => setFirstReducer.first
  );

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const isValidateEmail = (value: any) => {
    let email = value;
    let regExp = /^[0-9a-zA-Z]{3}([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]{2,3}([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
    if (!regExp.test(email)) {
      alert("이메일형식이 올바르지 않습니다.");
      return false;
    }
    return true;
  };

  const isValidatePassword = (value: any) => {
    let password = value;
    let regExp = /^.{6}/;
    if (!regExp.test(password)) {
      alert("비밀번호는 6글자 이상이어야 합니다.");
      return false;
    }
    return true;
  };

  const submitSingup = async (event: any, type: string) => {
    event.preventDefault();

    switch (type) {
      case "login":
        const checkValidation = await Promise.all([
          isValidateEmail(user.email),
          isValidatePassword(user.password)
        ]).then((res) => res);

        const isValid = !checkValidation.some((bool) => !bool);

        if (isValid) {
          if (user.password === user.repassword || !user.password) {
            const body = {
              number: user.number,
              name: user.userName,
              email: user.email,
              password: user.password
            };
            axios
              .post(`${API}/user/signup`, JSON.stringify({ ...body }))
              .then((res) => {
                if (res.data.MESSAGE === "USER_SIGNUP_SUCCESS") {
                  localStorage.setItem("token", res.data.Authorization);
                  localStorage.setItem("user_id_number", res.data.user_id);
                  localStorage.isAuthenticated = true;
                  alert("회원가입과 로그인이 완료되었습니다. :-)");
                  window.location.reload();
                } else {
                  alert("회원가입이 완료되지 않았습니다.");
                }
              })
              .catch((err) =>
                console.log("회원가입 통신이 원활하지 않습니다.", err)
              );
          } else {
            alert(
              "재입력한 비밀번호가 일치하지 않습니다. 비밀번호를 다시 입력해주세요."
            );
          }
        }
        break;
      case "login/google":
        const body = {
          number: user.number,
          name: user.userName
        };
        axios
          .post(`${API}/user/signup/google`, JSON.stringify({ ...body }), {
            headers: {
              Authorization: localStorage.getItem("token")
            }
          })
          .then((res) => {
            if (res.data.MESSAGE === "UPDATE_SUCCESS") {
              alert("회원가입이 완료되었습니다. :-)");
              localStorage.isAuthenticated = true;
              window.location.reload();
            } else {
              alert("구글 회원가입이 완료되지 않았습니다.");
            }
          })
          .catch((err) =>
            console.log("구글 회원가입 통신이 원활하지 않습니다.", err)
          );
        break;
      default:
        break;
    }
  };

  const props = { handleChange, submitSingup };

  return <SignupForm {...props} />;
}
