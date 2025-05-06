import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import '../styles/AddProperty.css';

const AddProperty = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    type: '',
    images: [],
  });
  const [loading, setLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setFormData((prevData) => ({
      ...prevData,
      images: [...files],
    }));

    const previews = [];
    for (let i = 0; i < files.length; i++) {
      previews.push(URL.createObjectURL(files[i]));
    }
    setImagePreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('location', formData.location);
    data.append('type', formData.type);

    formData.images.forEach((file) => {
      data.append('images', file);
    });

    try {
      const response = await axios.post('https://real-estate-backend-api-8r48.onrender.com/api/properties', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Property added:', response.data);
      navigate('/listings');
    } catch (error) {
      console.error('Error adding property:', error);
      setLoading(false);
    }
  };

  return (
    <div className="add-property-container">
      <h2>Add Property</h2>
      {loading && <Loader />} {/* Show loader while loading */}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Type:</label>
          <select name="type" value={formData.type} onChange={handleChange} required>
            <option value="">Select Type</option>
            <option value="rent">Rent</option>
            <option value="buy">Buy</option>
          </select>
        </div>

        <div>
          <label>Images:</label>
          <input
            type="file"
            name="images"
            multiple
            onChange={handleFileChange}
            required
          />
        </div>

        <div>
          {imagePreviews.length > 0 && (
            <div>
              {imagePreviews.map((preview, index) => (
                <img key={index} src={preview} alt="preview" width="100" height="100" />
              ))}
            </div>
          )}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Adding Property...' : 'Add Property'}
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
