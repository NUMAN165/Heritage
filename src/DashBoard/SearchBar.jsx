import React, { useState } from 'react';

const SearchBar = () => {
  const datas = ["Taj Mahal", "Albert Hall", "Qutub Minar"];
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);

    // Filter data based on the input value
    const filtered = datas.filter(item =>
      item.toLowerCase().includes(inputValue.toLowerCase())
    );

    setFilteredData(filtered);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setFilteredData([]); // Clear suggestions after selection
  };

  return (
    <div style={{ position: 'relative' }}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
        style={{
          padding: "10px",
          width: "300px",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}
      />
      {filteredData.length > 0 && (
        <ul style={{
          position: 'absolute',
          top: '100%', 
          left: 0,
          right: 0,
          border: '1px solid #ccc',
          borderRadius: '5px',
          backgroundColor: 'white',
          zIndex: 1000,
          margin: 0,
          padding: 0,
          listStyleType: 'none'
        }}>
          {filteredData.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(item)}
              style={{
                padding: '10px',
                cursor: 'pointer',
                borderBottom: '1px solid #eee'
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
