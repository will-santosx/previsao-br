import d01 from "./01d.png";
import n01 from "./01n.png";
import d02 from "./02d.png";
import n02 from "./02n.png";
import d03 from "./03d.png";
import n03 from "./03n.png";
import d04 from "./04d.png";
import n04 from "./04n.png";
import d09 from "./09d.png";
import n09 from "./09n.png";
import d10 from "./10d.png";
import n10 from "./10n.png";
import d11 from "./11d.png";
import n11 from "./11n.png";
import d13 from "./13d.png";
import n13 from "./13n.png";
import d50 from "./50d.png";
import n50 from "./50n.png";

export const getWeatherIcon = (
  weatherCode:
    | "01d"
    | "01n"
    | "02d"
    | "02n"
    | "03d"
    | "03n"
    | "04d"
    | "04n"
    | "09d"
    | "09n"
    | "10d"
    | "10n"
    | "11d"
    | "11n"
    | "13d"
    | "13n"
    | "50d"
    | "50n"
): string => {
  switch (weatherCode) {
    case "01d": // Clear sky (day)
      return d01.src; // Sol
    case "01n": // Clear sky (night)
      return n01.src; // Lua
    case "02d": // Few clouds (day)
      return d02.src; // Sol entre nuvens
    case "02n": // Few clouds (night)
      return n02.src; // Sol entre nuvens
    case "03d": // Scattered clouds
      return d03.src; // Nuvens dispersas
    case "03n":
      return n03.src; // Nuvens dispersas
    case "04d": // Broken clouds
      return d04.src; // Muitas nuvens
    case "04n":
      return n04.src; // Muitas nuvens
    case "09d": // Shower rain
      return d09.src; // Chuva
    case "09n":
      return n09.src; // Chuva
    case "10d": // Rain (day)
      return d10.src; // Chuva com sol
    case "10n": // Rain (night)
      return n10.src; // Chuva com sol
    case "11d": // Thunderstorm (day)
      return d11.src; // Tempestade
    case "11n": // Thunderstorm (night)
      return n11.src; // Tempestade
    case "13d": // Snow (day)
      return d13.src; // Neve
    case "13n": // Snow (night)
      return n13.src; // Neve
    case "50d": // Mist (day)
      return d50.src; // Névoa
    case "50n": // Mist (night)
      return n50.src; // Névoa
    default:
      return "❓"; // Fallback
  }
};
