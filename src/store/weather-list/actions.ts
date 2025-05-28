import { instance } from "@helpers/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CityCoordinates, ForecastList } from "@store/types";

const API_KEY = process.env.VITE_WEATHER_API_KEY;

const fetchForecast = createAsyncThunk<ForecastList[], CityCoordinates>(
  "fetchForecastThunk",
  async ({ lat, lon }: { lat: number; lon: number }) => {
    try {
      const response = await instance.get(
        `/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      return response.data.list;
    } catch (error) {
      throw error as Error;
    }
  }
);
const fetchCityList = createAsyncThunk<CityCoordinates, string>(
  "fetchCityThunk",
  async (city: string) => {
    try {
      const response = await instance.get(
        `/geo/1.0/direct?q=${city}&appid=${API_KEY}`
      );
      const data = response.data;

      if (!data.length) {
        throw new Error("City not found");
      }

      const { lat, lon } = data[0];

      return { lat, lon, data };
    } catch (error) {
      throw error instanceof Error
        ? error
        : new Error("Failed to fetch city data");
    }
  }
);

export { fetchCityList, fetchForecast };
