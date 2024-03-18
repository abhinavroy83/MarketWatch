import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function ChildContainer({ className, children, onLocationReceived }) {
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
      return;
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
  // console.log("whetherdata", weatherData);
  return (
    <div className={` w-full mt-36 h-full ${className}`}>
      <div className="flex justify-center w-full max-w-[1600px] m-auto">
        <main className=" w-4/5">{children}</main>
        <aside className="w-1/5 m-2 h-2/3 font-[Montserrat] mt-20 bg-gray-300 py-5 px-5">
          <div className="h-full flex flex-wrap">
            {weatherData ? (
              <div className="rounded-xl border-2 bg-gradient-to-t from-cyan-600 to-blue-800 text-white text-[30px] font-[Montserrat] shadow-sm shadow-[#000] p-2">
                <div>{weatherData.name}</div>
                <div className="flex w-full flex-wrap justify-space-between">
                  <div className="flex text-white text-[40px] font-[OpenSans] gap-2">
                    <div>
                      {weatherData.weather &&
                        weatherData.weather.length > 0 && (
                          <img
                            className="w-[3.9rem] h-15 items-center"
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
                  <div className="mt-0 text-[26px] flex-grow">
                    {weatherData.weather && (
                      <p>{weatherData.weather[0].main}</p>
                    )}
                    <article className="flex gap-2 mt-2">
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
            <div className="border-2 bg-yellow-300 mt-4 rounded-xl shadow-sm shadow-[#000]">
              <h1 className="text-2xl font-semibold text-black mt-5 ml-5">
                Services
              </h1>
              <ul className="mx-5 mb-0 flex space-x-8 flex-wrap justify-between">
                <li style={{ marginLeft: 0 }}>
                  <button
                    type="button"
                    onClick={() => {
                      navigate("/");
                    }}
                    className="rounded-md bg-transparent mt-1 text-[14px]	font-semibold text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    HomeServices
                  </button>
                </li>
                <li style={{ marginLeft: 0 }}>
                  <button
                    type="button"
                    onClick={() => {
                      navigate("/");
                    }}
                    className="rounded-md bg-transparent text-[14px] font-semibold text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    HomeServices
                  </button>
                </li>
                <li style={{ marginLeft: 0 }}>
                  <button
                    type="button"
                    onClick={() => {
                      navigate("/");
                    }}
                    className="rounded-md bg-transparent mt-1 text-[14px] font-semibold text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    HomeServices
                  </button>
                </li>
                <li style={{ marginLeft: 0 }}>
                  <button
                    type="button"
                    onClick={() => {
                      navigate("/");
                    }}
                    className="rounded-md bg-transparent mt-1 text-[14px] font-semibold text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    HomeServices
                  </button>
                </li>
                <li style={{ marginLeft: 0 }}>
                  <button
                    type="button"
                    onClick={() => {
                      navigate("/");
                    }}
                    className="rounded-md bg-transparent mt-1 text-[14px] leading-[1rem] font-semibold text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    HomeServices
                  </button>
                </li>
                <li style={{ marginLeft: 0 }}>
                  <button
                    type="button"
                    onClick={() => {
                      navigate("/");
                    }}
                    className="rounded-md bg-transparent mt-1 text-[14px] leading-[1rem] font-semibold text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    HomeServices
                  </button>
                </li>
                <li style={{ marginLeft: 0 }}>
                  <button
                    type="button"
                    onClick={() => {
                      navigate("/");
                    }}
                    className="rounded-md bg-transparent mt-1 text-[14px] font-semibold text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    HomeServices
                  </button>
                </li>
                <li style={{ marginLeft: 0 }}>
                  <button
                    type="button"
                    onClick={() => {
                      navigate("/");
                    }}
                    className="rounded-md bg-transparent mt-1 text-[14px] font-semibold text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    HomeServices
                  </button>
                </li>
                <li style={{ marginLeft: 0 }}>
                  <button
                    type="button"
                    onClick={() => {
                      navigate("/");
                    }}
                    className="rounded-md bg-transparent mt-1 text-[14px] font-semibold text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    HomeServices
                  </button>
                </li>
                <li style={{ marginLeft: 0 }}>
                  <button
                    type="button"
                    onClick={() => {
                      navigate("/");
                    }}
                    className="rounded-md bg-transparent mt-1 text-[14px] font-semibold text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    HomeServices
                  </button>
                </li>
                <li style={{ marginLeft: 0 }}>
                  <button
                    type="button"
                    onClick={() => {
                      navigate("/");
                    }}
                    className="rounded-md bg-transparent mt-1 text-[14px] font-semibold text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    HomeServices
                  </button>
                </li>
                <li style={{ marginLeft: 0 }}>
                  <button
                    type="button"
                    onClick={() => {
                      navigate("/");
                    }}
                    className="rounded-md bg-transparent mt-1 text-[14px] font-semibold text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    HomeServices
                  </button>
                </li>
                <li style={{ marginLeft: 0 }}>
                  <button
                    type="button"
                    onClick={() => {
                      navigate("/");
                    }}
                    className="rounded-md bg-transparent mt-1 text-[14px] font-semibold text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    HomeServices
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-2 bg-white mt-4 rounded-md shadow-sm shadow-[#000]">
            <h1 className="text-lg text-black mt-5 ml-5 font-black mx-5 mb-0 flex space-x-8 flex-wrap justify-between">
              SEARCHES
            </h1>
            <div>
              <hr className="px-7 mt-2" />
              <ul className="mx-5 flex space-x-8 flex-wrap justify-between">
                <li style={{ marginLeft: 0 }}>
                  <button
                    type="button"
                    onClick={() => {
                      navigate("/");
                    }}
                    className="rounded-md mt-0 bg-transparent text-[14px] font-semibold text-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Demo Search
                  </button>
                </li>
                <li style={{ marginLeft: 0 }}>
                  <button
                    type="button"
                    onClick={() => {
                      navigate("/");
                    }}
                    className="rounded-md bg-transparent text-[14px] font-semibold text-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Find Search
                  </button>
                </li>
              </ul>
              <ul className="mx-5 mb-0 flex space-x-8 flex-wrap justify-between">
                <li style={{ marginLeft: 0 }}>
                  <button
                    type="button"
                    onClick={() => {
                      navigate("/");
                    }}
                    className="rounded-md bg-transparent mt-1 text-[14px] font-semibold text-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Demo Search
                  </button>
                </li>
                <li style={{ marginLeft: 0 }}>
                  <button
                    type="button"
                    onClick={() => {
                      navigate("/");
                    }}
                    className="rounded-md bg-transparent text-[14px] font-semibold text-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Find Search
                  </button>
                </li>
              </ul>
              <ul className="mx-5 mb-0 flex space-x-8 flex-wrap justify-between">
                <li style={{ marginLeft: 0 }}>
                  <button
                    type="button"
                    onClick={() => {
                      navigate("/");
                    }}
                    className="rounded-md bg-transparent mt-1 text-[14px] font-semibold text-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Demo Search
                  </button>
                </li>
                <li style={{ marginLeft: 0 }}>
                  <button
                    type="button"
                    onClick={() => {
                      navigate("/");
                    }}
                    className="rounded-md bg-transparent text-[14px] font-semibold text-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Find Search
                  </button>
                </li>
              </ul>
              <ul className="mx-5 mb-0 flex space-x-8 flex-wrap justify-between">
                <li style={{ marginLeft: 0 }}>
                  <button
                    type="button"
                    onClick={() => {
                      navigate("/");
                    }}
                    className="rounded-md bg-transparent mt-1 text-[14px] font-semibold text-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Demo Search
                  </button>
                </li>
                <li style={{ marginLeft: 0 }}>
                  <button
                    type="button"
                    onClick={() => {
                      navigate("/");
                    }}
                    className="rounded-md bg-transparent text-[14px] font-semibold text-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Find Search
                  </button>
                </li>
              </ul>
              <ul className="mx-5 mb-0 flex space-x-8 flex-wrap justify-between">
                <li style={{ marginLeft: 0 }}>
                  <button
                    type="button"
                    onClick={() => {
                      navigate("/");
                    }}
                    className="rounded-md bg-transparent mt-1 text-[14px] font-semibold text-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Demo Search
                  </button>
                </li>
                <li style={{ marginLeft: 0 }}>
                  <button
                    type="button"
                    onClick={() => {
                      navigate("/");
                    }}
                    className="rounded-md bg-transparent text-[14px] font-semibold text-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Find Search
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-2 bg-white mt-4 rounded-md shadow-sm shadow-[#000]">
            <img
              className="w-full h-full"
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlS2MyP82wFMKpr7e1CxfyAoqgDRx0Bg0seg&usqp=CAU"
              }
              alt=""
            />
          </div>
        </aside>
      </div>
    </div>
  );
}

export default ChildContainer;
