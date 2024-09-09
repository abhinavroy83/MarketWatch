import React, { useEffect, useState } from "react";
import {
  AdminDashboard,
  AdminHeader,
} from "../../../components/AdminCompontents";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import stateAbbreviations from "../../../Services/StateAprevation/stateAbbreviations.json";
import { MdOutlineErrorOutline } from "react-icons/md";
import canadainstateAbbreviations from "../../../Services/StateAprevation/candainstateAbbreviations.json";
import { XCircle, PlusCircle } from "lucide-react";
function AddArea({ editdata }) {
  const [stateab, setstateab] = useState("");
  const [selectedcountry, setSelectedcountry] = useState("");
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

  const handleAddSubarea = () => {
    let abbreviation;
    
    if (selectedcountry === "Usa") {
      abbreviation = stateAbbreviations[stateab];
    } else if (selectedcountry === "Canada") {
      abbreviation = canadainstateAbbreviations[stateab];
    }
  
    const newSubareas = subareaInput.split(/[\s,]+/).map((sub) => `${sub.trim()},${abbreviation}`);
    const filteredSubareas = newSubareas.filter(
      (sub) => sub !== "," && !subarea.includes(sub)
    );
  
    if (filteredSubareas.length > 0) {
      setSubareas((prevSubareas) => [...prevSubareas, ...filteredSubareas]);
      setSubareaInput("");
    } else {
      alert("City and state combination already exists or input is invalid.");
    }
  };
  

  const removeSubarea = (subarea) => {
    setSubareas((prevSubareas) =>
      prevSubareas.filter((item) => item !== subarea)
    );
  };

  const handleAddZipcode = async () => {
    if (zipcodeInput.trim() !== "") {
      const newZipcodes = zipcodeInput.split(/[\s,]+/).map((zip) => zip.trim());
      const filteredZipcodes = newZipcodes.filter(
        (zip) => zip !== "" && !zipcode.includes(zip)
      );

      let exists = false;
      for (const zip of filteredZipcodes) {
        // console.log(zip);
        const response = await axios(
          `https://api.verydesi.com/api/admin/check-zipcode?zipcode=${zip}`
        );
        // console.log(response);
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
      setSelectedcountry(editdata.country || "");
    }
  }, [editdata, setValue]);

  useEffect(() => {
    setValue("state", selectedstate);
    setValue("primaryState", primaryState);
    setValue("subarea", subarea);
    setValue("zipcode", zipcode);
  }, [
    selectedstate,
    selectedcountry,
    primaryState,
    subarea,
    setValue,
    zipcode,
  ]);

  return (
    <div>
      <AdminDashboard>
        <main className="flex-1  p-8 overflow-auto">
          <div className=" max-w-6xl mx-auto">
            <div className="flex  justify-between items-center mb-2">
              <h2 className="text-2xl capitalize font-semibold text-gray-800">
                Here You can Add Area
              </h2>
            </div>
            <nav className="text-sm font-medium mb-2" aria-label="Breadcrumb">
              <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                  <Link
                    to="/admin/dashboard"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Home
                  </Link>
                  <svg
                    className="fill-current w-3 h-3 mx-3"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                  >
                    <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
                  </svg>
                </li>
                <li className="flex items-center">
                  <Link
                    to="/admin/allarea"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    AllArea
                  </Link>
                  <svg
                    className="fill-current w-3 h-3 mx-3"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                  >
                    <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
                  </svg>
                </li>
                <li>
                  <span className="text-gray-700" aria-current="page">
                    {editdata ? "Edit Area" : "Add Area"}
                  </span>
                </li>
              </ol>
            </nav>
          </div>
          <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-xl font-bold mb-6">Add or Update</h1>
            <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Select Country
                  </label>
                  <select
                    id="country"
                    {...register("country", {
                      required: "Please fill the country",
                    })}
                    disabled={!!editdata}
                    onChange={(e) => setSelectedcountry(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 disabled:opacity-50 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Country</option>
                    <option className="text-[15px]" value="Usa">
                      USA
                    </option>
                    <option className="text-[15px]" value="Canada">
                      CANADA
                    </option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Select State
                  </label>
                  <select
                    id="state"
                    onChange={handleStateChange}
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 disabled:opacity-50 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="" disabled hidden>
                      Select State
                    </option>

                    {selectedcountry ? (
                      Object.entries(
                        selectedcountry === "Usa"
                          ? stateAbbreviations
                          : canadainstateAbbreviations
                      ).map(([state, abbreviation]) => (
                        <option
                          className="text-[15px]"
                          key={abbreviation}
                          value={state}
                        >
                          {state} ({abbreviation})
                        </option>
                      ))
                    ) : (
                      <option className="text-gray-500">
                        Please select a country.
                      </option>
                    )}
                  </select>
                </div>
              </div>

              <div className="flex space-x-2">
                {selectedstate.map((item) => (
                  <div
                    key={item}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      primaryState === item
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    } `}
                  >
                    <span className="mr-2">{item}</span>

                    <button
                      type="button"
                      onClick={() => setAsPrimaryState(item)}
                      className="text-black"
                    >
                      {primaryState === item ? "Primary" : "Choose as Primary"}
                    </button>
                    <button
                      type="button"
                      onClick={() => removeState(item)}
                      className="ml-2 text-green-600 hover:text-green-800"
                    >
                      <XCircle className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div>
                <label
                  htmlFor="area"
                  className="block text-sm font-medium text-gray-700"
                >
                  Area
                </label>
                <input
                  type="text"
                  id="area"
                  required="true"
                  {...register("area")}
                  className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 disabled:opacity-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Type Area"
                  disabled={!!editdata}
                />
              </div>

              {/* previosuly we named this as subarea ,now its cities  */}
              <div>
                <label
                  htmlFor="cities"
                  className="block text-sm font-medium text-gray-700"
                >
                  Cities
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    id="cities"
                    value={subareaInput}
                    onChange={(e) => setSubareaInput(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 disabled:opacity-50 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Type Cities"
                  />
                  <select
                    onChange={(e) => setstateab(e.target.value)}
                    className="mt-1 block w-40 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                    className="mt-1 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <PlusCircle className="h-5 w-5" />
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {subarea.map((city, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800"
                    >
                      {city}
                      <button
                        type="button"
                        onClick={() => removeSubarea(city)}
                        className="ml-2 text-red-600 hover:text-red-800"
                      >
                        <XCircle className="h-4 w-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="zipCodes"
                  className="block text-sm font-medium text-gray-700"
                >
                  Zip & Codes
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    id="zipCodes"
                    value={zipcodeInput}
                    onChange={(e) => setZipcodeInput(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 disabled:opacity-50 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Zip Code"
                  />
                  <button
                    type="button"
                    onClick={handleAddZipcode}
                    className="mt-1 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <PlusCircle className="h-5 w-5" />
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {zipcode?.map((zipCode, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                    >
                      {zipCode}
                      <button
                        type="button"
                        onClick={() => removezipcode(zipCode)}
                        className="ml-2 text-gray-600 hover:text-gray-800"
                      >
                        <XCircle className="h-4 w-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => navigate(`/admin/allarea`)}
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  {editdata ? "Update Area" : "Add Area"}
                </button>
              </div>
            </form>

            <div className="mt-6 text-sm text-red-600">
              <p>* Primary State Is A State Where Area Is Located</p>
              <p>
                * Whole State Is Where The Entire State Is Listed After The
                Subarea Are Done
              </p>
            </div>
          </div>
        </main>
      </AdminDashboard>
    </div>
  );
}

export default AddArea;
