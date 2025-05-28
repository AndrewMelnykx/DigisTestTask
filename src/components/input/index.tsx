import React, { useState } from "react";
import "./index.scss";
import SearchIcon from "@assets/search-icon.svg";
import { UseStoreDispatcher } from "@store/index";
import { useSelector } from "react-redux";
import {
  citiesDataSelector,
  weatherDataSelector,
} from "@store/weather-list/selectors";
import { fetchCityList, fetchForecast } from "@store/weather-list/actions";
import { handleChartVisibility } from "@store/weather-list/slice";

const MainInput = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = UseStoreDispatcher();
  const weatherData = useSelector(weatherDataSelector);
  const cityData = useSelector(citiesDataSelector);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputValue.trim()) {
      const cityResponse = await dispatch(fetchCityList(inputValue)).unwrap();

      if (cityResponse?.lat && cityResponse?.lon) {
        await dispatch(
          fetchForecast({
            lat: cityResponse.lat,
            lon: cityResponse.lon,
            data: cityData?.data || [],
          })
        );
        dispatch(handleChartVisibility(true));
      }
    }
  };

  return (
    <div
      className={`main-input-wrapper ${
        weatherData?.length === 0 ? "empty" : "modified"
      }`}
    >
      <h2>{"Digis Test Task"}</h2>
      <form onSubmit={handleSubmit} className="main-input-form">
        <input
          type="text"
          className="main-input"
          placeholder="Look for a city"
          onChange={handleInputChange}
          value={inputValue}
        />
        <button className="main-input-button" type="submit">
          <img
            src={SearchIcon || undefined}
            alt="Search Icon"
            className="search-icon mobile"
          />
        </button>
      </form>
    </div>
  );
};

export default MainInput;
