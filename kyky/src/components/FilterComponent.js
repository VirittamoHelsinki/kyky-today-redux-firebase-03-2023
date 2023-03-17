import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllJobs, filterJobs } from '../redux/jobs/jobSlice';
import { searchtitles, cities, categories } from '../components/Profiles/Features';
import '../styles/FilterComponent.scss';

const FilterComponent = () => {
  const [searchOpen, setSearchOpen] = useState(true);
  const [searches, setSearches] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [locationOpen, setLocationOpen] = useState(false);
  const [locationText, setLocationText] = useState('');
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categoryText, setCategoryText] = useState('');
  const [priceOpen, setPriceOpen] = useState(false);
  const [minPrice, setMinPrice] = useState('0');
  const [maxPrice, setMaxPrice] = useState('100');

  const searchRef = useRef();
  const locationRef = useRef();
  const categoryRef = useRef();
  const priceRef = useRef();

  const _tags = useSelector((state) => state.jobs.all);

  const dispatch = useDispatch();

  const navigate = new useNavigate();

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

  useEffect(() => {
    dispatch(fetchAllJobs());
  }, []);

  useEffect(() => {
    let tagwords = [];
    if (Array.isArray(_tags)) {
      _tags.forEach((job) => tagwords.push(job.headline.toLocaleLowerCase()));
    }
    // if (Array.isArray(_tags)) {
    //   _tags.forEach((job) => {
    //     let words = job.headline.split(' ')
    //     words.forEach((word) => tagwords.push(word.toLocaleLowerCase()))
    //   });
    // }
    setSearches([...searchtitles, ...tagwords]);
  }, [_tags]);

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

  const searchButtonClick = () => {
    let title = '';
    let headline = '';
    if (searchtitles.includes(keyword)) {
      title = keyword;
    } else {
      headline = keyword;
    }
    dispatch(
      filterJobs({
        title: title,
        headline: headline,
        location: locationText,
        category: categoryText,
        minPrice: parseInt(minPrice),
        maxPrice: parseInt(maxPrice)
      })
    );
    navigate('/search-result');
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
              {searches
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
            <p ref={locationRef} onClick={locationToggle}>
              {locationText === '' ? 'choose location' : locationText}
            </p>
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
              {categoryText === ''
                ? 'choose category'
                : categoryText < 16
                ? categoryText
                : categoryText.substring(0, 16) + '...'}
            </p>
          </div>
          {categoryOpen && (
            <div className="category-dropdown">
              {categories.map((category, index) => (
                <div
                  className="category-item"
                  key={index}
                  onClick={() => setCategoryText(category.label)}>
                  {category.label}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="price-content">
          <div className="price-title">
            <p>Price</p>
          </div>
          <div className="price-text">
            <p ref={priceRef} onClick={priceToggle}>
              {minPrice === '0' && maxPrice === '100'
                ? 'choose price range'
                : minPrice + ' € - ' + maxPrice + ' €'}
            </p>
          </div>
          {priceOpen && (
            <div className="price-dropdown">
              <div className="prices-row">
                <span>{minPrice} €</span>
                <span>-</span>
                <span>{maxPrice} €</span>
              </div>
              <div className="range_container">
                <div className="sliders_control">
                  <input
                    id="fromSlider"
                    type="range"
                    value={minPrice}
                    min="0"
                    max="100"
                    onInput={(e) => setMinPrice(e.target.value)}
                  />
                  <input
                    id="toSlider"
                    type="range"
                    value={maxPrice}
                    min="0"
                    max="100"
                    onInput={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="search-button" onClick={searchButtonClick}>
        <span className="material-icons-outlined">search</span>
      </div>
    </div>
  );
};

export default FilterComponent;
