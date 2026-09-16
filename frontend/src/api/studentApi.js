import api from '../lib/api';

export const getStudentsList = async () => {
  const res = await api.get('/students');
  return res;
};

export default {
  getStudentsList
};
