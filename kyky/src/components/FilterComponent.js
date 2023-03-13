import { useState, useEffect, useRef } from 'react';
import { cities } from '../components/Profiles/Features';
import '../styles/FilterComponent.scss';

const FilterComponent = () => {
  const [locationOpen, setLocationOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);

  const locationRef = useRef();
  const categoryRef = useRef();
  const priceRef = useRef();

  useEffect(() => {
    const closeFilterDropdowns = (e) => {
      if (
        e.target !== locationRef.current &&
        e.target !== categoryRef.current &&
        e.target !== priceRef.current
      ) {
        setLocationOpen(false);
        setCategoryOpen(false);
        setPriceOpen(false);
      }
    };
    document.body.addEventListener('click', closeFilterDropdowns);
    return () => document.body.removeEventListener('click', closeFilterDropdowns);
  }, []);

  const locationToggle = () => {
    setCategoryOpen(false);
    setPriceOpen(false);
    setLocationOpen(!locationOpen);
  };

  const categoryToggle = () => {
    setLocationOpen(false);
    setPriceOpen(false);
    setCategoryOpen(!categoryOpen);
  };

  const priceToggle = () => {
    setLocationOpen(false);
    setCategoryOpen(false);
    setPriceOpen(!priceOpen);
  };

  return (
    <div className="filter-main">
      <div className="filters-content">
        <div className="location-category-price-item" ref={locationRef} onclick={locationToggle}>
          <div className="location-category-price-title">
            <p>Location</p>
          </div>
          <div className="location-category-price-text">
            <p>choose location</p>
          </div>
        </div>
        <div className="location-category-price-item" ref={categoryRef} onclick={categoryToggle}>
          <div className="location-category-price-title">
            <p>Category</p>
          </div>
          <div className="location-category-price-text">
            <p>choose category</p>
          </div>
        </div>
        <div className="location-category-price-item last" ref={priceRef} onClick={priceToggle}>
          <div className="location-category-price-title">
            <p>Price</p>
          </div>
          <div className="location-category-price-text">
            <p>choose price range</p>
          </div>
        </div>
      </div>
      <div className="search-button">
        <span className="material-icons-outlined">search</span>
      </div>
    </div>
  );
};

export default FilterComponent;
