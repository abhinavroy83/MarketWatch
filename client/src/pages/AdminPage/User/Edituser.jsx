import React, { useEffect, useState } from "react";
import { AdminDashboard } from "../../../components/AdminCompontents";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { fetchcity } from "../../../Services/CityApi/Cityapi";
import { useLoadScript, StandaloneSearchBox } from "@react-google-maps/api";
const libraries = ["places"];

export default function AdminUserProfiles() {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [data, setdata] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedstate, setsetselectedstate] = useState("");

  const { userid } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDV2wKeoUG0TSghZ1adR-t8z0cJJS8EM24",
    libraries,
  });
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlaces()[0];
      setValue("address", place.formatted_address);
      const addressComponents = place.address_components;
      let city = "";
      let state = "";
      let zip = "";
      let country = "";

      for (let component of addressComponents) {
        if (component.types.includes("locality")) {
          city = component.long_name;
        }
        if (component.types.includes("administrative_area_level_1")) {
          state = component.short_name;
        }
        if (component.types.includes("postal_code")) {
          zip = component.long_name;
        }
        if (component.types.includes("country")) {
          country = component.long_name;
        }
      }
      setValue("city", city);
      setValue("state", state);
      setValue("zip_code", zip);
      setValue("country", country);
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  const fetchuser = async () => {
    try {
      const res = await axios.get(
        ` https://api.verydesi.com/user/dashboard/profile/${userid}`
      );

      setdata(res.data.user);
    } catch (error) {
      console.log("error during fetcing userdetails");
    }
  };
  const fetchstate = async () => {
    try {
      const res = await axios.get(
        `https://data.opendatasoft.com/api/explore/v2.1/catalog/datasets/georef-united-states-of-america-state@public/records?select=ste_name&limit=50`
      );
      // console.log(res.data.results);

      setStates(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  const [cty, setcty] = useState([]);
  const handlestatechange = (e) => {
    const state = e.target.value;
    setsetselectedstate(state);
    // console.log(state);
    setValue("state", state);
  };

  useEffect(() => {
    fetchuser();
    fetchstate();
  }, [userid]);

  useEffect(() => {
    setValue("isVerified", data.isVerified);
    setValue("belongcity", data.belongcity);
    setValue("firstName", data.firstName);
    setValue("lastName", data.lastName);
    setValue("email", data.email);
    setValue("number", data.number);
    setValue("phone_number", data.phone_number);
    setValue("gender", data.gender);
    setValue("dob", data.dob);
    setValue("address", data.address);
    setValue("city", data.city);
    setValue("state", data.state);
    setValue("pin", data.pin);
  }, [data, setValue]);

  useEffect(() => {
    const fetchdata = async () => {
      const res = await fetchcity();
      const uniquecity = Array.from(
        new Set(res.data.city.map((item) => item.area))
      );
      setcty(uniquecity);
    };
    fetchdata();
  }, []);
  const handlesubmit = async (data) => {
    try {
      const res = await axios.put(
        ` https://api.verydesi.com/user/updateuser/${userid}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res) {
        alert("successfully update user");
      }
    } catch (error) {
      console.log("error", error);
    }
    setIsEditing(false);
    setShowPasswordChange(false);
  };
  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading Maps</div>;
  }
  return (
    <div className=" h-full">
      <AdminDashboard>
        <main className="flex-1 p-8 h-full">
          <nav className="text-sm font-medium mb-4" aria-label="Breadcrumb">
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
                  to={"/admin/alluser"}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Users List
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
                  Admin Settings
                </span>
              </li>
            </ol>
          </nav>
          <div className="bg-white rounded-lg shadow-md p-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                Account Information
              </h1>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
            </div>

            <form onSubmit={handleSubmit(handlesubmit)} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="belongCity"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Your Account belongs to
                  </label>
                  <select
                    defaultValue={data.belongcity}
                    disabled={!isEditing}
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 disabled:opacity-50 focus:ring-blue-500 focus:border-blue-500"
                    {...register("belongcity")}
                  >
                    <option value="">Select Belong city</option>
                    {cty.map((item, index) => (
                      <option
                        className="w-[80%] cursor-pointer px-3 py-1.5 ease-in-out duration-150 bg-white whitespace-nowrap hover:bg-[#232f3e] hover:text-white"
                        key={index}
                        value={item}
                      >
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      {...register("firstName")}
                      defaultValue={data.firstName}
                      readOnly={!isEditing}
                      className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 disabled:opacity-50 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      {...register("lastName")}
                      readOnly={!isEditing}
                      className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 disabled:opacity-50 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="email"
                      id="email"
                      disabled={!!isEditing}
                      defaultValue={data.email}
                      readOnly={!isEditing}
                      className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 disabled:opacity-50 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <select
                      {...register("isVerified")}
                      disabled={!isEditing}
                      className="p-2 border border-gray-300 rounded-md bg-gray-50 disabled:opacity-50 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="true">Verified</option>
                      <option value="false">Not Verified</option>
                    </select>
                  </div>
                  {data.isVerified ? (
                    <p className="text-sm text-green-600 mt-1">
                      Email is verified
                    </p>
                  ) : (
                    <p className="text-sm text-red-600 mt-1">
                      Email is not verified
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...register("phone_number")}
                    readOnly={!isEditing}
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 disabled:opacity-50 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="gender"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Gender
                    </label>
                    <select
                      id="gender"
                      disabled={!isEditing}
                      {...register("gender")}
                      defaultValue={data.gender}
                      className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 disabled:opacity-50 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="notspecified">Other</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="dob"
                      {...register("dob")}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      id="dob"
                      readOnly={!isEditing}
                      className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 disabled:opacity-50 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-700">
                  Address Information
                </h2>
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Address
                  </label>
                  <StandaloneSearchBox
                    onLoad={onLoad}
                    onPlacesChanged={onPlaceChanged}
                  >
                    <input
                      id="address"
                      placeholder="Enter Address"
                      readOnly={!isEditing}
                      {...register("address")}
                      className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 disabled:opacity-50 focus:ring-blue-500 focus:border-blue-500"
                      rows={3}
                    ></input>
                  </StandaloneSearchBox>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      {...register("city")}
                      readOnly={!isEditing}
                      className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 disabled:opacity-50 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      State
                    </label>
                    <select
                      id="state"
                      disabled={!isEditing}
                      {...register("state")}
                      onChange={handlestatechange}
                      className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 disabled:opacity-50 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option
                        value=""
                        disabled
                        hidden
                        className="text-[1.1rem]"
                      >
                        Select State
                      </option>
                      {states.map((state) => (
                        <option key={state.ste_name} value={state.ste_name}>
                          {state.ste_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Country
                    </label>
                    <select
                      id="country"
                      disabled={!isEditing}
                      className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 disabled:opacity-50 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="usa">USA</option>
                      <option value="canada">Canada</option>
                      <option value="uk">United Kingdom</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="zipCode"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Zip Code
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      {...register("pin")}
                      readOnly={!isEditing}
                      className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 disabled:opacity-50 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
              {isEditing && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-700">
                    Change Password
                  </h2>
                  <div>
                    <label
                      htmlFor="newPassword"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Password
                    </label>
                    <input
                      {...register("password")}
                      type="password"
                      id="newPassword"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              )}
              {isEditing && (
                <div className="flex justify-end space-x-4">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>
        </main>
      </AdminDashboard>
    </div>
  );
}
