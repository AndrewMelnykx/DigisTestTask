import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import WeatherBackground from "@components/weather-background/index";
import WeatherChart from "@components/chart";

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
const mockStore = configureStore([]);
let store;

beforeEach(() => {
  store = mockStore({ weatherData: { chartVisibility: false } });
  store.dispatch = jest.fn();
});

describe("WeatherBackground Component", () => {
  it("renders MainInput always", () => {
    render(
      <Provider store={store}>
        <WeatherBackground />
      </Provider>
    );

    expect(screen.getByPlaceholderText("Look for a city")).toBeInTheDocument();
  });

  it("renders WeatherChart when chartVisibility is true", () => {
    store = mockStore({ weatherData: { chartVisibility: true } });
    render(
      <Provider store={store}>
        <WeatherBackground />
      </Provider>
    );

    expect(
      document.querySelector(".weather-chart-wrapper")
    ).toBeInTheDocument();
  });

  it("does NOT render WeatherChart when chartVisibility is false", () => {
    store = mockStore({ weatherData: { chartVisibility: false } });
    render(
      <Provider store={store}>
        <WeatherBackground />
      </Provider>
    );

    expect(screen.queryByTestId("weather-chart")).toBeNull();
  });
});
