import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function ChildContainer({ children, onLocationReceived }) {
  const [weatherData, setwhetherdata] = useState([]);
  const currentloc = useSelector((state) => state.auth.location);

  useEffect(() => {
    let lat, lng;
    if (onLocationReceived) {
      lat = onLocationReceived.lat;
      lng = onLocationReceived.lng;
    } else if (currentloc) {
      lat = currentloc.lat;
      lng = currentloc.lng;
    } else {
      return; // No location data available
    }
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
  }, [onLocationReceived, currentloc]);
  const convertKelvinToCelsius = (kelvin) => {
    return kelvin - 273.15;
  };
  console.log("whetherdata", weatherData);
  return (
    <div className="w-full mx-auto px-4 flex justify-center h-full">
      <main>{children}</main>
      <aside className="w-1/5 m-2 h-2/3 mt-4 font-[Roboto]">
        <div className="h-full flex flex-col">
          {weatherData ? (
            <div className="p-10 rounded-xl border-2 bg-gradient-to-t from-cyan-600 to-blue-800 text-white text-[30px] font-[Roboto] shadow-sm shadow-[#000]">
              <div>{weatherData.name}</div>
              <div className="flex w-full">
                <div className="flex mt-5 text-white text-[47px]">
                  <div>
                    {weatherData.weather && weatherData.weather.length > 0 && (
                      <img
                        className="h-20 w-20 pr-2"
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
                <div className="pl-2 ml-4 mt-0 text-[26px]">
                  {weatherData.weather && <p>{weatherData.weather[0].main}</p>}
                  <article className="flex ml-2 gap-2 mt-2">
                    <img
                      className="h-15 w-10 pr-2 flex"
                      src={`https://www.nicepng.com/png/full/245-2459912_wz-1600x1600-a-drop-of-dew-temperature-and.png`}
                      alt="logo"
                    />
                    {weatherData.main && <p>{weatherData.main.humidity}%</p>}
                  </article>
                </div>
              </div>
              <p className="mt-2 text-cyan-200 text-[20px]">
                from OpenWeatherMap
              </p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
          <div className="border-2 bg-yellow-300 h-2/4 mt-4 rounded-xl shadow-sm shadow-[#000]">
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
