import React, { useEffect, useState } from "react";
import {
  AdminDashboard,
  AdminHeader,
} from "../../../components/AdminCompontents";
import { useForm } from "react-hook-form";
import { fetchcity } from "../../../Services/CityApi/Cityapi";
import { useNavigate } from "react-router-dom";
import Addsuburbs from "./Addsuburbs";
import { HiMinusCircle } from "react-icons/hi";

function AllArea() {
  const { handleSubmit, register } = useForm();
  const [data, setData] = useState([]);
  const [filterstate, setfilterstate] = useState([]);
  const [Filtercity, setFiltercity] = useState([]);
  const [selectedstate, setSelectedstate] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [Filteresub, setFiltersub] = useState("");
  const [filterarea, setfilterarea] = useState("");
  const [filterpin, setfilterpin] = useState("");
  const [ismodelopen, setismodalopen] = useState(false);
  const navigate = useNavigate();

  const selcedata = {
    country: "Usa",
    state: selectedstate,
    area: selectedCity,
  };
  // console.log(selcedata);

  useEffect(() => {
    const fetchdata = async () => {
      const dta = await fetchcity();
      //   console.log(dta.data.city);
      setData(dta.data.city);
      const uniquestate = Array.from(
        new Set(dta.data.city.map((item) => item.state))
      );
      setfilterstate(uniquestate);
    };
    fetchdata();
  }, []);

  const onAddSuburbClick = () => {
    if (!selcedata.state || !selcedata.area) {
      alert("Please select both state and city");
    } else {
      setismodalopen(true);
    }
  };

  useEffect(() => {
    const filtercity = data.filter((item) => item.state === selectedstate);
    // console.log(filtercity);
    const uniquecity = [...new Set(filtercity.map((item) => item.city))];
    setFiltercity(uniquecity);
  }, [selectedstate]);

  useEffect(() => {
    const filtersubarea = data.filter((item) => item.city === selectedCity);
    setFiltersub(filtersubarea);

    const filterarea = data.filter((item) => item.city === selectedCity);

    const areaZipCodes = {};
    filterarea.forEach((item) => {
      if (!areaZipCodes[item.area]) {
        areaZipCodes[item.area] = [];
      }
      if (item.zipcode) {
        areaZipCodes[item.area].push(item.zipcode);
      }
    });

    const areasWithZipCodes = Object.keys(areaZipCodes).map((area) => ({
      area,
      zipcodes: areaZipCodes[area],
    }));

    setfilterarea(areasWithZipCodes);
  }, [selectedCity, data]);

  const onclose = () => {
    setismodalopen(false);
  };

  return (
    <div>
      <Addsuburbs isOpen={ismodelopen} onClose={onclose} {...selcedata} />
      <AdminHeader />
      <AdminDashboard>
        <div className="mx-5 mt-6 flex justify-between">
          <p className="text-3xl font-bold text-[#0b5e86] font-['udemy-regular']">
            Add Area Details Here -
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => {
                <div className="flex flex-col border-2 ">
                  <p className=" bg-fuchsia-500">List of Suburbs</p>
                  <ul>
                    {Filteresub.length > 0 &&
                      Filteresub.map((item, index) => (
                        <li key={index}>{item.subarea}</li>
                      ))}
                  </ul>
                </div>;
                navigate("/admin/addarea");
              }}
              className="rounded-md bg-green-800 px-4 py-2 text-[20px] font-semibold text-white shadow-sm hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Add Area
            </button>
            <button
              className="rounded-md bg-green-800 px-4 py-2 text-[20px] font-semibold text-white shadow-sm hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              onClick={(e) => {
                e.preventDefault();
                onAddSuburbClick();
              }}
            >
              Add New Subrs
            </button>
          </div>
        </div>
        <p className="mx-5 text-[24px] text-gray-700 font-['udemy-regular']">
          List of Avaible Area
        </p>
        <form className="grid grid-cols-3 gap-2 font-['udemy-regular'] mt-5">
          <div className="flex flex-col border-2 border-gray-400 w-45 mr-5">
            <p className="text-[20px] rounded-sm bg-[#0b5e86] text-white p-2 shadow-lg shadow-gray-400">
              List of Area in{" "}
              {selectedstate ? <p>{selectedstate}</p> : <span>City</span>}
            </p>
            <ul className="rounded-sm text-[20px] bg-white p-1">
              {Filtercity.map((city, index) => (
                <li
                  key={index}
                  value={city}
                  className={`cursor-pointer  hover:bg-gray-600 p-1 hover:text-white hover:shadow-lg  ${
                    selectedCity === city
                      ? "text-[20px] bg-gray-600 text-white p-1 rounded-sm hover:bg-gray-600 hover:text-white hover:shadow-lg hover:shadow-gray-400"
                      : ""
                  }`}
                  onClick={() => {
                    setSelectedCity(city);
                  }}
                >
                  {city} <button>de</button>
                </li>
              ))}
            </ul>
          </div>
          <div className="mx-5 flex flex-col border-2 border-gray-400 w-40">
            <p className="rounded-sm text-[20px] bg-[#0b5e86] text-white p-1 shadow-lg shadow-gray-400">
              Country -
            </p>
            <ul>
              <li className="text-[20px] bg-white text-black p-1 rounded-sm hover:bg-gray-600 hover:text-white hover:shadow-lg hover:shadow-gray-400">
                Usa
              </li>
            </ul>
          </div>
          <div className="flex flex-col border-2 border-gray-400 w-40">
            <p className="rounded-sm text-[20px] bg-[#0b5e86] text-white shadow-lg shadow-gray-400">
              List of States
            </p>
            <ul className="rounded-sm text-[20px] bg-white p-1">
              {filterstate.map((state, index) => (
                <li
                  key={index}
                  className={`cursor-pointer ${
                    selectedstate === state
                      ? "text-[20px] bg-gray-600 text-white p-1 rounded-sm hover:bg-gray-600 hover:text-white hover:shadow-lg hover:shadow-gray-400 <HiMinusCircle/> "
                      : ""
                  }`}
                  onClick={() => {
                    setSelectedstate(state);
                  }}
                >
                  {state}
                </li>
              ))}
            </ul>
          </div>

          {/* <div className=" flex flex-col border-2 ">
            <p className=" bg-fuchsia-500">List of Suburbs</p>
            <ul>
              {Filteresub.length > 0 &&
                Filteresub.map((item, index) => (
                  <li key={index}>{item.subarea}</li>
                ))}
            </ul>
          </div> */}
          <div className="flex flex-col border-2 ">
            {/* <button
            className="rounded-md bg-green-800 px-4 py-2 text-[20px] font-semibold text-white shadow-sm hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            onClick={(e) => {
                e.preventDefault();
                onAddSuburbClick();
              }}
            >
              Add New Subrs
            </button> */}
            <div className="border-2 border-gray-400 w-[500px]">
              <p className="text-[20px] rounded-sm bg-[#0b5e86] text-white p-2 shadow-lg shadow-gray-400 w-50">
                List of Area
              </p>
              <ul className="rounded-sm text-[20px] w-[496px]">
                {filterarea.length > 0 &&
                  filterarea.map((item, index) => (
                    <li
                      key={index}
                      className="text-[20px] bg-white text-black border-b-2 border-gray-400 p-1 rounded-sm hover:bg-gray-600 hover:text-white hover:shadow-lg hover:shadow-gray-400"
                    >
                      {item.area && `${item.area}, `}
                      {item.zipcodes.length > 0 && item.zipcodes.join(", ")}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          {/* <div className=" flex flex-col border-2 ">
            <p className=" bg-fuchsia-500">List of Availble Zipcode</p>
            <ul>
              {Filteresub.length > 0 &&
                Filteresub.map((item, index) => (
                  <li key={index}>{item.zipcode}</li>
                ))}
            </ul>
          </div> */}
        </form>
      </AdminDashboard>
    </div>
  );
}

export default AllArea;
