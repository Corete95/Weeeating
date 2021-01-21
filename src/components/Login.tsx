import React from "react";
import styled from "styled-components";
import { mixin } from "../styles";
import { GoogleLoginComponent } from "./index";

interface StateForStyle {
  short?: boolean;
  needSpace?: boolean;
  buttons?: boolean;
}

export default function Login() {
  return (
    <Container>
      <Title>로그인</Title>
      <InfoSection action="" method="POST">
        <BlockWrapper>
          <Subject>아이디</Subject>
          <Input type="text" name="id"></Input>
        </BlockWrapper>
        <BlockWrapper>
          <Subject>비밀번호</Subject>
          <Input type="text" name="password"></Input>
        </BlockWrapper>
        <BlockWrapper buttons={true}>
          <GoogleLoginComponent />
          <LoginBtn type="submit" value="로그인"></LoginBtn>
        </BlockWrapper>
      </InfoSection>
    </Container>
  );
}

const Container = styled.div`
  margin: 2em 1.5em;
`;

const Title = styled.h1`
  height: 1em;
  text-align: center;
  font-size: 6em;
  font-weight: 900;
  margin-bottom: 1.1em;
  letter-spacing: 0.2em;
`;

const InfoSection = styled.form`
  margin: 0 2.5em;
  height: 20em;
`;

const BlockWrapper = styled.div<StateForStyle>`
  margin: ${({ buttons }) => (buttons ? "5.7em 0 0" : "3em 0")};
  height: 2.5em;
  justify-content: space-between;
  align-items: center;
  display: flex;
`;

const Subject = styled.div<StateForStyle>`
  text-align: center;
  width: 3.5em;
  margin-right: 1.5em;
  margin-left: ${({ needSpace }) => (needSpace ? "1.5em" : "0")};
`;

const Input = styled.input<StateForStyle>`
  width: ${({ short }) => (short ? "10.5em" : "30em")};
  height: 4em;
`;

const LoginBtn = styled.input`
  margin-top: 2em;
  width: 28.6em;
  font-size: 1em;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4em;
  text-align: center;
  background-color: white;
  cursor: pointer;
`;
