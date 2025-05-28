type CityCoordinates = { lat: number; lon: number; data: CityData[] };
interface CityData {
  country: string;
  lat: number;
  lon: number;
  name: string;
  state: string;
  local_names: LocalNames;
}
type LocalNames = {
  [languageCode: string]: string;
};
interface ForecastList {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  rain?: {
    "3h": number;
  };
  sys: {
    pod: string;
  };
  dt_txt: string;
}

interface WeatherInitialState {
  weather: ForecastList[];
  cityCords?: { lat: number; lon: number; data: CityData[] } | null;
  chartVisibility?: boolean;
}

export type { WeatherInitialState, CityCoordinates, ForecastList };
