import React, { useState, useEffect } from 'react';
import logo1 from '../evaluación/LOGOS/Logo (1).png';
import logo2 from '../evaluación/LOGOS/Logo (2).png';
import isotipo1 from '../evaluación/LOGOS/Isotipo (1).png';
import isotipo2 from '../evaluación/LOGOS/Isotipo (2).png';
import './Header.css';

const categories = [
  {
    name: 'Hogar',
    subcategories: ['Mundo hogar', 'Muebles', 'Decoración'],
  },
  {
    name: 'Tecnología',
    subcategories: ['Smartwatch', 'Audífonos', 'Gamer'],
  },
  {
    name: 'Deporte',
    subcategories: ['Ropa', 'Accesorios', 'Training'],
  },
  {
    name: 'Electrodomésticos',
    subcategories: ['Cocina', 'Pequeños electrodomésticos'],
  },
];

function CategoriesPanel({ categories, closePanel }) {
  return (
    <div className="categories-panel">
      
      <ul className="category-list">
        {categories.map((category, index) => (
          <li key={index}>
            {category.name}
            <ul className="submenu">
              {category.subcategories.map((submenuItem, subIndex) => (
                <li key={subIndex}>{submenuItem}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Header() {
  const [isHovered, setIsHovered] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 768px)').matches);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const logoImage = isMobile ? (isHovered ? isotipo2 : isotipo1) : (isHovered ? logo2 : logo1);

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  return (
    <header className="App-header">
      <div className="header-container">
        <img
          src={logoImage}
          className="App-logo"
          alt="logo"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
        {isMobile && (
          <button className="toggle-categories" onClick={toggleCategories}>
            Categorías
          </button>
        )}
      </div>
      {showCategories && isMobile && (
        <CategoriesPanel categories={categories} closePanel={toggleCategories} />
      )}
      <nav className={`category-nav ${showCategories && !isMobile ? 'show' : ''}`}>
        <ul className="category-list">
          {categories.map((category, index) => (
            <li key={index}>
              {category.name}
              <ul className="submenu">
                {category.subcategories.map((submenuItem, subIndex) => (
                  <li key={subIndex}>{submenuItem}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
