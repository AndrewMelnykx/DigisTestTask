import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import "./index.scss";
import { useSelector } from "react-redux";
import {
  citiesDataSelector,
  weatherDataSelector,
} from "@store/weather-list/selectors";
import {
  blueColor,
  formatWeatherChartData,
  greenColor,
  violetColor,
} from "@helpers/constants";

const WeatherChart = () => {
  const weatherData = useSelector(weatherDataSelector);
  const cityData = useSelector(citiesDataSelector);

  const chartData = formatWeatherChartData(weatherData, 6);
  const cityName = cityData?.data?.[0]?.name || "City";
  return (
    <div className="weather-chart-wrapper">
      <h1>{cityName}</h1>
      <h2 className="weather-chart-title">Weather Forecast</h2>
      <ResponsiveContainer width="90%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="temp"
            stroke={greenColor}
            name="Temperature"
          />
          <Line
            type="monotone"
            dataKey="feels_like"
            stroke={violetColor}
            name="Feels like"
          />
          <Line
            type="monotone"
            dataKey="humidity"
            stroke={blueColor}
            name="Humidity"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeatherChart;
