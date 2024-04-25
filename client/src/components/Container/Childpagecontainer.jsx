import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LeafletMap from "../UserCompontents/LeafletMap";
import { fetchcity } from "../../Services/CityApi/Cityapi";
import { FaDroplet } from "react-icons/fa6";
import { WiRaindrops } from "react-icons/wi";
import { MdDateRange } from "react-icons/md";



function ChildContainer({ className, children, onLocationReceived }) {
  const [weatherData, setwhetherdata] = useState([]);
  const currentloc = useSelector((state) => state.auth.location);
  const city = useSelector((state) => state.auth.city);
  const [cty, setcty] = useState([]);
  const [data, setdata] = useState([]);
  const [selectcity, setselectcity] = useState("");
  const [subareas, setsubarea] = useState("");

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
        city
          ? `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
            city
          )}&appid=5e414d6a2d51b65b62d9b463859ae456`
          : `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=5e414d6a2d51b65b62d9b463859ae456`
      )
      .then((res) => {
        setwhetherdata(res.data);
      })
      .catch((error) => console.log("Error during fetcing whether", error));
  }, [onLocationReceived, currentloc, city]);
  const convertKelvinToCelsius = (kelvin) => {
    return kelvin - 273.15;
  };
  // console.log(selectcity);
  useEffect(() => {
    const fetchdata = async () => {
      const citys = await fetchcity();
      // console.log(citys.data.city);
      setdata(citys.data.city);
      const uniqueCities = Array.from(
        new Set(citys.data.city.map((item) => item.city))
      );
      // console.log(uniqueCities);
      setcty(uniqueCities);
      // const suburbs=citys.find()
    };
    fetchdata();
  }, []);
  // console.log(first)

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setselectcity(selectedCity);
    const updcity = data.filter((item) => item.city === selectedCity);
    const subares = updcity.map((item) => item.subarea);
    setsubarea(subares);
  };
  return (
    <div className={` w-full mt-40 h-full ${className}`}>
      <div className="flex justify-center w-full max-w-[1600px] m-auto">
        <div className=" w-4/5">
          {/* <div>
            <select name="city" onChange={handleCityChange}>
              {cty.map((city, index) => (
                <option value={city} key={index}>
                  {city}
                </option>
              ))}
            </select>
            <ul>
              {subareas.length > 0 && subareas.map((item) => <li>{item}</li>)}
            </ul>
          </div> */}
          <main>{children}</main>
        </div>
        <aside className="max-w-[320px] m-2 h-5/6 font-['udemy-regular'] mt-20 bg-gray-200 py-5 px-5">
          <div className="h-full flex flex-wrap flex-col gap-1">
            {weatherData ? (
              <div className="rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-['udemy-regular'] mb-3 shadow-sm shadow-[#000]">
                <div className="text-[33px] bg-white/30 text-black rounded-tl-lg p-1">{weatherData.name}</div>
                <div className="flex w-full flex-wrap ">
                  <div className="flex text-white text-[40px] font-['udemy-regular'] gap-2 px-1 justify-between">
                    <div>
                      {weatherData.weather &&
                        weatherData.weather.length > 0 && (
                          <img
                            className="w-[6.9rem] h-13 items-center justify-center border-full border-white"
                            src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                            alt="logo"
                          />
                        )}
                    </div>
                    <div className="block items-center ml-1 ">
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
                      <div className="items-center gap-3 text-[29px] flex-grow">
                        {weatherData.weather && (
                          <p>{weatherData.weather[0].main}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex text-[26px] items-center gap-3 p-1 text-gray-800">
                    <article className="items-center flex gap-2 justify-center">
                      <FaDroplet size={25} />
                      {weatherData.main && <p>{weatherData.main.humidity}%</p>}
                    </article>
                    <p className="flex items-center gap-2"><MdDateRange />24-3-2024</p>
                  </div>
                  {/* <div className="items-center gap-3 flex text-[29px] flex-grow p-1">
                    {weatherData.weather && (
                      <p>{weatherData.weather[0].main}</p>
                    )}
                    <article className="items-center flex gap-2">
                      <FaDroplet size={25}/>
                      {weatherData.main && <p>{weatherData.main.humidity}%</p>}
                    </article>
                  </div> */}
                </div>
                {/* <p className="mt-2 text-cyan-200 text-[20px]">
                  from OpenWeatherMap
                </p> */}
              </div>
            ) : (
              <p>Loading...</p>
            )}
            <div className="text-[23px] p-2 rounded-sm text-black max-w-[1600px] bg-white shadow-sm shadow-[#000]">
              <h1>$ 1 = Rs.72</h1>
            </div>
            <div className="text-[23px] p-2 mt-1 rounded-sm text-black max-w-[1600px] bg-white shadow-sm shadow-[#000]">
              <h1>1 BTC = $ 70 K</h1>
            </div>
            <div className="mt-3">
              <LeafletMap
                onLocationReceived={currentloc}
                style={{ height: "300px", width: "280px" }}
              />
            </div>

            {/* <div className="bg-yellow-300 mt-4 rounded-xl shadow-sm shadow-[#000]">
              <h1 className="text-2xl font-semibold text-white mt-5 ml-5">
                Services
              </h1>
              <ul className="mx-5 mb-0 flex space-x-8 flex-wrap justify-between">
                <li style={{ marginLeft: 0 }}>
                  <button
                    type="button"
                    onClick={() => {
                      navigate("/");
                    }}
                    className="rounded-md bg-transparent mt-1 text-[14px]	font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
                    className="rounded-md bg-transparent text-[14px] font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
                    className="rounded-md bg-transparent mt-1 text-[14px] font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
                    className="rounded-md bg-transparent mt-1 text-[14px] font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
                    className="rounded-md bg-transparent mt-1 text-[14px] leading-[1rem] font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
                    className="rounded-md bg-transparent mt-1 text-[14px] leading-[1rem] font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
                    className="rounded-md bg-transparent mt-1 text-[14px] font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
                    className="rounded-md bg-transparent mt-1 text-[14px] font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
                    className="rounded-md bg-transparent mt-1 text-[14px] font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
                    className="rounded-md bg-transparent mt-1 text-[14px] font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
                    className="rounded-md bg-transparent mt-1 text-[14px] font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
                    className="rounded-md bg-transparent mt-1 text-[14px] font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
                    className="rounded-md bg-transparent mt-1 text-[14px] font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    HomeServices
                  </button>
                </li>
              </ul>
            </div> */}
          </div>
          {/* <div className="border-2 bg-white mt-4 rounded-md shadow-sm shadow-[#000]">
            <h1 className="text-lg text-white mt-5 ml-5 font-white mx-5 mb-0 flex space-x-8 flex-wrap justify-between">
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
                    className="rounded-md mt-0 bg-transparent text-[14px] font-semibold text-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
                    className="rounded-md bg-transparent text-[14px] font-semibold text-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
                    className="rounded-md bg-transparent mt-1 text-[14px] font-semibold text-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
                    className="rounded-md bg-transparent text-[14px] font-semibold text-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
                    className="rounded-md bg-transparent mt-1 text-[14px] font-semibold text-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
                    className="rounded-md bg-transparent text-[14px] font-semibold text-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
                    className="rounded-md bg-transparent mt-1 text-[14px] font-semibold text-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
                    className="rounded-md bg-transparent text-[14px] font-semibold text-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
                    className="rounded-md bg-transparent mt-1 text-[14px] font-semibold text-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
                    className="rounded-md bg-transparent text-[14px] font-semibold text-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
          </div> */}
        </aside>
      </div>
    </div>
  );
}

export default ChildContainer;
