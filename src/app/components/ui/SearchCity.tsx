"use client";
import { Search } from "lucide-react";
import { FormEvent, useState, useEffect } from "react";
import { fetchWeather } from "../actions/RequestData";
import { MainCard } from "./WeatherCards";

export default function SearchCity() {
  const [locationCity, setLocationCity] = useState<string>("Brasília");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch the default weather data when the component mounts
  useEffect(() => {
    const getDefaultWeather = async () => {
      setLoading(true);
      try {
        const data = await fetchWeather(locationCity);
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    };
    getDefaultWeather();
  }, []); // Empty dependency array ensures this runs once on mount

  // Handle form submission to fetch weather data for the searched city
  async function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    try {
      const data = await fetchWeather(locationCity);
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full space-y-10 flex items-center flex-col justify-center">
      <form className="w-full" onSubmit={handleSearchSubmit} aria-live="polite">
        <div className="dark:bg-neutral-100 border h-12 w-full rounded-md group-focus-within:ring flex items-center">
          <input
            name="location-name"
            className="flex-1 outline-none bg-transparent px-5 text-black"
            type="text"
            placeholder="Procure uma cidade..."
            value={locationCity}
            onChange={(e) => setLocationCity(e.currentTarget.value)}
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
        </div>
      </form>

      {loading ? (
        <div className="flex justify-center items-center h-64 space-x-4">
          <div className="animate-spin border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full" />
          <span className="text-lg">Carregando...</span>
        </div>
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
