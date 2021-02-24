import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

interface IProps {
  handleChange: (e: any) => void;
  submitSingup: (event: any, type: string) => Promise<void>;
}

interface StateForStyle {
  short?: boolean;
  needSpace?: boolean;
}

export default function SignupForm({ handleChange, submitSingup }: IProps) {
  const firstGoogle = useSelector(
    ({ setFirstReducer }) => setFirstReducer.first
  );

  return (
    <Container>
      <Title>회원가입</Title>
      <InfoSection
        onSubmit={(event) =>
          submitSingup(event, firstGoogle ? "login/google" : "login")
        }
      >
        <BlockWrapper>
          <Subject short={true}>기수</Subject>
          <Input
            type="number"
            name="number"
            placeholder="숫자만!"
            onChange={handleChange}
            required
            short={true}
          ></Input>
          <Subject short={true} needSpace={true}>
            이름
          </Subject>
          <Input
            type="text"
            name="userName"
            placeholder="전체이름!"
            onChange={handleChange}
            required
            short={true}
            maxLength={4}
          ></Input>
        </BlockWrapper>
        <BlockWrapper>
          <Subject>이메일</Subject>
          <Input
            type="email"
            name="email"
            required
            placeholder={firstGoogle && "구글 정보가 이미 입력되었습니다"}
            disabled={firstGoogle ? true : false}
            onChange={handleChange}
          ></Input>
        </BlockWrapper>
        <BlockWrapper>
          <Subject>비밀번호</Subject>
          <Input
            type="password"
            name="password"
            required
            placeholder={firstGoogle && "구글 정보가 이미 입력되었습니다"}
            disabled={firstGoogle ? true : false}
            onChange={handleChange}
          ></Input>
        </BlockWrapper>
        <BlockWrapper>
          <Subject>비밀번호 확인</Subject>
          <Input
            type="password"
            name="repassword"
            required
            placeholder={firstGoogle && "구글 정보가 이미 입력되었습니다"}
            disabled={firstGoogle ? true : false}
            onChange={handleChange}
          ></Input>
        </BlockWrapper>
        <Button
          type="submit"
          value="회원가입"
          className="button"
          onSubmit={(event) =>
            submitSingup(event, firstGoogle ? "login/google" : "login")
          }
        ></Button>
      </InfoSection>
    </Container>
  );
}

const Container = styled.div`
  margin: 2em 2.5em;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.mainYellow};
  height: 1em;
  margin-left: 1rem;
  text-align: center;
  font-size: 6em;
  font-weight: 900;
  margin-bottom: 0.5em;
  letter-spacing: 0.2em;
`;

const InfoSection = styled.form`
  font-family: "Noto Sans KR";
  margin: 0 2.5em;
  height: 20em;
`;

const BlockWrapper = styled.div`
  margin: 2em 0;
  height: 2.5em;

  display: flex;
  align-items: center;
  .button {
    background-color: ${({ theme }) => theme.lightYellow};
  }
`;

const Subject = styled.div<StateForStyle>`
  font-family: sans-serif;
  text-align: center;
  font-size: 1.15em;
  font-weight: 500;
  width: 4.6em;
  margin-right: 1.5em;
  margin-left: ${({ needSpace }) => (needSpace ? "1.5em" : "0")};
`;

const Input = styled.input<StateForStyle>`
  width: ${({ short }) => (short ? "7.4em" : "28em")};
  height: 4em;
  border: 2px solid ${({ theme }) => theme.mainYellow};
`;

const Button = styled.input`
  outline: none;
  border: 2px solid ${({ theme }) => theme.mainYellow};
  margin-top: 3em;
  margin-left: 6.5rem;
  width: 13em;
  font-size: 1.15rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3em;
  text-align: center;
  background-color: ${({ theme }) => theme.lightYellow};
  cursor: pointer;
`;
