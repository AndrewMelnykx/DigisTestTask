import { RootState } from "@store/index";

const citiesDataSelector = (state: RootState) => state.weatherData.cityCords;
const weatherDataSelector = (state: RootState) => state.weatherData.weather;
const chartVisibilitySelector = (state: RootState) =>
  state.weatherData.chartVisibility;

export { citiesDataSelector, weatherDataSelector, chartVisibilitySelector };
