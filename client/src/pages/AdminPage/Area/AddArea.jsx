import React, { useEffect, useState } from "react";
import {
  AdminDashboard,
  AdminHeader,
} from "../../../components/AdminCompontents";
import axios from "axios";
import { useForm } from "react-hook-form";
import jsoncity from "../../User/UserProfile/city.json";

function AddArea() {
  const [state, setstate] = useState([]);
  const [selectedstate, setSelectedstate] = useState("");
  const [citydata, setCitydata] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const fetchstate = async () => {
    try {
      const res = await axios.get(
        `https://data.opendatasoft.com/api/explore/v2.1/catalog/datasets/georef-united-states-of-america-state@public/records?select=ste_name&limit=50`
      );
      const stateNames = res.data.results.map((state) => state.ste_name);

      const sortedStateNames = stateNames.sort((a, b) => {
        const stringA = String(a);
        const stringB = String(b);
        return stringA.localeCompare(stringB);
      });

      // console.log(sortedStateNames);
      // Set sorted state names into the state
      setstate(sortedStateNames);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchcity = async () => {
      const res = await jsoncity[selectedstate];
      setCitydata(res.sort());
    };
    fetchcity();
  }, [selectedstate]);

  const onsubmit = async (data) => {
    console.log(data);
  };

  useEffect(() => {
    fetchstate();
  }, []);
  return (
    <div>
      <AdminHeader />
      <AdminDashboard>
        <p>Here You can Add Area</p>
        <form
          onSubmit={handleSubmit(onsubmit)}
          // className=" grid grid-cols-4 gap-1"
        >
          <div className="flex flex-col max-w-36">
            <select
              defaultValue={""}
              {...register("country", { required: "please fill the country" })}
            >
              <option value="" disabled hidden>
                Select Country
              </option>
              <option value="Usa">USA</option>
            </select>
            {errors.country && (
              <p className=" text-red-500 text-sm">{errors.country?.message}</p>
            )}
          </div>
          <div className=" flex flex-col max-w-36">
            <select
              className="flex h-10 font-roboto w-[500px] text-[19px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
              {...register("state")}
              onChange={(e) => {
                const vl = e.target.value;
                setSelectedstate(vl);
              }}
              // defaultValue={data.state}
              defaultValue={""}
            >
              <option value="" disabled hidden>
                Select State
              </option>
              {state.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p>Select city</p>
            <select
              defaultValue={""}
              className="flex h-10 font-roboto w-[500px] text-[19px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
            >
              <option value="" disabled hidden>
                Select city
              </option>
              {citydata &&
                citydata.length > 0 &&
                citydata.map((item) => <option value="item">{item}</option>)}
            </select>
          </div>
          <button type="submit">Create Area</button>
        </form>
      </AdminDashboard>
    </div>
  );
}

export default AddArea;