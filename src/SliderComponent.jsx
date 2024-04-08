import React, { useEffect, useState } from "react";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import "./style.css";

const slides = [
  {
    image: "slide-1.webp",
    text: "Canyon",
    description:
      "1 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus quaerat nisi adipisci libero tempora cupiditate facere assumenda eius voluptatum? Dicta numquam iste modi amet ut.",
  },
  {
    image: "slide-2.webp",
    text: "Desert",
    description:
      "2 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus quaerat nisi adipisci libero tempora cupiditate facere assumenda eius voluptatum? Dicta numquam iste modi amet ut.",
  },
  {
    image: "slide-3.webp",
    text: "Erosion",
    description:
      "3 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus quaerat nisi adipisci libero tempora cupiditate facere assumenda eius voluptatum? Dicta numquam iste modi amet ut.",
  },
  {
    image: "slide-4.webp",
    text: "Shape",
    description:
      "4 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus quaerat nisi adipisci libero tempora cupiditate facere assumenda eius voluptatum? Dicta numquam iste modi amet ut.",
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
                <div className="img-box"></div>
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
                <div className="img-box"></div>
                <img src={slide.image} alt={`Slide ${index}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
      {slides.map((slide, index) => (
        <div className="slideshow-text" key={index}>
          <div className="item">
            <h1
              className={`${index === activeIndex ? "active" : ""} ${
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
              {slide.text}
            </h1>
          </div>
          <div
            className={`description ${index === activeIndex ? "active" : ""}`}
          >
            <p>{slide.description}</p>
          </div>
        </div>
      ))}
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
