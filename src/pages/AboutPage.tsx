import React from "react";
import AOS from "aos";
import "./AboutPage.scss";
import "aos/dist/aos.css";

export default function AboutPage() {
  AOS.init({
    duration: 1200,
    delay: 400
  });
  return (
    <>
      <div className="aboutPage">
        <div className="aboutTop">
          <div
            className="aboutTopText"
            data-aos="fade-right"
            data-aos-duration="1500"
          >
            <p>
              <span className="hello">안녕하세요</span>
            </p>
            <p>
              저희는 <span>13기</span>
            </p>
            <p>
              <span>미니 코뿌박</span> 입니다
            </p>
          </div>
        </div>
        <div className="aboutCenter">
          <div className="aboutCenterImg">
            <img src="./images/weeeating_team.gif"></img>
          </div>
          <div className="aboutCenterText">
            <div className="centerTextTop">
              <div className="weeeating">
                <p>Weeeating 은,</p>
              </div>
            </div>
            <div className="centerTextCenter">
              <p>
                안녕하세요. 저희는 13기 미니 코뿌박(김예진, 김정현, 백은진,
                전민승) 입니다.
                <br /> 사전스터디 팀으로 이어진 인연으로 프로젝트까지 하게
                되었습니다. 위코드를 다니며 코드에 대한 고민도 많았지만 끼니마다
                “오늘은 무엇을 먹어야하지”, “뭐가 맛있을까”에 대해 늘
                고민했어요.
                <br /> 이런 고민은 저희 뿐 아니라 많은 위코더 분들도 할 수 있는
                고민이라고 생각했고,
                <br /> 그 고민을 덜어주고 더 맛있는 음식을 공유하면 좋겠다! 로
                시작된 프로젝트 Weeeating 입니다. 초반에는 더 다양한 기능들을
                기획했었지만 배포와 사용을 목적으로 두고 <br /> 최소한의
                기능으로 만들게 되었습니다. <br /> <br /> 한국인은 밥 심! 코드도
                중요하지만 옆에서 함께하는 동기들과 맛있는 점심 저녁을 나누면서
                힘을 얻으셨으면 좋겠습니다!!
              </p>
            </div>
            <div className="centerTextBottom"></div>
          </div>
        </div>
        <div className="clickLink">
          <div className="clickTop">
            <a
              className="clickTopText"
              href="https://docs.google.com/forms/d/e/1FAIpQLSd4_kFB-XCsyNXT8F4OCHgv9GHm2r5cTtHhB9Z1UKPa6Ss3Wg/viewform?usp=sf_link"
              target="_blank"
            >
              <p className="subwayText">
                이 글을 <span className="click"> 클릭</span>해서
                {/* <img src="./images/subwaylogo.png"></img> */}
              </p>
              <p>위코더에게 추천해주고싶은</p>
              <p>
                여러분의 <span className="goodFood">맛집</span>을 알려주세요 !
              </p>
            </a>
          </div>
        </div>
        <div className="aboutBottom">
          <div className="thanksTo">
            <p>Thanks To</p>
          </div>
          <div>
            <p>
              설문조사에 참여해주신 모든 위코더분들, 바쁜 와중에도 진심으로
              맛집을 추천해주신 위코드 멘토님들,
            </p>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="logoDiv">
          <img src="./images/weeeating_logo.png" />
        </div>
        <div className="logoText">
          <p>asd</p>
        </div>
      </div>
    </>
  );
}
