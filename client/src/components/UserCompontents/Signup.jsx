import Modal from "react-modal";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../SharedCompontents/Input";
import axios from "axios";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { fetchcity } from "../../Services/CityApi/Cityapi";
import { useDispatch, useSelector } from "react-redux";
import { login as authlogin } from "../../store/authslice";
import { modalopen } from "../../store/modalslice";
import ReCAPTCHA from "react-google-recaptcha";
import WebsiteLogo from "../../assets/logo-transparent.png";
import { RxCross1 } from "react-icons/rx";
import { getScreenSizeHook } from "../../../Hooks/GetScreenSizeHook";

function Signup() {
  const navigate = useNavigate();
  const [currentcity, setcurrentcity] = useState([]);
  const isSignUpModalOpen = useSelector(
    (state) => state.modal.isSignupmodelopen
  );
  const dispatch = useDispatch();
  const { windowSize } = getScreenSizeHook();

  const isMobile = windowSize.width < 800;

  // const navigate = useNavigate();
  // const [businessstatus, setbusinessstatus] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    // if (businessstatus) {
    //   // setsignupdata(data);
    //   navigate("/createbussinessprofile", {
    //     state: data,
    //   });
    //   onClose(true);
    //   // console.log(data);
    // } else {
    // }
    const datsa = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone_number: data.phone_number,
      password: data.password,
    };
    // console.log(datsa);
    try {
      // console.log(datsa);
      const res = await axios.post(
        "https://api.verydesi.com/user/signup",
        datsa
      );
      if (!res.data.status) {
        alert(res.data.message);
      }

      if (res.data.cnfstatus) {
        // console.log(res);
        alert("signup successfully added");
        localStorage.setItem("userdetails", JSON.stringify(res));
        dispatch(
          authlogin({
            token: res.data.jwttoken,
            user: res.data.data.firstName,
            userID: res.data.data._id,
            bussinessac: res.data.data.bussinessac,
            isverified: res.data.data.isVerified,
          })
        );
        navigate(`/dashboard/profile/${res.data.data._id}`);
        handleModal(false, false);
      }
    } catch (error) {
      console.log(error);
    }
    reset();
  };
  // console.log("signupdata",signupdata);
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

  const handleModal = (loginModalState, signUpModalState) => {
    dispatch(
      modalopen({
        isloginmodalopen: loginModalState,
        isSignupmodelopen: signUpModalState,
      })
    );
  };

  return (
    <div>
      <Modal
        isOpen={isSignUpModalOpen}
        onRequestClose={() => handleModal(false, false)}
        style={{
          content: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isMobile ? 350 : 740,
            height: 590,
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
        <div className="capitalize w-full flex h-full">
          <div className="capitalize bg-gradient-to-r from-cyan-500 to-green-500 w-1/2 justify-center bg-cover h-full items-center hidden md:flex">
            {/* <div className="bg-[url('https://img.freepik.com/free-vector/green-gradient-background-gradient-3d-design_343694-3667.jpg')] bg-cover w-full md:w-1/2 justify-center items-center font-['udemy-regular'] hidden md:flex"> */}
            <div className="text-center justify-center flex flex-col items-center">
              <div class="bg-cover bg-center justify-center">
                <img
                  height={300}
                  width={300}
                  className="w-50 h-50"
                  src={WebsiteLogo}
                  alt=""
                />
              </div>
              <p className="text-black text-center mt-5 text-[30px]">Welcome</p>
              <p className=" text-black text-center px-10 text-[20px]">
                Already have account <br></br>login here
              </p>
              <button
                className="place-items-center items-center rounded-md bg-[#000] text-[19px] px-5 py-2 text-white hover:bg-black/90 mt-5"
                type="button"
                onClick={() => {
                  handleModal(true, false);
                }}
              >
                Login Here
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center py-1">
            <RxCross1
              className="h-5 w-5 text-black absolute top-3 right-3 cursor-pointer hover:rotate-[360deg] transition-transform duration-300 "
              onClick={() => handleModal(false, false)}
            />
            <h1 className="text-[25px] font-bold text-black mt-3 font-['udemy-regular']">
              Create your Account
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mx-10 font-['udemy-regular'] whitespace-nowrap">
                <div className="flex flex-col gap-1 lg:gap-3 mt-1">
                  <div className="flex gap-3 mt-1 lg:mt-3">
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
                  <div className="flex gap-3">
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
                            ) || "Email address must be valid",
                        },
                      })}
                      errorMessage={errors.email?.message}
                      className="!w-full"
                    />
                    <Input
                      label="Phone Number"
                      Placeholder="Phone Number"
                      type="Number"
                      {...register("phone_number", {
                        required: "Number is required",
                      })}
                      errorMessage={errors.phone_number?.message}
                    />
                  </div>
                  <Input
                    label="Password"
                    Placeholder="Password"
                    type="text"
                    {...register("password", {
                      required: "Password is required",
                      pattern: {
                        value: /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
                        message:
                          "Password must contain at least one uppercase letter, one special character, and be at least 8 characters long",
                      },
                    })}
                    errorMessage={errors.password?.message}
                  />
                  {/* <Input
                    label="Repeat Password"
                    Placeholder="Repeat Password"
                    type="text"
                    {...register("cnf_password", {
                      required: true,
                      validate: (val) => {
                        const pass = watch("password");
                        if (pass !== val) {
                          return "Password must be the same";
                        }
                      },
                    })}
                    errorMessage={errors.cnf_password?.message}
                  /> */}
                  {/* <div>
                    <label className="text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-['udemy-regular']">
                      Select a country
                    </label>
                    <select
                      className="w-full flex h-10 rounded-md border font-['udemy-regular'] border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 bg-gray-200 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
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
                  </div> */}
                  {/* <div>
                    <label className="text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-['udemy-regular']">
                      Select a City
                    </label>
                    <select
                      className="w-full flex h-10 rounded-md border font-['udemy-regular'] border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 bg-gray-200 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
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
                  </div> */}
                  {/* <div className="font-['udemy-regular']">
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
                  </div> */}
                  <div className="gap-3 font-['udemy-regular']">
                    <input
                      type="checkbox"
                      {...register("chck", { required: "this is required" })}
                    />
                    <label className="w-full ml-2">
                      I agree to terms and conditions
                    </label>
                    {errors && (
                      <p className="text-red-600 text-sm">
                        {errors.chck?.message}
                      </p>
                    )}
                  </div>
                  <ReCAPTCHA
                    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                    onChange={(value) => {
                      console.log("Captcha Value", value);
                    }}
                    // {...register("captcha", { required: "Verify your self" })}
                  />
                  {/* {errors && (
                    <p className=" text-red-600 text-sm">
                      {errors.captcha?.message}
                    </p>
                  )} */}
                  <div className="text-center flex flex-col">
                    <button
                      className="mt-1 font-['udemy-regular'] items-center shadow-sm shadow-[#ccc] rounded-md bg-green-800 px-0 py-2 text-[19px] text-white hover:bg-black"
                      type="submit"
                    >
                      Create Account
                    </button>
                    <button
                      className="lg:hidden items-center rounded-md bg-black text-[19px] py-2 text-white hover:bg-black mt-2"
                      type="button"
                      onClick={() => {
                        handleModal(true, false);
                      }}
                    >
                      Login Here
                    </button>
                    {/* {businessstatus ? (
                      <button
                        className="place-items-center font-['udemy-regular'] items-center shadow-sm shadow-[#ccc] inline-flex rounded-md bg-[#17b19f] px-10 py-2 mt-3 text-[16px] font-semibold text-white hover:bg-black/70"
                        type="submit"
                      >
                        Next
                      </button>
                    ) : (
                    )} */}
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
