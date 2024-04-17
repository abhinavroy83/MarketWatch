import React, { useEffect, useState } from "react";
import {
  AdminDashboard,
  AdminHeader,
} from "../../../components/AdminCompontents";
import { useForm } from "react-hook-form";
import { fetchcity } from "../../../Services/CityApi/Cityapi";
import { useNavigate } from "react-router-dom";
import Addsuburbs from "./Addsuburbs";

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
    // console.log(filterarea);
    const uniquearea = [...new Set(filterarea.map((item) => item.area))];
    setfilterarea(uniquearea);
  }, [selectedCity, selectedstate]);

  useEffect(() => {
    // console.log(filterarea);
  }, [selectedCity, selectedstate]);

  const onclose = () => {
    setismodalopen(false);
  };

  return (
    <div>
      <Addsuburbs isOpen={ismodelopen} onClose={onclose} {...selcedata} />
      <AdminHeader />
      <AdminDashboard>
        <div className="mx-7 mt-6 flex justify-between">
          <p className="text-3xl font-bold text-[#0b5e86] font-roboto">Add Area Details Here -</p>
          <button
            onClick={() => {
              navigate("/admin/addarea");
            }}
            className="rounded-md bg-green-800 px-4 py-2 text-[19px] font-semibold text-white shadow-sm hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Add Area
          </button>
        </div>

        <p className="mx-7 text-2xl font-bold text-[#0b5e86] font-roboto">List of Avaible Area</p>
        <form className="grid grid-cols-4 gap-1">
          <div className="mx-7 flex flex-col border-red-500 border-2 max-w-28">
            <p className=" bg-fuchsia-500">Country</p>
            <ul>
              <li className=" bg-red-500">Usa</li>
            </ul>
          </div>
          <div className=" flex flex-col border-red-500 border-2 max-w-36">
            <p className=" bg-fuchsia-500">List of avl State</p>
            <ul>
              {filterstate.map((state, index) => (
                <li
                  key={index}
                  className={`cursor-pointer ${selectedstate === state ? "bg-red-500" : ""
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
          <div className=" flex flex-col border-red-500 border-2  max-w-36">
            <p className=" bg-fuchsia-500">
              List of Area in{" "}
              {selectedstate ? <p>{selectedstate}</p> : <span>City</span>}
            </p>
            <ul>
              {Filtercity.map((city, index) => (
                <li
                  key={index}
                  value={city}
                  className={`cursor-pointer ${selectedCity === city ? "bg-red-500" : ""
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
          <div className=" flex flex-col border-red-500 border-2 ">
            <button
              className="bg-green-500 border-2"
              onClick={(e) => {
                e.preventDefault();
                onAddSuburbClick();
              }}
            >
              AddSubrs
            </button>
            <p className=" bg-fuchsia-500">List of Suburbs</p>
            <ul>
              {Filteresub.length > 0 &&
                Filteresub.map((item, index) => (
                  <li key={index}>{item.subarea}</li>
                ))}
            </ul>
          </div>
          <div className=" flex flex-col border-red-500 border-2 ">
            <p className=" bg-fuchsia-500">List of Area</p>
            <ul>
              {filterarea.length > 0 &&
                filterarea.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </div>
          <div className=" flex flex-col border-red-500 border-2 ">
            <p className=" bg-fuchsia-500">List of Availble Zipcode</p>
            <ul>
              {Filteresub.length > 0 &&
                Filteresub.map((item, index) => (
                  <li key={index}>{item.zipcode}</li>
                ))}
            </ul>
          </div>
        </form>
      </AdminDashboard>
    </div>
  );
}

export default AllArea;
