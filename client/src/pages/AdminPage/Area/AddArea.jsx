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
import { MdOutlineErrorOutline } from "react-icons/md";

function AddArea({ editdata }) {
  const [stateab, setstateab] = useState("");
  const [selectedstate, setSelectedstate] = useState([]);
  const [primaryState, setPrimaryState] = useState("");
  const [subarea, setSubareas] = useState([]);
  const [subareaInput, setSubareaInput] = useState("");
  const [zipcodeInput, setZipcodeInput] = useState("");
  const [zipcode, setZipcode] = useState([]);
  const token = useSelector((state) => state.adminauth.token);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const onsubmit = async (data) => {
    data.state = selectedstate;
    data.primaryState = primaryState;
    data.subarea = subarea;
    data.zipcode = zipcode;
    // console.log(data);
    if (editdata) {
      try {
        const res = await axios.put(
          `https://api.verydesi.com/api/admin/updatearea/${editdata?._id}`,
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
          // navigate(`/admin/allarea`);
        }
      } catch (error) {
        console.log("Error during adding area", error);
      }
    } else {
      try {
        const res = await axios.post(
          `https://api.verydesi.com/api/admin/postcity`,
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
    const abbreviation = stateAbbreviations[selectedState];
    const stateAndAbbreviation = `${selectedState},${abbreviation}`;

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
    if (primaryState === state) {
      setPrimaryState("");
    }
  };
  //Subarea or cities is same here
  const handleAddSubarea = () => {
    const abbreviation = stateAbbreviations[stateab];
    const cities = `${subareaInput},${abbreviation}`;
    if (cities) {
      setSubareas((prevSubareas) => [...prevSubareas, cities]);
      setSubareaInput("");
    }
  };

  const removeSubarea = (subarea) => {
    setSubareas((prevSubareas) =>
      prevSubareas.filter((item) => item !== subarea)
    );
  };

  const handleAddZipcode = async () => {
    if (zipcodeInput.trim() !== "") {
      const newZipcodes = zipcodeInput.split(",").map((zip) => zip.trim());
      const filteredZipcodes = newZipcodes.filter(
        (zip) => zip !== "" && !zipcode.includes(zip)
      );

      let exists = false;
      for (const zip of filteredZipcodes) {
        console.log(zip);
        const response = await axios(
          `https://api.verydesi.com/api/admin/check-zipcode?zipcode=${zip}`
        );
        console.log(response);
        // const result = await response.json();
        if (response.data.exists) {
          alert(`Zip code  already exists`);
          setErrorMessage(`Zip code ${zip} already exists`);
          exists = true;
          break;
        }
      }

      if (!exists) {
        setZipcode((prevZipcodes) => [...prevZipcodes, ...filteredZipcodes]);
        setZipcodeInput("");
        setErrorMessage("");
      }
    }
  };
  const removezipcode = (zip) => {
    setZipcode((prvs) => prvs.filter((item) => item !== zip));
  };

  const setAsPrimaryState = (state) => {
    setPrimaryState(state);
  };

  useEffect(() => {
    register("state");
    register("primaryState");
    register("subarea");
    register("zipcode");
  }, [register]);

  useEffect(() => {
    if (editdata) {
      setValue("country", editdata.country || "");
      setValue("state", editdata.state || "");
      setValue("primaryState", editdata.primaryState || "");
      setValue("area", editdata.area || "");
      setValue("subarea", editdata.subarea || "");
      setValue("zipcode", editdata.zipcode || "");
      setSelectedstate(editdata.state || []);
      setPrimaryState(editdata.primaryState || "");
      setSubareas(editdata.subarea || []);
      setZipcode(editdata.zipcode || []);
    }
  }, [editdata, setValue]);

  useEffect(() => {
    setValue("state", selectedstate);
    setValue("primaryState", primaryState);
    setValue("subarea", subarea);
    setValue("zipcode", zipcode);
  }, [selectedstate, primaryState, subarea, setValue, zipcode]);

  return (
    <div>
      <AdminHeader />
      <AdminDashboard>
        <p className="text-[22px] font-bold text-[#232f3e] my-7 font-roboto flex justify-center">
          Here You can Add Area
        </p>
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="flex flex-col gap-3 justify-center items-center">
            <div className="flex items-center">
              <label className="min-w-[160px] text-[18px]" htmlFor="country">
                Select Country
              </label>
              <div>
                <select
                  className="flex h-10 font-roboto w-[300px] text-[17px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  {...register("country", {
                    required: "Please fill the country",
                  })}
                >
                  <option value="" disabled hidden>
                    Select Country
                  </option>
                  <option className="text-[15px]" value="Usa">
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
              <label className="min-w-[160px] text-[18px]" htmlFor="state">
                Select State
              </label>
              <select
                className="flex h-10 font-roboto w-[300px] text-[17px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                onChange={handleStateChange}
              >
                <option value="" disabled hidden>
                  Select State
                </option>
                {Object.entries(stateAbbreviations).map(
                  ([state, abbreviation]) => (
                    <option
                      className="text-[15px]"
                      key={abbreviation}
                      value={state}
                    >
                      {state} ({abbreviation})
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="flex flex-wrap text-[17px] text-red-600 items-center">
              {selectedstate.map((item) => (
                <div
                  key={item}
                  className={`flex items-center ${
                    primaryState === item
                      ? "bg-green-200 border-green-500"
                      : "bg-white"
                  } rounded-md mx-2 px-2 border-2 border-black`}
                >
                  <MdOutlineErrorOutline />
                  <span className="mr-2">{item}</span>
                  <button
                    type="button"
                    onClick={() => removeState(item)}
                    className="text-black mr-2"
                  >
                    x
                  </button>
                  <button
                    type="button"
                    onClick={() => setAsPrimaryState(item)}
                    className="text-black"
                  >
                    {primaryState === item ? "Primary" : "Choose as Primary"}
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center">
              <label className="min-w-[160px] text-[18px]" htmlFor="area">
                Area
              </label>
              <input
                className="flex h-10 font-roboto w-[300px] text-[17px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                required="true"
                {...register("area")}
                placeholder="Type Area"
              />
            </div>
            {/* previosuly we named this as subarea ,now its cities  */}
            <div className="flex gap-2 items-center text-[17px]">
              <label
                className="min-w-[150px] text-[18px] ml-[5.7rem]"
                htmlFor="subarea"
              >
                Cities
              </label>
              <input
                className="flex h-10 font-roboto w-[150px] text-[17px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                value={subareaInput}
                onChange={(e) => setSubareaInput(e.target.value)}
                placeholder="Type Subarea "
              />
              <select
                className="flex h-10 font-roboto w-[150px] text-[17px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                onChange={(e) => setstateab(e.target.value)}
              >
                <option value="" disabled selected>
                  Select State
                </option>
                {selectedstate.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={handleAddSubarea}
                className="ml-3 rounded-md bg-green-800 px-4 py-1 text-white text-[19px]"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap text-[17px] text-red-600 items-center">
              {subarea.map((subarea) => (
                <div
                  key={subarea}
                  className="flex m-2 p-2 items-center bg-gray-200 rounded-md px-1"
                >
                  <span className="mr-2">{subarea}</span>
                  <button
                    type="button"
                    onClick={() => removeSubarea(subarea)}
                    className="text-black"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
            <div className="flex items-center">
              <label
                className="min-w-[160px] text-[18px] ml-[5rem]"
                htmlFor="zipcode"
              >
                Zip & Codes
              </label>
              <input
                className="flex h-10 font-roboto w-[300px] text-[17px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                value={zipcodeInput}
                onChange={(e) => setZipcodeInput(e.target.value)}
                placeholder="Zip Code"
              />

              <button
                type="button"
                onClick={handleAddZipcode}
                className="ml-3 rounded-md bg-green-800 px-4 py-1 text-white text-[19px]"
              >
                Add
              </button>
            </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <div className="flex flex-wrap text-[17px] text-red-600 items-center">
              {zipcode?.map((item) => (
                <div
                  key={item}
                  className="flex m-2 items-center bg-gray-200 rounded-md px-1"
                >
                  <span className="mr-2">{item}</span>
                  <button
                    type="button"
                    onClick={() => removezipcode(item)}
                    className="text-black"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center items-center mt-5">
            {editdata ? (
              <div className=" flex gap-2">
                <button
                  className="rounded-md bg-green-800 px-4 py-2 text-[19px] self-center justify-center flex font-semibold text-white shadow-sm hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  type="button"
                  onClick={() => navigate(`/admin/allarea`)}
                >
                  Back
                </button>
                <button
                  className="rounded-md bg-green-800 px-4 py-2 text-[18px] self-center justify-center flex font-semibold text-white shadow-sm hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  type="submit"
                >
                  Update Area
                </button>
              </div>
            ) : (
              <button
                className="rounded-md bg-green-800 px-4 py-2 text-[18px] justify-center text-white shadow-sm hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                type="submit"
              >
                Create Area
              </button>
            )}
          </div>
        </form>
        <p className=" text-xl text-red-600 capitalize">
          * Primary state is a state where area is located
        </p>
        <p className=" text-xl text-red-600 capitalize">
          * Whole state is where the entire state is listed after the subarea
          are done
        </p>
      </AdminDashboard>
    </div>
  );
}

export default AddArea;
