import React, { useEffect, useState } from "react";
import { DashConatiner, FormInput } from "../../../components";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import jsoncity from "./city.json";
import { useDispatch, useSelector } from "react-redux";
import { UserImage, login, logout } from "../../../store/authslice";
import Loader from "../../../components/UserCompontents/Loader";
import { ImProfile } from "react-icons/im";
import ConfirmationDialog from "../../../components/UserCompontents/Alert/ConfirmationDialog";

function Profile() {
  const { userID } = useParams();
  const {
    register,
    handleSubmit,
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

  const [showConfirm, setShowConfirm] = useState(false);
  // const imgg = useSelector((state) => state.auth.userimg);

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

  // console.log(isverified);
  const handleclick = async (data) => {
    const formdt = {
      belongcity: data.belongcity,
      firstName: data.firstName,
      lastName: data.lastName,
      userimg: userimgs,
      dob: data.dob,
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
        alert("updated successfuly");
        // console.log(res.data.user.userimg);
        dispatch(UserImage({ userimg: res.data.user.userimg }));
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

  return (
    <DashConatiner>
      {showConfirm && (
        <ConfirmationDialog
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          Heading={"Delete Account"}
          Para={
            "Are you sure you want to delete your account? This cannot be undone, and all posted ads will be deleted with it."
            // "Deleting your account will permanently remove all your data and you will not be able to access your room. Are you 100% sure you want to proceed?"
          }
        />
      )}

      <div className="flex justify-center text-center self-center">
        <p className="text-[1.5rem] p-2 text-black font-['udemy-regular'] bg-gray-300 w-full flex gap-2 justify-center shadow-black shadow-sm items-center text-center">
          <ImProfile />
          Settings
        </p>
      </div>

      <div className="px-10 overflow-y-scroll flex justify-center mt-7">
        {/* <h1 className="text-[1.4rem] text-[#232f3e] font-['udemy-regular'] ">
          Your Personal Details Are -
        </h1> */}
        <form onSubmit={handleSubmit(handleclick)}>
          {isedit && (
            <div className="flex flex-col ml-1 gap-1">
              <label htmlFor="" className="text-[1.2rem]">
                You Account belong to{" "}
              </label>
              <input
                className="font-['udemy-regular'] h-10 w-[340px] text-[1rem] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                {...register("belongcity")}
                defaultValue={data.belongcity}
              />
            </div>
          )}
          <div className="flex [1.2rem] gap-[1rem] items-center">
            <div className=" font-['udemy-regular'] p-2 flex flex-col gap-1">
              {/* <img src={data.userimg} alt="" /> */}
              <label className="text-[1.2rem]">First Name </label>
              {isedit ? (
                <input
                  // label="FirstName:"
                  className="font-['udemy-regular'] h-10 w-[340px] text-[1rem] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  {...register("firstName")}
                  defaultValue={data.firstName}
                />
              ) : (
                <p className="text-[1rem]">{data.firstName}</p>
              )}
            </div>

            <div className=" font-['udemy-regular'] p-2 flex flex-col gap-1">
              <label className="text-[1.2rem] ">Last Name</label>
              {isedit ? (
                <input
                  // label="Lastname"
                  className="font-['udemy-regular'] h-10 w-[340px] text-[1rem] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  {...register("lastName")}
                  defaultValue={data.lastName}
                />
              ) : (
                <p className="text-[1rem]">{data.lastName}</p>
              )}
            </div>
            <div className=" font-['udemy-regular'] p-2 flex flex-col gap-1">
              <label className="min-w-[120px] text-[1.2rem]">Email</label>
              <p className="text-[1rem]">{data.email}</p>

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
            </div>
          </div>
          <div className="flex items-end gap-[1.5rem]">
            <div className="flex flex-col gap-1 font-['udemy-regular'] p-2 text-[1.2rem]">
              <label className="text-[1.2rem]">Number</label>
              {isedit ? (
                <input
                  className="font-['udemy-regular'] h-10 w-[340px] text-[1rem] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  {...register("number")}
                  defaultValue={data.phone_number}
                />
              ) : (
                <p className="text-[1.2rem]">{data.phone_number}</p>
              )}
            </div>
            <div className="items-end mb-[0.4rem]">
              <button className=" bg-gray-300  px-6 py-2 text-[1rem] w-[340px] font-bold text-black">
                Change Password
              </button>
            </div>
            <button className=" bg-red-600 px-6 py-2 text-[1rem] w-[340px] font-bold text-white mb-[0.4rem]">
              Save Updates
            </button>
          </div>
          <div className="flex text-[1rem] gap-[1rem] items-center">
            <div className=" font-['udemy-regular'] p-2 flex flex-col gap-1">
              <label className="min-w-[120px] text-[1.2rem]">Gender</label>
              {isedit ? (
                <select
                  className="font-['udemy-regular'] h-10 w-[340px] text-[1rem] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
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
            <div className="flex flex-col gap-1 font-['udemy-regular'] p-2 text-[1.2rem]">
              <label className="">Date of Birth</label>
              {isedit ? (
                <input
                  className="font-['udemy-regular'] h-10 w-[340px] text-[1rem] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="date"
                  {...register("dob")}
                  defaultValue={data.dob}
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
          <div className="flex gap-20">
            {/* <div className="flex flex-col gap-1 font-['udemy-regular'] p-2 text-[1.2rem]">
              <label className="text-[1.2rem]">Number</label>
              {isedit ? (
                <input
                  className="font-['udemy-regular'] h-10 w-[340px] text-[1rem] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  {...register("number")}
                  defaultValue={data.phone_number}
                />
              ) : (
                <p className="text-[1.2rem]">{data.phone_number}</p>
              )}
            </div> */}
            {/* <div className="flex flex-col gap-1 font-['udemy-regular'] p-2 text-[1.2rem]">
              <label className="">Date of Birth</label>
              {isedit ? (
                <input
                  className="font-['udemy-regular'] h-10 w-[340px] text-[1rem] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="date"
                  {...register("dob")}
                  defaultValue={data.dob}
                />
              ) : (
                <p className="text-[1.2rem]">{data.dob}</p>
              )}
            </div> */}
          </div>

          {data.isVerified ? (
            <div>
              {isedit && (
                <div className="flex font-['udemy-regular'] p-2 text-[1.2rem] flex-col gap-1">
                  <label className="min-w-[120px]">Image</label>
                  <input
                    className="text-[1rem]"
                    type="file"
                    accept="image/*"
                    onChange={handleimgchange}
                  />
                </div>
              )}
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
              <div className="flex gap-20">
                <div className="flex flex-col font-['udemy-regular'] p-2 text-[1.2rem]">
                  <label className="min-w-[120px]">Address: </label>
                  {isedit ? (
                    <input
                      type="text"
                      placeholder="Enter Address"
                      className="font-['udemy-regular'] h-10 w-[340px] text-[1rem] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      {...register("address", {
                        required: "Address is required",
                      })}
                      defaultValue={data.address}
                      errorMessage={errors.address?.message}
                    />
                  ) : (
                    <p className="">{data.address}</p>
                  )}
                </div>
                <div className="flex flex-col font-['udemy-regular'] p-2 text-[1.2rem]">
                  <label className="min-w-[120px]">Country:</label>
                  {isedit ? (
                    <select
                      className="font-['udemy-regular'] h-10 w-[340px] text-[1rem] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      {...register("country")}
                      defaultValue={data.country}
                    >
                      <option value="Usa" className="text-[1.1rem]">
                        USA
                      </option>
                    </select>
                  ) : (
                    <p className="">{data.country}</p>
                  )}
                </div>
              </div>
              <div className="flex gap-20">
                <div className="flex flex-col font-['udemy-regular'] p-2 text-[1.2rem]">
                  <label className="min-w-[120px]">City</label>
                  {isedit ? (
                    <select
                      className="font-['udemy-regular'] h-10 w-[340px] text-[1rem] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
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
                </div>
                <div className="flex flex-col font-['udemy-regular'] p-2 text-[1.2rem]">
                  <label className="min-w-[120px]">State</label>
                  {isedit ? (
                    <select
                      className="font-['udemy-regular'] h-10 w-[340px] text-[1rem] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
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
              <div className="flex flex-col font-['udemy-regular'] p-2 text-[1.2rem]">
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
              </div>
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
              onClick={handleDelete}
              className="inline-block rounded text-red-500 cursor-pointer text-[1rem] font-medium transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
              href="#"
            >
              Delete Account
            </p>
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
                className="rounded-md font-['udemy-regular'] bg-green-800 text-white px-4 py-3 text-[1.1rem]"
                type="submit"
              >
                Update Profile
              </button>
              <button
                className="rounded-md font-['udemy-regular'] bg-green-800 text-white px-4 py-3 text-[1.1rem]"
                type="button"
                onClick={toggleCancel}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              className="rounded-md font-['udemy-regular'] bg-green-800 text-white mt-2 px-4 py-3 text-[1.1rem]"
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
