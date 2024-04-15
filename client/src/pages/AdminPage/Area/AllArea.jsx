import React, { useEffect, useState } from "react";
import {
  AdminDashboard,
  AdminHeader,
} from "../../../components/AdminCompontents";
import { useForm } from "react-hook-form";
import { fetchcity } from "../../../Services/CityApi/Cityapi";
import { useNavigate } from "react-router-dom";

function AllArea() {
  const { handleSubmit, register } = useForm();
  const [data, setData] = useState([]);
  const [filterstate, setfilterstate] = useState([]);
  const [Filtercity, setFiltercity] = useState([]);
  const [selectedstate, setSelectedstate] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [Filteresub, setFiltersub] = useState("");

  const navigate = useNavigate();

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
  //   console.log(data);
  useEffect(() => {
    const filtercity = data.filter((item) => item.state === selectedstate);
    // console.log(filtercity);
    const uniquecity = [...new Set(filtercity.map((item) => item.city))];
    console.log(uniquecity);
    setFiltercity(uniquecity);
  }, [selectedstate]);

  useEffect(() => {
    const filtersubarea = data.filter((item) => item.city === selectedCity);
    setFiltersub(filtersubarea);
    // console.log(filtersubarea);
  }, [selectedCity, selectedstate]);
  //   console.log(selectedCity);

  return (
    <div>
      <AdminHeader />
      <AdminDashboard>
        <div className=" flex justify-between ">
          <p>Here you can Add Area</p>
          <button
            onClick={() => {
              navigate("/admin/addarea");
            }}
            className=" bg-red-600 text-white"
          >
            Add Area
          </button>
        </div>

        <p>List of Avaible Area</p>
        <form className=" grid grid-cols-4 gap-1">
          <div className=" flex flex-col border-red-500 border-2 max-w-28">
            <p>Country</p>
            <ul>
              <li>Usa</li>
            </ul>
          </div>
          <div className=" flex flex-col border-red-500 border-2  max-w-36">
            <p>List of avl State</p>
            {/* <select onChange={(e) => setSelectedstate(e.target.value)}>
              <option>select State</option>
              {data.map((item) => (
                <option value={item.state} key={item._id}>
                  {item.state}
                </option>
              ))}
            </select> */}
            <ul>
              {filterstate.map((state, index) => (
                <li
                  key={index}
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
            <p>
              List of city in{" "}
              {selectedstate ? <p>{selectedstate}</p> : <span>City</span>}
            </p>
            {/* <select onChange={(e) => setSelectedCity(e.target.value)}>
              {Filtercity.map((city, index) => (
                <option value={city} key={index}>
                  {city}
                </option>
              ))}
            </select> */}
            <ul>
              {Filtercity.map((city, index) => (
                <li key={index} value={city}>
                  {city}
                </li>
              ))}
            </ul>
          </div>
          <div className=" flex flex-col border-red-500 border-2  max-w-36">
            <p>
              List of Suburbs{" "}
              {selectedCity ? <span>in {selectedCity}</span> : null}
            </p>
            <ul>
              {Filteresub.length > 0 &&
                Filteresub.map((item) => <li>{item.subarea}</li>)}
            </ul>
          </div>
        </form>
      </AdminDashboard>
    </div>
  );
}

export default AllArea;
