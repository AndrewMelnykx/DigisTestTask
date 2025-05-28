import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { WeatherInitialState } from "./types";
import { useSelector } from "react-redux";
import WeatherListSlice from "./weather-list/slice";

export interface RootState {
  weatherData: WeatherInitialState;
}

const RootReducer = combineReducers({
  weatherData: WeatherListSlice,
});

const store = configureStore({ reducer: RootReducer });
const UseStoreDispatcher = (): StoreDispatcherTypes => store.dispatch;

export type StoreDispatcherTypes = typeof store.dispatch;
export { UseStoreDispatcher, RootReducer };
export const UseAppSelector = useSelector;
export default store;
