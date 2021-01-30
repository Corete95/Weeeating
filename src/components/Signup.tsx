import React, { useState } from "react";
import axios from "axios";
import { BEAPI } from "../config";
import { SignupForm } from "./index";

export default function Signup() {
  const [user, setUser] = useState({
    number: null,
    userName: null,
    email: null,
    password: null,
    repassword: null
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUser((prevState: any) => ({
      ...prevState,
      [name]: value
    }));
  };

  const submitSingup = () => {
    if (user.password === user.repassword || !user.password) {
      const data = {
        number: user.number,
        name: user.userName,
        email: user.email,
        password: user.password
      };
      axios
        .post(`${BEAPI}/user/signup`, { data })
        .then((res) => {
          if (res.data.success === "SUCCESS") {
            if (window.localStorage.getItem("token")) {
              localStorage.token = res.data.token;
              localStorage.isAuthenticated = true;
              window.location.reload();
            } else {
              window.localStorage.setItem("token", res.data.token);
              window.location.reload();
            }
          } else {
            alert("회원가입이 완료되지 않았습니다.");
          }
        })
        .catch((err) => console.log("회원가입 통신이 원활하지 않습니다.", err));
    } else {
      alert(
        "재입력한 비밀번호가 일치하지 않습니다. 비밀번호를 다시 입력해주세요."
      );
    }
  };

  const props = { handleChange, submitSingup };

  return <SignupForm {...props} />;
}
