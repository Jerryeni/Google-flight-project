import axios from 'axios';
import { SearchParams } from '../types';

const api = axios.create({
  baseURL: 'https://sky-scrapper.p.rapidapi.com/api/v1/flights',
    // params: {
    //   lat: '19.242218017578125',
    //   lng: '72.85846156046128',
    //   locale: 'en-US'
    // },
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
    'X-RapidAPI-Host': import.meta.env.VITE_RAPIDAPI_HOST
  }
});

export const searchAirports = async (query: string) => {
  const response = await api.get('/searchAirport', {
    params: { query }
  });
  return response.data.data;
};

export const getNearbyAirports = async (lat: number, lng: number) => {
  const response = await api.get('/getNearByAirports', {
    params: { lat, lng }
  });
  return response.data.data;
};

export const searchFlights = async (params: {
  originSkyId: string;
  destinationSkyId: string;
  originEntityId: string;
  destinationEntityId: string;
  date: string;
  returnDate?: string;
  adults?: number;
  cabinClass?: string;
  tripType?: string;
}) => {
  const response = await api.get('/searchFlights', { params });
  return response.data.data;
};