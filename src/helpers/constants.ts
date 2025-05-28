import { ForecastList } from "@store/types";

const WEATHER_API_BASE_LINK = "https://api.openweathermap.org";

const violetColor = "#8884d8";
const greenColor = "#82ca9d";
const blueColor = "#00BFFF";

const formatWeatherChartData = (data: ForecastList[], limit: number = 4) => {
  return data?.slice(0, limit).map((item) => ({
    name: new Date(item.dt * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    temp: parseFloat((item.main.temp - 273.15).toFixed(1)),
    feels_like: parseFloat((item.main.feels_like - 273.15).toFixed(1)),
    humidity: item.main.humidity,
  }));
};

export {
  WEATHER_API_BASE_LINK,
  formatWeatherChartData,
  violetColor,
  greenColor,
  blueColor,
};
