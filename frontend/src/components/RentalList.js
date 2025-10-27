import React, { useState, useEffect } from 'react';
import { rentalAPI } from '../services/api';
import './RentalList.css';

const RentalList = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: ''
  });

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    try {
      setLoading(true);
      const response = await rentalAPI.getAllRentals();
      setRentals(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch rentals. Please try again later.');
      console.error('Error fetching rentals:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await rentalAPI.searchRentals(filters);
      setRentals(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to search rentals. Please try again.');
      console.error('Error searching rentals:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: ''
    });
    fetchRentals();
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading rentals...</p>
      </div>
    );
  }

  return (
    <div className="rental-list-container">
      <div className="search-section">
        <h2>Find Your Perfect Rental</h2>
        <form onSubmit={handleSearch} className="search-form">
          <div className="form-row">
            <input
              type="text"
              name="location"
              placeholder="Location (e.g., New York, CA)"
              value={filters.location}
              onChange={handleFilterChange}
              className="form-input"
            />
            <input
              type="number"
              name="minPrice"
              placeholder="Min Price"
              value={filters.minPrice}
              onChange={handleFilterChange}
              className="form-input"
            />
            <input
              type="number"
              name="maxPrice"
              placeholder="Max Price"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              className="form-input"
            />
          </div>
          <div className="form-row">
            <select
              name="bedrooms"
              value={filters.bedrooms}
              onChange={handleFilterChange}
              className="form-select"
            >
              <option value="">Any Bedrooms</option>
              <option value="1">1 Bedroom</option>
              <option value="2">2 Bedrooms</option>
              <option value="3">3 Bedrooms</option>
              <option value="4">4+ Bedrooms</option>
            </select>
            <select
              name="bathrooms"
              value={filters.bathrooms}
              onChange={handleFilterChange}
              className="form-select"
            >
              <option value="">Any Bathrooms</option>
              <option value="1">1 Bathroom</option>
              <option value="2">2 Bathrooms</option>
              <option value="3">3+ Bathrooms</option>
            </select>
          </div>
          <div className="form-actions">
            <button type="submit" className="search-btn">Search Rentals</button>
            <button type="button" onClick={clearFilters} className="clear-btn">Clear Filters</button>
          </div>
        </form>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="rentals-section">
        <h3>Available Rentals ({rentals.length})</h3>
        {rentals.length === 0 ? (
          <div className="no-rentals">
            <p>No rentals found. Try adjusting your search criteria.</p>
          </div>
        ) : (
          <div className="rentals-grid">
            {rentals.map(rental => (
              <div key={rental.id} className="rental-card">
                <div className="rental-header">
                  <h4>{rental.title}</h4>
                  <span className="rental-price">${rental.price}/month</span>
                </div>
                <div className="rental-location">
                  📍 {rental.location}
                </div>
                <div className="rental-details">
                  {rental.bedrooms && (
                    <span className="detail-item">🛏️ {rental.bedrooms} bed</span>
                  )}
                  {rental.bathrooms && (
                    <span className="detail-item">🚿 {rental.bathrooms} bath</span>
                  )}
                  {rental.squareFeet && (
                    <span className="detail-item">📐 {rental.squareFeet} sq ft</span>
                  )}
                </div>
                <p className="rental-description">{rental.description}</p>
                <div className="rental-contact">
                  {rental.contactEmail && (
                    <a href={`mailto:${rental.contactEmail}`} className="contact-link">
                      📧 Email
                    </a>
                  )}
                  {rental.contactPhone && (
                    <a href={`tel:${rental.contactPhone}`} className="contact-link">
                      📱 Call
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RentalList;