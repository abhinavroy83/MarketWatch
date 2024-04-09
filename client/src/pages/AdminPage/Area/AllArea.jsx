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
    };
    fetchdata();
  }, []);
  //   console.log(data);
  useEffect(() => {
    const filtercity = data.filter((item) => item.state === selectedstate);
    setFiltercity(filtercity);
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
        <p>Here you can Add Area</p>
        <button
          onClick={() => {
            navigate("/admin/addarea");
          }}
        >
          Add Area
        </button>

        <p>List of Avaible Area</p>
        <form className=" grid grid-cols-4 gap-1">
          <div className=" flex flex-col border-red-500 border-2 max-w-28">
            <p>Country</p>
            <select name="" id="">
              <option value="Usa">USA</option>
            </select>
          </div>
          <div className=" flex flex-col border-red-500 border-2  max-w-36">
            <p>List of avl State</p>
            <select onChange={(e) => setSelectedstate(e.target.value)}>
              <option>select State</option>
              {data.map((item) => (
                <option value={item.state} key={item._id}>
                  {item.state}
                </option>
              ))}
            </select>
            <ul>
              {data.map((item, index) => (
                <li key={index}>{item.state}</li>
              ))}
            </ul>
          </div>
          <div className=" flex flex-col border-red-500 border-2  max-w-36">
            <p>
              List of city in{" "}
              {selectedstate ? <p>{selectedstate}</p> : <span>City</span>}
            </p>
            <select onChange={(e) => setSelectedCity(e.target.value)}>
              {Filtercity.map((item, index) => (
                <option value={item.city} key={item._id}>
                  {item.city}
                </option>
              ))}
            </select>
            <ul>
              {Filtercity.map((item, index) => (
                <li key={item._id} value={item.city}>
                  {item.city}
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
