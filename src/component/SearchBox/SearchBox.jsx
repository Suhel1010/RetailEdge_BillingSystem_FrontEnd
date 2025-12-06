import React, { useState } from 'react';

// eslint-disable-next-line react/prop-types
const SearchBox = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');
  const handleInputChange = e => {
    const text = e.target.value;
    setSearchText(text);
    onSearch(text);
  };
  return (
    <div className="input-group mb-3 input-group-sm">
      <input
        type="text"
        id="keyword"
        name="keyword"
        placeholder="search by keyword"
        className="form-control"
        onChange={handleInputChange}
        value={searchText}
      />
      <span className="input-group-text bg-warning ">
        <i className="bi bi-search"></i>
      </span>
    </div>
  );
};

export default SearchBox;
