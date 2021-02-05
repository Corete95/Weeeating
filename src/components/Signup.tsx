import React, { useState } from "react";
import axios from "axios";
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

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUser((prevState: any) => ({
      ...prevState,
      [name]: value
    }));
  };

  const submitSingup = () => {
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
          console.log("회원가입 통신 잘 됐음!", res);
          if (res.data.MESSAGE === "SUCCESS") {
            alert("회원가입이 완료되었습니다. :-)");
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
