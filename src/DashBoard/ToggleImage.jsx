import React, { useState } from 'react';

const ImageToggle = () => {
  // Define state for the image toggle
  const [isImageOne, setIsImageOne] = useState(true);

  // Function to toggle the image
  const toggleImage = () => {
    setIsImageOne((prev) => !prev);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <img
        src={isImageOne ? './Images/taj1.png' : './Images/Ajanta.png'}
        alt={isImageOne ? 'Image 1' : 'Image 2'}
        style={{ width: '400px', height: '300px', borderRadius: '10px' }}
      />
      <div style={{ marginTop: '20px' }}>
        <button
          onClick={toggleImage}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%', // Makes the button round
            backgroundColor: '#007BFF', // Button color
            color: 'white',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
        >
          {isImageOne ? 'On' : 'Off'}
        </button>
      </div>
    </div>
  );
};

export default ImageToggle;
