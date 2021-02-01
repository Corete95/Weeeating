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
            <img src="./images/about.jpg"></img>
          </div>
          <div className="aboutCenterText">
            <div className="centerTextTop">
              <div className="weeeating">
                <p>Weeeating 은,</p>
              </div>
            </div>
            <div className="centerTextCenter">
              <p>
                안녕하세요. <br />
                저희는 13기 미니 코뿌박(김예진 PM✨,김정현,백은진,전민승)
                입니다. 사전스터디 팀으로 이어진 인연인데 프로젝트를 같이 해보지
                못해서 취업전 프로젝트를 같이 해보고 싶어서 시작된 프로젝트
                Weeeating 입니다. 저희는 위코드를 다니며 코드에 대한 고심도
                많았지만 점심, 저녁 무엇을 먹어야 잘 먹었다고 소문이 날까에 대한
                고민도 많았습니다. 그래서 위코더 분들의 메뉴 선정에 대한 걱정을
                없애고, 코드에 조금 더 집중하실 수 있도록 하기 위해 프로젝트를
                시작하게 됐지만, 프로젝트 진행 중 팀원들이 취업을 하게 되어
                맛집등록 등 여러가지 기능을 빼고 초반 배포를 하게 되었습니다.
              </p>
            </div>
            <div className="centerTextBottom"></div>
          </div>
        </div>
        <div className="aboutBottom">
          <div className="thanksTo">
            <p>Thanks To</p>
          </div>
        </div>
      </div>
    </>
  );
}
