import Modal from "react-modal";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../SharedCompontents/Input";
import axios from "axios";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { fetchcity } from "../../Services/CityApi/Cityapi";

function Signup({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [currentcity, setcurrentcity] = useState([]);
  const [businessstatus, setbusinessstatus] = useState(false);
  const [signupdata, setsignupdata] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    if (businessstatus) {
      setsignupdata(data);
      // console.log(data);
    } else {
      try {
        const res = await axios.post("http://localhost:8000/user/signup", data);
        if (res) {
          alert("signup successfully added");
        }
      } catch (error) {
        console.log(error);
      }
      reset();
    }
  };
  // console.log("signupdata",signupdata);
  useEffect(() => {
    const fetchdata = async () => {
      const cit = await fetchcity();
      console.log(cit.data);
      const uniqueCities = Array.from(
        new Set(cit.data.city.map((item) => item.city))
      );
      setcurrentcity(uniqueCities);
    };
    fetchdata();
  }, []);

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={{
          content: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 1000,
            height: 750,
            border: "none",
            padding: "0",
            backgroundColor: "#FFF",
            boxShadow: "0px 0px 25px 0px rgba(0, 0, 0, 0.1)",
            borderRadius: 10,
            zIndex: 1000,
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            zIndex: 111,
          },
        }}
      >
        <div className=" w-full flex h-full">
          <div className="bg-[url('https://img.freepik.com/free-vector/green-gradient-background-gradient-3d-design_343694-3667.jpg')] bg-cover w-1/2 flex justify-center items-center font-[Montserrat] font-semibold">
            <div className="text-center">
              <img className="w-[100px] m-auto" src={Logo} />
              <p className=" text-black text-center mt-5 text-3xl">
                Sign Up Here
              </p>
              <p className=" text-black text-center mt-5 px-10 text-base/7">
                Stay Connected With US Add Your Personal Details. For More
                Details.
              </p>
              <button
                className="place-items-center items-center rounded-md bg-[#000] px-5 py-2 text-sm font-semibold text-white hover:bg-black/90 mt-5"
                type="submit"
              >
                Already Have Account
              </button>
            </div>
          </div>
          <div className="w-1/2 flex flex-col justify-center items-center">
            <svg
              className="h-10 w-10 text-black-500 absolute top-3 right-3 cursor-pointer"
              onClick={onClose}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              {" "}
              <circle cx="12" cy="12" r="10" />{" "}
              <line x1="15" y1="9" x2="9" y2="15" />{" "}
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            <h1 className="text-3xl font-bold text-[#000] mt-3 font-[Montserrat]">
              CREATE YOUR ACCOUNT
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mx-10">
                <div className="flex gap-5 mt-5">
                  <Input
                    label="First Name"
                    Placeholder="First name"
                    type="text"
                    {...register("firstName", {
                      required: "First Name is required",
                    })}
                    errorMessage={errors.firstName?.message}
                  />
                  <Input
                    label="Last Name"
                    Placeholder="Last name"
                    type="text"
                    {...register("lastName", {
                      required: "Last Name is required",
                    })}
                    errorMessage={errors.lastName?.message}
                  />
                </div>
                <div className="flex flex-col gap-3 mt-3">
                  <Input
                    label="Email"
                    Placeholder="Email"
                    type="Email"
                    {...register("email", {
                      required: "Email is required",
                      validate: {
                        matchPatern: (value) =>
                          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                            value
                          ) || "Email address must be a valid address",
                      },
                    })}
                    errorMessage={errors.email?.message}
                    className="!w-full"
                  />
                  <Input
                    label="Password"
                    Placeholder="Password"
                    type="text"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    errorMessage={errors.password?.message}
                  />
                  <div>
                    <label className="text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-[Montserrat]">
                      Select a country
                    </label>
                    <select
                      className="w-full flex h-10 rounded-md border font-[Montserrat] border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 bg-gray-200 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      {...register("country", { required: true })}
                    >
                      <option value="">Country</option>
                      <option value="Usa">USA</option>
                      <option value="India">India</option>
                    </select>
                    {errors.country && (
                      <p className="mt-1 text-xs text-red-500">
                        Country is required
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-[Montserrat]">
                      Select a country
                    </label>
                    <select
                      className="w-full flex h-10 rounded-md border font-[Montserrat] border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 bg-gray-200 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      {...register("city", { required: true })}
                    >
                      {currentcity.map((city, index) => (
                        <option key={index} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                    {errors.country && (
                      <p className="mt-1 text-xs text-red-500">
                        Country is required
                      </p>
                    )}
                  </div>

                  <div className="font-[Montserrat]">
                    <p className="font-bold text-sm">
                      Want to have business account:
                    </p>
                    <div>
                      <label>
                        <input
                          type="radio"
                          value="yes"
                          {...register("bussinessac", { required: true })}
                          onChange={() => setbusinessstatus(true)}
                        />
                        Yes
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          value="no"
                          {...register("bussinessac", { required: true })}
                          onChange={() => setbusinessstatus(false)}
                        />
                        No
                      </label>
                    </div>
                  </div>
                  <div className="flex gap-3 font-[Montserrat]">
                    <input type="checkbox" />
                    <label className="w-full">
                      I agree to terms and conditions
                    </label>
                  </div>
                  <div className="text-center">
                    {businessstatus ? (
                      <button
                        className="place-items-center font-[Montserrat] items-center shadow-sm shadow-[#ccc] inline-flex rounded-md bg-[#17b19f] px-10 py-2 mt-3 text-[16px] font-semibold text-white hover:bg-black/70"
                        type="submit"
                        onClick={() => {
                          navigate("/createbussinessprofile", {
                            state: signupdata,
                          });
                          // onClose(true);
                        }}
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        className="place-items-center font-[Montserrat] items-center shadow-sm shadow-[#ccc] inline-flex rounded-md bg-[#17b19f] px-10 py-2 mt-3 text-[16px] font-semibold text-white hover:bg-black/70"
                        type="submit"
                      >
                        Sign To Create Account
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Signup;
