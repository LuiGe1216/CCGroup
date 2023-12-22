import React, { useState, useEffect } from 'react';
import './ImageGallery.css';

import cuadro1 from '../evaluación/Imágenes/Cuadros 1.png';
import cuadro2 from '../evaluación/Imágenes/Cuadros 2.png';
import cuadro3 from '../evaluación/Imágenes/Cuadros 3.png';
import cuadro4 from '../evaluación/Imágenes/Cuadros 4.png';

const images = [cuadro1, cuadro2, cuadro3, cuadro4];

function ImageGallery() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 768px)').matches);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`image-gallery ${isMobile ? 'mobile' : ''}`}>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`gallery-${index}`}
          className={`gallery-image ${currentImageIndex === index ? 'current' : ''}`}
        />
      ))}
    </div>
  );
}

export default ImageGallery;
