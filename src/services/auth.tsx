import axios from './interceptors';

export const AuthAPI = {
  login: (name: string, email: string) =>
    axios.post('/auth/login', { name, email }),
  logout: () => axios.post('/auth/logout', {}),
};
