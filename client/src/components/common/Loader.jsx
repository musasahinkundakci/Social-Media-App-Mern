import React from 'react';
import './css/loader.css';
import { HashLoader } from 'react-spinners';
const Loader = ({ color, speedMultiplier }) => {
  return (
    <>
      <div className="loader-container">
        <HashLoader
          color={color}
          loading={true}
          size={50}
          speedMultiplier={speedMultiplier}
        />
      </div>
    </>
  );
};

export default Loader;
