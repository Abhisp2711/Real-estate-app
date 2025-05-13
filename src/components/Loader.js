import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import '../styles/Loader.css'; // optional custom styling

const Loader = ({ loading = true, size = 50, color = '#2980b9' }) => {
  return (
    <div className="loader-center">
      <ClipLoader loading={loading} size={size} color={color} />
    </div>
  );
};

export default Loader;
