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

    // Filter areas based on selected city
    const filterarea = data.filter((item) => item.city === selectedCity);

    // Create an object to group zip codes by area name
    const areaZipCodes = {};
    filterarea.forEach((item) => {
      if (!areaZipCodes[item.area]) {
        areaZipCodes[item.area] = [];
      }
      if (item.zipcode) {
        areaZipCodes[item.area].push(item.zipcode);
      }
    });

    // Convert the object into an array of objects for rendering
    const areasWithZipCodes = Object.keys(areaZipCodes).map((area) => ({
      area,
      zipcodes: areaZipCodes[area],
    }));

    // Set the filtered areas with zip codes
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
          <p className="text-3xl font-bold text-[#0b5e86] font-roboto">
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
              className="rounded-md bg-green-800 px-4 py-2 text-[19px] font-semibold text-white shadow-sm hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Add Area
            </button>
            <button
              className="rounded-md bg-green-800 px-4 py-2 text-[19px] font-semibold text-white shadow-sm hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              onClick={(e) => {
                e.preventDefault();
                onAddSuburbClick();
              }}
            >
              Add New Suburbs
            </button>
          </div>
        </div>
        <p className="mx-5 text-2xl font-bold text-[#0b5e86] font-roboto">
          List of Avaible Area
        </p>
        <form className="grid grid-cols-3 gap-2 font-roboto mt-5">
          <div className="mx-5 flex flex-col border-2 border-gray-400 w-40">
            <p className="rounded-sm text-2xl bg-[#0b5e86] text-white p-1 shadow-lg shadow-gray-400">Country -</p>
          <div className="mx-5 flex flex-col border-2 w-40">
            <p className="rounded-sm text-2xl bg-[#0b5e86] text-white p-1 shadow-lg shadow-gray-400">
              Country -
            </p>
            <ul>
              <li className="text-2xl bg-white text-black p-1 rounded-sm hover:bg-gray-600 hover:text-white hover:shadow-lg hover:shadow-gray-400">Usa</li>
              <li className="text-2xl bg-white p-1 hover:bg-gray-600 hover:text-white mt-1 rounded-sm">
                Usa
              </li>
            </ul>
          </div>
          <div className="flex flex-col border-2 border-gray-400 w-40">
            <p className="rounded-sm text-2xl bg-[#0b5e86] text-white shadow-lg shadow-gray-400">List of States</p>
            <ul className="rounded-sm text-2xl bg-white p-1">
          <div className="flex flex-col border-2 w-40">
            <p className="rounded-sm text-2xl bg-[#0b5e86] text-white p-1 shadow-lg shadow-gray-400">
              List of States
            </p>
            <ul className="rounded-sm text-2xl bg-white p-1 mt-1">
              {filterstate.map((state, index) => (
                <li
                  key={index}
                  className={`cursor-pointer ${
                    selectedstate === state ? "text-2xl bg-gray-600 text-white p-1 rounded-sm hover:bg-gray-600 hover:text-white hover:shadow-lg hover:shadow-gray-400 <HiMinusCircle/> " : ""
                    selectedstate === state
                      ? "text-2xl bg-gray-600 text-white p-1 rounded-sm <HiMinusCircle /> "
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
          <div className="flex flex-col border-2 border-gray-400 w-45 mr-5">
            <p className="text-2xl rounded-sm bg-[#0b5e86] text-white p-2 shadow-lg shadow-gray-400">
              List of Area in{" "}
              {selectedstate ? <p>{selectedstate}</p> : <span>City</span>}
            </p>
            <ul className="rounded-sm text-2xl bg-white p-1">
              {Filtercity.map((city, index) => (
                <li
                  key={index}
                  value={city}
                  className={`cursor-pointer ${
                    selectedCity === city ? "text-2xl bg-gray-600 text-white p-1 rounded-sm hover:bg-gray-600 hover:text-white hover:shadow-lg hover:shadow-gray-400" : ""
                    selectedCity === city
                      ? "hover:bg-gray-600 hover:text-white rounded-sm p-1"
                      : ""
                  }`}
                  onClick={() => {
                    setSelectedCity(city);
                  }}
                >
                  {city}
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
          <div className="mx-5 flex flex-col border-2 ">
            {/* <button
            className="rounded-md bg-green-800 px-4 py-2 text-[19px] font-semibold text-white shadow-sm hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            onClick={(e) => {
                e.preventDefault();
                onAddSuburbClick();
              }}
            >
              Add New Subrs
            </button> */}
            <p className="text-2xl rounded-sm bg-[#0b5e86] text-white p-2 shadow-lg shadow-gray-400 mt-4 w-50">
              List of Area
            </p>
            <ul className="rounded-sm text-2xl bg-[#eee] p-1 mt-2">
              {filterarea.length > 0 &&
                filterarea.map((item, index) => (
                  <li
                    key={index}
                    className=" border-2 border-red-400 my-2 bg-slate-500"
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
