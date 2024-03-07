import axios from "axios";
import React, { useEffect, useState } from "react";

function ChildContainer({ children, onLocationReceived }) {
  const [weatherData, setwhetherdata] = useState([]);
  useEffect(() => {
    const lat = onLocationReceived.lat;
    const lng = onLocationReceived.lng;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=5e414d6a2d51b65b62d9b463859ae456`
      )
      .then((res) => {
        console.log(res.data), setwhetherdata(res.data);
      })
      .catch((error) => console.log("Error during fetcing whether", error));
    console.log("lat", lat);
    console.log("lat", lng);
  }, [onLocationReceived]);
  const convertKelvinToCelsius = (kelvin) => {
    return kelvin - 273.15;
  };
  console.log("whetherdata", weatherData);
  return (
    <div className="w-full mx-auto px-4 flex justify-center h-full">
      <main>{children}</main>
      <aside className="border-gray-400 border-2 w-1/5 m-2 h-2/3 mt-4 font-[Roboto]">
        <div className="h-full flex flex-col">
          {weatherData ? (
            <div className="p-10 rounded-xl border-2 bg-gradient-to-t from-cyan-500 to-blue-700 text-white text-[24px] font-[Roboto]">
              <div>{weatherData.name}</div>
              <div className="flex">
                <div className="flex mt-5 text-white text-[47px]">
                  <div>
                    {weatherData.weather && weatherData.weather.length > 0 && (
                      <img
                        className="h-16 w-16"
                        src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                        alt="logo"
                      />
                    )}
                  </div>
                  <div>
                    {weatherData.main && (
                      <div>
                        <p>
                          {convertKelvinToCelsius(
                            weatherData.main.temp
                          ).toFixed(1)}
                          °C
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="pl-2 ml-10 mt-5">
                  {weatherData.weather && <p>{weatherData.weather[0].main}</p>}
                  {weatherData.main && <p>{weatherData.main.humidity}%</p>}
                </div>
              </div>
              <p className="mt-5">from OpenWeatherMap</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
          <div className="border-2 bg-yellow-300 h-2/4 mt-4 rounded-xl">
          <h1 className="text-2xl font-semibold text-black mt-5 ml-10">
							Services
						</h1>
          </div>

        </div>
      </aside>
    </div>
  );
}

export default ChildContainer;
