import axios from './interceptors';
import { Dog, MatchResponse } from '../types/dog';

export const DogAPI = {
  getBreeds: () => axios.get<string[]>('/dogs/breeds'),

  searchDogs: (params: Record<string, any>) =>
    axios.get('/dogs/search', { params }),

  searchDogsRaw: (queryString: string) =>
    axios.get(`/dogs/search?${queryString}`),

  fetchByIds: (ids: string[]) => {
    if (!Array.isArray(ids) || ids.length === 0) {
      throw new Error('fetchByIds requires a non-empty array of IDs');
    }
    return axios.post<Dog[]>('/dogs', ids);
  },

  matchDogs: (ids: string[]) => {
    if (!Array.isArray(ids) || ids.length === 0) {
      throw new Error('matchDogs requires a non-empty array of IDs');
    }
    return axios.post<MatchResponse>('/dogs/match', ids);
  },
};
