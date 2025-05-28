import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import WeatherBackground from "@components/weather-background";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <WeatherBackground />
    </Provider>
  );
}

export default App;
