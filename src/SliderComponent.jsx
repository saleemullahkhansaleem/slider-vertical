import React, { useEffect, useState } from "react";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import "./style.css";

const slides = [
  {
    image:
      "https://raw.githubusercontent.com/supahfunk/supah-codepen/master/canyon-2.jpg",
    text: "Canyon",
  },
  {
    image:
      "https://raw.githubusercontent.com/supahfunk/supah-codepen/master/canyon-3.jpg",
    text: "Desert",
  },
  {
    image:
      "https://raw.githubusercontent.com/supahfunk/supah-codepen/master/canyon-4.jpg",
    text: "Erosion",
  },
  {
    image:
      "https://raw.githubusercontent.com/supahfunk/supah-codepen/master/canyon-1.jpg",
    text: "Shape",
  },
];

const SliderComponent = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const preventScroll = (event) => {
      event.preventDefault();
    };

    if (activeIndex < slides.length - 1) {
      document.body.addEventListener("wheel", preventScroll, {
        passive: false,
      });
    }

    return () => {
      document.body.removeEventListener("wheel", preventScroll);
    };
  }, [activeIndex]);

  const handleWheel = (event) => {
    if (isTransitioning) return;

    if (event.deltaY < 0) {
      if (activeIndex > 0) {
        prevSlide();
      }
    } else {
      if (activeIndex < slides.length - 1) {
        nextSlide();
      }
    }

    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  return (
    <div className="slider-container" onWheel={handleWheel}>
      <div className="slideshow">
        {slides.map((slide, index) => (
          <div key={index}>
            <div
              className={`slide left ${
                index === activeIndex ||
                index === activeIndex - 1 ||
                (index === slides.length - 1 && activeIndex === 0)
                  ? "active"
                  : ""
              } ${
                index === activeIndex - 1 ||
                (index === slides.length - 1 && activeIndex === 0)
                  ? "previous"
                  : ""
              } ${
                index === activeIndex + 1 ||
                (index === 0 && activeIndex === slides.length - 1)
                  ? "next"
                  : ""
              }`}
            >
              <div className="item">
                <img src={slide.image} alt={`Slide ${index}`} />
              </div>
            </div>
            <div
              className={`slide right ${
                index === activeIndex ||
                index === activeIndex - 1 ||
                (index === slides.length - 1 && activeIndex === 0)
                  ? "active"
                  : ""
              } ${
                index === activeIndex - 1 ||
                (index === slides.length - 1 && activeIndex === 0)
                  ? "previous"
                  : ""
              } ${
                index === activeIndex + 1 ||
                (index === 0 && activeIndex === slides.length - 1)
                  ? "next"
                  : ""
              }`}
            >
              <div className="item">
                <img src={slide.image} alt={`Slide ${index}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="slideshow-text">
        {slides.map((slide, index) => (
          <div
            className={`item ${index === activeIndex ? "active" : ""} ${
              index === activeIndex - 1 ||
              (index === slides.length - 1 && activeIndex === 0)
                ? "previous"
                : ""
            } ${
              index === activeIndex + 1 ||
              (index === 0 && activeIndex === slides.length - 1)
                ? "next"
                : ""
            }`}
            key={index}
          >
            {slide.text}
          </div>
        ))}
      </div>
      <div className="dots">
        {slides.map((slide, index) => (
          <div
            className={`dot-line ${index === activeIndex ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
            key={index}
          ></div>
        ))}
      </div>
      <div className="up-btn" onClick={prevSlide}>
        <FaArrowAltCircleUp />
      </div>
      <div className="down-btn" onClick={nextSlide}>
        <FaArrowAltCircleDown />
      </div>
    </div>
  );
};

export default SliderComponent;
