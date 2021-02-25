import React, { useEffect, useState } from "react";
import AOS from "aos";
import "./AboutPage.scss";
import "aos/dist/aos.css";

export default function AboutPage() {
  const [iconListCheck, setIconListCheck] = useState<boolean>(false);
  AOS.init({
    duration: 1200,
    delay: 400
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const iconClick = () => {
    setIconListCheck(!iconListCheck);
  };

  return (
    <>
      <div className="aboutPage">
        <div className="aboutTop">
          <div
            className="aboutTopText"
            data-aos="fade-down"
            data-aos-duration="1500"
          >
            <p>
              <span className="hello">안녕하세요</span>
            </p>
            <p>
              저희는 <span>13기</span>
            </p>
            <p>
              <span>코뿌박</span> 입니다
            </p>
          </div>
        </div>
        <div
          className="aboutCenter"
          data-aos="fade-up"
          data-aos-duration="1500"
        >
          <div className="aboutCenterText">
            <img src="./images/about.png" />
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="logoDiv">
          <img src="./images/weeeating_logo.png" />
          <a
            className="clickTopText"
            href="https://docs.google.com/forms/d/e/1FAIpQLSd4_kFB-XCsyNXT8F4OCHgv9GHm2r5cTtHhB9Z1UKPa6Ss3Wg/viewform?usp=sf_link"
            target="_blank"
          >
            <p className="subwayText">
              이 글을 <span className="click"> 클릭</span>해서
            </p>
            <p>위코더에게 추천해주고싶은</p>
            <p>
              여러분의 <span className="goodFood">맛집</span>을 알려주세요 !
            </p>
          </a>
        </div>
        <div className="logoText">
          <p className="project">© 2021 Project Weeeating</p>
          <div className="iconList">
            {!iconListCheck ? (
              <p>
                사용한 저작권 무료 아이콘 목록
                <span className="down" onClick={iconClick}>
                  ▼
                </span>
              </p>
            ) : (
              <>
                <p>
                  사용한 저작권 무료 아이콘 목록
                  <span className="down" onClick={iconClick}>
                    ▲
                  </span>
                </p>
                <div className="cpyright">
                  <p>https://www.flaticon.com/kr/free-icon/crown_891024 </p>
                  <p>https://www.flaticon.com/kr/free-icon/soju_2090192</p>
                  <p>
                    https://www.flaticon.com/kr/free-icon/beer_701495?term=%EB%A7%A5%EC%A3%BC&page=1&position=14&related_id=701495&origin=search
                  </p>
                  <p>
                    https://www.flaticon.com/free-icon/sake_863399?term=sake&page=1&position=5&related_id=863399&origin=search
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
