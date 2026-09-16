import api from '../lib/api';

export const getAlumni = async (params = {}) => {
  return api.get('/alumni', { params });
};

export default {
  getAlumni
};
