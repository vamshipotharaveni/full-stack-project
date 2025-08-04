import api from './api';

const houseService = {
  getAllHouses: async () => {
    const response = await api.get('/houses/all');
    return response.data;
  },

  searchHouses: async (searchParams) => {
    const response = await api.get('/houses/search', { params: searchParams });
    return response.data;
  },

  getUserHouses: async () => {
    const response = await api.get('/houses/my-houses');
    return response.data;
  },

  createHouse: async (houseData) => {
    const formData = new FormData();
    
    Object.keys(houseData).forEach(key => {
      if (houseData[key] !== null && houseData[key] !== undefined) {
        formData.append(key, houseData[key]);
      }
    });

    const response = await api.post('/houses/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  },

  getHouse: async (id) => {
    const response = await api.get(`/houses/${id}`);
    return response.data;
  },

  deleteHouse: async (id) => {
    const response = await api.delete(`/houses/${id}`);
    return response.data;
  },

  getHouseImageUrl: (id) => {
    return `${api.defaults.baseURL}/houses/image/${id}`;
  }
};

export default houseService;