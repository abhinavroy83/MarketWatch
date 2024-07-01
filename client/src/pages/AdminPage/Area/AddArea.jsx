import React, { useEffect, useState } from "react";
import {
  AdminDashboard,
  AdminHeader,
} from "../../../components/AdminCompontents";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import stateAbbreviations from "../../../Services/StateAprevation/stateAbbreviations.json";

function AddArea({ editdata }) {
  const [state, setstate] = useState([]);
  const [selectedstate, setSelectedstate] = useState([]);
  const [subarea, setSubareas] = useState([]);
  const [subareaInput, setSubareaInput] = useState("");
  const token = useSelector((state) => state.adminauth.token);
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const onsubmit = async (data) => {
    data.state = selectedstate;
    data.subarea = subarea;
    console.log(data);
    if (editdata) {
      try {
        const res = await axios.put(
          `http://localhost:8000/api/admin/updatearea/${editdata?._id}`,
          data,
          {
            headers: {
              jwttoken: `${token}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (res) {
          alert("Update area successfully");
          setSelectedstate([]);
          reset();
          navigate(`/admin/allarea`);
        }
      } catch (error) {
        console.log("Error during adding area", error);
      }
    } else {
      try {
        const res = await axios.post(
          `http://localhost:8000/api/admin/postcity`,
          data,
          {
            headers: {
              jwttoken: `${token}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (res) {
          alert("Added area successfully");
          setSelectedstate([]);
          reset();
          navigate(`/admin/allarea`);
        }
      } catch (error) {
        console.log("Error during adding area", error);
      }
    }
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    if (!selectedstate.includes(selectedState)) {
      setSelectedstate((prevSelectedstate) => [
        ...prevSelectedstate,
        selectedState,
      ]);
    }
  };

  const removeState = (state) => {
    setSelectedstate((prevSelectedstate) =>
      prevSelectedstate.filter((item) => item !== state)
    );
  };

  const handleAddSubarea = () => {
    if (subareaInput.trim() && !subarea.includes(subareaInput.trim())) {
      setSubareas((prevSubareas) => [...prevSubareas, subareaInput.trim()]);
      setSubareaInput("");
    }
  };

  const removeSubarea = (subarea) => {
    setSubareas((prevSubareas) =>
      prevSubareas.filter((item) => item !== subarea)
    );
  };

  useEffect(() => {
    register("state");
    register("subarea");
  }, [register]);

  useEffect(() => {
    if (editdata) {
      setValue("country", editdata.country || "");
      setValue("state", editdata.state || "");
      setValue("area", editdata.area || "");
      setValue("subarea", editdata.subarea || "");
      setSelectedstate(editdata.state || []);
      setSubareas(editdata.subarea || []);
    }
  }, [editdata, setValue]);

  useEffect(() => {
    setValue("state", selectedstate);
    setValue("subarea", subarea);
  }, [selectedstate, setValue]);

  return (
    <div>
      <AdminHeader />
      <AdminDashboard>
        <p className="text-3xl font-bold text-[#0b5e86] my-5 font-roboto flex justify-center">
          Here You can Add Area
        </p>
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="flex flex-col gap-4 justify-center items-center">
            <div className="flex items-center">
              <label className="min-w-[160px] text-[21px]" htmlFor="country">
                Select Country
              </label>
              <div>
                <select
                  className="flex h-10 font-roboto w-[300px] text-[19px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  {...register("country", {
                    required: "Please fill the country",
                  })}
                >
                  <option value="" disabled hidden>
                    Select Country
                  </option>
                  <option className="text-[17px]" value="Usa">
                    USA
                  </option>
                </select>
                {errors.country && (
                  <p className="text-red-500 text-[16px] mt-2">
                    {errors.country?.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <label className="min-w-[160px] text-[21px]" htmlFor="state">
                Select State
              </label>
              <select
                className="flex h-10 font-roboto w-[300px] text-[19px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                onChange={handleStateChange}
              >
                <option value="" disabled hidden>
                  Select State
                </option>
                {Object.entries(stateAbbreviations).map(
                  ([state, abbreviation]) => (
                    <option key={abbreviation} value={state}>
                      {state} ({abbreviation})
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="flex flex-wrap gap-2">
              {selectedstate.map((item) => (
                <div
                  key={item}
                  className="flex items-center bg-gray-200 rounded-md px-2 py-1"
                >
                  <span className="mr-2">{item}</span>
                  <button
                    type="button"
                    onClick={() => removeState(item)}
                    className="text-red-500"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center">
              <label className="min-w-[160px] text-[21px]" htmlFor="area">
                Area
              </label>
              <input
                className="flex h-10 font-roboto w-[300px] text-[19px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                {...register("area")}
                placeholder="Type Area here"
              />
            </div>
            <div className="flex items-center">
              <label className="min-w-[160px] text-[21px]" htmlFor="subarea">
                Subarea
              </label>
              <input
                className="flex h-10 font-roboto w-[300px] text-[19px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                value={subareaInput}
                onChange={(e) => setSubareaInput(e.target.value)}
                placeholder="Type subarea here"
              />
              <button
                type="button"
                onClick={handleAddSubarea}
                className="ml-2 rounded-md bg-blue-500 px-4 py-2 text-white"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {subarea.map((subarea) => (
                <div
                  key={subarea}
                  className="flex items-center bg-gray-200 rounded-md px-2 py-1"
                >
                  <span className="mr-2">{subarea}</span>
                  <button
                    type="button"
                    onClick={() => removeSubarea(subarea)}
                    className="text-red-500"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center items-center mt-7">
            {editdata ? (
              <button
                className="rounded-md bg-green-800 px-4 py-2 text-[18px] self-center justify-center flex font-semibold text-white shadow-sm hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                type="submit"
              >
                Update Area
              </button>
            ) : (
              <button
                className="rounded-md bg-green-800 px-4 py-2 text-[18px] self-center justify-center flex font-semibold text-white shadow-sm hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                type="submit"
              >
                Create Area
              </button>
            )}
          </div>
        </form>
      </AdminDashboard>
    </div>
  );
}

export default AddArea;
