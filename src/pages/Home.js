import React, { useEffect, useState } from 'react';
import '../styles/Home.css';
import axios from 'axios';
import Loader from '../components/Loader';

const Home = () => {
  const [images, setImages] = useState([]);
  const [loading , setLoading ] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const res = await axios.get('https://real-estate-backend-api-8r48.onrender.com/api/properties/images');
        setImages(shuffleArray(res.data));
      } catch (err) {
        console.error('Error fetching images:', err);
      }finally{
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  const shuffleArray = (arr) => {
    return [...arr].sort(() => Math.random() - 0.5);
  };

  return (
    <div className="home-container">
      <h2>Welcome to the Real Estate Platform</h2>
      <p>Find your dream property here!</p>
      {loading ?(
        <Loader />
      ):(
      <div className="image-carousel">
        <div className="carousel-track">
          {images.map((img, index) => (
            <img key={index} src={img} alt="property" className="carousel-image" />
          ))}
        </div>
      </div>
      )} 
    </div>
  );
};

export default Home;
