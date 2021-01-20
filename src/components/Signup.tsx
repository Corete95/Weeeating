import React from "react";
import styled from "styled-components";
import { mixin } from "../styles";

interface StateForStyle {
  short?: boolean;
  needSpace?: boolean;
}

export default function Signup() {
  return (
    <Container>
      <Title>회원가입</Title>
      <InfoSection action="" method="POST">
        <BlockWrapper>
          <Subject short={true}>기수</Subject>
          <Input type="text" name="order" short={true}></Input>
          <Subject short={true} needSpace={true}>
            이름
          </Subject>
          <Input type="text" name="fullName" short={true}></Input>
        </BlockWrapper>
        <BlockWrapper>
          <Subject>이메일</Subject>
          <Input type="email" name="email"></Input>
        </BlockWrapper>
        <BlockWrapper>
          <Subject>비밀번호</Subject>
          <Input type="text" name="password"></Input>
        </BlockWrapper>
        <BlockWrapper>
          <Subject>비밀번호 확인</Subject>
          <Input type="text" name="rePassword"></Input>
        </BlockWrapper>
        <Button type="submit" value="회원가입"></Button>
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
  margin-bottom: 0.5em;
  letter-spacing: 0.2em;
`;

const InfoSection = styled.form`
  margin: 0 2.5em;
  height: 20em;
`;

const BlockWrapper = styled.div`
  margin: 2em 0;
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

const Button = styled.input`
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
`;
