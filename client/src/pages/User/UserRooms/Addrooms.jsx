import React, { useEffect, useState } from "react";
import { DashConatiner, FormInput } from "../../../components";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { fetchcity } from "../../../Services/CityApi/Cityapi";
import { IoInformationCircleSharp } from "react-icons/io5";

function Addrooms() {
  const currentLocation = useSelector((state) => state.auth.location);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const [areadata, setarea] = useState([]);
  const [filterstate, setfilterstate] = useState([]);
  const [filtercity, setfiltercity] = useState([]);
  const [filtersubarea, setfiltersubarea] = useState([]);
  const [userimgs, setuserimg] = useState("");
  const [uti, setuti] = useState(false);

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
      gender: data.gender,
      city: data.city,
      State: data.State,
      PrdImage: userimgs,
      address: data.address,
      postedby: data.postedby,
      description: data.description,
      email: data.email,
      number: data.number,
      location: {
        coordinates: [currentLocation.lng, currentLocation.lat],
      },
    };
    console.log(roomdata);
    try {
      const res = await axios.post(
        "https://marketwatch-e3hc.onrender.com/api/addrooms",
        roomdata,
        {
          headers: {
            jwttoken: `${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
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
    <div className="w-[1400px] m-auto items-center mt-52 justify-center bg-white shadow-lg shadow-black/30">
      <div className="font-roboto ml-5">
        <p className="text-[30px] font-semibold text-[#0b5e86] mt-4 flex items-center justify-center">
          Post Room In St.Louis
        </p>
        {/* <p>{currentLocation.lat}</p>
        <p>{currentLocation.lng}</p> */}
        <form
          onSubmit={handleSubmit(onsubmit)}
          className="flex flex-col justify-center mt-5 gap-5 items-center"
        >
          <div className="shadow-inner shadow-black/10 w-[1300px] items-center justify-center p-4">
            <p className="text-[23px]  bg-[#0b5e86] font-semibold text-white flex items-center justify-center gap-2 p-1">
              <IoInformationCircleSharp /> Ad Details-{" "}
            </p>
            <article className="flex justify-between gap-4 items-center mt-5 px-4">
              <FormInput
                className="flex items-center justify-center"
                label="Ad Name"
                placeholder="Ad Name"
                type="text"
                {...register("Adname", { required: "Adname is required" })}
                errorMessage={errors.Adname?.message}
              />
              <FormInput
                className="flex items-center justify-center"
                label="Add Area"
                type="text"
                placeholder="for eg ... st louis greater area"
                {...register("area", { required: "Area is required" })}
                errorMessage={errors.area?.message}
              />
            </article>
          </div>

          <div className="font-roboto shadow-inner shadow-gray-300 w-[1300px] p-4 mt-4">
            <p className="text-2xl  bg-[#0b5e86] font-semibold text-white flex items-center justify-center gap-2 p-1">
              <IoInformationCircleSharp />
              Personal Details-
            </p>
            <article className="flex flex-col gap-4 px-4 mt-5">
              <div className="flex w-auto">
                <FormInput
                  label="Email"
                  type="text"
                  placeholder="Enter Email"
                  {...register("email", {
                    required: "Email required",
                  })}
                  errorMessage={errors.email?.message}
                />
                <FormInput
                  label="Number"
                  type="text"
                  placeholder="Enter Number"
                  {...register("number", {
                    required: "Number required",
                  })}
                  errorMessage={errors.number?.message}
                />
              </div>
              <div>
                <div className="flex items-center">
                  <label className="min-w-[120px] text-[21px]" htmlFor="">
                    Gender
                  </label>
                  <div className="">
                    <select
                      className="flex h-10 font-roboto w-[400px] text-[21px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                      {...register("gender", {
                        required: "Gender is required",
                      })}
                      defaultValue=""
                    >
                      <option value="" disabled hidden>
                        Select Gender
                      </option>
                      <option className="text-[16px]" value="male">
                        Male
                      </option>
                      <option className="text-[16px]" value="female">
                        Female
                      </option>
                      <option className="text-[16px]" value="both">
                        Both
                      </option>
                    </select>
                    <p className="text-[16px] mt-1 text-red-500">
                      {" "}
                      {errors.gender && <p>{errors.gender.message}</p>}
                    </p>
                  </div>
                </div>
              </div>
            </article>
            <label className="w-[290px] text-[21px] px-4">Image:</label>
            <input
              className="ml-9 py-4 "
              type="file"
              accept="image/*"
              onChange={handleimgchange}
            />
          </div>

          <div className="shadow-inner shadow-gray-300 w-[1300px] items-center justify-center p-4 mt-4">
            <p className="text-2xl  bg-[#0b5e86] font-semibold text-white flex items-center justify-center gap-2 p-1">
              <IoInformationCircleSharp />
              Property Details-
            </p>
            <article className="flex justify-between mb-3 mt-5 px-4">
              <div className=" flex items-center">
                <div className="flex items-center">
                  <label
                    className="min-w-[120px] text-[21px] items-center "
                    htmlFor=""
                  >
                    Rent
                  </label>
                  <article className="relative">
                    <span className="absolute top-2 left-0 flex items-center pl-1 text-gray-500">
                      $
                    </span>
                    <input
                      id="rent"
                      name="rent"
                      type="number"
                      placeholder=""
                      {...register("rent", {
                        required: "Rent required",
                      })}
                      className="flex h-10 font-roboto w-[400px] text-[21px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                    />
                  </article>
                </div>
                <div className="flex justify-between ml-[6.5rem]">
                  {!uti && (
                    <div className="flex items-center">
                      <label className="min-w-[120px] text-[21px]">
                        Utilities
                      </label>
                      <article className="relative">
                        <span className="absolute top-2 left-0 flex items-center pl-1 text-gray-500">
                          $
                        </span>
                        <input
                          type="text"
                          {...register("utilities", {
                            required: "utilities required",
                          })}
                          className="flex h-10 font-roboto w-[300px] text-[21px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                        />
                      </article>
                    </div>
                  )}
                  <div className="flex gap-3 items-center ml-7">
                    <input
                      className=""
                      type="checkbox"
                      checked={uti}
                      onChange={(e) => setuti(e.target.checked)}
                    />
                    <p className="flex flex-col">Includes utility</p>
                    {errors.utilities && <p>{errors.utilities.message}</p>}
                  </div>
                </div>
              </div>
            </article>
            <article className="flex px-4">
              <div>
                <div className="flex items-center">
                  <label className="min-w-[120px] text-[21px]" htmlFor="">
                    Bed
                  </label>
                  <div>
                    <select
                      className="flex h-10 font-roboto w-[400px] text-[21px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                      {...register("bed", {
                        required: "Bed is required",
                      })}
                      defaultValue=""
                    >
                      <option value="" disabled hidden>
                        Select Bed
                      </option>
                      <option className="text-[16px]" value="1">
                        1
                      </option>
                      <option className="text-[16px]" value="2">
                        2
                      </option>
                      <option className="text-[16px]" value="3">
                        3
                      </option>
                      <option className="text-[16px]" value="4">
                        4
                      </option>
                      <option className="text-[16px]" value="5">
                        5
                      </option>
                      <option className="text-[16px]" value="6">
                        6
                      </option>
                    </select>
                    <p className="text-[16px] mt-1 text-red-500">
                      {" "}
                      {errors.bed && <p>{errors.bed.message}</p>}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between ml-[6.5rem]">
                <label className="min-w-[120px] text-[21px]" htmlFor="">
                  Bath
                </label>
                <div>
                  <select
                    className="flex h-10 font-roboto w-[300px] text-[21px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                    {...register("bath", {
                      required: "Bath is required",
                    })}
                    defaultValue=""
                  >
                    <option value="" disabled hidden>
                      Select Bath
                    </option>
                    <option className="text-[16px]" value="separate">
                      Separate
                    </option>
                    <option className="text-[16px]" value="shared">
                      Shared
                    </option>
                  </select>
                  <p className="text-[16px] mt-1 text-red-500">
                    {" "}
                    {errors.bath && <p>{errors.bath.message}</p>}
                  </p>
                </div>
              </div>
            </article>
            <div>
              <div className="flex items-center mt-2 px-4">
                <label className="min-w-[120px] text-[21px]" htmlFor="">
                  Laundary
                </label>
                <div>
                  <select
                    className="flex h-10 font-roboto w-[400px] text-[21px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                    {...register("laundary", {
                      required: "laundary is required",
                    })}
                    defaultValue=""
                  >
                    <option value="" disabled hidden>
                      Select laundary
                    </option>
                    <option className="text-[16px]" value="Available">
                      Available
                    </option>
                    <option className="text-[16px]" value="Availableinapt">
                      Available in apartment
                    </option>
                    <option className="text-[16px]" value="notAvailable">
                      notAvailable
                    </option>
                  </select>
                  <p className="text-[16px] text-red-500 mt-1">
                    {" "}
                    {errors.laundary && <p>{errors.laundary?.message}</p>}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="shadow-inner shadow-gray-300 w-[1300px] items-center justify-center p-4 mt-4">
            <p className="text-2xl bg-[#0b5e86] font-semibold text-white flex items-center justify-center gap-2 p-1">
              <IoInformationCircleSharp />
              Location Details-
            </p>
            <article className="flex flex-col gap-4 px-4 mt-4">
              <div className="flex">
                <div>
                  <div className="flex items-center">
                    <label className="min-w-[120px] text-[21px]" htmlFor="">
                      State
                    </label>
                    <select
                      className="flex h-10 font-roboto w-[400px] text-[21px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
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
                        <option
                          className="text-[16px]"
                          value={state}
                          key={index}
                        >
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p className="text-[16px] text-red-500 mt-1">
                    {" "}
                    {errors.state && <p>{errors.state?.message}</p>}
                  </p>
                  {/* {errors.state && <p>{errors.state?.message}</p>} */}
                </div>

                <div>
                  <div className="flex items-center ml-[6.5rem]">
                    <label className="min-w-[120px] text-[21px] " htmlFor="">
                      City
                    </label>
                    <div>
                      <select
                        className="flex h-10 font-roboto w-[300px] text-[21px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                        {...register("city", {
                          required: "City is required",
                        })}
                        defaultValue=""
                        onChange={handlecities}
                      >
                        <option
                          className="text-gray-600"
                          value=""
                          disabled
                          hidden
                        >
                          Select city
                        </option>
                        {filtercity.map((city, index) => (
                          <option value={city} key={index}>
                            {city}
                          </option>
                        ))}
                      </select>
                      <p className="text-[16px] text-red-500 mt-1">
                        {" "}
                        {errors.city && <p>{errors.city?.message}</p>}
                      </p>
                    </div>{" "}
                  </div>
                </div>
              </div>

              <div className="">
                <div className="flex items-center">
                  <label className="min-w-[120px] text-[21px]" htmlFor="">
                    Subarea
                  </label>
                  <div>
                    <select
                      className="flex h-10 font-roboto w-[400px] text-[21px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
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
                    <p className="text-[16px] text-red-500 mt-1">
                      {" "}
                      {errors.subarea && <p>{errors.subarea?.message}</p>}
                    </p>
                  </div>
                </div>
              </div>
              <FormInput
                className=""
                label="Address"
                type="text"
                placeholder="Enter Address"
                {...register("address", {
                  required: "Address required",
                })}
                errorMessage={errors.address?.message}
              />

              <FormInput
                label="Posted By"
                type="text"
                placeholder="Posted By"
                {...register("postedby", {
                  required: "Postedby required",
                })}
                errorMessage={errors.postedby?.message}
              />
            </article>
          </div>
          <div className="shadow-inner shadow-gray-300 w-[1300px] items-center justify-center p-4 pb-0">
            <p className="text-2xl bg-[#0b5e86] font-semibold text-white flex items-center justify-center gap-2 p-1">
              <IoInformationCircleSharp />
              Add Description-
            </p>
            <article className="gap-4 items-center mt-5 px-4">
              {/* <FormInput
                className=""
                label="Your Title"
                placeholder="Title"
                type="text"
                {...register("Title", { required: "Title is required" })}
                // errorMessage={errors.AdName?.message}
              /> */}
              <div className="">
                <label
                  className="text-[21px] w-[120px] font-roboto leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                  htmlFor=""
                >
                  Title
                </label>
                <input
                  className="font-roboto h-10  w-[400px] text-[21px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  label="Title"
                  type="text"
                  placeholder="Title"
                  {...register("description", {
                    required: "Title is required",
                  })}
                  // errorMessage={errors.area?.message}
                />
              </div>
              <div className="mt-5">
                <label
                  className="text-[21px] w-[120px] font-roboto leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                  htmlFor=""
                >
                  Description
                </label>
                <textarea
                  className="h-100px font-roboto w-400px text-21px rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  name="description"
                  placeholder="Description"
                  {...register("description", {
                    required: "Description is required",
                  })}
                />
              </div>
            </article>
          </div>
          <button
            type="submit"
            className="rounded-md bg-green-800 my-7 px-4 py-2 text-[18px] self-center font-semibold text-white shadow-sm hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Add New Room
          </button>
        </form>
      </div>
    </div>
  );
}

export default Addrooms;
