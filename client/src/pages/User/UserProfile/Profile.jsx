import React, { useEffect, useState } from "react";
import { DashConatiner, FormInput } from "../../../components";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

function Profile() {
  const { userID } = useParams();
  const { register, handleSubmit, setValue } = useForm();
  const [isedit, setisedit] = useState(false);
  const [data, setdata] = useState([]);
  const navigate = useNavigate();
  const bussinessac = useSelector((state) => state.auth.bussinessac);

  const fetchuser = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/user/dashboard/profile/${userID}`
      );
      // console.log(res.data.user);
      setdata(res.data.user);
      // const data = res.data.user;
      // navigate("/createbussinessprofile", {
      //   state: data,
      // });
    } catch (error) {
      console.log("error during fetcing userdetails");
    }
  };

  const toggleEdit = () => {
    setisedit(!isedit);
  };
  const toggleCancel = () => {
    setisedit(false);
  };
  const handleclick = (data) => {
    try {
      const res = axios.put(
        `http://localhost:8000/user/updateuser/${userID}`,
        data
      );
      if (res) {
        alert("updated successfuly");
        navigate(`/myaccount/${userID}`);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchuser();
  }, [userID]);

  useEffect(() => {
    if (Object.keys(data).length !== 0) {
      for (const key in data) {
        setValue(key, data[key]);
      }
    }
  }, [data, setValue]);
  console.log(data);

  return (
    <DashConatiner>
      <div className="px-10">
        <div className="flex justify-center mb-4">
          <h1 className="text-4xl p-2 ml-2 font-bold text-red-700 mt-7 font-[Montserrat]">
            Your Profile
          </h1>
          <svg
            class="h-[3rem] w-[3rem] text-red-700 mt-7"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            stroke-width="1"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            {" "}
            <path stroke="none" d="M0 0h24v24H0z" />{" "}
            <circle cx="12" cy="12" r="9" />{" "}
            <line x1="9" y1="9" x2="9.01" y2="9" />{" "}
            <line x1="15" y1="9" x2="15.01" y2="9" />{" "}
            <path d="M8 13a4 4 0 1 0 8 0m0 0H8" />
          </svg>
        </div>
        <h1 className="text-lg text-[#000] font-bold font-[Montserrat] mb-3">
          Your Personal Details Are-
        </h1>
        <form onSubmit={handleSubmit(handleclick)}>
          <div className="flex font-[Montserrat] font-semibold p-2 items-center">
            <label className="min-w-[190px]">FirstName: </label>
            {isedit ? (
              <FormInput
                // label="FirstName:"
                // className= p-1 rounded-base"
                type="text"
                {...register("firstName")}
                defaultValue={data.firstName}
              />
            ) : (
              <p>{data.firstName}</p>
            )}
          </div>
          <div className="flex font-[Montserrat] font-semibold p-2 items-center">
            <label className="min-w-[190px]">LastName:</label>
            {isedit ? (
              <FormInput
                // label="Lastname"
                className="p-1 rounded-base"
                type="text"
                {...register("lastName")}
                defaultValue={data.lastName}
              />
            ) : (
              <p>{data.lastName}</p>
            )}
          </div>
          <div className=" flex font-[Montserrat] font-semibold p-2 items-center">
            <label className="min-w-[190px]">City:</label>
            {isedit ? (
              <FormInput
                className="p-1 rounded-base"
                type="text"
                {...register("city")}
                defaultValue={data.city}
              />
            ) : (
              <p>{data.city}</p>
            )}
          </div>
          <div className="flex font-[Montserrat] font-semibold p-2 items-center">
            <label className="min-w-[190px]">Country:</label>
            {isedit ? (
              <FormInput
                className="p-1 rounded-base"
                type="text"
                {...register("country")}
                defaultValue={data.country}
              />
            ) : (
              <p>{data.country}</p>
            )}
          </div>

          {data.bussinessac === "no" && (
            <div className="flex font-bold font-[Montserrat] ml-2 text-red-700">
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
          )}
          {bussinessac === "yes" && (
            <div>
              <div className="flex font-[Montserrat] font-semibold p-2 items-center">
                <label className="min-w-[190px]">Bussines Name:</label>
                {isedit ? (
                  <FormInput
                    className="p-1 rounded-base"
                    type="text"
                    {...register("displaybussinessname")}
                    defaultValue={data.displaybussinessname}
                  />
                ) : (
                  <p>{data.displaybussinessname}</p>
                )}
              </div>
              <div className="flex font-[Montserrat] font-semibold p-2 items-center">
                <label className="min-w-[190px]">Legal Bussines Name:</label>
                {isedit ? (
                  <FormInput
                    className="p-1 rounded-base"
                    type="text"
                    {...register("legalbussinesname")}
                    defaultValue={data.legalbussinesname}
                  />
                ) : (
                  <p>{data.legalbussinesname}</p>
                )}
              </div>
              <div className="flex font-[Montserrat] font-semibold p-2 items-center">
                <label className="min-w-[190px]">Address:</label>
                {isedit ? (
                  <FormInput
                    className="p-1 rounded-base"
                    type="text"
                    {...register("address")}
                    defaultValue={data.address}
                  />
                ) : (
                  <p>{data.address}</p>
                )}
              </div>
              <div className="flex font-[Montserrat] font-semibold p-2 items-center">
                <label className="min-w-[190px]">Website:</label>
                {isedit ? (
                  <FormInput
                    className="p-1 rounded-base"
                    type="text"
                    {...register("website")}
                    defaultValue={data.website}
                  />
                ) : (
                  <p>{data.website}</p>
                )}
              </div>
            </div>
          )}

          {isedit ? (
            <>
              <button
                className="rounded-md font-[Montserrat] bg-[#17b19f] text-white mt-4 px-3 py-3 text-base"
                type="submit"
              >
                Update Profile
              </button>
              <button
                className="rounded-md font-[Montserrat] bg-[#17b19f] text-white mt-4 px-3 py-3 text-base ml-3"
                type="button"
                onClick={toggleCancel}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="rounded-md font-[Montserrat] bg-[#17b19f] text-white mt-4 px-3 py-3 text-base"
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
