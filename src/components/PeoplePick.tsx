import React, { useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosAddCircle
} from "react-icons/io";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface IProps {
  info: never[];
  TITLE: string[];
}

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <img
      alt="rightArrow"
      src="./images/arrow-right.png"
      className={className}
      style={{
        ...style,
        display: "block",
        width: "2.5rem",
        height: "2.5rem",
        top: "-43px",
        left: "1001px"
      }}
      onClick={onClick}
    ></img>
  );
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <img
      alt="rightArrow"
      src="./images/arrow-left.png"
      className={className}
      style={{
        ...style,
        display: "block",
        width: "2.5rem",
        height: "2.5rem",
        top: "-43px",
        left: "951px"
      }}
      onClick={onClick}
    ></img>
  );
}

export default function PeoplePick({ info, TITLE }: IProps) {
  const history = useHistory();

  const settings = {
    dots: false,
    infinite: false,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    className: "slides"
  };
  return (
    <Wrapper>
      <Container>
        <Header>
          <Title>
            <p>{TITLE[0]}</p>
            <p>{TITLE[1]}</p>
          </Title>
          <Line></Line>
          <Arrow>
            <div className="left arrow">
              <IoIosArrowBack className="arrowIcon" />
            </div>
            <div className="right arrow">
              <IoIosArrowForward className="arrowIcon" />
            </div>
          </Arrow>
        </Header>
        <CardWrapper>
          <Slider {...settings}>
            {info.length &&
              info.map(
                ({ id, image, name, position, store_id, store, desc }: any) => (
                  <CardEach id={id}>
                    <Profile>
                      <img src={image} />
                      <div className="name">{name}</div>
                      <div className="position">{position}</div>
                    </Profile>
                    <Desc>
                      <div className="storeHeader">
                        <span className="decoTitle">" </span>
                        <span className="storeTitle">{store}</span>
                        <span className="decoTitle"> "</span>
                      </div>
                      <div className="storeDesc">{desc}</div>
                    </Desc>
                    <MoreBtn>
                      <span
                        className="seeStoreInfo"
                        onClick={() =>
                          history.push(`/store-detail/${store_id}`)
                        }
                      >
                        맛집 구경하기
                      </span>
                      <IoIosAddCircle className="btnIcon" />
                    </MoreBtn>
                  </CardEach>
                )
              )}
          </Slider>
        </CardWrapper>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  height: 55rem;
  background-color: ${({ theme }) => theme.mentorBack};
  line-height: 1.3;
`;

const Container = styled.div`
  font-family: "Bazzi";
  margin: 5rem auto;
  padding-top: 3rem;
  width: 65rem;
`;

const Header = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 1.5rem;
`;

const Title = styled.h2`
  width: 55rem;
  font-size: 2.5rem;
  letter-spacing: 0.4rem;
`;

const Line = styled.div`
  margin-right: 1rem;
  width: 100%;
  height: 1.25rem;
  border-top: 2px solid ${({ theme }) => theme.borderGray};
`;

const Arrow = styled.div`
  cursor: pointer;
  display: flex;

  .arrow {
    width: 2.5rem;
    height: 2.5rem;
    background-color: #0000000d;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .left {
    margin-right: 0.5rem;
  }

  .right {
  }

  .arrowIcon {
    width: 50%;
    height: 50%;
    color: ${({ theme }) => theme.buttonGray};
  }
`;

const CardWrapper = styled.div``;

const CardEach = styled.div`
  position: relative;
  float: left;
  width: 33.33%;
  height: 40rem;
  padding-right: 1rem;
  outline: none;
`;

const Profile = styled.section`
  padding: 1.25rem;

  img {
    border-radius: 50%;
    width: 15rem;
    height: 15rem;
  }

  .name {
    font-size: 1.3rem;
    font-weight: 900;
    line-height: 1.14;
    margin-top: 1.94rem;
  }

  .position {
    margin-top: 0.6rem;
    font-size: 1rem;
    line-height: 1.07;
  }
`;

const Desc = styled.section`
  line-break: anywhere;
  padding: 1.25rem 1.13rem;
  line-height: 1.88;
  margin-bottom: 2.25rem;

  .storeHeader {
    .decoTitle {
    }
    .storeTitle {
      font-weight: 900;
      font-size: 1.15rem;
    }
  }
`;

const MoreBtn = styled.span`
  cursor: pointer;
  font-size: 1.2rem;
  margin: 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 7rem;
  height: 1.5rem;
  position: absolute;
  bottom: 0;
  right: 0rem;

  .btnIcon {
    font-size: 1.3rem;
  }
`;
