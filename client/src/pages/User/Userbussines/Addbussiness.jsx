import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DashConatiner, FormInput } from "../../../components";
import { fetchcity } from "../../../Services/CityApi/Cityapi";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Addbussiness() {
  const [currentcity, setcurrentcity] = useState([]);
  const [currentstate, setcurrentstate] = useState([]);
  const currentLocation = useSelector((state) => state.auth.location);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();
  const { userID } = useParams();
  const onSubmit = async (data) => {
    const bussdata = {
      Image: data.Image,
      business_name: data.business_name,
      address1: data.address1,
      city: data.city,
      state: data.state,
      country: data.country,
      zip: data.zip,
      business_category: data.business_category,
      hours_open: data.hours_open,
      email: data.email,
      number: data.number,
      description: data.description,
      location: {
        coordinates: [currentLocation.lat, currentLocation.lng],
      },
    };
    try {
      const res = await axios.post(
        "https://marketwatch-e3hc.onrender.comapi/addbussiness",
        bussdata,
        {
          headers: {
            jwttoken: `${token}`,
          },
        }
      );
      if (res) {
        alert("bussiness added succesfully");
        reset();
        navigate(`/user/bussiness/${userID}`);  
      }
    } catch (error) {
      console.log("error during sending data to bussapi", error);
    }
  };
  useEffect(() => {
    const fetchdata = async () => {
      const cit = await fetchcity();
      //   console.log(cit.data);
      const uniqueCities = Array.from(
        new Set(cit.data.city.map((item) => item.city))
      );
      setcurrentcity(uniqueCities);
      const uniquestates = Array.from(
        new Set(cit.data.city.map((item) => item.state))
      );
      setcurrentstate(uniquestates);
    };
    fetchdata();
  }, []);
  //   console.log(currentstate);   
  return (
    <DashConatiner>
      <div className="font-[Montserrat] font-semibold ml-4">
        <p className="text-3xl ml-3 mt-3 text-red-700">
          You Can Add New Bussiness
        </p>
        <form onSubmit={handleSubmit(onSubmit)}
         className="mt-7 flex flex-col gap-5">
          <FormInput
            label="Business Name"
            type="text"
            {...register("business_name", {
              required: "Business Name is required",
            })}
            errorMessage={errors.business_name?.message}
          />
          <FormInput
            label="Business Category"
            placeholder="For eg... Restaurant"
            type="text"
            {...register("business_category", {
              required: "business_category is required",
            })}
            errorMessage={errors.business_category?.message}
          />
          <FormInput
            label="Hours Open"
            type="text"
            placeholder="For eg... 9am to 5pm"
            {...register("hours_open", {
              required: "hours_open is required",
            })}
            errorMessage={errors.business_category?.message}
          />
          <FormInput
            label="Image"
            type="text"
            {...register("Image", {
              required: "Image is required",
            })}
            errorMessage={errors.Image?.message}
          />
          <div className="flex items-center">
            <label className="text-sm ml-4 font-bold min-w-[140px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-[Montserrat]">
              Select a City
            </label>
            <select
              className="min-w-[540px] flex h-10 rounded-md border font-[Montserrat] border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 bg-gray-200 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              {...register("city", { required: true })}
              //   defaultValue={cityie}
            >
              {currentcity.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {errors.city && (
              <p className="mt-1 text-xs text-red-500">Country is required</p>
            )}
          </div>
          <div className="flex items-center">
            <label className="text-sm ml-4 font-bold min-w-[140px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-[Montserrat]">
              Select State
            </label>
            <select
              className="min-w-[540px] flex h-10 rounded-md border font-[Montserrat] border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 bg-gray-200 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              {...register("state", { required: true })}
              //   defaultValue={cityie}
            >
              {currentstate.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.state && (
              <p className="mt-1 text-xs text-red-500">state is required</p>
            )}
          </div>
          <div className="flex items-center">
            <label className="text-sm min-w-[140px] ml-4 items-center font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-[Montserrat]">
              Select a country
            </label>
            <select
              className="min-w-[540px] flex h-10 rounded-md border font-[Montserrat] border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 bg-gray-200 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              {...register("country", { required: true })}
            >
              <option value="">Country</option>
              <option value="Usa">USA</option>
            </select>
            {errors.country && (
              <p className="mt-1 text-xs text-red-500">Country is required</p>
            )}
          </div>
          <FormInput
            label="Address"
            type="text"
            {...register("address1", {
              required: "Image is required",
            })}
            errorMessage={errors.address1?.message}
          />
          <FormInput
            label="Zip"
            type="text"
            {...register("zip", {
              required: "Zip is required",
            })}
            errorMessage={errors.zip?.message}
          />
          <FormInput
            label="Bussiness Email"
            type="text"
            {...register("email", {
              required: "Email is required",
            })}
            errorMessage={errors.email?.message}
          />
          <FormInput
            label="Bussiness Number"
            type="text"
            {...register("number", {
              required: "Number is required",
            })}
            errorMessage={errors.number?.message}
          />
          <label
            htmlFor="number"
            className="text-sm ml-4 flex items-center max-w-[100px] font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-[Montserrat]"
          >
            Description
          </label>
          <textarea
            id="description"
            className="flex h-20 ml-4 rounded-md border font-[Montserrat] border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 bg-gray-200 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            {...register("description", { required: true })}
          />
          {errors.description && (
            <p className="mt-1 text-xs text-red-500">Description is required</p>
          )}
          <button
            className="rounded-md bg-[#17b19f] my-2 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            type="submit">Create Bussiness</button>
        </form>
      </div>
    </DashConatiner>
  );
}

export default Addbussiness;
