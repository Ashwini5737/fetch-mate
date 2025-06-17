import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://frontend-take-home-service.fetch.com',
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
        localStorage.removeItem('user');
        window.location.href = '/';
        return;
    }
    return Promise.reject(error);
  }
);

export default instance;
