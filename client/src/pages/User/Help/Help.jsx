import React, { useEffect, useState } from "react";
import { IoIosHelpCircle } from "react-icons/io";
import { DashConatiner } from "../../../components";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

function Help() {
  const { userID } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const [data, setdata] = useState([]);
  const fetchUser = async () => {
    try {
      const res = await axios.get(
        ` https://api.verydesi.com/user/dashboard/profile/${userID}`
      );

      setdata(res.data.user);
    } catch (error) {
      console.log("error during fetcing userdetails", error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, [userID]);

  useEffect(() => {
    if (data) {
      const fullname = `${data.firstName || ""} ${data.lastName || ""}`;
      setValue("username", fullname);
      setValue("useremail", data.email || "");
      setValue("user_phone_number", data.phone_number || "");
    }
  }, [data, setValue]);

  const onSubmit = async (data) => {
    // console.log(data);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/adminpage/sendmsg",
        data
      );
      if (res.data.success) {
        toast.success("Message send Successfully");
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashConatiner>
      <div className="flex justify-center text-center self-center font-['udemy-regular']">
        <p className="text-[1.5rem] p-2 bg-[#232f3e] text-white w-full flex gap-2 justify-center shadow-black shadow-sm items-center text-center">
          {/* <ImProfile /> */}
          <img
            className="w-[2rem] h-[2rem]"
            src={
              "https://res.cloudinary.com/druohnmyv/image/upload/v1724350531/assests/oyqisjnu9p3lotoidgry.png"
            }
            alt="logo"
          />
          {/* <IoIosHelpCircle size={33} /> */}
          Help
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col font-['udemy-regular'] text-black justify-center items-center gap-1 mt-2"
      >
        <div className="flex p-2 items-center">
          <label className="w-[120px] lg:w-[190px] flex text-[17px] items-center gap-2">
            Name
          </label>
          <input
            className="flex h-10 w-[200px] lg:w-[300px] text-black text-[17px] border rounded-md border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-40 "
            // defaultValue={`${data?.firstName} ${data?.lastName}`}
            {...register("username")}
          />
          {/* {data?.firstName} {data?.lastName} */}
        </div>
        <div className="flex p-2 items-center">
          <label className="w-[120px] lg:w-[190px] flex text-[17px] items-center gap-2">
            Email
          </label>
          <input
            className="flex h-10 w-[200px] lg:w-[300px] text-black text-[17px] border rounded-md border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-40 "
            {...register("useremail")}
          />
        </div>
        <div className="flex p-2 items-center">
          <label className="w-[120px] lg:w-[190px] flex text-[17px] items-center gap-2">
            Phone Number
          </label>
          <input
            className="flex h-10 w-[200px] lg:w-[300px] text-black text-[17px] border rounded-md border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-40 "
            {...register("user_phone_number")}
          />
        </div>
        <div className="flex p-2">
          <label className="w-[120px] lg:w-[190px] flex text-[17px] gap-2">
            Description
          </label>
          <textarea
            className="flex h-[100px] w-[200px] lg:w-[300px] bg-white text-[17px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-40 "
            type="text"
            {...register("msg", {
              required: `Description can't be empty`,
            })}
          />
        </div>
        {errors.msg && (
          <p className=" text-red-700 text-xs ml-7">{errors.msg.message}</p>
        )}

        <button
          className="flex mb-4 bg-green-800 rounded-md mt-4 p-2 px-3 text-[19px] font-normal text-white shadow-sm hover:bg-green-900 hover:text-white"
          type="submit"
        >
          Send response
        </button>
      </form>
      <p className="flex gap-1 text-[17px] text-red-500 text-sm px-2">
        **Alternatively, you can reach out via email at{" "}
        <a
          href={`mailto:verydesionline@gmail.com`}
          className="hover:underline hover:text-blue-600"
        >
          verydesionline@gmail.com
        </a>
      </p>
    </DashConatiner>
  );
}

export default Help;
