import React, { useEffect, useRef, useState } from "react";
import { DashConatiner, FormInput } from "../../../components";
import { useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { fetchcity } from "../../../Services/CityApi/Cityapi";
import { IoInformationCircleSharp } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import authslice from "../../../store/authslice";
import DatePicker from "react-datepicker";
import { useLoadScript, StandaloneSearchBox } from "@react-google-maps/api";
import "react-datepicker/dist/react-datepicker.css";
import { CgGenderMale } from "react-icons/cg";
import { TbGenderFemale } from "react-icons/tb";
import Loader from "../../../components/UserCompontents/Loader";

const libraries = ["places"];

function Addrooms({ editdata }) {
  const currentLocation = useSelector((state) => state.auth.location);
  const token = useSelector((state) => state.auth.token);
  const cunrtcity = useSelector((state) => state.auth.city);
  const navigate = useNavigate();
  const [filtercity, setfiltercity] = useState([]);
  const [zip, setzip] = useState([]);
  const [userimgs, setuserimg] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resimgurl, setResimgurl] = useState([]);
  const [imgerror, setimgerror] = useState(false);
  const [uploadstats, setUploadstats] = useState(false);
  const [profiledata, setprofile] = useState([]);
  const [stayLeaseOption, setStayLeaseOption] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [isImmediate, setIsImmediate] = useState(false);
  const [loaderimg, setLoader] = useState(false);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDV2wKeoUG0TSghZ1adR-t8z0cJJS8EM24",
    libraries,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
    watch,
  } = useForm();
  const selectedBathroom = watch("Attchd_Bath");
  const preferredGender = watch("Preferred_gender");

  const [autocomplete, setAutocomplete] = useState(null);
  const [location, setLocation] = useState({ lat: null, lng: null });

  const onLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlaces()[0];
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setLocation({ lat, lng });
      setValue("address", place.formatted_address);
      setValue("latitude", lat);
      setValue("longitude", lng);
      const addressComponents = place.address_components;
      let city = "";
      let state = "";

      for (let component of addressComponents) {
        if (component.types.includes("locality")) {
          city = component.long_name;
        }
        if (component.types.includes("administrative_area_level_1")) {
          state = component.short_name;
        }
      }

      setCity(city);
      setState(state);
      setValue("city", city);
      setValue("state", state);
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  const usrId = useSelector((state) => state.auth.userID);

  const handleStayLeaseChange = (e) => {
    setStayLeaseOption(e.target.value);
  };

  const { userID } = useParams();

  useEffect(() => {
    const fetchusedetails = async () => {
      const res = await axios.get(
        `https://api.verydesi.com/user/dashboard/profile/${usrId}`
      );
      setprofile(res.data.user);
    };
    fetchusedetails();
  }, [usrId]);

  const fullname = profiledata
    ? `${profiledata.firstName} ${profiledata.lastName}`
    : "";

  const handleSelectFile = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length + files.length > 5) {
      alert("You can upload up to 5 images.");
      return;
    }
    const newFiles = selectedFiles.map((file) => {
      return {
        file,
        preview: URL.createObjectURL(file),
      };
    });
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    setimgerror(false);
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    try {
      setLoader(true);
      const data = new FormData();
      files.forEach(({ file }) => {
        data.append("my_files", file);
      });

      const res = await axios.post("https://api.verydesi.com/img/upload", data);
      const urls = res.data.map((img) => img.url);
      if (res) {
        setResimgurl(urls);
        setUploadstats(true);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  // useEffect(() => {
  //   if (files.length > 0) {
  //     const timeout = setTimeout(() => {
  //       handleUpload();
  //     }, 1000);

  //     return () => clearTimeout(timeout);
  //   }
  // }, [files]);
  // console.log(resimgurl);

  const onsubmit = async (data) => {
    setLoader(true);
    await handleUpload();
    await new Promise((resolve) => setTimeout(resolve, 3000));

    if (resimgurl.length > 0) {
      const roomdata = {
        Title: data.Title,
        Description: data.Description,
        Propertytype: data.Propertytype,
        city: data.city,
        Stay_lease: data.Stay_lease,
        Avaliblity_from: data.Avaliblity_from,
        Available_to: data.Available_to,
        Immediate: data.Immediate,
        Attchd_Bath: data.Attchd_Bath,
        Bath_Location: data.Bath_Location,
        Preferred_gender: data.Preferred_gender,
        Couples_welcome: data.Couples_welcome,
        Expected_Rooms: data.Expected_Rooms,
        Pricemodel: data.Pricemodel,
        Desposite: data.Desposite,
        is_room_furnished: data.is_room_furnished,
        Amenities_include: data.Amenities_include,
        Vegeterian_prefernce: data.Vegeterian_prefernce,
        Smoking_policy: data.Smoking_policy,
        Pet_friendly: data.Pet_friendly,
        Open_house_schedule: data.Open_house_schedule,
        Imgurl: resimgurl,
        user_name: fullname,
        email: profiledata.email,
        phone_number: data.phone_number,
        address: data.address,
        state: data.state,
        zip_code: data.zip_code,
        location: {
          coordinates: [location.lng, location.lat],
        },
      };

      if (editdata) {
        try {
          console.log("ddcds", editdata._id);
          const res = await axios.put(
            `https://api.verydesi.com/api/updaterooms/${editdata._id}`,
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

            alert("update room successfully");
            navigate(`/rooms/${editdata._id}`);
          }
        } catch (error) {
          console.log("error while update room ", error);
        }
      } else {
        try {
          const res = await axios.post(
            " https://api.verydesi.com/api/addrooms",
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
            navigate(`/room/${res.data.rooms._id}`);
          }
        } catch (error) {
          console.log("error during sending data to roomapi", error);
        }
      }
    }
    // console.log("resimgurl", resimgurl);
    // console.log(roomdata);
  };

  useEffect(() => {
    const fetchdata = async () => {
      const res = await fetchcity();
      const uniquecity = Array.from(
        new Set(res.data.city.map((item) => item.area))
      );
      setfiltercity(uniquecity);
    };
    fetchdata();
  }, []);

  const handleCheckboxChange = () => {
    setIsImmediate(!isImmediate);
  };

  useEffect(() => {
    if (isImmediate) {
      setValue("Avaliblity_from", null);
      setValue("Available_to", null);
    }
  }, [isImmediate, setValue]);

  useEffect(() => {
    if (editdata) {
      // console.log("Populating form with editdata:", editdata);
      setStayLeaseOption(editdata?.Stay_lease);
      setValue("city", editdata?.city || "Portland");
      setValue("Title", editdata?.Title || "");
      setValue("Description", editdata?.Description || "");
      setValue("Propertytype", editdata?.Propertytype || "");
      setValue("Stay_lease", editdata?.Stay_lease || "");
      setValue("Pricemodel", editdata?.Pricemodel || "");
      setValue("Expected_Rooms", editdata?.Expected_Rooms || "");
      setValue("Avaliblity_from", editdata?.Avaliblity_from || "");
      setValue("Available_to", editdata?.Available_to || "");
      setValue("Immediate", editdata?.Immediate || "");
      setValue("Attchd_Bath", editdata?.Attchd_Bath || "");
      setValue("Bath_Location", editdata?.Bath_Location || "");
      setValue("Preferred_gender", editdata?.Preferred_gender || "");
      setValue("Couples_welcome", editdata?.Couples_welcome || "");
      setValue("Desposite", editdata?.Desposite || "");
      setValue("is_room_furnished", editdata?.is_room_furnished || "");
      setValue("Amenities_include", editdata?.Amenities_include || "");
      setValue("Vegeterian_prefernce", editdata?.Vegeterian_prefernce || "");
      setValue("Smoking_policy", editdata?.Smoking_policy || "");
      setValue("Pet_friendly", editdata?.Pet_friendly || "");
      setValue("Open_house_schedule", editdata?.Open_house_schedule || "");
      setValue("phone_number", editdata?.phone_number || "");
      setValue("address", editdata?.address || "");
      setValue("state", editdata?.state || "");
      setValue("zip_code", editdata?.zip_code || "");
      if (editdata.Imgurl) {
        setFiles(editdata.Imgurl.map((url) => ({ preview: url })));
        setResimgurl(editdata.Imgurl);
      }
    }
  }, [editdata, setValue]);

  const datainputref = useRef(null);

  useEffect(() => {
    const handleFocus = () => {
      if (datainputref.current) {
        datainputref.current.showPicker();
      }
    };

    const input = datainputref.current;
    if (input) {
      input.addEventListener("focus", handleFocus);
    }

    return () => {
      if (input) {
        input.removeEventListener("focus", handleFocus);
      }
    };
  }, []);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading Maps</div>;
  }

  if (loaderimg) {
    return (
      <div className=" h-full w-full mx-auto">
        <Loader />
      </div>
    );
  }

  return (
    <div className=" w-full mx-auto mt-[7%] items-center">
      <div className="w-full max-w-[1400px] mx-auto items-center justify-center bg-white shadow-lg shadow-black/30">
        <div className="font-['udemy-regular'] mx-20">
          <form
            onSubmit={handleSubmit(onsubmit)}
            className="flex flex-col justify-center mt-7 gap-5 items-center"
          >
            <div className="flex gap-2 items-center">
              <p className="text-[25px] font-semibold text-[#000] flex items-center justify-center mt-6">
                {editdata ? <p>Edit Room In</p> : <p>Post Room In</p>}
              </p>
              <Controller
                className="bg-black"
                name="city"
                control={control}
                rules={{ required: "PostingIn is required" }}
                render={({ field }) => (
                  <select
                    {...field}
                    className="mt-6 text-[23px] font-['udemy-regular'] bg-[#232f3e] text-white border-2 placeholder:text-gray-400 cursor-pointer"
                    onChange={(e) => field.onChange(e.target.value)}
                  >
                    <option className="text-gray-600" value="" disabled hidden>
                      Select city
                    </option>
                    {filtercity.map((city, index) => (
                      <option
                        value={city}
                        key={index}
                        className="text-[17px] bg-white text-[#232f3e]"
                      >
                        {city}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>
            <p className="text-[16px] mt-1 text-red-500">
              {errors.city && <p>{errors.city.message}</p>}
            </p>
            <div className="w-full">
              <div className="flex mt-3">
                <label
                  className="text-[18px] w-[266px] font-['udemy-regular'] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                  htmlFor=""
                >
                  Title*
                </label>
                <div className="">
                  <input
                    className="font-['udemy-regular'] h-10 w-[740px] text-[18px] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    label="Title"
                    type="text"
                    // defaultValue={editdata?.Title}
                    placeholder="Title"
                    {...register("Title", {
                      required: "Title is required",
                    })}
                  />
                  <p className="text-[16px] mt-1 text-red-500">
                    {errors.Title && <p>{errors.Title.message}</p>}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex">
                <label
                  className="text-[18px] w-[266px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                  htmlFor=""
                >
                  Description <span className=" text-red-500">*</span>
                </label>
                <div>
                  <textarea
                    className="h-100px text-[18px] w-[740px] font-['udemy-regular'] text-21px border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    name="description"
                    placeholder="Description"
                    {...register("Description", {
                      required: "Description is required",
                      validate: {
                        minWords: (value) =>
                          value.trim().split(/\s+/).length >= 50 ||
                          "Description must be at least 50 characters",
                      },
                    })}
                  />
                  <p className="text-[16px] text-red-500">
                    {" "}
                    {errors.Description && <p>{errors.Description.message}</p>}
                  </p>
                </div>
              </div>

              <div className="flex mt-4">
                <label
                  className="text-[18px] w-[266px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                  htmlFor=""
                >
                  Property Type <span className=" text-red-500">*</span>
                </label>
                <div>
                  <Controller
                    name="Propertytype"
                    control={control}
                    rules={{ required: "Property Type is required" }}
                    defaultValue=""
                    render={({ field }) => (
                      <select
                        {...field}
                        className="h-100px w-[740px] text-[18px] font-['udemy-regular'] text-21px border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        name=""
                        id=""
                      >
                        <option value="">Select</option>
                        <option value="Single Family Home">
                          Single Family Home
                        </option>
                        <option value="Apartment">Apartment</option>
                        <option value="Condo">Condo</option>
                        <option value="Town">Town House</option>
                        <option value="Home">Homes</option>
                        <option value="House">House</option>
                        <option value="Basement">Basement Apartment</option>
                      </select>
                    )}
                  />
                  <p className="text-[16px] mt-1 text-red-500">
                    {errors.Propertytype && (
                      <p>{errors.Propertytype.message}</p>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex text-[18px] mt-5">
                <label
                  htmlFor=""
                  className="text-[18px] w-[283px] font-['udemy-regular'] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                >
                  Stay/Lease <span className=" text-red-500">*</span>
                </label>
                <div>
                  <div className="grid grid-cols-4 gap-4 text-[18px] w-auto">
                    <div className=" flex gap-2 whitespace-nowrap ">
                      <input
                        type="radio"
                        value="Short term"
                        {...register("Stay_lease", {
                          required: "Stay/Lease required",
                        })}
                        onChange={handleStayLeaseChange}
                      />
                      <p>Short term(1Day to 6Months) </p>
                    </div>
                    <div className="flex gap-2 whitespace-nowrap px-2">
                      <input
                        type="radio"
                        value="Long term(6+ months)"
                        {...register("Stay_lease", {
                          required: "Stay/Lease required",
                        })}
                        onChange={handleStayLeaseChange}
                      />
                      <p>Long term(6+ Months) </p>
                    </div>
                    <div className=" flex gap-2">
                      <input
                        type="radio"
                        value="Both"
                        {...register("Stay_lease", {
                          required: "Stay/Lease required",
                        })}
                        onChange={handleStayLeaseChange}
                      />
                      <p>Both* </p>
                    </div>
                  </div>
                  <p className="text-[16px] mt-1 text-red-500">
                    {" "}
                    {errors.Stay_lease && <p>{errors.Stay_lease.message}</p>}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex text-[18px]">
                <label
                  className=" w-[266px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                  htmlFor=""
                >
                  Price Model <span className=" text-red-500">*</span>
                </label>
                <div>
                  <Controller
                    name="Pricemodel"
                    control={control}
                    rules={{ required: "Pricemodel is required" }}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <select
                          {...field}
                          value={field.value || ""}
                          className="h-100px w-[500px] text-[18px] font-['udemy-regular'] text-21px border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="">Select</option>
                          {stayLeaseOption === "Short term" && (
                            <>
                              <option value="Per Night">Per Night</option>
                              <option value="Per Day">Per Day</option>
                              <option value="Per Week">Per Week</option>
                            </>
                          )}
                          {stayLeaseOption === "Long term(6+ months)" && (
                            <option value="Per Month">Per Month</option>
                          )}
                          {stayLeaseOption === "Both" && (
                            <>
                              <option value="Per Month">Per Month</option>
                              <option value="Per Night">Per Night</option>
                              <option value="Per Day">Per Day</option>
                              <option value="Per Week">Per Week</option>
                            </>
                          )}
                        </select>
                        {error && (
                          <p className="text-[16px] mt-1 text-red-500">
                            {error.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>
              </div>

              <div className="flex mt-5 text-[18px]">
                <label
                  className="text-[18px] w-[266px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                  htmlFor=""
                >
                  Rent <span className=" text-red-500">*</span>
                </label>
                <div className="items-center">
                  <span className="bg-gray-200 items-center justify-center inline-block text-[18px] font-['udemy-regular'] font-bold border border-black/20 px-3 py-2 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50">
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="Rent"
                    className="h-100px w-[462px] text-[18px] font-['udemy-regular'] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    {...register("Expected_Rooms", {
                      required: "Rent is require",
                    })}
                  />
                  <p className="text-[16px] mt-1 text-red-500">
                    {" "}
                    {errors.Expected_Rooms && (
                      <p>{errors.Expected_Rooms.message}</p>
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-1 ml-5">
                  <input
                    type="checkbox"
                    // {...register("Negotiable")}
                  />
                  <p className="px-3 py-2 text-black">Negotiable</p>
                </div>
                <div className="flex items-center gap-1">
                  <input type="checkbox" />
                  <p className="px-3 py-2 text-black">Hide Rent</p>
                </div>
              </div>

              <div className="flex mt-4 gap-5">
                <label
                  className="text-[21px] w-[246px] font-['udemy-regular'] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                  htmlFor=""
                >
                  Availability <span className="text-red-500">*</span>
                </label>
                <div>
                  <Controller
                    name="Avaliblity_from"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        selected={field.value}
                        className={`h-100px w-[263px] text-[18px] font-['udemy-regular'] border border-black/20 px-3 py-2  placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 ${
                          isImmediate
                            ? "bg-gray-200 cursor-not-allowed"
                            : "bg-white"
                        }`}
                        placeholderText="Available from"
                        disabled={isImmediate}
                      />
                    )}
                  />
                  {errors.Avaliblity_from && (
                    <p className="text-[16px] mt-1 text-red-500">
                      {errors.Avaliblity_from.message}
                    </p>
                  )}
                </div>
                <div>
                  <Controller
                    name="Available_to"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        selected={field.value}
                        className={`h-100px w-[263px] text-[18px] font-['udemy-regular'] border border-black/20 px-3 py-2  placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 ${
                          isImmediate
                            ? "bg-gray-200 cursor-not-allowed"
                            : "bg-white"
                        }`}
                        placeholderText="Available to"
                        disabled={isImmediate}
                      />
                    )}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register("Immediate")}
                    checked={isImmediate}
                    onChange={handleCheckboxChange}
                  />
                  <p className="py-2 text-black text-[18px]">Immediate</p>
                </div>
              </div>

              <div className="flex mt-5 text-[18px] gap-20">
                <label
                  className="text-[21px] w-[188px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                  htmlFor=""
                >
                  Separate Bathroom <span className="text-red-500">*</span>
                </label>
                <div>
                  <div className="grid grid-cols-4 gap-4 text-[18px] w-[976px]">
                    <div className="flex gap-1 items-center">
                      <input
                        type="radio"
                        value="Yes"
                        {...register("Attchd_Bath", {
                          required: "Please select Bath",
                        })}
                      />
                      <p>Yes</p>
                    </div>
                    <div className="flex gap-1 items-center">
                      <input
                        type="radio"
                        value="No"
                        {...register("Attchd_Bath", {
                          required: "Please select Bath",
                        })}
                      />
                      <p>No</p>
                    </div>
                  </div>
                  {errors.Attchd_Bath && (
                    <p className="text-[16px] mt-1 text-red-500">
                      {errors.Attchd_Bath.message}
                    </p>
                  )}

                  {selectedBathroom === "Yes" && (
                    <div className="mt-4">
                      <div className="flex gap-1 items-center">
                        <input
                          type="radio"
                          value="Attached in Room"
                          {...register("Bath_Location", {
                            required: "Please select Bath location",
                          })}
                        />
                        <p>Attached in Room</p>
                      </div>
                      <div className="flex gap-1 items-center">
                        <input
                          type="radio"
                          value="Outside the room"
                          {...register("Bath_Location", {
                            required: "Please select Bath location",
                          })}
                        />
                        <p>Outside the room</p>
                      </div>
                      {errors.Bath_Location && (
                        <p className="text-[16px] mt-1 text-red-500">
                          {errors.Bath_Location.message}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex mt-5 text-[18px] gap-20">
                <label
                  className="text-[21px] w-[188px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                  htmlFor=""
                >
                  Preferred Gender <span className="text-red-500">*</span>
                </label>
                <div>
                  <div className="grid grid-cols-4 gap-4 text-[18px] w-[976px]">
                    <div className="flex gap-1 items-center">
                      <input
                        type="radio"
                        value="Male only"
                        {...register("Preferred_gender", {
                          required: "Please select gender",
                        })}
                      />
                      <p className="flex items-center gap-1">
                        Male
                        <img
                          className="w-5 h-5"
                          src={`https://static.vecteezy.com/system/resources/previews/017/178/570/original/male-symbol-isolated-icon-on-transparent-background-free-png.png`}
                          alt="logo"
                        />
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <input
                        type="radio"
                        value="Female only"
                        {...register("Preferred_gender", {
                          required: "Please select gender",
                        })}
                      />
                      <p className="flex items-center">
                        Female
                        <img
                          className="w-5 h-5"
                          src={`https://th.bing.com/th/id/R.1aea569e5445749d245b1dafe88aceb1?rik=duC79JxhKgHKSA&riu=httpfemale-symbol-transparent-5.png&ehk=3Nz1Zx0ol8BnZKZZLEarwiLHRGPiQBTA9EkJ%2b2%2b9Y%2bA%3d&risl=&pid=ImgRaw&r=0`}
                          alt="logo"
                        />{" "}
                      </p>
                    </div>
                    <div className="flex gap-1 items-center">
                      <input
                        type="radio"
                        value="Any"
                        {...register("Preferred_gender", {
                          required: "Please select gender",
                        })}
                      />
                      <p>Any </p>
                    </div>
                  </div>
                  {errors.Preferred_gender && (
                    <p className="text-[16px] mt-1 text-red-500">
                      {errors.Preferred_gender.message}
                    </p>
                  )}
                </div>
              </div>

              {preferredGender && (
                <div className="flex mt-5 text-[18px] gap-20">
                  <label
                    className="text-[21px] w-[188px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                    htmlFor="couples_welcome"
                  >
                    Couples Welcome <span className="text-red-500">*</span>
                  </label>
                  <div>
                    <div className="flex gap-4">
                      <div className="flex gap-1 items-center">
                        <input
                          type="radio"
                          value="Yes"
                          {...register("Couples_welcome", {
                            required: "Please select an option",
                          })}
                        />
                        <p>Yes</p>
                      </div>
                      <div className="flex gap-1 items-center">
                        <input
                          type="radio"
                          value="No"
                          {...register("Couples_welcome", {
                            required: "Please select an option",
                          })}
                        />
                        <p>No</p>
                      </div>
                    </div>
                    {errors.Couples_welcome && (
                      <p className="text-[16px] mt-1 text-red-500">
                        {errors.Couples_welcome.message}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-5">
                <label
                  className="text-[18px] w-[266px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                  htmlFor=""
                >
                  Deposit
                </label>
                <span className=" bg-gray-200 items-center justify-center inline-block text-[18px] font-['udemy-regular'] font-bold border border-black/20 px-3 py-2 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50">
                  $
                </span>
                <input
                  type="number"
                  placeholder="Deposit"
                  className="h-100px w-[462px] text-[18px] font-['udemy-regular'] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  {...register("Desposite")}
                />
              </div>
              <div className="mt-5">
                <label
                  className="text-[18px] w-[267px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                  htmlFor=""
                >
                  Is the room/furnished ?
                </label>
                <select
                  className="h-100px w-[500px] text-[18px] font-['udemy-regular'] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  {...register("is_room_furnished")}
                >
                  <option value="">Select</option>
                  <option value="Unfurnished">Unfurnished</option>
                  <option value="Furnished with Bed">
                    Furnished only with Bed
                  </option>
                  <option value="Semi Furnished">Semi Furnished</option>
                  <option value="Fully Furnished">Fully Furnished</option>
                </select>
              </div>

              <div className=" flex mt-5">
                <label
                  className="text-[18px] w-[269px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                  htmlFor=""
                >
                  Amenities include
                </label>

                <div className=" grid grid-cols-4 gap-4 text-[18px] w-[980px]">
                  <div className=" flex gap-1">
                    <input
                      // className="px-3 py-2 text-black mr-1 "
                      value="Gym/Fitness Center"
                      type="checkbox"
                      {...register("Amenities_include")}
                    />
                    <p>Gym/Fitness Center</p>
                  </div>
                  <div className="flex gap-1">
                    <input
                      type="checkbox"
                      value="Swimming Pool"
                      {...register("Amenities_include")}
                    />
                    <p>Swimming Pool</p>
                  </div>
                  <div className=" flex gap-1">
                    <input
                      value="Car Park"
                      type="checkbox"
                      {...register("Amenities_include")}
                    />
                    <p>Car Park</p>
                  </div>
                  <div className=" flex gap-1">
                    <input
                      value="Visitors Parking"
                      type="checkbox"
                      {...register("Amenities_include")}
                    />
                    <p>Visitors Parking</p>
                  </div>
                  <div className=" flex gap-1">
                    <input
                      value="Power Backup"
                      type="checkbox"
                      {...register("Amenities_include")}
                    />
                    <p>Power Backup</p>
                  </div>
                  <div className=" flex gap-1">
                    <input
                      value="Garbage Disposal"
                      type="checkbox"
                      {...register("Amenities_include")}
                    />
                    <p>Garbage Disposal</p>
                  </div>
                  <div className=" flex gap-1">
                    <input
                      value="Private Lawn"
                      type="checkbox"
                      {...register("Amenities_include")}
                    />
                    <p>Private Lawn</p>
                  </div>
                  <div className=" flex gap-1">
                    <input
                      value="Water Heater Plant"
                      type="checkbox"
                      {...register("Amenities_include")}
                    />
                    <p>Water Heater Plant</p>
                  </div>
                  <div className=" flex gap-1">
                    <input
                      value="Security System"
                      type="checkbox"
                      {...register("Amenities_include")}
                    />
                    <p>Security System</p>
                  </div>
                  <div className=" flex gap-1">
                    <input
                      value="Laundry Service"
                      type="checkbox"
                      {...register("Amenities_include")}
                    />
                    <p>Laundry Service</p>
                  </div>
                  <div className=" flex gap-1">
                    <input
                      value="Elevator"
                      type="checkbox"
                      {...register("Amenities_include")}
                    />
                    <p>Elevator</p>
                  </div>
                  <div className=" flex gap-1">
                    <input
                      value="Club House"
                      type="checkbox"
                      {...register("Amenities_include")}
                    />
                    <p>Club House</p>
                  </div>
                </div>
              </div>
              <div className=" flex mt-5 gap-20 text-[18px]">
                <label
                  className="whitespace-nowrap text-[18px] w-[185px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                  htmlFor=""
                >
                  Dietary Preference
                </label>
                <div className=" grid grid-cols-4 gap-4 text-[18px] w-[980px]">
                  <div className="flex gap-1 items-center whitespace-nowrap">
                    <input
                      type="radio"
                      value="Yes,Vegeterian mandatory"
                      {...register("Vegeterian_prefernce")}
                    />
                    <p>Vegeterian</p>
                  </div>
                  <div className=" flex gap-1 items-center">
                    <input
                      type="radio"
                      value="No,Non-veg is ok"
                      {...register("Vegeterian_prefernce")}
                    />
                    <p>Non-Veg</p>
                  </div>
                  <div className="flex gap-1 items-center">
                    <input
                      type="radio"
                      value="Both"
                      {...register("Vegeterian_prefernce")}
                    />
                    <p>Both Ok</p>
                  </div>
                </div>
              </div>
              <div className=" flex gap-20 mt-5 text-[18px]">
                <label
                  className="text-[18px] w-[187px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                  htmlFor=""
                >
                  Smoking Policy
                </label>
                <div className=" grid grid-cols-4 gap-4 text-[18px] w-[980px]">
                  <div className=" flex gap-1 items-center">
                    <input
                      type="radio"
                      value="No Smoking"
                      {...register("Smoking_policy")}
                    />
                    <p>No Smoking</p>
                  </div>
                  <div className=" flex gap-1 items-center">
                    <input
                      type="radio"
                      value="Smoking is ok"
                      {...register("Smoking_policy")}
                    />
                    <p>Smoking is ok</p>
                  </div>
                  <div className=" flex gap-1 items-center">
                    <input
                      type="radio"
                      value="Smoke outside only"
                      {...register("Smoking_policy")}
                    />
                    <p>Smoke outside only</p>
                  </div>
                </div>
              </div>

              <div className=" flex mt-5 text-[18px] gap-20">
                <label
                  className="text-[18px] w-[187px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                  htmlFor=""
                >
                  Pet Friendly
                </label>

                <div className=" grid grid-cols-4 gap-4 text-[18px] w-[980px]">
                  <div className=" flex gap-1 items-center">
                    <input
                      type="radio"
                      value="No Pets"
                      {...register("Pet_friendly")}
                    />
                    <p>No Pets</p>
                  </div>
                  <div className=" flex gap-1 items-center">
                    <input
                      type="radio"
                      value="Only Dogs"
                      {...register("Pet_friendly")}
                    />
                    <p>Only Dogs</p>
                  </div>
                  <div className=" flex gap-1 items-center">
                    <input
                      type="radio"
                      value="Only Cats"
                      {...register("Pet_friendly")}
                    />
                    <p>Only Cats</p>
                  </div>
                  <div className=" flex gap-1 items-center">
                    <input type="radio" {...register("Pet_friendly")} />
                    <p>Any Pet is Ok</p>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <label
                  className="text-[18px] w-[269px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                  htmlFor=""
                >
                  Open House Schedule
                </label>
                <input
                  type="date"
                  placeholder="Open House Date"
                  {...register("Open_house_schedule")}
                  className="font-['udemy-regular'] h-10 w-[500px] text-[18px] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              {/* Imgae  */}

              <div>
                <p className="text-[22px] font-bold mt-2">Upload Photo:-</p>
                <p className="mt-2 text-[18px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Add Photo
                </p>
                <div className=" flex">
                  <input
                    type="file"
                    accept="image/*"
                    id="file"
                    onChange={handleSelectFile}
                    multiple
                  />
                  <div className="image-preview flex ">
                    {files.map((file, index) => (
                      <div className="relative" key={index}>
                        <img
                          className="h-10 w-10 mx-2"
                          src={file.preview}
                          alt={`preview-${index}`}
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(index)}
                          className="absolute top-0 left-0 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                  {/* 
                  {files.length > 0 && (
                    <>
                      {!uploadstats ? (
                        <button
                          type="button"
                          onClick={handleUpload}
                          className=" bg-green-700 py-2 px-3 text-white text-[18px] font-bold rounded-md"
                        >
                          {loading ? "Uploading..." : "Upload"}
                        </button>
                      ) : (
                        <p>uploaded</p>
                      )}
                    </>
                  )} */}
                </div>
              </div>

              <div>
                <p className="text-[22px] mt-5 font-bold">Your Details:-</p>
                <div className="flex items-center">
                  <label
                    className="mt-2 text-[18px] w-[270px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                    htmlFor=""
                  >
                    Name
                  </label>
                  {/* <input
                    type="text"
                    placeholder="Enter Name"
                    {...register("user_name")}
                    className="font-['udemy-regular'] h-10 w-[500px] text-[18px] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  /> */}
                  {<p className="text-[18px]">{fullname}</p>}
                </div>
                <div className="mt-5 flex">
                  <label
                    className="text-[18px] w-[270px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                    htmlFor=""
                  >
                    Email
                  </label>
                  {/* <input
                    type="text"
                    placeholder="Enter Email"
                    {...register("email")}
                    className="font-['udemy-regular'] h-10 w-[500px] text-[18px] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  /> */}
                  <p className="text-[18px]">{profiledata?.email}</p>
                </div>
                <div className="mt-5 text-[18px]">
                  <label
                    className="text-[18px] w-[270px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                    htmlFor=""
                  >
                    Phone Number*
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Number"
                    {...register("phone_number")}
                    defaultValue={profiledata?.phone_number}
                    className="font-['udemy-regular'] h-10 w-[500px] text-[18px] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>
              <div className="flex mt-5">
                <label
                  className="text-[18px] w-[270px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                  htmlFor=""
                >
                  Address <span className=" text-red-500">*</span>
                </label>
                <div>
                  <StandaloneSearchBox
                    onLoad={onLoad}
                    onPlacesChanged={onPlaceChanged}
                  >
                    <input
                      type="text"
                      placeholder="Enter a location"
                      {...register("address")}
                      className="font-['udemy-regular'] h-10 w-[500px] text-[18px] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </StandaloneSearchBox>
                  <input type="hidden" {...register("latitude")} />
                  <input type="hidden" {...register("longitude")} />
                  {/* <input
                    type="text"
                    {...register("address", {
                      required: "Address is required",
                    })}
                    placeholder="Enter Address"
                    className="font-['udemy-regular'] h-10 w-[500px] text-[18px] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  /> */}
                  {/* <p className="text-[16px] mt-1 text-red-500">
                    {" "}
                    {errors.address && <p>{errors.address.message}</p>}
                  </p> */}
                </div>
              </div>

              <div className="flex items-center mt-5 text-[18px]">
                <label
                  className="text-[18px] w-[270px] font-['udemy-regular'] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-block"
                  htmlFor=""
                >
                  Zip code
                </label>
                <div>
                  <input
                    type="text"
                    defaultValue={profiledata?.pin}
                    className="flex h-10 font-['udemy-regular'] w-[500px] text-[18px] border border-black/20 bg-transparent px-3 py-2 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                    placeholder="Enter zipcode"
                    {...register("zip_code")}
                  />
                  <p className="text-[16px] text-red-500 mt-1">
                    {" "}
                    {/* {errors.subarea && <p>{errors.subarea?.message}</p>} */}
                  </p>
                </div>
              </div>
            </div>

            {editdata ? (
              <button
                type="submit"
                className="rounded-md bg-green-800 my-5 mt-0 px-4 py-3 mb-10 text-[19px] self-center font-semibold text-white shadow-sm hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Update Room
              </button>
            ) : (
              <button
                type="submit"
                className="rounded-md bg-green-800 my-5 mt-0 px-4 py-3 mb-10 text-[19px] self-center font-semibold text-white shadow-sm hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Add New Room
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Addrooms;
