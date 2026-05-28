import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

export const ingestData = (type, tenantId, file) => {
  const formData = new FormData();
  formData.append('file', file);
  return api.post(`/ingest/?type=${type}&tenant_id=${tenantId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const fetchRecords = (status) => {
  const params = status ? { status } : {};
  return api.get('/records/', { params });
};

export const reviewRecord = (id, status) => {
  return api.patch(`/records/${id}/review/`, { status });
};

export default api;
