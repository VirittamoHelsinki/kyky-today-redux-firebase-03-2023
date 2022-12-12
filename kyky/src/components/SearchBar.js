import React from 'react';

const SearchBar = ({ keyword, setKeyword }) => {
  const searchStyling = {
    display: 'flex',
    alignItems: 'stretch'
  };

  const barStyling = {
    width: '20rem',
    borderWidth: '0.5px',
    borderColor: '#808080',
    borderRadius: '8px 0 0 8px'
  };

  const btnStyling = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#063831',
    color: 'white',
    borderRadius: '0 8px 8px 0',
    height: '42px',
    width: '42px'
  };

  return (
    <div style={searchStyling}>
      <input
        style={barStyling}
        key="random1"
        value={keyword}
        placeholder={'search...'}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <span className="material-icons-outlined" style={btnStyling}>
        search
      </span>
    </div>
  );
};

export default SearchBar;
