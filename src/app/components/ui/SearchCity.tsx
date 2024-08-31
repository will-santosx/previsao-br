"use client";
import { Search } from "lucide-react";
import { FormEvent, useState, useEffect } from "react";
import { fetchWeather } from "../actions/RequestData";
import { MainCard } from "./WeatherCards";
import { BiError } from "react-icons/bi";
import Link from "next/link";

export default function SearchCity() {
  const [locationCity, setLocationCity] = useState<string>("Brasília");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getDefaultWeather = async () => {
      setLoading(true);
      try {
        const data = await fetchWeather(locationCity);
        setWeatherData(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError("Error fetching weather data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    getDefaultWeather();
  }, []);

  const fetchCitySuggestions = async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${process.env.NEXT_PUBLIC_API_KEY}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
    }
  };

  const handleSuggestionClick = async (cityName: string) => {
    setLocationCity(cityName);
    setSuggestions([]);
    setLoading(true);
    try {
      const data = await fetchWeather(cityName);
      if (data) {
        setWeatherData(data);
        setError(null);
      } else {
        setError("Cidade não econtrada. Tente Novamente.");
        setWeatherData(null);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Erro ao buscar informações. Tente Novamente.");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  async function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    try {
      const data = await fetchWeather(locationCity);
      if (data) {
        setWeatherData(data);
        setError(null);
      } else {
        setError("Cidade não econtrada. Tente Novamente.");
        setWeatherData(null);
      }
      setSuggestions([]);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Erro ao buscar informações. Tente Novamente.");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full space-y-10 flex items-center flex-col justify-center">
      <form className="w-full" onSubmit={handleSearchSubmit} aria-live="polite">
        <div className="relative dark:bg-neutral-100 border h-12 w-full rounded-md group-focus-within:ring flex items-center">
          <input
            name="location-name"
            className="flex-1 outline-none bg-transparent px-5 text-black"
            type="text"
            placeholder="Procure uma cidade..."
            value={locationCity}
            autoComplete="off"
            onChange={(e) => {
              setLocationCity(e.currentTarget.value);
              fetchCitySuggestions(e.currentTarget.value);
            }}
            required
            aria-label="City search input"
          />
          <button
            title="Buscar"
            className="border h-full rounded-md p-1 text-black/40 hover:text-black transition-colors"
            type="submit"
            aria-label="Search button"
          >
            <Search />
          </button>
          {suggestions.length > 0 && (
            <ul className="absolute top-12 left-0 w-full bg-white border rounded-md z-10">
              {suggestions.map((suggestion) => (
                <li
                  key={`${suggestion.name}-${suggestion.country}`}
                  className="cursor-pointer p-2 hover:bg-blue-100"
                  onClick={() => handleSuggestionClick(`${suggestion.name}, ${suggestion.country}`)}
                >
                  {suggestion.name}, {suggestion.country}
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>

      {loading ? (
        <div className="flex justify-center items-center h-64 space-x-4">
          <div className="animate-spin border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full" />
          <span className="text-lg">Carregando...</span>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center gap-2 text-red-700"><BiError className="text-[3rem]"/><button onClick={() => {fetchWeather("Brasilia")}} className="underline font-bold text-lg text-center">{error}</button></div>
      ) : (
        weatherData && (
          <div className="transition-opacity duration-500 ease-in-out opacity-100 w-full flex flex-col justify-center items-center">
            <MainCard data={weatherData} />
          </div>
        )
      )}
    </div>
  );
}
