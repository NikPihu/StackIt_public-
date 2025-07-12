import api from './api';

export const userService = {
  // Get all users (Admin only)
  getUsers: async (page = 1, recordPerPage = 10) => {
    try {
      const response = await api.get('/users', {
        params: { page, recordPerPage }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: error.message };
    }
  },

  // Get user by ID
  getUserById: async (userId) => {
    try {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: error.message };
    }
  }
};