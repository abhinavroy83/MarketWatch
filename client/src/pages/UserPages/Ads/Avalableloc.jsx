import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { fetchcity } from "../../../Services/CityApi/Cityapi";
import { useDispatch } from "react-redux";
import { cities, login } from "../../../store/authslice";
import { RxCross1 } from "react-icons/rx";

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
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: {
          position: "absolute",
          top: "40%",
          left: "40%",
          transform: "translate(-40%, -40%)",
          width: 600,
          height: 340,
          border: "none",
          padding: "0",
          backgroundColor: "#FFF",
          boxShadow: "0px 0px 25px 0px rgba(0, 0, 0, 0.1)",
          borderRadius: 10,
          zIndex: 1000,
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          zIndex: 111,
        },
      }}
    >
      <div className="flex flex-col justify-center mx-auto font-['udemy-regular']">
        {" "}
        <RxCross1
          className="h-5 w-5 text-white absolute top-3 right-3 cursor-pointer hover:rotate-[360deg] transition-transform duration-300 "
          onClick={onClose}
        />
        <p className="font-['udemy-regular'] text-[22px] p-3 bg-[#0b5e86] shadow-2xl text-white">
          Here we show Available location
        </p>
        <ul className="text-[18px] ml-3 mt-5">
          {cty.map((item, index) => (
            <li
              className="border-2 border-transparent cursor-pointer px-2 py-1 ease-in-out duration-150  hover:bg-gray-300 w-[50%] rounded-full"
              key={index}
              onClick={() => handleLocation(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
}

export default Avalableloc;
