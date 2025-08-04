import React from 'react';
import houseService from '../services/houseService';

const HouseCard = ({ house, showActions = false, onDelete }) => {
  const imageUrl = house.id ? houseService.getHouseImageUrl(house.id) : null;

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this house listing?')) {
      onDelete(house.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 bg-gray-200">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="House"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div 
          className="absolute inset-0 flex items-center justify-center bg-gray-200"
          style={{ display: imageUrl ? 'none' : 'flex' }}
        >
          <div className="text-center text-gray-500">
            <div className="text-4xl mb-2">🏠</div>
            <div className="text-sm">No Image Available</div>
          </div>
        </div>
        
        <div className="absolute top-2 left-2">
          <span className="bg-primary-600 text-white px-2 py-1 rounded-md text-sm font-medium">
            {house.houseType}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">
            {house.houseType} in {house.city}
          </h3>
          {house.rent && (
            <span className="text-lg font-bold text-primary-600">
              ₹{house.rent.toLocaleString()}
            </span>
          )}
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <span className="text-sm">📍 {house.district}, {house.city}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <span className="text-sm">📞 {house.phoneNumber}</span>
          </div>

          {house.description && (
            <div className="text-sm text-gray-600">
              <p className="line-clamp-2">{house.description}</p>
            </div>
          )}

          <div className="flex items-center text-gray-500 text-xs">
            <span>Listed by: {house.ownerUsername}</span>
          </div>

          <div className="flex items-center text-gray-400 text-xs">
            <span>
              Listed on: {new Date(house.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {showActions && (
          <div className="flex space-x-2">
            <button
              onClick={handleDelete}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
            >
              Delete
            </button>
          </div>
        )}

        {!showActions && (
          <div className="border-t pt-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Contact: {house.ownerPhone}
              </span>
              <a
                href={`tel:${house.phoneNumber}`}
                className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors"
              >
                Call
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HouseCard;