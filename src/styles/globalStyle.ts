import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&family=Yeon+Sung&display=swap');

  ${reset}

  body{
    font-family: 'Noto Sans KR', sans-serif, serif;
    font-family: 'Yeon Sung', cursive;
\@font-face {
  font-family: 'Y_Spotlight';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts-20-12@1.0/Y_Spotlight.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
  * {
    box-sizing: border-box;
  }
  
  a {
    text-decoration: none;
  }
\
`;
