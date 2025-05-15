import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../styles/Listings.css';
import Loader2 from '../components/loader2';

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [filters, setFilters] = useState({
    type: '',
    location: '',
    minPrice: '',
    maxPrice: ''
  });
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null); 

  const applyFilters = useCallback((newFilters) => {
    let filtered = [...listings];
    if (newFilters.type) filtered = filtered.filter((l) => l.type === newFilters.type);
    if (newFilters.location) filtered = filtered.filter((l) =>
      l.location.toLowerCase().includes(newFilters.location.toLowerCase()));
    if (newFilters.minPrice) filtered = filtered.filter((l) => l.price >= newFilters.minPrice);
    if (newFilters.maxPrice) filtered = filtered.filter((l) => l.price <= newFilters.maxPrice);
    setFilteredListings(filtered);
  }, [listings]);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const res = await axios.get('https://real-estate-backend-api-8r48.onrender.com/api/properties');
        setListings(res.data.properties);
        setFilteredListings(res.data.properties);
      } catch (err) {
        console.error('Error fetching listings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  const handleApplyFilter = () => applyFilters(filters);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageClick = (url) => setSelectedImage(url);
  const closeModal = () => setSelectedImage(null);

  return (
    <div className="listings-container">
      <h2>Property Listings</h2>

      <div className="filter-form">
        <select name="type" onChange={handleChange} value={filters.type}>
          <option value="">All Types</option>
          <option value="rent">Rent</option>
          <option value="buy">Buy</option>
        </select>
        <input name="location" placeholder="Location" onChange={handleChange} value={filters.location} />
        <input name="minPrice" type="number" placeholder="Min Price" onChange={handleChange} value={filters.minPrice} />
        <input name="maxPrice" type="number" placeholder="Max Price" onChange={handleChange} value={filters.maxPrice} />
        <button onClick={handleApplyFilter}>Apply Filter</button>
      </div>

      {loading ? (
        <Loader2  />
      ) : (
        <div className="listings-grid">
          {filteredListings.length === 0 ? (
            <p>No listings available</p>
          ) : (
            filteredListings.map((listing) => (
              <div key={listing._id} className="listing-card">
                <div className="listing-images">
                  {listing.images && listing.images.length > 0 ? (
                    listing.images.map((imageUrl, index) => (
                      <img
                        key={index}
                        src={imageUrl}
                        alt={`property-image-${index}`}
                        onClick={() => handleImageClick(imageUrl)}
                        className="thumbnail"
                      />
                    ))
                  ) : (
                    <p>No images available for this property.</p>
                  )}
                </div>
                <h3>{listing.title}</h3>
                <p>{listing.description}</p>
                <p>Price: ₹{listing.price}</p>
                <p>Location: {listing.location}</p>
                <p>Type: {listing.type}</p>
              </div>
            ))
          )}
        </div>
      )}

      {selectedImage && (
        <div className="image-modal" onClick={closeModal}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={closeModal}>×</span>
            <img src={selectedImage} alt="Enlarged property" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Listings;
