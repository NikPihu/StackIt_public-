import api from './api';

export const questionService = {
  // Create a new question
  createQuestion: async (questionData) => {
    try {
      const response = await api.post('/question', questionData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all questions with pagination
  getQuestions: async (page = 1, recordPerPage = 10) => {
    try {
      const response = await api.get('/questions', {
        params: { page, recordPerPage }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get question by ID
  getQuestionById: async (questionId) => {
    try {
      const response = await api.get(`/questions/${questionId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get questions by user
  getQuestionsByUser: async (userId) => {
    try {
      const response = await api.get(`/questions/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Upvote a question
  upvoteQuestion: async (questionId) => {
    try {
      const response = await api.put(`/questions/${questionId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete a question
  deleteQuestion: async (questionId) => {
    try {
      const response = await api.delete(`/questions/${questionId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};