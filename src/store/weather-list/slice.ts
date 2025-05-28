import { createSlice } from "@reduxjs/toolkit";
import { WeatherInitialState } from "@store/types";
import { fetchCityList, fetchForecast } from "./actions";
import { toast } from "react-toastify";

const initialWeatherData: WeatherInitialState = {
  weather: [],
  chartVisibility: false,
  cityCords: null,
};

const WeatherListSlice = createSlice({
  name: "weatherSlice",
  initialState: initialWeatherData,
  reducers: {
    handleChartVisibility: (state, action) => {
      state.chartVisibility = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCityList.fulfilled, (state, action) => {
        state.cityCords = action.payload;
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.weather = action.payload;
      })
      .addCase(fetchCityList.rejected, (state, action) => {
        toast.error("Failed to load city data. Please try again.");
        console.error("City fetch error:", action.error);
      })

      .addCase(fetchForecast.rejected, (state, action) => {
        toast.error("Failed to load weather forecast. Please try again.");
        console.error("Forecast fetch error:", action.error);
      });
  },
});

export const { handleChartVisibility } = WeatherListSlice.actions;
export default WeatherListSlice.reducer;
