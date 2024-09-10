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
      // try {
      //   const response = await axios.get(
      //     `https://v6.exchangerate-api.com/v6/ca2ecba4b423e1e50d379941/latest/USD`
      //   );
      //   console.log("res",response.response.data.result)
      //   const rates = response.data.conversion_rates;
      //   const rate = rates.INR;
      //   setExchangeRate(rate);
      //   setConvertedAmount(amount * rate);
      // } catch (error) {
      //   console.error("Error fetching exchange rates:", error);
      // }
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
    <div className={` w-full mt-[8rem] h-full ${className}`}>
      <div className="flex flex-col lg:flex-row justify-center w-full max-w-[1600px] m-auto font-['udemy-regular']">
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
        <div className="w-full lg:max-w-[300px] lg:mr-3 lg:ml-0 lg:mt-1 mt-5 h-5/6 flex justify-center">
          <LeafletMap onLocationReceived={currentloc} />
        </div>
        {/* <aside className="max-w-[392px] lg:max-w-[320px] ml-4 lg:ml-0 lg:mt-1 mt-5 h-5/6 font-['udemy-regular'] rounded-lg bg-gradient-to-r from-cyan-400 to-blue-600 py-5 px-5 mr-3 lg:mr-3">
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
          </div>
        </aside> */}
      </div>
    </div>
  );
}

export default ChildContainer;
