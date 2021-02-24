import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&family=Yeon+Sung&display=swap');

  ${reset}

  body{
    font-family: 'Noto Sans KR', sans-serif, serif;
    font-family: 'Yeon Sung', cursive;
@font-face {
  font-family: 'Y_Spotlight';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts-20-12@1.0/Y_Spotlight.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

// 잉크립퀴드체
@font-face { 
  font-family: 'InkLipquid';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/InkLipquid.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

//코트라 고딕체
@font-face {
  font-family: 'KOTRA_GOTHIC';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10-21@1.0/KOTRA_GOTHIC.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

//넥슨 배찌체
@font-face {
  font-family: 'Bazzi';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/Bazzi.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: '777Balsamtint';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_nine_@1.1/777Balsamtint.woff') format('woff');
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
