import { useState } from "react";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import "./style.css";

const SliderComponent = () => {
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

  const [activeIndex, setActiveIndex] = useState(0);

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

  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleWheel = (event) => {
    if (isTransitioning) return; // Exit if a transition is in progress

    if (event.deltaY < 0) {
      prevSlide();
    } else {
      nextSlide();
    }

    setIsTransitioning(true); // Set transition flag
    setTimeout(() => setIsTransitioning(false), 1000); // Reset transition flag after 1 second (adjust as needed)
  };

  return (
    <div onWheel={handleWheel}>
      <div className="slideshow">
        <div
          className="slider"
          style={{ transform: `translateY(-${activeIndex * 100}vh)` }}
        >
          {slides.map((slide, index) => (
            <div
              className={index === activeIndex ? "item active" : "item"}
              key={index}
            >
              <img src={slide.image} alt={`Slide ${index}`} />
            </div>
          ))}
        </div>
      </div>
      <div className="slideshow-text">
        {slides.map((slide, index) => (
          <div
            className={
              index === activeIndex
                ? "item active"
                : index === activeIndex - 1 ||
                  (activeIndex === 0 && index === slides.length - 1)
                ? "item previous"
                : index === activeIndex + 1 ||
                  (activeIndex === slides.length - 1 && index === 0)
                ? "item next"
                : "item"
            }
            key={index}
          >
            {slide.text}
          </div>
        ))}
      </div>
      <div className="dots">
        {slides.map((slide, index) => (
          <div
            className={index === activeIndex ? "dot-line active" : "dot-line"}
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
