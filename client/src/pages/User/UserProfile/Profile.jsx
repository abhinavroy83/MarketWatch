import React, { useEffect, useState } from "react";
import { DashConatiner, FormInput } from "../../../components";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import jsoncity from "./city.json";
import { useDispatch, useSelector } from "react-redux";
import { UserImage, login, logout } from "../../../store/authslice";
import Loader from "../../../components/UserCompontents/Loader";
import { ImProfile } from "react-icons/im";
import ConfirmationDialog from "../../../components/UserCompontents/Alert/ConfirmationDialog";
import { fetchcity } from "../../../Services/CityApi/Cityapi";
import { FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { IoPeopleSharp } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import { IoSettingsSharp } from "react-icons/io5";
import { useLoadScript, StandaloneSearchBox } from "@react-google-maps/api";
import DatePicker from "react-datepicker";
const libraries = ["places"];

function Profile() {
  const { userID } = useParams();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const [isedit, setisedit] = useState(true);
  const [data, setdata] = useState([]);
  const [states, setStates] = useState([]);
  const [citys, setcitys] = useState([]);
  const navigate = useNavigate();
  const [selectedstate, setsetselectedstate] = useState("");
  const [userimgs, setuserimg] = useState("");
  const dispatch = useDispatch();
  const isverified = useSelector((state) => state.auth.isverified);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  // const imgg = useSelector((state) => state.auth.userimg);

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
        ` https://api.verydesi.com/user/dashboard/profile/${userID}`
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

  const toggleEdit = () => {
    setisedit(!isedit);
  };
  const toggleCancel = () => {
    setisedit(false);
  };

  const handleimgchange = async (e) => {
    const file = e.target.files[0];
    // console.log(file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dp3hpp62z/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const uploadedImageUrl = response.data.secure_url;
      // console.log(uploadedImageUrl);
      setuserimg(uploadedImageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        // Extract and log the error message
        const errorMessage = error.response.data.error.message;
        console.error("Error message:", errorMessage);
      }
    }
  };
  const [cty, setcty] = useState([]);

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

  // console.log(isverified);
  const handleclick = async (data) => {
    const dateObj = new Date(data.dob);

    // Format the date as MM DD YYYY
    const formattedDob = dateObj.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    const formdt = {
      belongcity: data.belongcity,
      firstName: data.firstName,
      lastName: data.lastName,
      dob: formattedDob,
      gender: data.gender,
      country: data.country,
      state: data.state,
      city: data.city,
      address: data.address,
      pin: data.pin,
    };

    try {
      const res = await axios.put(
        ` https://api.verydesi.com/user/updateuser/${userID}`,
        formdt,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res) {
        // console.log(res);
        toast("profile update successfully");
        // const newUserImg = res.data.user.userimg;
        // dispatch(UserImage({ userimg: newUserImg }));
        // const currentData = JSON.parse(localStorage.getItem("userdetails"));
        // const updatedData = {
        //   ...currentData,
        //   data: {
        //     ...currentData.data,
        //     data: {
        //       ...currentData.data.data,
        //       userimg: newUserImg,
        //     },
        //   },
        // };
        // localStorage.setItem("userdetails", JSON.stringify(updatedData));
        navigate(`/myaccount/${userID}`);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  // console.log(citys);
  const handlestatechange = (e) => {
    const state = e.target.value;
    setsetselectedstate(state);
    // console.log(state);
    setValue("state", state);
  };

  useEffect(() => {
    const fetchcity = async () => {
      // console.log(selectedstate);
      const res = await jsoncity[selectedstate];
      setcitys(res);
    };
    fetchcity();
  }, [selectedstate]);
  useEffect(() => {
    fetchuser();
    fetchstate();
  }, [userID]);

  useEffect(() => {
    if (Object.keys(data).length !== 0) {
      for (const key in data) {
        setValue(key, data[key]);
      }
    }
  }, [data, setValue]);

  const handleDelete = async () => {
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    setShowConfirm(false);
    try {
      const res = await axios.delete(
        `https://api.verydesi.com/user/deleteuser/${userID}`
      );
      if (res) {
        alert("Successfully delete you account");
        dispatch(logout());
        localStorage.removeItem("userdetails");
        navigate("/");
      }
    } catch (error) {}
    console.log("Item deleted");
  };

  const cancelDelete = () => {
    setShowConfirm(false);
  };
  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading Maps</div>;
  }

  return (
    <DashConatiner>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
      {showConfirm && (
        <ConfirmationDialog
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          onClose={cancelDelete}
          Heading={"Delete Account"}
          Para={
            "Are you sure you want to delete your account? This cannot be undone, and all posted ads will be deleted with it."
            // "Deleting your account will permanently remove all your data and you will not be able to access your room. Are you 100% sure you want to proceed?"
          }
        />
      )}

      <div className="flex justify-center text-center self-center font-['udemy-regular']">
        <p className="text-[1.5rem] p-2 bg-[#232f3e] text-white w-full flex gap-3 justify-center shadow-black shadow-sm items-center text-center">
          {/* <ImProfile /> */}
          <img
            className="w-[2rem] h-[2rem]"
            src={
              "https://res.cloudinary.com/druohnmyv/image/upload/v1723819325/assests/jxhk73i2js2oxrdxwb1h.png"
            }
            alt="logo"
          />
          {/* <IoSettingsSharp /> */}
          Settings
        </p>
      </div>
      <div className="lg:hidden flex items-center text-gray-700 mt-2 ml-3 font-['udemy-regular'] ">
        <Link to="/">
          <FaHome size={20} />
        </Link>
        <IoIosArrowForward />
        <Link to={`/myaccount/${userID}`}>
          <IoPeopleSharp size={20} />
        </Link>
        <IoIosArrowForward />
        <p>Settings</p>
      </div>

      <div className="px-2 lg:px-10 overflow-y-scroll flex justify-center lg:mt-7 mt-1 w-[100%] font-['udemy-regular'] ">
        {/* <h1 className="text-[1.4rem] text-[#232f3e] font-['udemy-regular'] ">
          Your Personal Details Are -
        </h1> */}
        <form
          onSubmit={handleSubmit(handleclick)}
          className="w-full font-['udemy-regular'] "
        >
          {isedit && (
            <div className="flex items-center p-2 gap-3 lg:text-[1.2rem] text-[1.1rem]">
              <label htmlFor="" className="">
                Your Account belong to{" "}
              </label>
              <select
                {...register("belongcity")}
                defaultValue={data.belongcity}
                className="font-['udemy-regular'] h-10 w-[300px] lg:w-[500px] text-[1rem] rounded-md border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
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
          )}
          <div className="flex flex-col lg:flex-row lg:gap-[1rem] lg:items-center lg:text-[1.2rem] text-[1.1rem]">
            <div className=" font-['udemy-regular'] p-2 flex flex-col gap-1">
              {/* <img src={data.userimg} alt="" /> */}
              <label className="">First Name </label>
              {isedit ? (
                <input
                  // label="FirstName:"
                  className="font-['udemy-regular'] h-10 w-[300px] lg:w-[340px] text-[1rem] rounded-md border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  {...register("firstName")}
                  defaultValue={data.firstName}
                />
              ) : (
                <p className="text-[1rem]">{data.firstName}</p>
              )}
            </div>

            <div className=" font-['udemy-regular'] p-2 flex flex-col gap-1 lg:text-[1.2rem] text-[1.1rem]">
              <label className="">Last Name</label>
              {isedit ? (
                <input
                  // label="Lastname"
                  className="font-['udemy-regular'] h-10 w-[300px] lg:w-[340px] text-[1rem] rounded-md border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  {...register("lastName")}
                  defaultValue={data.lastName}
                />
              ) : (
                <p className="text-[1rem]">{data.lastName}</p>
              )}
            </div>
          </div>
          <div className="flex items-start flex-col lg:flex-row lg:items-end">
            <div className=" font-['udemy-regular'] p-2 flex flex-col gap-1 lg:text-[1.2rem] text-[1.1rem]">
              <label className="min-w-[120px]">Email</label>
              <p className="font-['udemy-regular'] h-10 w-[300px] lg:w-[340px] text-[1rem]  rounded-md border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50">
                {data.email}
              </p>
            </div>
            {data.isVerified || isverified ? (
              <p className="mb-3 ml-2 lg:ml-7 lg:text-[1.2rem] text-[1.1rem] text-green-600">
                Email is verified
              </p>
            ) : (
              <p className="mb-3 ml-2 lg:ml-7 lg:text-[1.2rem] text-[1.1rem] text-red-600">
                Email is not verified
              </p>
            )}
          </div>
          {/* {isedit ? (
              <FormInput
                className="p-1 rounded-base"
                type="text"
                {...register("email")}
                defaultValue={data.email}
              />
            ) : (
              <p className="text-[20px]">{data.email}</p>
            )} */}

          <div className="flex flex-col lg:flex-row lg:items-end lg:text-[1.2rem] text-[1.1rem] lg:gap-[1.5rem]">
            <div className="flex flex-col gap-1 font-['udemy-regular'] p-2">
              <label className="">Phone Number</label>
              {isedit ? (
                <input
                  className="font-['udemy-regular'] h-10 w-[300px] lg:w-[340px] text-[1rem] rounded-md  border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  {...register("number")}
                  defaultValue={data.phone_number}
                />
              ) : (
                <p className="text-[1.2rem]">{data.phone_number}</p>
              )}
            </div>
            {/* <div className="ml-2 lg:ml-0 mb-[0.4rem]">
              <button
                onClick={() => {
                  navigate(`/setting/changepassword/${userID}`);
                }}
                type="button"
                className=" bg-gray-300 px-6 py-2 text-[1rem] w-[300px] lg:w-[340px] hover:bg-gray-400 font-bold text-black"
              >
                Change Password
              </button>
            </div> */}
            {/* <button
              type="button"
              className=" bg-red-600 px-6 py-2 text-[1rem] w-[340px] font-bold text-white mb-[0.4rem]"
            >
              Save Updates
            </button> */}
          </div>
          <div className="flex flex-col lg:flex-row lg:text-[1.2rem] text-[1.1rem] lg:gap-[1rem] lg:items-center">
            <div className=" font-['udemy-regular'] p-2 flex flex-col gap-1">
              <label className="min-w-[120px]">Gender</label>
              {isedit ? (
                <select
                  className="font-['udemy-regular'] h-10 w-[300px] lg:w-[340px] text-[1rem] rounded-md border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  {...register("gender")}
                  defaultValue={data.gender}
                >
                  <option value="male" className="text-[1.1rem]">
                    Male
                  </option>
                  <option value="female" className="text-[1.1rem]">
                    Female
                  </option>
                  <option value="notspecified" className="text-[1.1rem]">
                    Not Specified
                  </option>
                </select>
              ) : (
                <p className="text-[20px]">{data.gender}</p>
              )}
            </div>
            <div className="flex flex-col gap-1 font-['udemy-regular'] p-2 lg:text-[1.2rem] text-[1.1rem]">
              <label className="">Date of Birth</label>
              {isedit ? (
                <Controller
                  name="dob"
                  control={control}
                  defaultValue={data.dob}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      selected={field.value || data.dob}
                      className="font-['udemy-regular'] h-10 w-[300px] lg:w-[340px] text-[1rem] rounded-md  border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  )}
                />
              ) : (
                <p className="text-[1.2rem]">{data.dob}</p>
              )}
            </div>
            {/* <div className=" font-['udemy-regular'] p-2 flex flex-col gap-1">
              <label className="min-w-[120px] text-[1.2rem]">Email</label>
              <p className="text-[1rem]">{data.email}</p>

              {isedit ? (
              <FormInput
                className="p-1 rounded-base"
                type="text"
                {...register("email")}
                defaultValue={data.email}
              />
            ) : (
              <p className="text-[20px]">{data.email}</p>
            )}
            </div> */}
          </div>

          {data.isVerified ? (
            <div className="z-0 relative">
              {/* {isedit && (
                <div class="border border-dashed ml-2 border-gray-400 relative mt-3 lg:text-[1.2rem] text-[1.1rem] flex flex-col justify-center w-[300px] lg:w-[713px] mb-2 bg-white">
                  <div className="">
                    <input
                      className="text-[1rem]"
                      type="file"
                      accept="image/*"
                      onChange={handleimgchange}
                      class="cursor-pointer relative block opacity-0 h-full w-full p-20 z-50"
                    />
                    <div class="text-center p-10 absolute top-0 right-0 left-0 m-auto">
                      <h4>
                        Drop files anywhere to upload
                        <br />
                        or
                      </h4>
                      <p class="">Select Files</p>
                    </div>
                  </div>
                </div>
                <div className="flex font-['udemy-regular'] p-2 text-[1.2rem] flex-col gap-1">
                  <label className="min-w-[120px]">Image</label>
                  <input
                    className="text-[1rem]"
                    type="file"
                    accept="image/*"
                    onChange={handleimgchange}
                  />
                </div>
              )} */}
              {/* <div className="flex font-['udemy-regular'] p-2 items-center text-[1.2rem]">
                <label className="min-w-[120px]">Date of Birth:</label>
                {isedit ? (
                  <input
                    className="flex h-10 font-['udemy-regular'] text-[1.2rem] w-[400px] bg-white rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                    type="date"
                    {...register("dob")}
                    defaultValue={data.dob}
                  />
                ) : (
                  <p className="text-[1.2rem]">{data.dob}</p>
                )}
              </div> */}

              {/* <div className=" flex font-['udemy-regular'] p-2 items-center">
                <label className="min-w-[120px] text-[1.2rem]">Gender:</label>
                {isedit ? (
                  <select
                    className="font-['udemy-regular'] h-10 w-[340px] text-[1.2rem] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    {...register("gender")}
                    defaultValue={data.gender}
                  >
                    <option value="male" className="text-[1.1rem]">
                      Male
                    </option>
                    <option value="female" className="text-[1.1rem]">
                      Female
                    </option>
                    <option value="notspecified" className="text-[1.1rem]">
                      Not Specified
                    </option>
                  </select>
                ) : (
                  <p className="text-[20px]">{data.gender}</p>
                )}
              </div> */}
              <div className="flex flex-col lg:flex-row lg:gap-[1rem] lg:text-[1.2rem] text-[1.1rem]">
                <div className="flex flex-col font-['udemy-regular'] p-2 gap-1">
                  <label className="min-w-[120px]">Address </label>
                  {isedit ? (
                    <StandaloneSearchBox
                      onLoad={onLoad}
                      onPlacesChanged={onPlaceChanged}
                    >
                      <input
                        type="text"
                        placeholder="Enter Address"
                        className="font-['udemy-regular'] h-10 w-[300px] lg:w-[712px] text-[1rem] rounded-md  border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        {...register("address")}
                        defaultValue={data.address}
                      />
                    </StandaloneSearchBox>
                  ) : (
                    <p className="">{data.address}</p>
                  )}
                </div>
                {/* <div className="flex flex-col font-['udemy-regular'] p-2 lg:text-[1.2rem] text-[1.1rem] gap-1">
                  <label className="min-w-[120px]">State</label>
                  {isedit ? (
                    <select
                      className="font-['udemy-regular'] h-10 w-[300px] lg:w-[340px] text-[1rem] rounded-md  border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      {...register("state")}
                      onChange={handlestatechange}
                      defaultValue={data.state}
                    >
                      <option
                        value=""
                        disabled
                        hidden
                        className="text-[1.1rem]"
                      >
                        Select State
                      </option>{" "}
                      {states.map((state) => (
                        <option key={state.ste_name} value={state.ste_name}>
                          {state.ste_name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="">{data.state}</p>
                  )}
                </div> */}
              </div>
              <div className="flex flex-col lg:flex-row lg:gap-[1rem] lg:text-[1.2rem] text-[1.1rem]">
                <div className="flex flex-col font-['udemy-regular'] p-2 gap-1">
                  <label className="min-w-[120px]">City</label>
                  <input
                    className="font-['udemy-regular'] h-10 w-[300px] lg:w-[340px] text-[1rem] rounded-md  border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    defaultValue={data.city}
                    {...register("city")}
                    type="text"
                  />
                  {/* {isedit ? (
                    <select
                      className="font-['udemy-regular'] h-10 w-[300px] lg:w-[340px] text-[1rem] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      {...register("city")}
                      defaultValue={data.city}
                    >
                      <option value="" disabled hidden>
                        Select City
                      </option>
                      {citys &&
                        citys.length > 0 &&
                        citys.map((cty) => (
                          <option key={cty} value={cty}>
                            {cty}
                          </option>
                        ))}
                    </select>
                  ) : (
                    <p className="">{data.city}</p>
                  )} */}
                </div>
                <div className="flex flex-col font-['udemy-regular'] p-2 lg:text-[1.2rem] text-[1.1rem] gap-1">
                  <label className="min-w-[120px]">State</label>
                  {isedit ? (
                    <select
                      className="font-['udemy-regular'] h-10 w-[300px] lg:w-[340px] text-[1rem] rounded-md  border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      {...register("state")}
                      onChange={handlestatechange}
                      defaultValue={data.state}
                    >
                      <option
                        value=""
                        disabled
                        hidden
                        className="text-[1.1rem]"
                      >
                        Select State
                      </option>{" "}
                      {states.map((state) => (
                        <option key={state.ste_name} value={state.ste_name}>
                          {state.ste_name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="">{data.state}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-col lg:flex-row lg:gap-[1rem] lg:text-[1.2rem] text-[1.1rem]">
                <div className="flex flex-col font-['udemy-regular'] p-2 lg:text-[1.2rem] text-[1.1rem] gap-1">
                  <label className="min-w-[120px]">Country</label>
                  {isedit ? (
                    <select
                      className="font-['udemy-regular'] h-10 w-[300px] lg:w-[340px] text-[1rem] rounded-md  border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      {...register("country")}
                      defaultValue={data.country}
                    >
                      <option
                        value="Usa"
                        className="lg:text-[1.1rem] text-[1rem]"
                      >
                        USA
                      </option>
                    </select>
                  ) : (
                    <p className="">{data.country}</p>
                  )}
                </div>
                <div className="flex flex-col font-['udemy-regular'] p-2 lg:text-[1.2rem] text-[1.1rem] gap-1">
                  <label className="min-w-[120px]">Zip Code</label>
                  {isedit ? (
                    <input
                      type="text"
                      placeholder="Enter Pin"
                      className="font-['udemy-regular'] h-10 w-[300px] lg:w-[340px] text-[1rem] rounded-md  border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      {...register("pin")}
                      defaultValue={data.pin}
                    />
                  ) : (
                    <p className="text-[1rem]">{data.pin}</p>
                  )}
                </div>
              </div>
              <div className="ml-2 mt-2 mb-[0.4rem]">
                <button
                  onClick={() => {
                    navigate(`/setting/changepassword/${userID}`);
                  }}
                  type="button"
                  className=" bg-gray-300 px-6 py-2 text-[1rem] w-[300px] lg:w-[340px] rounded-md hover:bg-gray-400 font-bold text-black"
                >
                  Change Password
                </button>
              </div>
              {/* <div className="flex flex-col font-['udemy-regular'] p-2 text-[1.2rem]">
                <label className="min-w-[120px]">Pin</label>
                {isedit ? (
                  <input
                    type="text"
                    placeholder="Enter Pin"
                    className="font-['udemy-regular'] h-10 w-[340px] text-[1rem] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    {...register("pin", { required: "Pin is required" })}
                    defaultValue={data.pin}
                    errorMessage={errors.pin?.message}
                  />
                ) : (
                  <p className="text-[1rem]">{data.pin}</p>
                )}
              </div> */}
              {/* <div className="flex font-['udemy-regular'] p-2 items-center text-[1.2rem]">
                <label className="min-w-[120px]">City: </label>
                {isedit ? (
                  <select
                    className="font-['udemy-regular'] h-10 w-[340px] text-[1.2rem] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    {...register("city")}
                    defaultValue={data.city}
                  >
                    <option value="" disabled hidden>
                      Select City
                    </option>
                    {citys &&
                      citys.length > 0 &&
                      citys.map((cty) => (
                        <option key={cty} value={cty}>
                          {cty}
                        </option>
                      ))}
                  </select>
                ) : (
                  <p className="">{data.city}</p>
                )}
              </div> */}
              {/* <div className="flex font-['udemy-regular'] p-2 items-center text-[1.2rem]">
                <label className="min-w-[120px]">Address: </label>
                {isedit ? (
                  <input
                    type="text"
                    placeholder="Enter Address"
                    className="font-['udemy-regular'] h-10 w-[340px] text-[1.2rem] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    {...register("address", {
                      required: "Address is required",
                    })}
                    defaultValue={data.address}
                    errorMessage={errors.address?.message}
                  />
                ) : (
                  <p className="">{data.address}</p>
                )}
              </div> */}
              {/* <div className="flex font-['udemy-regular'] p-2 items-center text-[1.2rem]">
                <label className="min-w-[120px]">Pin: </label>
                {isedit ? (
                  <input
                    type="text"
                    placeholder="Enter Pin"
                    className="font-['udemy-regular'] h-10 w-[340px] text-[1.2rem] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    {...register("pin", { required: "Pin is required" })}
                    defaultValue={data.pin}
                    errorMessage={errors.pin?.message}
                  />
                ) : (
                  <p className="">{data.pin}</p>
                )}
              </div> */}
            </div>
          ) : (
            <div className="font-['udemy-regular']">
              <p className="text-[1.2rem] p-2 text-red-600">
                Please verify your email{" "}
              </p>
            </div>
          )}
          <div className="mt-3 ml-2">
            <p className="text-[1.4rem]">Close Account</p>
            <p className="text-[1rem] text-gray-500 font-light">
              This will remove your login information from our system and you
              will not be able to login again. It cannot be undone.
            </p>

            <p
              onClick={() => {
                setShowConfirm(true);
              }}
              // onClick={handleDelete}
              className="inline-block rounded text-red-500 cursor-pointer text-[1rem] font-medium transition focus:outline-none focus:ring"
            >
              Delete Account
            </p>
            {/* {showPasswordInput && (
              <div>
                <input
                  type="password"
                  className="font-['udemy-regular'] h-10 w-[340px] text-[1rem] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
                {!isPasswordVerified && (
                  <p
                    onClick={handlePasswordVerification}
                    className="inline-block rounded text-red-500 cursor-pointer text-[1rem] font-medium transition focus:outline-none focus:ring"
                  >
                    Verify Password
                  </p>
                )}
                {isPasswordVerified && (
                  <p
                    onClick={handleDelete}
                    className="inline-block rounded text-red-500 cursor-pointer text-[1rem] font-medium transition focus:outline-none focus:ring"
                  >
                    Delete Account
                  </p>
                )}
              </div>
            )} */}
          </div>
          {/* {data.bussinessac === "no" && (
            <div className="flex font-bold font-['udemy-regular'] ml-2 text-red-700">
              <p>For bussiness account : </p>
              <button
                onClick={() => {
                  navigate("/createbussinessprofile", {
                    state: data,
                  });
                }}
              >
                Click here
              </button>
            </div>
          )} */}
          {/* <p
            onClick={handleDelete}
            className="inline-block rounded bg-red-600 cursor-pointer px-4 py-2 text-[1.1rem] font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
          >
            Delete Account
          </p> */}

          {isedit ? (
            <div className="flex justify-center mt-4 gap-3">
              {/* <p
                onClick={handleDelete}
                className="inline-block rounded bg-red-600 cursor-pointer px-8 py-3 text-[1.1rem] font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
                href="#"
              >
                Delete Account
              </p> */}
              <button
                className=" font-['udemy-regular'] bg-green-800 rounded-md text-white px-3 py-2 text-[1rem] mb-3"
                type="submit"
              >
                Update Profile
              </button>
              {/* <button
                className=" bg-gray-300 text-black hover:bg-gray-400 px-3 py-2 text-[1.1rem]"
                type="button"
                onClick={toggleCancel}
              >
                Cancel
              </button> */}
            </div>
          ) : (
            <button
              className=" font-['udemy-regular'] bg-green-800 text-white mt-2 px-4 py-3 text-[1rem] mb-3 rounded-md"
              type="button"
              onClick={toggleEdit}
            >
              Edit Details
            </button>
          )}
        </form>
      </div>
    </DashConatiner>
  );
}

export default Profile;
