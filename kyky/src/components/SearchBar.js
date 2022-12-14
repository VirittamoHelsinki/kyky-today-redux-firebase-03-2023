import React from 'react';
import '../styles/SearchBar.scss';
import { ReactComponent as Xiaoyuan } from '../image/xiaoyuan-search.svg';

const SearchBar = ({ keyword, setKeyword }) => {
  return (
    <div className="searchStyling">
      <input
        className="barStyling"
        key="random1"
        value={keyword}
        placeholder={'search...'}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Xiaoyuan className="btnStyling" />
    </div>
  );
};

export default SearchBar;
