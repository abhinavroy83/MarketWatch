import React from "react";
import { DashConatiner, FormInput } from "../../../components";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Addrooms() {
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
    const roomdata = {
      city: data.city,
      State: data.State,
      Hotelname: data.Hotelname,
      PrdImage: data.PrdImage,
      rent: data.rent,
      address: data.address,
      bed: data.bed,
      bath: data.bath,
      postedby: data.postedby,
      description: data.description,
      email: data.email,
      number: data.number,
      location: {
        coordinates: [currentLocation.lat, currentLocation.lng],
      },
    };
    try {
      const res = await axios.post(
        "http://localhost:8000/api/addrooms",
        roomdata,
        {
          headers: {
            jwttoken: `${token}`,
          },
        }
      );
      if (res) {
        // console.log(res);
        alert("rooms added successfully");
        reset();
        navigate(`/user/room/${userID}`);
      }
    } catch (error) {
      console.log("error during sending data to roomapi", error);
    }
  };
  return (
    <DashConatiner>
      <div className="font-[Montserrat] font-semibold">
        <p className="text-3xl ml-3 mt-3 text-red-700">You Can Add New Room</p>

        {/* <p>{currentLocation.lat}</p>
        <p>{currentLocation.lng}</p> */}
        <form
          onSubmit={handleSubmit(onsubmit)}
          className="flex flex-col justify-center items-center mt-7 gap-5"
        >
          <FormInput
            label="City"
            type="text"
            {...register("city", {
              required: "City required",
            })}
            errorMessage={errors.city?.message}
          />

          <FormInput
            label="State"
            type="text"
            {...register("State", {
              required: "State required",
            })}
            errorMessage={errors.State?.message}
          />
          <FormInput
            label="Hotelname"
            type="text"
            {...register("Hotelname", {
              required: "Hotelname required",
            })}
            errorMessage={errors.Hotelname?.message}
          />
          <FormInput
            label="Hotel Image Url"
            type="text"
            {...register("PrdImage", {
              required: "PrdImage required",
            })}
            errorMessage={errors.PrdImage?.message}
          />
          <FormInput
            label="Rent"
            type="text"
            {...register("rent", {
              required: "Rent required",
            })}
            errorMessage={errors.rent?.message}
          />
          <FormInput
            label="Hotel Address"
            type="text"
            {...register("address", {
              required: "Address required",
            })}
            errorMessage={errors.address?.message}
          />
          <FormInput
            label="Bed"
            type="text"
            {...register("bed", {
              required: "Address required",
            })}
            errorMessage={errors.bed?.message}
          />
          <FormInput
            label="Bath"
            type="text"
            {...register("bath", {
              required: "Bath required",
            })}
            errorMessage={errors.bath?.message}
          />
          <FormInput
            label="Postedby"
            type="text"
            {...register("postedby", {
              required: "Postedby required",
            })}
            errorMessage={errors.postedby?.message}
          />
          <FormInput
            label="Description"
            type="text"
            {...register("description", {
              required: "Description required",
            })}
            errorMessage={errors.description?.message}
          />
          <FormInput
            label="Email"
            type="text"
            {...register("email", {
              required: "Email required",
            })}
            errorMessage={errors.email?.message}
          />
          <FormInput
            label="Number"
            type="text"
            {...register("number", {
              required: "Number required",
            })}
            errorMessage={errors.number?.message}
          />

          <button
            type="submit"
            className="rounded-md bg-[#17b19f] my-2 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Add Hotel
          </button>
        </form>
      </div>
    </DashConatiner>
  );
}

export default Addrooms;
