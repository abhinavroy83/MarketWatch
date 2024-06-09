import React, { useEffect, useState } from "react";
import { DashConatiner, FormInput } from "../../../components";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import jsoncity from "./city.json";
import { useDispatch, useSelector } from "react-redux";
import { UserImage, login } from "../../../store/authslice";

function Profile() {
  const { userID } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [isedit, setisedit] = useState(false);
  const [data, setdata] = useState([]);
  const [states, setStates] = useState([]);
  const [citys, setcitys] = useState([]);
  const navigate = useNavigate();
  const [selectedstate, setsetselectedstate] = useState("");
  const [userimgs, setuserimg] = useState("");
  const dispatch = useDispatch();
  // const imgg = useSelector((state) => state.auth.userimg);

  const fetchuser = async () => {
    try {
      const res = await axios.get(
        ` http://api.verydesi.com/user/dashboard/profile/${userID}`
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
      console.log(uploadedImageUrl);
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

  const handleclick = async (data) => {
    const formdt = {
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
        ` http://api.verydesi.com/user/updateuser/${userID}`,
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

  return (
    <DashConatiner>
      <div className="px-10 overflow-y-scroll">
        <div className="flex justify-center">
          <p className="text-[30px] p-2 ml-2 font-bold text-[#0b5e86] mt-1 font-['udemy-regular']">
            Your Profile
          </p>
        </div>
        {!data.isVerified && (
          <p className="font-['udemy-regular'] text-red-600 text-lg py-3">
            *Please complete verification of your email, phone number and
            profile page to start using the services.*
          </p>
        )}
        <h1 className="text-[24px] text-[#000] font-bold font-['udemy-regular'] ">
          Your Personal Details Are -
        </h1>
        <form onSubmit={handleSubmit(handleclick)}>
          <div className="flex font-['udemy-regular'] p-2 items-center">
            {/* <img src={data.userimg} alt="" /> */}
            <label className="min-w-[120px] text-[20px]">FirstName: </label>
            {isedit ? (
              <FormInput
                // label="FirstName:"
                // className= p-1 rounded-base"
                type="text"
                {...register("firstName")}
                defaultValue={data.firstName}
              />
            ) : (
              <p className="text-[20px]">{data.firstName}</p>
            )}
          </div>
          <div className="flex font-['udemy-regular'] p-2 items-center">
            <label className="min-w-[120px] text-[20px] ">LastName:</label>
            {isedit ? (
              <FormInput
                // label="Lastname"
                className="p-1 rounded-base"
                type="text"
                {...register("lastName")}
                defaultValue={data.lastName}
              />
            ) : (
              <p className="text-[20px]">{data.lastName}</p>
            )}
          </div>
          <div className="flex font-['udemy-regular'] p-2 items-center">
            <label className="min-w-[120px] text-[20px]">Email:</label>
            <p className="text-[20px]">{data.email}</p>

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

          <div className="flex font-['udemy-regular'] p-2 items-center">
            <label className="min-w-[120px] text-[20px]">Number:</label>
            {isedit ? (
              <FormInput
                className="p-1 rounded-base"
                type="text"
                {...register("number")}
                defaultValue={data.phone_number}
              />
            ) : (
              <p className="text-[20px]">{data.phone_number}</p>
            )}
          </div>

          {data.isVerified ? (
            <div>
              {isedit && (
                <div className="flex font-['udemy-regular'] p-2 items-center">
                  <label className="min-w-[120px] text-[20px]">Image:</label>
                  <input
                    className=""
                    type="file"
                    accept="image/*"
                    onChange={handleimgchange}
                  />
                </div>
              )}
              <div className="flex font-['udemy-regular']  p-2 items-center">
                <label className="min-w-[120px] text-[20px]">
                  Date of Birth:
                </label>
                {isedit ? (
                  <input
                    className="flex h-10 font-['udemy-regular'] w-[400px] bg-white text-[20px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                    type="date"
                    {...register("dob")}
                    defaultValue={data.dob}
                  />
                ) : (
                  <p className="text-[20px]">{data.dob}</p>
                )}
              </div>

              <div className=" flex font-['udemy-regular'] p-2 items-center">
                <label className="min-w-[120px] text-[20px]">Gender:</label>
                {isedit ? (
                  <select
                    className="flex h-10 font-['udemy-regular'] w-[400px] text-[20px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                    {...register("gender")}
                    defaultValue={data.gender}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="notspecified">Not Specified</option>
                  </select>
                ) : (
                  <p className="text-[20px]">{data.gender}</p>
                )}
              </div>
              <div className=" flex font-['udemy-regular'] p-2 items-center">
                <label className="min-w-[120px] text-[20px]">Country:</label>
                {isedit ? (
                  <select
                    className="flex h-10 font-['udemy-regular'] w-[400px] text-[20px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                    {...register("country")}
                    defaultValue={data.country}
                  >
                    <option value="Usa">USA</option>
                  </select>
                ) : (
                  <p className="text-[20px]">{data.country}</p>
                )}
              </div>
              <div className="flex font-['udemy-regular'] p-2 items-center">
                <label className="min-w-[120px] text-[20px]">State:</label>
                {isedit ? (
                  <select
                    className="flex h-10 font-['udemy-regular'] w-[400px] text-[20px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                    {...register("state")}
                    onChange={handlestatechange}
                    defaultValue={data.state}
                  >
                    <option value="" disabled hidden>
                      Select State
                    </option>{" "}
                    {states.map((state) => (
                      <option key={state.ste_name} value={state.ste_name}>
                        {state.ste_name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="text-[20px]">{data.state}</p>
                )}
              </div>
              <div className="flex font-['udemy-regular'] p-2 items-center">
                <label className="min-w-[120px] text-[20px]">City: </label>
                {isedit ? (
                  <select
                    className="flex h-10 font-['udemy-regular'] w-[400px] text-[20px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
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
                  <p className="text-[20px]">{data.city}</p>
                )}
              </div>
              <div className="flex font-['udemy-regular'] p-2 items-center">
                <label className="min-w-[120px] text-[20px]">Address: </label>
                {isedit ? (
                  <FormInput
                    type="text"
                    placeholder="Enter Address"
                    {...register("address", {
                      required: "Address is required",
                    })}
                    defaultValue={data.address}
                    errorMessage={errors.address?.message}
                  />
                ) : (
                  <p className="text-[20px]">{data.address}</p>
                )}
              </div>
              <div className="flex font-['udemy-regular'] p-2 items-center">
                <label className="min-w-[120px] text-[20px]">Pin: </label>
                {isedit ? (
                  <FormInput
                    type="text"
                    placeholder="Enter Pin"
                    {...register("pin", { required: "Pin is required" })}
                    defaultValue={data.pin}
                    errorMessage={errors.pin?.message}
                  />
                ) : (
                  <p className="text-[20px]">{data.pin}</p>
                )}
              </div>
            </div>
          ) : (
            <div className="font-['udemy-regular']">
              <p className="text-[20px] p-2 text-red-600">
                Please verify your email{" "}
              </p>
            </div>
          )}

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

          {isedit ? (
            <>
              <button
                className="rounded-md font-['udemy-regular'] bg-green-800 text-white mt-4 px-4 py-3 text-[22px]"
                type="submit"
              >
                Update Profile
              </button>
              <button
                className="rounded-md font-['udemy-regular'] bg-green-800 text-white mt-4 px-4 py-3 text-[22px] ml-3"
                type="button"
                onClick={toggleCancel}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="rounded-md font-['udemy-regular'] bg-green-800 text-white mt-2 px-4 py-3 text-[22px]"
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
