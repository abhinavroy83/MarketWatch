import React, { useEffect, useState } from "react";
import {
  AdminDashboard,
  AdminHeader,
} from "../../../components/AdminCompontents";
import { useForm } from "react-hook-form";
import { fetchcity } from "../../../Services/CityApi/Cityapi";

function AddArea() {
  const { handleSubmit, register } = useForm();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const dta = await fetchcity();
      console.log(dta.data.city);
      setData(dta.data.city);
    };
    fetchdata();
  }, []);
  console.log(data.city);
  return (
    <div>
      <AdminHeader />
      <AdminDashboard>
        <p>Here You Can Add Area</p>
        <form className=" grid grid-cols-3 gap-3">
          <div className=" flex flex-col border-red-500 border-2 max-w-28">
            <p>Country</p>
            <select name="" id="">
              <option value="Usa">USA</option>
            </select>
          </div>
          <div className=" flex flex-col border-red-500 border-2  max-w-36">
            <p>List of avl State</p>
            <select name="" id="">
              {data.map((item, index) => (
                <option value="">{item.state}</option>
              ))}
            </select>
            <ul>
              {data.map((item, index) => (
                <li key={index}>{item.state}</li>
              ))}
            </ul>
          </div>
        </form>
      </AdminDashboard>
    </div>
  );
}

export default AddArea;
