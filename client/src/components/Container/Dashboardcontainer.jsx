import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import axios from "axios";
import { UserImage } from "../../store/authslice";
import { GrEdit } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import settings2 from "../../assets/settings2.png";
import Favorites from "../../assets/Favorites.png";
import rooms from "../../assets/rooms.png";
import home from "../../assets/home.png";
import post from "../../assets/post.png";
import bag from "../../assets/bag.png";
import { FaRegShareFromSquare } from "react-icons/fa6";

import stateAbbreviations from "../../Services/StateAprevation/stateAbbreviations.json";

function DashConatiner({ children }) {
  const username = useSelector((state) => state.auth.user);
  const bussinessac = useSelector((state) => state.auth.bussinessac);
  const imgss = useSelector((state) => state.auth.userimg);
  const [bgcolor, setbgcolor] = useState(false);
  const isverified = useSelector((state) => state.auth.isverified);
  const [alertstatus, SetAlertstatus] = useState(true);
  const [data, setdata] = useState([]);
  const [openhamburger, setopenhamburger] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  // console.log(imgss)
  // console.log(username);
  const navigate = useNavigate();
  const { userID } = useParams();
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const handleFileUpload = () => {
    fileInputRef.current.click();
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
      // setuserimg(uploadedImageUrl);
      if (uploadedImageUrl) {
        const formdata = {
          userimg: uploadedImageUrl,
        };
        try {
          const res = await axios.put(
            ` https://api.verydesi.com/user/updateuser/${userID}`,
            formdata,
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
            const newUserImg = res.data.user.userimg;
            dispatch(UserImage({ userimg: newUserImg }));
            const currentData = JSON.parse(localStorage.getItem("userdetails"));
            const updatedData = {
              ...currentData,
              data: {
                ...currentData.data,
                data: {
                  ...currentData.data.data,
                  userimg: newUserImg,
                },
              },
            };
            localStorage.setItem("userdetails", JSON.stringify(updatedData));
          }
        } catch (error) {
          console.log("Error during upload img at database", error);
        }
      }
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

  const handlehamburger = () => {
    setopenhamburger(!openhamburger);
  };

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

  const extractyear = (datastring) => {
    if (!datastring) {
      return 2024;
    }

    const date = new Date(datastring);
    return date.getFullYear();
  };

  useEffect(() => {
    fetchuser();
  }, [userID]);

  return (
    <div className="lg:mt-[9rem] mt-[10rem] overflow-x-hidden overflow-y-hidden mx-auto px-4 flex flex-col max-w-[1600px] h-auto w-full m-auto overflow-hidden font-['udemy-regular']">
      {alertstatus && (
        <div>
          {!data?.isVerified && (
            <div
              role="alert"
              className="rounded border-s-4 border-red-500 bg-red-50 p-4"
            >
              <div className="flex items-start gap-4 ">
                <span className=" text-red-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <div className=" flex-1">
                  <strong className="block font-medium">
                    Verify your email.
                  </strong>
                  <p className="mt-2 text-sm text-red-700">
                    The email was sent
                  </p>
                </div>
                <button
                  onClick={() => SetAlertstatus(false)}
                  className="text-gray-500 transition hover:text-gray-600"
                >
                  <span className="sr-only">Dismiss popup</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="flex lg:flex-row flex-col">
        <div className="border-gray-300 border hidden lg:flex overflow-x-hidden overflow-y-hidden">
          <div className="w-auto bg-white px-3 mt-4 flex flex-col">
            {/* <svg
            class="h-[9rem] w-[242em] text-white hover:text-white mt-2 items-center"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg> */}
            <div className="border w-full p-[1.6rem] self-center justify-center items-center flex flex-col rounded-lg ">
              <div className="relative">
                <img
                  className="rounded-full w-[9.5rem] h-[9.5rem] items-center justify-center cover"
                  src={
                    imgss ||
                    "data:image/png;base64,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"
                  }
                  alt=""
                />
                {/* <div className="absolute bottom-0 right-0">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleimgchange}
              />
              <FiEdit
                size={30}
                className=" text-black hover:text-black cursor-pointer"
                onClick={handleFileUpload}
              />
            </div> */}
              </div>
              <div className="text-center text-black text-[1.1rem]">
                <p className="text-[1.8rem] font-bold">{data.firstName}</p>
                {/* <p className="text-gray-600">{data.address}</p> */}
                <p className="text-gray-600">
                  Since
                  {extractyear(data?.joinedon)}
                </p>
                <p className=" flex gap-1 text-[19px] text-gray-600 mt-1 text-center justify-center items-center">
                  <span>{data.city},</span>
                  <span className=" px-1">
                    {data?.state?.length > 2
                      ? stateAbbreviations[data.state]
                      : data.state}
                  </span>
                </p>

                <div className="flex gap-6 mt-4">
                  <div className="flex flex-col items-center gap-2 text-gray-700">
                    <p className="bg-gray-200 rounded-full w-[3rem] h-[3rem] items-center justify-center flex">
                      <GrEdit size={23} />
                    </p>
                    <p className="text-gray-500 text-[0.9rem]">Edit Profile</p>
                  </div>
                  <div className="flex flex-col items-center gap-2 text-gray-700">
                    <div className="bg-gray-200 rounded-full cursor-pointer w-[3rem] h-[3rem] items-center justify-center flex">
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleimgchange}
                      />
                      <CgProfile size={30} onClick={handleFileUpload} />
                    </div>

                    <p className="text-gray-500 text-[0.9rem]">Add Photo</p>
                  </div>
                  <div className="flex flex-col items-center gap-2 text-gray-700">
                    <p className="bg-gray-200 rounded-full w-[3rem] h-[3rem] items-center justify-center flex">
                      <FaRegShareFromSquare size={23} />
                    </p>
                    <p className="text-gray-500 text-[0.9rem]">Share</p>
                  </div>
                </div>
                {/* <p>{Date.now()}</p> */}
              </div>
            </div>
            <div className="flex flex-col mt-2">
              <button
                onClick={() => {
                  setbgcolor(true);
                  navigate(`/myaccount/${userID}`);
                }}
                className="bg-transparent rounded-md py-1 px-4 w-full flex gap-4 items-center hover:bg-gray-200 text-black leading-8 self-start mt-2 capitalize text-[1.1rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visibl2:outline-black "
              >
                {/* <FaHome size={20} /> */}
                <img
                  className="w-[1.7rem] h-[1.7rem]"
                  src={home}
                  alt="logo"
                />{" "}
                Dashboard
              </button>
              <hr className="mt-2"></hr>
              <button
                onClick={() => {
                  setbgcolor(true);
                  navigate(`/dashboard/profile/${userID}`);
                }}
                className="bg-transparent rounded-md py-1 px-4 w-full flex gap-4 items-center hover:bg-gray-200 text-black leading-8 self-start mt-2 capitalize text-[1.1rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visibl2:outline-black "
              >
                {/* <FaUserPen size={25} /> Setting */}
                <img
                  className="w-[1.7rem] h-[1.7rem]"
                  src={settings2}
                  alt="logo"
                />
                Setting
            </button>
              <hr className="mt-2"></hr>
              <button
                onClick={() => {
                  setbgcolor(true);
                  navigate(`/dashboard/wishlist/${userID}`);
                }}
                className="bg-transparent rounded-md py-1 px-4 w-full flex gap-4 items-center hover:bg-gray-200 text-black leading-8 self-start mt-2 capitalize text-[1.1rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visibl2:outline-black "
              >
                {/* <FaHeart size={20} /> Favorites */}
                <img
                  className="w-[1.7rem] h-[1.7rem]"
                  src={Favorites}
                  alt="logo"
                />
                Favorites
              </button>
              <hr className="mt-2"></hr>
              <details
                className="group [&_summary::-webkit-details-marker]:hidden"
                open
              >
                <summary className="bg-transparent rounded-md py-1 px-4 w-full flex gap-4 items-center hover:bg-gray-200 text-black leading-8 self-start mt-2 capitalize text-[1.1rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visibl2:outline-black ">
                  {/* <BsPostcardHeartFill size={20} /> */}
                  <img
                    className="w-[1.7rem] h-[1.7rem]"
                    src={post}
                    alt="logo"
                  />{" "}
                  <h2 className="font-medium">My Post</h2>
                  <svg
                    className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>

                <button
                  onClick={() => {
                    navigate(`/user/room/${userID}`);
                  }}
                  className="mt-2 px-4 leading-relaxed rounded-md bg-transparent w-full items-center whitespace-nowrap flex gap-4 self-start capitalize text-[1.1rem] text-black hover:text-[#232f3e] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visibl2:outline-black "
                >
                  <img
                    className="w-[1.7rem] h-[1.7rem]"
                    src={rooms}
                    alt="logo"
                  />{" "}
                  {/* <MdMeetingRoom size={22} /> */}
                  My Rooms
                </button>
                <button className="mt-1 px-4 leading-relaxed rounded-md bg-transparent w-full items-center whitespace-nowrap flex gap-4 self-start capitalize text-[1.1rem] text-black hover:text-[#232f3e] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visibl2:outline-black ">
                  {/* <MdBusinessCenter size={20} /> My Business */}
                  <img
                    className="w-[1.5rem] h-[1.5rem]"
                    src={bag}
                    alt="logo"
                  />{" "}
                  My Business
                </button>
              </details>
              <hr className="mt-2"></hr>

              {/* <button
              onClick={() => {
                navigate(`/user/room/${userID}`);
              }}
              className="bg-transparent rounded-md py-1 px-4 w-full flex gap-3 items-center hover:bg-gray-200 text-black leading-8 self-start mt-2 capitalize text-[1.1rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visibl2:outline-black "
            >
              My Rooms
            </button> */}
              {bussinessac == "yes" && (
                <>
                  <button
                    onClick={() => {
                      navigate(`/user/job/${userID}`);
                    }}
                    className="bg-transparent rounded-md py-1 px-4 w-full flex gap-3 items-center hover:bg-gray-200 text-black leading-8 self-start mt-2 capitalize text-[1.1rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visibl2:outline-black "
                  >
                    Jobs
                  </button>
                  <button
                    onClick={() => {
                      // navigate(`/user/job/${userID}`);
                    }}
                    className="rounded-md bg-transparent px-9 py-1 capitalize text-[22px] text-white hover:text-[#0b5e86] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visibl2:outline-black"
                  >
                    Events
                  </button>
                  <button
                    onClick={() => {
                      // navigate(`/user/job/${userID}`);
                    }}
                    className="rounded-md bg-transparent px-9 py-1 capitalize text-[22px] text-white hover:text-[#0b5e86] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visibl2:outline-black"
                  >
                    Movies
                  </button>
                  <button
                    onClick={() => {
                      navigate(`/user/bussiness/${userID}`);
                    }}
                    className="rounded-md bg-transparent px-9 py-1 capitalize text-[22px] text-white hover:text-[#0b5e86] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visibl2:outline-black"
                  >
                    Bussiness
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        <main className="w-auto lg:w-4/5 h-auto border overflow-scroll overflow-x-hidden overflow-y-hidden mt-3 lg:mt-0">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashConatiner;
