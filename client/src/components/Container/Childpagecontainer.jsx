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
      <aside className="border-red-400 border-2 w-1/5 m-2 h-2/3 mt-4">
        <div className="h-full flex flex-col">
          {weatherData ? (
            <div className="p-4 border-2 bg-blue-500">
              <div>{weatherData.name}</div>
              <div className="flex">
                <div className="flex border-2 border-blue-200">
                  <div>
                    {weatherData.weather && weatherData.weather.length > 0 && (
                      <img
                        className="h-12 w-12"
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
                <div className="pl-2">
                  {weatherData.weather && <p>{weatherData.weather[0].main}</p>}
                  {weatherData.main && <p>{weatherData.main.humidity}%</p>}
                </div>
              </div>
              <p>from OpenWeatherMap</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
          <div className="border-2 bg-yellow-300 h-2/4"></div>
        </div>
      </aside>
    </div>
  );
}

export default ChildContainer;
