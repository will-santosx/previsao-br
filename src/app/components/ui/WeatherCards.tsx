import Image from "next/image";
import {
  WiHumidity,
  WiThermometer,
  WiThermometerExterior,
  WiStrongWind,
} from "react-icons/wi";
import { WeatherInfo } from "../actions/RequestData";

interface MainCardProps {
  data: WeatherInfo;
}

export function MainCard({ data }: MainCardProps) {
  return (
    <>
      {data && (
        <>
          {/* container for the main weather card */}
          <div className="h-fit w-full md:w-[60%] p-2 bg-white bg-grid-blue-500/[0.4] relative rounded-md transition-transform duration-500 transform hover:scale-105">
            <div className="flex flex-col relative z-20 w-full justify-center">
              {/* header with city name and country */}
              <div className="flex md:flex-row flex-col justify-center items-center md:items-baseline gap-2">
                <h1
                  className="md:text-[36px] text-[28px] font-medium"
                  aria-label={`Weather in ${data.cityName}`}
                >
                  {data.cityName}
                </h1>
                <span className="md:text-[24px] text-[20px] font-light">
                  {data.country}
                </span>
              </div>
              <div className="w-full flex md:flex-row gap-x-20 flex-col justify-center items-center">
                {/* weather icon */}
                <div>
                  <Image
                    className="w-60 transition-transform duration-500 transform hover:scale-110"
                    width={240}
                    height={240}
                    alt={`Weather icon for ${data.description}`}
                    src={data.icon}
                  />
                </div>
                {/* weather details */}
                <div className="text-center flex flex-col">
                  <span
                    className="font-semibold"
                    aria-label={`Weather description: ${data.description}`}
                  >
                    {data.description}
                  </span>
                  <h2 className="font-bold text-[50px]">
                    {Math.floor(data.temperature)}ºC
                  </h2>
                  <span className="text-[15px]">
                    Sensação Térmica: {Math.floor(data.feelsLike)}ºC
                  </span>
                  <span className="text-[15px]">({data.localTime})</span>
                </div>
              </div>
            </div>
            {/* background effect */}
            <div className="absolute pointer-events-none -z-0 inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_60%,black)] transition-opacity duration-500 opacity-60"></div>
          </div>
          {/* additional weather details */}
          <div className="w-full md:w-[60%] flex gap-y-5 sm:flex-row flex-col justify-around">
            <div className="flex flex-col items-center text-[18px]">
              <div className="flex items-center gap-1">
                <WiHumidity className="text-green-700/60 border w-6 h-6 rounded-full border-black transition-transform duration-300 transform hover:scale-110" />
                <h4>Umidade</h4>
              </div>
              <span className="font-semibold">{data.humidity}%</span>
            </div>
            <div className="flex flex-col items-center text-[18px]">
              <div className="flex items-center gap-1">
                <WiThermometerExterior className="text-blue-700/60 border w-6 h-6 rounded-full border-black transition-transform duration-300 transform hover:scale-110" />
                <h4>Temp. Mín</h4>
              </div>
              <span className="font-semibold">
                {Math.floor(data.minTemp)}ºC
              </span>
            </div>
            <div className="flex flex-col items-center text-[18px]">
              <div className="flex items-center gap-1">
                <WiThermometer className="text-red-700/60 border w-6 h-6 rounded-full border-black transition-transform duration-300 transform hover:scale-110" />
                <h4>Temp. Máx</h4>
              </div>
              <span className="font-semibold">
                {Math.floor(data.maxTemp)}ºC
              </span>
            </div>
            <div className="flex flex-col items-center text-[18px]">
              <div className="flex items-center gap-1">
                <WiStrongWind className="text-violet-700/60 border w-6 h-6 rounded-full border-black transition-transform duration-300 transform hover:scale-110" />
                <h4>Vel. Vento</h4>
              </div>
              <span className="font-semibold">
                {Math.floor(data.windSpeed)}KM
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
}
