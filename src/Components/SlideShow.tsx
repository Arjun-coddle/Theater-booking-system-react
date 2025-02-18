import { useState, useEffect } from "react";
import '../Styles/slideshow.css'

const images = [
  "https://assets.mspimages.in/gear/wp-content/uploads/2023/02/How-to-Link-Credit-Card-to-UPI.png",
  "https://apiexcellent.com/images/blog/cinema-advertising-2-20230804152852.webp",
  "https://assets.mspimages.in/gear/wp-content/uploads/2022/05/How-to-Find-UPI-ID-in-Payment-Apps.png"
];

const SlideShow: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval); 
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="slideshow-container">
      <img src={images[currentIndex]} alt={`Slideing images`} className="slideshow-images" />

      <button onClick={prevSlide} className="prev-slide-btn">◀</button>
      <button onClick={nextSlide} className="next-slide-btn">▶</button>

    </div>
  );
};

export default SlideShow;
