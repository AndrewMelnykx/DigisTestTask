import axios from "axios";
import { WEATHER_API_BASE_LINK } from "./constants";

const instance = axios.create({
  baseURL: WEATHER_API_BASE_LINK,
  timeout: 1500,
});

export { instance };
