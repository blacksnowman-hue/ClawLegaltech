import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (username: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Login failed');
    }
    throw new Error('Network error occurred');
  }
};

export const register = async (username: string, password: string) => {
  try {
    const response = await api.post('/auth/register', { username, password });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Registration failed');
    }
    throw new Error('Network error occurred');
  }
};

export const submitResignation = async (lwd: string) => {
  try {
    const response = await api.post('/user/resign', { lwd });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to submit resignation');
    }
    throw new Error('Network error occurred');
  }
};

export const getAllResignations = async () => {
  try {
    const response = await api.get('/admin/resignations');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch resignations');
    }
    throw new Error('Network error occurred');
  }
};

export const concludeResignation = async (
  resignationId: string,
  approved: boolean,
  lwd: string
) => {
  try {
    const response = await api.put('/admin/conclude_resignation', {
      resignationId,
      approved,
      lwd,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to process resignation');
    }
    throw new Error('Network error occurred');
  }
};

export const submitExitQuestionnaire = async (responses: { questionText: string; response: string }[]) => {
  try {
    const response = await api.post('/user/responses', { responses });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to submit questionnaire');
    }
    throw new Error('Network error occurred');
  }
};

export const getExitResponses = async () => {
  try {
    const response = await api.get('/admin/exit_responses');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch responses');
    }
    throw new Error('Network error occurred');
  }
};