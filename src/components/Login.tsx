import React, { useState, useEffect } from "react";
import axios from "axios";
import { BEAPI } from "../config";
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
    setUser((prevState: any) => ({
      ...prevState,
      [name]: value
    }));
  };

  const submitLogin = () => {
    const data = {
      email: user.email,
      password: user.password
    };
    console.log("data", data);
    axios
      .post(`${BEAPI}/user/login`, JSON.stringify(data))
      .then((res) => {
        console.log("res", res.data);
        if (res.data.MESSAGE === "SUCCESS") {
          console.log("res.data.Authorization", res.data.Authorization);
          localStorage.setItem("token", res.data.Authorization);
          localStorage.isAuthenticated = true;
          window.location.reload();
        } else {
          alert("로그인이 완료되지 않았습니다.");
        }
      })
      .catch((err) => console.log("로그인 통신이 원활하지 않습니다.", err));
  };

  const props = { handleChange, submitLogin };

  return <LoginForm {...props} />;
}
