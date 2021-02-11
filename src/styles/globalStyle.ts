import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&family=Yeon+Sung&display=swap');

  ${reset}

  body{
    font-family: 'Noto Sans KR', sans-serif, serif;
    font-family: 'Yeon Sung', cursive;
\
  * {
    box-sizing: border-box;
  }
  
  a {
    text-decoration: none;
  }
\
`;
