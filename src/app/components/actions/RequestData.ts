import { getWeatherIcon } from "@/app/assets/icons/icons";

export interface WeatherInfo {
  temperature: number;
  description: string;
  icon: string;
  cityName: string;
  minTemp: number;
  maxTemp: number;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  country: string;
  localTime: string;
}

const capitalizeFirstLetter = (text: string): string => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const fetchWeather = async (
  cityName?: string
): Promise<WeatherInfo | undefined> => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=pt_br`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Erro na requisição: " + response.statusText);
    }

    const weatherData = await response.json();
    const weatherCode = weatherData.weather[0].icon;
    const icon = getWeatherIcon(weatherCode);
    const timezoneOffset = weatherData.timezone;
    const localDate = new Date(Date.now() + timezoneOffset * 1000);
    const localTime = localDate.toISOString().slice(11, 16);

    const weatherInfo: WeatherInfo = {
      temperature: weatherData.main.temp,
      description: capitalizeFirstLetter(weatherData.weather[0].description),
      icon: icon,
      cityName: weatherData.name,
      minTemp: weatherData.main.temp_min,
      maxTemp: weatherData.main.temp_max,
      humidity: weatherData.main.humidity,
      windSpeed: weatherData.wind.speed,
      feelsLike: weatherData.main.feels_like,
      country: weatherData.sys.country,
      localTime: localTime,
    };
    return weatherInfo;
  } catch (error) {
    console.error("Erro ao buscar dados climáticos:", error);
    return undefined;
  }
};
