import React from 'react';
import PropTypes from 'prop-types';
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

SearchBar.propTypes = {
  keyword: PropTypes.string,
  setKeyword: PropTypes.func
};

export default SearchBar;
