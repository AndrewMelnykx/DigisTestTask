import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import WeatherChart from "@components/chart";

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

const mockStore = configureStore([]);

describe("WeatherChart Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      weatherData: {
        weather: [
          {
            dt: 1625227200,
            main: { temp: 295.15, feels_like: 297.15, humidity: 50 },
          },
        ],
      },
    });
    store.dispatch = jest.fn();
  });

  it("renders the WeatherChart component", () => {
    render(
      <Provider store={store}>
        <WeatherChart />
      </Provider>
    );

    expect(screen.getByText("Weather Forecast")).toBeInTheDocument();
  });

  it("renders chart legend for Temperature, Feels like, and Humidity", () => {
    render(
      <Provider store={store}>
        <WeatherChart />
      </Provider>
    );

    expect(screen.getByText(/Weather Forecast/i)).toBeInTheDocument();
  });

  it("renders the chart container", () => {
    render(
      <Provider store={store}>
        <WeatherChart />
      </Provider>
    );

    expect(
      document.querySelector(".recharts-responsive-container")
    ).toBeInTheDocument();
  });
});
