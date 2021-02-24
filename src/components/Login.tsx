import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../config";
import { LoginForm } from "./index";

export default function Login() {
  const [user, setUser] = useState({
    email: null,
    password: null
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const isValidateEmail = (value: any) => {
    let email = value;
    let regExp = /^[0-9a-zA-Z]{3}([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]{3}([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
    if (!regExp.test(email)) {
      alert("이메일형식이 올바르지 않습니다.");
      return false;
    }
    return true;
  };

  const submitLogin = async (event: any) => {
    event.preventDefault();

    const isValid = await isValidateEmail(user.email);

    if (isValid) {
      const data = {
        email: user.email,
        password: user.password
      };

      axios
        .post(`${API}/user/login`, JSON.stringify(data))
        .then((res) => {
          if (res.data.MESSAGE === "SUCCESS") {
            localStorage.setItem("token", res.data.Authorization);
            localStorage.setItem("user_id_number", res.data.user_id);
            localStorage.isAuthenticated = true;
            window.location.reload();
          } else {
            alert("로그인이 완료되지 않았습니다.");
          }
        })
        .catch((err) => console.log("로그인 통신이 원활하지 않습니다.", err));
    }
  };

  const props = { handleChange, submitLogin };

  return <LoginForm {...props} />;
}
