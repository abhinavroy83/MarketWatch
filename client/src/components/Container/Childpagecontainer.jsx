import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LeafletMap from "../UserCompontents/LeafletMap";
import { fetchcity } from "../../Services/CityApi/Cityapi";
import { FaDroplet } from "react-icons/fa6";
import { WiRaindrops } from "react-icons/wi";
import { MdDateRange } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FcCurrencyExchange } from "react-icons/fc";
import { TbCoinRupeeFilled } from "react-icons/tb";
import { TbArrowsExchange } from "react-icons/tb";
import { AiFillDollarCircle } from "react-icons/ai";

function ChildContainer({ className, children, onLocationReceived }) {
  const [weatherData, setwhetherdata] = useState([]);
  const currentloc = useSelector((state) => state.auth.location);
  const city = useSelector((state) => state.auth.city);
  const [cty, setcty] = useState([]);
  const [data, setdata] = useState([]);
  const [selectcity, setselectcity] = useState("");
  const [subareas, setsubarea] = useState("");
  const [exchangeRate, setExchangeRate] = useState(null);
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/ca2ecba4b423e1e50d379941/latest/USD`
        );
        const rates = response.data.conversion_rates;
        const rate = rates.INR;
        setExchangeRate(rate);
        setConvertedAmount(amount * rate);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchExchangeRate();
  }, [amount]);

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
    <div className={` w-full mt-[8%] h-full ${className}`}>
      <div className="flex flex-col lg:flex-row justify-center w-full max-w-[1600px] m-auto ">
        <div className=" w-full lg:w-4/5">
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
        <aside className="max-w-[320px] ml-[24px] lg:ml-0 lg:mt-0 mt-5 h-5/6 font-['udemy-regular'] bg-gray-200 py-5 px-5">
          <div className="h-full flex flex-wrap flex-col gap-1">
            <div className="text-[20px] p-2 rounded-sm text-black max-w-[1600px] bg-white shadow-sm shadow-[#000]">
              <div className="flex gap-2 items-center">
                <div className="items-center flex">
                  <AiFillDollarCircle size={20} />
                  <TbArrowsExchange size={20} />
                  <TbCoinRupeeFilled size={22} />
                </div>
                <input
                  type="number"
                  value={amount}
                  className=" border-black border-b-2 w-[170px]"
                  onChange={(e) => setAmount(e.target.value)}
                  min="1"
                />
              </div>
              {exchangeRate && (
                <div>
                  <p className="text-sm mt-2">
                    Exchange Rate (USD to INR ): {exchangeRate}
                  </p>
                  <p className=" text-sm">
                    Converted Amount: {convertedAmount} INR
                  </p>
                </div>
              )}
            </div>

            <div className="mt-3">
              <LeafletMap
                onLocationReceived={currentloc}
                // style={{ height: "300px", width: "280px" }}
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
