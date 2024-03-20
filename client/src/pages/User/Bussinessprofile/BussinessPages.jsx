import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "../../../components/Container/Container";
import { useForm } from "react-hook-form";
import { FormInput } from "../../../components";
import { fetchcity } from "../../../Services/CityApi/Cityapi";
import axios from "axios";

function BussinessPages() {
  const location = useLocation();
  const [currentcity, setcurrentcity] = useState([]);

  const data = location.state;
  // console.log(data);

  const firstName = data && data.firstName;
  const lName = data && data.lastName;
  const emal = data && data.email;
  const pwd = data && data.password;
  const cntry = data && data.country;
  const cityie = data && data.city;
  const bussinessacc = data && data.bussinessac;

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();

  const onsubmit = async (data) => {
    if (data) {
      try {
        const res = await axios.post("http://localhost:8000/user/signup", data);
        if (res) {
          alert("signup successfully");
          navigate("/");
        }
        reset();
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchdata = async () => {
      const cit = await fetchcity();
      // console.log(cit.data);
      const uniqueCities = Array.from(
        new Set(cit.data.city.map((item) => item.city))
      );
      setcurrentcity(uniqueCities);
    };
    fetchdata();
  }, []);

  return (
    <Container>
      <div className=" mt-44">
        {firstName ? (
          <div>BussinessPages: {firstName}</div>
        ) : (
          <div>No firstName found in signupdata</div>
        )}
        <form onSubmit={handleSubmit(onsubmit)}>
          <FormInput
            label="FirstName"
            type="text"
            {...register("firstName", { required: "FirstName is required" })}
            defaultValue={firstName}
            errorMessage={errors.firstName?.message}
          />
          <FormInput
            label="LastName"
            type="text"
            {...register("lastName", { required: "LastName is required" })}
            defaultValue={lName}
            errorMessage={errors.lastName?.message}
          />
          <FormInput
            label="Email"
            type="text"
            {...register("email", {
              required: "Email is required",
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
            errorMessage={errors.email?.message}
            defaultValue={emal}
          />
          <FormInput
            label="Password"
            type="password"
            {...register("password", {
              required: "Password is required",
            })}
            defaultValue={pwd}
            errorMessage={errors.password?.message}
          />
          <div>
            <label className="text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-[Montserrat]">
              Select a country
            </label>
            <select
              className="w-full flex h-10 rounded-md border font-[Montserrat] border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 bg-gray-200 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              {...register("country", { required: true })}
              defaultValue={cntry}
            >
              <option value="">Country</option>
              <option value="Usa">USA</option>
              <option value="India">India</option>
            </select>
            {errors.country && (
              <p className="mt-1 text-xs text-red-500">Country is required</p>
            )}
          </div>
          <div>
            <label className="text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-[Montserrat]">
              Select a City
            </label>
            <select
              className="w-full flex h-10 rounded-md border font-[Montserrat] border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 bg-gray-200 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              {...register("city", { required: true })}
              defaultValue={cityie}
            >
              {currentcity.map((city, index) => (
                <option key={index} value={city} selected={city === cityie}>
                  {city}
                </option>
              ))}
            </select>
            {errors.country && (
              <p className="mt-1 text-xs text-red-500">Country is required</p>
            )}
          </div>
          <div className="font-[Montserrat] flex">
            <p className="font-bold text-sm">Want to have business account:</p>
            <div>
              <label>
                <input
                  type="radio"
                  // defaultValue="yes"
                  defaultChecked={true}
                  {...register("bussinessac", { required: true })}
                  defaultValue={bussinessacc}
                />
                Yes
              </label>
            </div>
          </div>
          <FormInput
            type="text"
            label="Bussiness Name"
            {...register("displaybussinessname", {
              required: "Bussines Name is required",
            })}
            errorMessage={errors.displaybussinessname?.message}
          />
          <FormInput
            type="text"
            label="Legal Bussiness Name"
            {...register("legalbussinesname", {
              required: "Legal Bussines Name is required",
            })}
            errorMessage={errors.legalbussinesname?.message}
          />
          <FormInput
            type="text"
            label="Address Name"
            {...register("address", {
              required: "Address is required",
            })}
            errorMessage={errors.address?.message}
          />
          <FormInput
            type="text"
            label="Website"
            {...register("website", {
              required: "Website is required",
            })}
            errorMessage={errors.website?.message}
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </Container>
  );
}

export default BussinessPages;
