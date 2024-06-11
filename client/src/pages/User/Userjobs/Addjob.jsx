import React from "react";
import { DashConatiner, Input } from "../../../components";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

function Addjob() {
  const currentLocation = useSelector((state) => state.auth.location);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  // console.log(currentLocation);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { userID } = useParams();
  const onsubmit = async (data) => {
    const jobdata = {
      company_name: data.company_name,
      company_logo: data.company_logo,
      postion: data.postion,
      jobtype: data.jobtype,
      salary: data.salary,
      job_location: data.job_location,
      location: {
        coordinates: [currentLocation.lat, currentLocation.lng],
      },
    };
    // console.log(jobdata)
    try {
      const res = await axios.post(
        " https://api.verydesi.com/api/addjob",
        jobdata,
        {
          headers: {
            jwttoken: `${token}`,
          },
        }
      );
      if (res) {
        console.log(res);
        alert("Job added successfully");
        reset();
        navigate(`/user/job/${userID}`);
      }
    } catch (error) {
      console.log("error during sending data to roomapi", error);
    }
  };
  return (
    <DashConatiner>
      <div>
        <p>You can add job here</p>
        <form
          onSubmit={handleSubmit(onsubmit)}
          className=" flex flex-col justify-center items-center"
        >
          <Input
            label="Company Name"
            type="text"
            {...register("company_name", {
              required: "company_name required",
            })}
            errorMessage={errors.company_name?.message}
          />
          <Input
            label="Company logo Url"
            type="text"
            {...register("company_logo", {
              required: "company_logo required",
            })}
            errorMessage={errors.company_logo?.message}
          />
          <Input
            label="Postion"
            type="text"
            {...register("postion", {
              required: "postion required",
            })}
            errorMessage={errors.postion?.message}
          />
          <Input
            label="Jobtype"
            type="text"
            {...register("jobtype", {
              required: "jobtype required",
            })}
            errorMessage={errors.jobtype?.message}
          />
          <Input
            label="Salary"
            type="text"
            {...register("salary", {
              required: "salary required",
            })}
            errorMessage={errors.salary?.message}
          />
          <Input
            label="Job location"
            type="text"
            {...register("job_location", {
              required: "job_location required",
            })}
            errorMessage={errors.job_location?.message}
          />
          <button
            type="submit"
            className="rounded-md bg-black  my-2 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Add Job
          </button>
        </form>
      </div>
    </DashConatiner>
  );
}

export default Addjob;
