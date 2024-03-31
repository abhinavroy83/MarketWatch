import React, { useEffect, useState } from "react";
import { DashConatiner, FormInput } from "../../../components";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { fetchcity } from "../../../Services/CityApi/Cityapi";

function Addrooms() {
  const currentLocation = useSelector((state) => state.auth.location);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const [areadata, setarea] = useState([]);
  const [filterstate, setfilterstate] = useState([]);
  const [filtercity, setfiltercity] = useState([]);
  const [filtersubarea, setfiltersubarea] = useState([]);
  const [userimgs, setuserimg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { userID } = useParams();
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
  const onsubmit = async (data) => {
    // console.log(data);
    const roomdata = {
      Adname: data.Adname,
      area: data.area,
      rent: data.rent,
      utilities: data.utilities,
      bed: data.bed,
      bath: data.bath,
      laundary: data.laundary,
      subarea: data.subarea,
      city: data.city,
      State: data.State,
      PrdImage: userimgs,
      address: data.address,
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

  useEffect(() => {
    const fetchdata = async () => {
      const ststs = await fetchcity();
      setarea(ststs.data.city);
      const uniquestate = Array.from(
        new Set(ststs.data.city.map((item) => item.state))
      );
      setfilterstate(uniquestate);
    };

    fetchdata();
  }, []);
  const handlestate = (e) => {
    const selectedstate = e.target.value;
    const upfcity = areadata.filter((item) => item.state === selectedstate);
    const uniquecity = [...new Set(upfcity.map((item) => item.city))];
    setfiltercity(uniquecity);
    const subar = areadata.filter((item) => item.state === selectedstate);
    const subarea = subar.map((item) => item.subarea);
    setfiltersubarea(subarea);
  };

  const handlecities = (e) => {
    const selectedCity = e.target.value;
    const subar = areadata.filter((item) => item.city === selectedCity);
    const subarea = subar.map((item) => item.subarea);
    setfiltersubarea(subarea);
  };

  return (
    <DashConatiner>
      <div className="font-roboto ml-5">
        <p className="text-3xl text-red-700 font-semibold mt-4">
          You Can Add New Room
        </p>

        {/* <p>{currentLocation.lat}</p>
        <p>{currentLocation.lng}</p> */}
        <form
          onSubmit={handleSubmit(onsubmit)}
          className="flex flex-col justify-center mt-7 gap-5"
        >
          <FormInput
            label="AdName"
            placeholder="AdName"
            type="text"
            {...register("Adname", { required: "Adname is required" })}
            errorMessage={errors.AdName?.message}
          />
          <FormInput
            label="Area"
            type="text"
            placeholder="for eg ... st louis greater area"
            {...register("area", { required: "Area is required" })}
            errorMessage={errors.area?.message}
          />
          <FormInput
            label="Rent"
            type="text"
            placeholder="Enter the Rent"
            {...register("rent", {
              required: "Rent required",
            })}
            errorMessage={errors.rent?.message}
          />
          <div>
            <div className="flex">
              <label className="min-w-[140px] text-[19px]" htmlFor="">
                Utilities
              </label>
              <select
                className="flex h-10 font-roboto w-[540px] text-[19px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 bg-gray-200 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                {...register("utilities", {
                  required: "utilities is required",
                })}
                defaultValue=""
              >
                <option value="" disabled hidden>
                  Select utilities
                </option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            {errors.utilities && <p>{errors.utilities.message}</p>}
          </div>
          <div>
            <div className="flex items-center">
              <label className="min-w-[140px] text-[19px]" htmlFor="">
                Bed
              </label>
              <select
                className="flex h-10 font-roboto w-[540px] text-[19px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 bg-gray-200 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                {...register("bed", {
                  required: "bed is required",
                })}
                defaultValue=""
              >
                <option value="" disabled hidden>
                  Select Bed
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>
            {errors.bed && <p>{errors.bed.message}</p>}
          </div>
          <div>
            <div className="flex items-center">
              <label className="min-w-[140px] text-[19px]" htmlFor="">
                Bath
              </label>
              <select
                className="flex h-10 font-roboto w-[540px] text-[19px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 bg-gray-200 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                {...register("bath", {
                  required: "Bath is required",
                })}
                defaultValue=""
              >
                <option value="" disabled hidden>
                  Select Bath
                </option>
                <option value="separate">Separate</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            {errors.bath && <p>{errors.bath.message}</p>}
          </div>
          <div>
            <div className="flex items-center">
              <label className="min-w-[140px] text-[19px]" htmlFor="">
                Laundary
              </label>
              <select
                className="flex h-10 font-roboto w-[540px] text-[19px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 bg-gray-200 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                {...register("laundary", {
                  required: "laundary is required",
                })}
                defaultValue=""
              >
                <option value="" disabled hidden>
                  Select laundary
                </option>
                <option value="Available">Available</option>
                <option value="Availableinapt">Available in apartment</option>
                <option value="notAvailable">notAvailable</option>
              </select>
            </div>
            {errors.laundary && <p>{errors.bath?.message}</p>}
          </div>
          <div>
            <div className="flex items-center">
              <label className="min-w-[140px] text-[19px]" htmlFor="">
                State
              </label>
              <select
                className="flex h-10 font-roboto w-[540px] text-[19px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 bg-gray-200 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                {...register("State", {
                  required: "State is required",
                })}
                defaultValue=""
                onChange={handlestate}
              >
                <option value="" disabled hidden>
                  Select State
                </option>
                {filterstate.map((state, index) => (
                  <option value={state} key={index}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            {errors.state && <p>{errors.state?.message}</p>}
          </div>
          <div>
            <div className="flex items-center">
              <label className="min-w-[140px] text-[19px]" htmlFor="">
                City
              </label>
              <select
                className="flex h-10 font-roboto w-[540px] text-[19px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 bg-gray-200 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                {...register("city", {
                  required: "City is required",
                })}
                defaultValue=""
                onChange={handlecities}
              >
                <option value="" disabled hidden>
                  Select city
                </option>
                {filtercity.map((city, index) => (
                  <option value={city} key={index}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            {errors.city && <p>{errors.city?.message}</p>}
          </div>
          <div>
            <div className="flex items-center">
              <label className="min-w-[140px] text-[19px]" htmlFor="">
                subarea
              </label>
              <select
                className="flex h-10 font-roboto w-[540px] text-[19px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 bg-gray-200 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                {...register("subarea", {
                  required: "subarea is required",
                })}
                defaultValue=""
                // onChange={handlecities}
              >
                <option value="" disabled hidden>
                  Select Subarea
                </option>
                {filtersubarea.map((subarea, index) => (
                  <option value={subarea} key={index}>
                    {subarea}
                  </option>
                ))}
              </select>
            </div>
            {errors.subarea && <p>{errors.subarea?.message}</p>}
          </div>

          <div className="flex font-roboto items-center">
            <label className="min-w-[140px] text-[19px]">Image:</label>
            <input
              className=""
              type="file"
              accept="image/*"
              onChange={handleimgchange}
            />
          </div>

          <FormInput
            label="room Address"
            type="text"
            {...register("address", {
              required: "Address required",
            })}
            errorMessage={errors.address?.message}
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
            className="rounded-md bg-[#17b19f] my-2 px-3 py-2 text-[18px] self-start font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Add New Room
          </button>
        </form>
      </div>
    </DashConatiner>
  );
}

export default Addrooms;
