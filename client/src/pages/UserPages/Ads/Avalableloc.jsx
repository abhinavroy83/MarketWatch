import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { fetchcity } from "../../../Services/CityApi/Cityapi";
import { useDispatch } from "react-redux";
import { cities, login } from "../../../store/authslice";
import { RxCross1 } from "react-icons/rx";
import { IoLocationOutline } from "react-icons/io5";
import { IoLocationSharp } from "react-icons/io5";

Modal.setAppElement("#root");
function Avalableloc({ isOpen, onClose }) {
  const [cty, setcty] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchdata = async () => {
      const res = await fetchcity();
      const uniquecity = Array.from(
        new Set(res.data.city.map((item) => item.city))
      );
      setcty(uniquecity);
    };
    fetchdata();
  }, []);
  const handleLocation = (city) => {
    dispatch(cities({ city: city }));
    onClose(false);
    console.log("Selected location:", city);
  };

  return (
    <div className="flex flex-col absolute left-0 top-3 shadow-lg p-2 shadow-gray-700 mt-2 w-[400px] h-[90] bg-white justify-center mx-auto font-['udemy-regular'] border-2 rounded-md border-black">
      {" "}
      {/* <RxCross1
        className="h-5 w-5 text-white absolute top-3 right-3 cursor-pointer hover:rotate-[360deg] transition-transform duration-300 "
        onClick={onClose}
      /> */}
      <p className="font-['udemy-regular'] text-[20px] text-black flex gap-1 items-center">
        <IoLocationSharp />
        USA
      </p>
      <p className="text-[16px] font-bold px-2">Nearby Cities</p>
      <ul className="text-[18px] p-3">
        {cty.map((item, index) => (
          <li
            className="w-[80%] cursor-pointer px-3 py-1.5 ease-in-out duration-150 bg-white whitespace-nowrap hover:bg-[#232f3e] hover:text-white"
            key={index}
            onClick={() => handleLocation(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Avalableloc;
