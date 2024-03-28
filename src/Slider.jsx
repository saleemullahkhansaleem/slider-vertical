import { useState } from "react";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";

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
      <div className="absolute top-0 left-0 w-screen h-screen overflow-hidden">
        <div
          className="w-full h-full transition-transform duration-1000 ease-linear"
          style={{ transform: `translateY(-${activeIndex * 100}vh)` }}
        >
          {slides.map((slide, index) => (
            <div
              className={`item w-full h-full relative overflow-hidden transition-opacity duration-1000 ease-linear ${
                index === activeIndex ? "opacity-100" : "opacity-0"
              }`}
              key={index}
            >
              <img
                src={slide.image} // Correctly specify the image URL
                alt={`Slide ${index}`}
                className="min-w-full min-h-full absolute top-1/2"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="slideshow-text absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-64 overflow-hidden text-center text-white font-roboto-condensed font-light pointer-events-none uppercase tracking-wider leading-tight">
        {slides.map((slide, index) => (
          <div
            className={`item ${
              index === activeIndex
                ? "active"
                : index === activeIndex - 1 ||
                  (activeIndex === 0 && index === slides.length - 1)
                ? "previous"
                : index === activeIndex + 1 ||
                  (activeIndex === slides.length - 1 && index === 0)
                ? "next"
                : ""
            }`}
            key={index}
          >
            {slide.text}
          </div>
        ))}
      </div>
      <div className="dots absolute top-1/2 right-8 transform -translate-y-1/2 flex flex-col justify-between items-end w-14 h-14">
        {slides.map((slide, index) => (
          <div
            className={`dot-line ${index === activeIndex ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
            key={index}
          ></div>
        ))}
      </div>
      <div
        className="up-btn absolute top-8 right-8 w-14 h-14 text-white opacity-20 hover:opacity-100 cursor-pointer"
        onClick={prevSlide}
      >
        <FaArrowAltCircleUp />
      </div>
      <div
        className="down-btn absolute bottom-8 right-8 w-14 h-14 text-white opacity-20 hover:opacity-100 cursor-pointer"
        onClick={nextSlide}
      >
        <FaArrowAltCircleDown />
      </div>
    </div>
  );
};

export default SliderComponent;
