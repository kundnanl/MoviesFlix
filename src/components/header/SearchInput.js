import React, { useState } from 'react';
import {AsyncPaginate } from 'react-select-async-paginate';

const SearchInput = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const loadOptions = async (inputValue, prevOptions) => {
    if (!inputValue) return { options: [] };

    try {
      // Replace 'YOUR_SEARCH_API_URL' with the actual URL of your search API
      const response = await fetch(`YOUR_SEARCH_API_URL?query=${inputValue}`);
      const data = await response.json();

      const options = data.map((result) => ({
        value: result.title,
        label: result.title,
      }));

      return {
        options,
        hasMore: false, // Since we are not implementing pagination for suggestions
      };
    } catch (error) {
      console.error('Error fetching search recommendations:', error);
      return { options: [] };
    }
  };

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const handleSearch = (selectedOption) => {
    if (selectedOption) {
      onSearch(selectedOption.value);
    }
  };

  return (
    <AsyncPaginate
      value={inputValue}
      loadOptions={loadOptions}
      onChange={handleSearch}
      onInputChange={handleInputChange}
      placeholder="Search for a movie..."
    />
  );
};

export default SearchInput;
