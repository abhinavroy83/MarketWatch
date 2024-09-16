import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { fetchcity } from "../../../Services/CityApi/Cityapi";
import { useDispatch, useSelector } from "react-redux";
import { cities, login } from "../../../store/authslice";
import { RxCross1 } from "react-icons/rx";
import { IoLocationOutline } from "react-icons/io5";
import { IoLocationSharp } from "react-icons/io5";
import { Globe } from "lucide-react";

Modal.setAppElement("#root");
function Avalableloc({ isOpen, onClose }) {
  const [cty, setcty] = useState([]);
  const dispatch = useDispatch();
  const currntcty = useSelector((state) => state.auth.city);
  const [selectedCity, setSelectedCity] = useState("");
  useEffect(() => {
    const fetchdata = async () => {
      const res = await fetchcity();
      const uniquecity = Array.from(
        new Set(res.data.city.map((item) => item.area))
      );

      uniquecity.sort((a, b) => a.localeCompare(b));
      setcty(uniquecity);
    };
    fetchdata();
  }, []);
  const handleLocation = (city) => {
    dispatch(cities({ city: city }));
    setSelectedCity(city);
    const currentData = JSON.parse(localStorage.getItem("userdetails"));
    const updatedData = {
      ...currentData,
      data: {
        ...currentData.data,
        data: {
          ...currentData.data.data,
          city: city,
        },
      },
    };
    localStorage.setItem("userdetails", JSON.stringify(updatedData));
    onClose(false);
    // console.log("Selected location:", city);
  };
  useEffect(() => {
    setSelectedCity(currntcty);
  }, [handleLocation]);

  return (
    <div className="absolute w-[250px] top-4 lg:w-[350px] left-0  mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
      <p className="font-medium p-2 text-base sm:text-lg md:text-xl text-black flex gap-1 items-center border-b border-gray-200">
        <Globe className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        USA
      </p>
      <div className="p-2 grid grid-cols-1 sm:grid-cols-2 gap-1 max-h-60 overflow-y-auto">
        {cty.map((city, index) => (
          <button
            key={index}
            onClick={() => handleLocation(city)}
            className={`w-full text-left px-3 py-2 rounded hover:bg-[#232f3e] hover:text-white focus:outline-none transition duration-150 ease-in-out ${
              selectedCity === city
                ? "bg-[#232f3e] text-white"
                : "text-gray-700"
            }`}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
    // <div className="flex flex-col absolute left-0 top-4 shadow-lg p-2 shadow-gray-700 mt-2 lg:w-[350px] w-[170px] h-90 bg-white justify-center mx-auto font-['udemy-regular'] border-2 rounded-md border-black">
    //   {" "}

    //   <p className="text-[16px] font-bold px-2">Nearby Cities</p>
    //   <ul className="text-[18px]">
    //     {cty.map((item, index) => (
    //       <li
    //         className="w-full cursor-pointer px-2 py-1.5 rounded-md ease-in-out duration-150 bg-white whitespace-nowrap hover:bg-[#232f3e] hover:text-white"
    //         key={index}
    //         onClick={() => handleLocation(item)}
    //       >
    //         {item}
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
}

export default Avalableloc;
