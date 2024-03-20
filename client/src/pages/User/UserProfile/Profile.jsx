import React, { useEffect, useState } from "react";
import { DashConatiner, FormInput } from "../../../components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

function Profile() {
  const { userID } = useParams();
  const { register, handleSubmit, setValue } = useForm();
  const [isedit, setisedit] = useState(false);
  const [data, setdata] = useState({});
  const navigate = useNavigate();

  const fetchuser = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/user/dashboard/profile/${userID}`
      );
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
    setisedit(true);
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
  ///this is try

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

  return (
    <DashConatiner>
      <div className="flex justify-center items-center">
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
      <h1 className="text-lg ml-5 text-[#000] font-bold font-[Montserrat]">
        Your Personal Details Are-
      </h1>
      <form onSubmit={handleSubmit(handleclick)}>
        <div className="flex font-[Montserrat] font-semibold p-2 mt-3 ml-4">
          <label>FirstName: {data.name}</label>
          {isedit ? (
            <FormInput
              // label="FirstName:"
              // className="ml-4 p-1 rounded-base"
              type="text"
              {...register("firstName")}
              defaultValue={data.firstName}
            />
          ) : (
            <p>{data.firstName}</p>
          )}
        </div>
        <div className="flex font-[Montserrat] font-semibold p-2 ml-4">
          <label>LastName:</label>
          {isedit ? (
            <FormInput
              // label="Lastname"
              className="ml-4 p-1 rounded-base"
              type="text"
              {...register("lastName")}
              defaultValue={data.lastName}
            />
          ) : (
            <p>{data.lastName}</p>
          )}
        </div>
        <div className=" flex font-[Montserrat] font-semibold p-2 ml-4">
          <label>City:</label>
          {isedit ? (
            <FormInput
              className="ml-4 p-1 rounded-base"
              type="text"
              {...register("city")}
              defaultValue={data.city}
            />
          ) : (
            <p>{data.city}</p>
          )}
        </div>
        <div className=" flex font-[Montserrat] font-semibold p-2 ml-4">
          <label>Country:</label>
          {isedit ? (
            <FormInput
              className="ml-4 p-1 rounded-base"
              type="text"
              {...register("country")}
              defaultValue={data.country}
            />
          ) : (
            <p>{data.country}</p>
          )}
        </div>

        {data.bussinessac === "no" && (
          <div className="flex">
            <p>for bussiness account :</p>
            <a className=" cursor-pointer">Click here</a>
          </div>
        )}

        {isedit ? (
          <>
            <button
              className="rounded-md bg-[#17b19f] mt-4 px-5 py-3 text-base"
              type="submit"
            >
              Update
            </button>
            <button type="button" onClick={toggleCancel}>
              Cancel
            </button>
          </>
        ) : (
          <button type="button" onClick={toggleEdit}>
            Edit
          </button>
        )}
      </form>
    </DashConatiner>
  );
}

export default Profile;
