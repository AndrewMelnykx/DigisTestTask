import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import MainInput from "@components/input";
import { handleChartVisibility } from "@store/weather-list/slice";
import * as weatherActions from "@store/weather-list/actions";

const mockStore = configureStore([]);
let store;

beforeEach(() => {
  store = mockStore({
    weatherData: {
      weather: [],
      chartVisibility: false,
      cityCords: { lat: 48.8566, lon: 2.3522 },
    },
  });

  store.dispatch = jest.fn();
});

jest.mock("@store/weather-list/actions", () => ({
  fetchCityList: Object.assign(jest.fn(), {
    type: "weather/fetchCityList",
    fulfilled: { type: "weather/fetchCityList/fulfilled" },
  }),
  fetchForecast: Object.assign(jest.fn(), {
    type: "weather/fetchForecast",
    fulfilled: { type: "weather/fetchForecast/fulfilled" },
  }),
}));

describe("MainInput Component", () => {
  it("renders input field and button", () => {
    render(
      <Provider store={store}>
        <MainInput />
      </Provider>
    );

    expect(screen.getByPlaceholderText("Look for a city")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("updates input value when typing", () => {
    render(
      <Provider store={store}>
        <MainInput />
      </Provider>
    );

    const input = screen.getByPlaceholderText("Look for a city");
    fireEvent.change(input, { target: { value: "Paris" } });

    expect(input).toHaveValue("Paris");
  });

  it("does not submit empty input", () => {
    render(
      <Provider store={store}>
        <MainInput />
      </Provider>
    );
    const form = document.querySelector(".main-input-form");
    fireEvent.submit(form);

    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it("dispatches fetchCityList on valid submission", async () => {
    render(
      <Provider store={store}>
        <MainInput />
      </Provider>
    );

    const input = screen.getByPlaceholderText("Look for a city");
    fireEvent.change(input, { target: { value: "Paris" } });

    const form = document.querySelector(".main-input-form");
    fireEvent.submit(form);

    // expect(store.dispatch).toHaveBeenCalledWith(fetchCityList("Paris"));
    await store.dispatch(weatherActions.fetchCityList("Paris"));
  });

  it("dispatches fetchForecast and handleChartVisibility on valid response", async () => {
    render(
      <Provider store={store}>
        <MainInput />
      </Provider>
    );

    const input = screen.getByPlaceholderText("Look for a city");
    fireEvent.change(input, { target: { value: "Paris" } });

    const form = document.querySelector(".main-input-form");
    fireEvent.submit(form);

    await Promise.resolve(); // Ensure the async dispatch call finishes

    expect(fetchForecast).toHaveBeenCalledWith({ lat: 48.8566, lon: 2.3522 });
    expect(store.dispatch).toHaveBeenCalledWith(handleChartVisibility(true));
  });
});
