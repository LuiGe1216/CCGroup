import React, { useState, useEffect } from 'react';
import './Banner.css';
import { useMediaQuery } from '@react-hook/media-query';
import deliveryDiciembre from '../evaluación/Banners Principales/delivery Diciembre.jpg';
import navidad from '../evaluación/Banners Principales/Nueva navidad 360 x 391px..jpg';
import nuevosIngresos1 from '../evaluación/Banners Principales/Nuevos ingresos 360 x 391 px.jpg';
import delivery from '../evaluación/Banners Principales/DELIVERY.png';
import nuevosIngresos2 from '../evaluación/Banners Principales/NUEVOS INGRESOS.png';
import productosNavidenos from '../evaluación/Banners Principales/PRODUCTOS NAVIDEÑOS 2.png';

const desktopImages = [delivery, nuevosIngresos2, productosNavidenos];
const mobileImages = [deliveryDiciembre, navidad, nuevosIngresos1];

function Banner() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showButtons, setShowButtons] = useState(!isMobile);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (isMobile ? mobileImages.length : desktopImages.length));
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, [isMobile]);

  useEffect(() => {
    // Actualiza el estado de los botones solo si es móvil
    setShowButtons(!isMobile);
  }, [isMobile]);

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + (isMobile ? mobileImages.length : desktopImages.length)) % (isMobile ? mobileImages.length : desktopImages.length));
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (isMobile ? mobileImages.length : desktopImages.length));
  };

  return (
    <div className="banner-container">
      <img src={(isMobile ? mobileImages : desktopImages)[currentImageIndex]} alt={`banner-${currentImageIndex}`} className="banner-image" />
      {showButtons && (
        <div className="banner-buttons">
          <button onClick={handlePrev}>&lt; </button>
          <button onClick={handleNext}> &gt;</button>
        </div>
      )}
    </div>
  );
}

export default Banner;
