export interface City {
  name: string;
  latitude: number;
  longitude: number;
}

export interface WeatherForecast {
  hourly: {
    temperature_2m: number[];
    time: string[];
  };
  hourly_units: {
    temperature_2m: string;
    time: string;
  };
  latitude: number;
  longitude: number;
  timezone: string;
}
