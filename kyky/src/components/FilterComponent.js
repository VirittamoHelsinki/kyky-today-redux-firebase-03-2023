import { useState, useEffect, useRef } from 'react';
import { searchtitles, cities, categories } from '../components/Profiles/Features';
import '../styles/FilterComponent.scss';

const FilterComponent = () => {
  const [searchOpen, setSearchOpen] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [locationOpen, setLocationOpen] = useState(false);
  const [locationText, setLocationText] = useState('');
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categoryText, setCategoryText] = useState('')
  const [priceOpen, setPriceOpen] = useState(false);

  const searchRef = useRef();
  const locationRef = useRef();
  const categoryRef = useRef();
  const priceRef = useRef();

  useEffect(() => {
    const closeFilterDropdowns = (e) => {
      if (
        e.target !== searchRef.current &&
        e.target !== locationRef.current &&
        e.target !== categoryRef.current &&
        e.target !== priceRef.current
      ) {
        setSearchOpen(false);
        setLocationOpen(false);
        setCategoryOpen(false);
        setPriceOpen(false);
      }
    };
    document.body.addEventListener('click', closeFilterDropdowns);
    return () => document.body.removeEventListener('click', closeFilterDropdowns);
  }, []);

  useEffect(() => {
    if (keyword.length < 2) {
      setSearchOpen(true);
    }
  }, [keyword]);

  const locationToggle = () => {
    setSearchOpen(false);
    setCategoryOpen(false);
    setPriceOpen(false);
    setLocationOpen(!locationOpen);
  };

  const categoryToggle = () => {
    setSearchOpen(false);
    setLocationOpen(false);
    setPriceOpen(false);
    setCategoryOpen(!categoryOpen);
  };

  const priceToggle = () => {
    setSearchOpen(false);
    setLocationOpen(false);
    setCategoryOpen(false);
    setPriceOpen(!priceOpen);
  };

  return (
    <div className="filter-main">
      <div className="filters-content">
        <div className="search-content" ref={searchRef}>
          <div className="search-title">
            <p>Search</p>
          </div>
          <div className="search-input">
            <input
              placeholder="search by keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          {keyword.length > 1 && searchOpen && (
            <div className="search-dropdown">
              {searchtitles
                .filter((f) => {
                  if (f.search(new RegExp(`${keyword.toLocaleLowerCase()}`)) >= 0) {
                    return true;
                  }
                })
                .map((result, index) => (
                  <div
                    className="search-item"
                    key={index}
                    onClick={() => {
                      setKeyword(result);
                      setSearchOpen(false);
                    }}>
                    {result}
                  </div>
                ))}
            </div>
          )}
        </div>
        <div className="location-content">
          <div className="location-title">
            <p>Location</p>
          </div>
          <div className="location-text">
            <p ref={locationRef} onClick={locationToggle}>{locationText === '' ? 'choose location' : locationText}</p>
          </div>
          {locationOpen && (
          <div className="location-dropdown">
            {cities.map((city, index) => (
              <div className="location-item" key={index} onClick={() => setLocationText(city)}>
                {city}
              </div>
            ))}
          </div>
        )}
        </div>
        <div className="category-content">
          <div className="category-title">
            <p>Category</p>
          </div>
          <div className="category-text">
            <p ref={categoryRef} onClick={categoryToggle}>
              {categoryText === '' ? 'choose category' : categoryText < 16 ? categoryText : categoryText.substring(0, 16) + '...'}
            </p>
          </div>
          {categoryOpen && (
          <div className="category-dropdown">
            {categories.map((category, index) => (
              <div className="category-item" key={index} onClick={() => setCategoryText(category.label)}>
                {category.label}
              </div>
            ))}
          </div>
        )}
        </div>
        <div className="price-content" ref={priceRef} onClick={priceToggle}>
          <div className="price-title">
            <p>Price</p>
          </div>
          <div className="price-text">
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
