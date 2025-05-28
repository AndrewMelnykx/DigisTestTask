import React from "react";
import "./index.scss";
import MainInput from "@components/input";
import WeatherChart from "@components/chart";
import { useSelector } from "react-redux";
import { chartVisibilitySelector } from "@store/weather-list/selectors";

const WeatherBackground = () => {
  const isChartVisible = useSelector(chartVisibilitySelector);

  return (
    <div data-testid="weather-background" className="weather-background">
      <MainInput />
      {isChartVisible && <WeatherChart />}
    </div>
  );
};

export default WeatherBackground;
