import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ChildContainer,
  LeafletMap,
  LeafletMap2,
  ShareComponent,
} from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { BiSolidMessageRounded } from "react-icons/bi";
import { GiWashingMachine } from "react-icons/gi";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { FaShare } from "react-icons/fa";
import Conractform from "../Contactform/Conractform";
import Roomcardforsimilar from "./Roomcardforsimilar";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LuPhoneCall } from "react-icons/lu";
import femaleLogo from "../../../assets/female.png";
import maleLogo from "../../../assets/male.jpeg";
import { CgSmartHomeWashMachine } from "react-icons/cg";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Loader from "../../../components/UserCompontents/Loader";
import { MdErrorOutline } from "react-icons/md";
import { amenityIcons } from "../../../constants/Index";
import { FaEdit } from "react-icons/fa";
import stateAbbreviations from "../../../Services/StateAprevation/stateAbbreviations.json";
import { getScreenSizeHook } from "../../../../Hooks/GetScreenSizeHook";
import { modalopen } from "../../../store/modalslice";
import { minuscart, pluscart } from "../../../store/cartslice";
import Alert from "../../../components/UserCompontents/Alert/Alert";

function Rooms() {
  const { _id } = useParams();
  const [rooms, setrooms] = useState([]);
  const [similarrooms, setsimilarrooms] = useState([]);
  const [locationsndString, setLocationsndString] = useState("");
  const [contactdet, setcontachdet] = useState(false);
  const [posteddate, setposteddate] = useState("");
  const authstatus = useSelector((state) => state.auth.status);
  const currentloc = useSelector((state) => state.auth.location);
  const usrid = useSelector((state) => state.auth.userID);
  const [wishliststatys, setWishlistStatus] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const [hasNextRoom, setHasNextRoom] = useState(true);
  const [hasPreviousRoom, setHasPreviousRoom] = useState(true);
  const [userstatus, setuserstatus] = useState(false);
  const [toast, setToast] = useState({ isOpen: false, type: "", text: "" });

  // console.log(usrid);

  const url = `https://verydesi.com/rooms/${_id}`;
  const fetchroomdetails = async () => {
    try {
      const res = await axios.get(
        `https://api.verydesi.com/api/getspecificroom/${_id}`
      );
      setrooms(res.data.rooms);
      // console.log(res.data.rooms);
      const loc = {
        lat: res.data.rooms.location.coordinates[1],
        lng: res.data.rooms.location.coordinates[0],
      };
      const date = res.data.rooms.postedon
        ? new Date(res.data.rooms.postedon).toISOString().split("T")[0]
        : "";
      setposteddate(date);
      // console.log("locationsnd", locationString);
      setLocationsndString(loc);
      if (res.data.rooms.UserId === usrid) {
        setuserstatus(true);
      } else {
        setuserstatus(false);
      }
    } catch (error) {
      console.log("error during fetching api", error);
    }
  };
  useEffect(() => {
    fetchroomdetails();
    setHasNextRoom(true);
    setHasPreviousRoom(true);
    window.scrollTo(0, 0);
  }, [_id]);

  const handlecopy = () => {
    alert("Link Copied");
  };
  const getRooms = async () => {
    try {
      const res = await axios.get(
        `https://api.verydesi.com/api/getallrooms?lat=${currentloc.lng}&lng=${currentloc.lat}`
      );
      setsimilarrooms(res.data.Allrooms);
      // console.log(res.data.Allrooms);
    } catch (error) {
      console.log("error during fetching api", error);
    }
  };
  useEffect(() => {
    getRooms();
  }, [rooms]);

  const fetchPreviousRoom = async () => {
    try {
      const res = await axios.get(
        `https://api.verydesi.com/api/rooms/${_id}/next`
      );
      if (res.data.nextRoom) {
        navigate(`/rooms/${res.data.nextRoom._id}`);
      } else {
        setHasNextRoom(false);
      }
    } catch (error) {
      console.error("Error fetching next room:", error);
    }
  };

  const fetchNextRoom = async () => {
    try {
      const res = await axios.get(
        `https://api.verydesi.com/api/rooms/${_id}/previous`
      );
      if (res.data.previousRoom) {
        navigate(`/rooms/${res.data.previousRoom._id}`);
      } else {
        setHasPreviousRoom(false);
      }
    } catch (error) {
      console.error("Error fetching previous room:", error);
    }
  };

  function truncateWords(str, numWords) {
    const words = str.split(" ");

    const truncated = words.slice(0, numWords).join(" ");

    if (words.length > numWords) {
      return truncated + "...";
    }

    return truncated;
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const renderRooms = () => {
    return similarrooms
      .slice(0, 3)
      .map((item) => <Roomcardforsimilar {...item} key={item._id} />);
  };

  const [isloginmodalopen, setloginmodeopen] = useState(false);
  const screenSize = getScreenSizeHook();
  const isMobile = screenSize.windowSize.width < 800;

  const handleloginmodelopen = () => {
    if (authstatus) {
      setloginmodeopen(true);
    } else {
      toast.info("login to contact");
    }
  };

  const isloginmodelclose = () => {
    setloginmodeopen(false);
  };

  // console.log(rooms._id);
  const showToast = (type, text) => {
    setToast({ isOpen: false });
    setTimeout(() => {
      setToast({ isOpen: true, type, text });
    }, 100);
  };
  const makewishlist = async () => {
    try {
      const dat = { roomId: _id, status: true };
      const res = await axios.post(
        `https://api.verydesi.com/api/addtowish`,
        dat,
        {
          headers: {
            jwttoken: `${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (
        res.data.msg === "Successfully added to wishlist" ||
        res.data.msg === "Successfully updated"
      ) {
        dispatch(pluscart());

        setWishlistStatus(true);
        showToast("success", "Added to Favorites.");
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const unwish = async () => {
    try {
      const dat = { roomId: _id, status: false };
      const res = await axios.post(
        `https://api.verydesi.com/api/addtowish`,
        dat,
        {
          headers: {
            jwttoken: `${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (
        res.data.msg === "Successfully removed" ||
        res.data.msg === "Wishlist cleared"
      ) {
        dispatch(minuscart());
        setWishlistStatus(false);
        showToast("unsuccess", "Removed from Favorites.");
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  useEffect(() => {
    const fetchWishStatus = async () => {
      try {
        const res = await axios.get(
          `https://api.verydesi.com/api/getlistbyroom/${_id}`,
          {
            headers: {
              jwttoken: `${token}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (res.data.status === "not found") {
          setWishlistStatus(false);
        } else {
          setWishlistStatus(res.data.status);
        }
      } catch (error) {
        console.error("Error during fetching wishlist status:", error);
      }
    };

    fetchWishStatus();
  }, [_id, token]);

  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);

  const toggleSharePopup = () => {
    setIsSharePopupOpen(!isSharePopupOpen);
  };
  const toggleSharePopupclose = () => {
    setIsSharePopupOpen(false);
  };

  if (!rooms || !rooms.Imgurl) {
    return <Loader className={"h-screen flex justify-center items-center"} />;
  }

  const images = rooms?.Imgurl?.map((url) => ({
    original: url,
    thumbnail: url,
    renderItem: (item) => (
      <div className="image-gallery-image">
        <img
          src={item?.original}
          alt=""
          className="lg:h-[560px] w-[880px] rounded-md object-cover"
        />
      </div>
    ),
  }));

  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");

    if (cleaned.length >= 10) {
      const part1 = cleaned.slice(0, 3);
      const part2 = cleaned.slice(3, 5);
      const part3 = cleaned.slice(5, 9);

      return `(${part1}) ${part2} - ${part3}`;
    }

    return phoneNumber;
  };

  return (
    <div className="lg:mt-[4.4rem] mt-[9.4rem] h-full w-full max-w-[1600px] mx-auto capitalize">
      {toast.isOpen && (
        <Alert
          type={toast.type}
          text={toast.text}
          close={() => setToast({ isOpen: false, type: "", text: "" })}
        />
      )}
      <Conractform isOpen={isloginmodalopen} onClose={isloginmodelclose} />
      <div className="  w-full mx-auto px-4 py-2 mt-0 lg:mt-10 font-['udemy-regular']">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1 py-1 text-xl text-gray-600">
            <li>
              <Link to="/" className="block transition hover:text-gray-700">
                <span className="sr-only"> Home </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </Link>
            </li>

            <li className="rtl:rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </li>

            <li>
              <p className="block transition hover:text-gray-700">Rooms</p>
            </li>
          </ol>
        </nav>
        <div className="flex items-start w-full justify-between lg:flex-row mb-5 lg:mb-0">
          <div className=" flex gap-3">
            <div>
              {hasNextRoom ? (
                <div className="">
                  <div
                    className="text-center flex gap-3"
                    onClick={fetchPreviousRoom}
                    disabled={!hasNextRoom}
                  >
                    <button className="p-1 lg:px-2 rounded-xl flex bg-red-600 hover:bg-red-700 text-[19px] items-center text-white shadow-sm shadow-[#000] mb-3 gap-3 hover:shadow-lg">
                      <MdKeyboardDoubleArrowLeft className="text-white flex lg:w-10 lg:h-10 w-7 h-7" />
                      <button
                        // type="submit"
                        // disabled={!hasPreviousRoom}
                        className="flex lg:text-[22px] text-[17px] items-center text-white font-bold px-2 pl-0"
                      >
                        PREV
                      </button>
                    </button>
                  </div>
                </div>
              ) : (
                <p></p>
              )}
            </div>
            <div>
              {hasPreviousRoom ? (
                <div
                  className="flex justify-end"
                  onClick={fetchNextRoom}
                  disabled={!hasPreviousRoom}
                >
                  <button className="p-1 lg:px-2 rounded-xl flex bg-blue-600 hover:bg-blue-700 text-[19px] items-center text-white shadow-sm shadow-[#000] mb-3 gap-3 hover:shadow-lg">
                    <button
                      // type="submit"
                      className="flex lg:text-[22px] text-[17px] items-center text-white font-bold"
                    >
                      NEXT
                    </button>
                    <MdKeyboardDoubleArrowRight
                      // size={45}
                      className="text-white flex lg:w-10 lg:h-10 w-7 h-7"
                    />
                  </button>
                </div>
              ) : (
                <p></p>
              )}
            </div>
          </div>

          <div className="flex gap-4 items-center ml-1 lg:ml-0">
            <div className="gap-3 flex">
              {authstatus ? (
                <div>
                  {!wishliststatys ? (
                    <div
                      className="cursor-pointer p-2 bg-gray-600 hover:bg-red-600 rounded-full shadow-lg shadow-gray-500 hover:shadow-gray-800"
                      onClick={makewishlist}
                    >
                      <FaHeart
                        className="flex lg:w-7 lg:h-7 w-5 h-5"
                        color="#fff"
                        // size={30}
                      />
                    </div>
                  ) : (
                    <div
                      className="cursor-pointer p-2 border border-gray-300 rounded-full bg-red-600 "
                      onClick={unwish}
                    >
                      <FaHeart
                        className=" flex lg:w-7 lg:h-7 w-5 h-5"
                        color="#fff"
                        // size={30}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div
                  className="cursor-pointer p-2 border border-gray-300 rounded-full bg-red-600"
                  onClick={() => {
                    toast.info("please login");
                  }}
                >
                  <FaHeart
                    className=" flex lg:w-7 lg:h-7 w-5 h-5"
                    color="#fff"
                    // size={30}
                  />
                </div>
              )}

              <button
                type="submit"
                onClick={toggleSharePopup}
                className="text-black hover:text-white rounded-md justify-between bg-gray-400 hover:bg-gray-900 gap-3 px-5 lg:py-2 py-1 text-[17px] lg:text-[19px] flex items-center shadow-lg shadow-gray-500 hover:shadow-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                <FaShare className="flex lg:w-5 lg:h-5 w-4 h-4" />
                <p>Share</p>
              </button>

              {isSharePopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                  <div className="bg-white rounded-lg shadow-lg">
                    <ShareComponent
                      url={url}
                      title="Room title"
                      onClose={toggleSharePopupclose}
                    />
                    {/* <button
                      onClick={toggleSharePopup}
                      className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 focus:outline-none"
                    >
                      Close
                    </button> */}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex-col lg:flex-row flex text-[25px]">
          <div>
            {rooms.Imgurl.length > 0 ? (
              <ImageGallery
                items={images}
                showPlayButton={false}
                showFullscreenButton={false}
                showBullets={true}
                showThumbnails={false}
              />
            ) : (
              <img
                src={
                  "https://res.cloudinary.com/druohnmyv/image/upload/v1723819322/assests/tss6j8gnbbccyxwgxzzx.png"
                }
                alt="not"
                className="lg:h-[560px] lg:w-[880px] rounded-md object-contain"
              />
            )}
          </div>
          <div className="px-0 lg:px-3 font-['udemy-regular'] lg:ml-7 ml-0 flex flex-col gap-3 w-auto lg:w-[660px]">
            <div className="">
              <div className="flex justify-between">
                <p className="font-bold flex gap-3">
                  <div className="text-[1.2rem] lg:text-[30px]">
                    <div className="flex gap-1 font-bold mt-3 lg:mt-0">
                      <p className="text-[1.5rem] lg:text-[27px] capitalize">
                        {rooms.Title}
                      </p>
                    </div>
                  </div>
                </p>
                {userstatus && (
                  <button
                    className="flex items-center text-black gap-3 text-[1.2rem] lg:text-[24px]"
                    onClick={(e) => {
                      // e.preventDefault();
                      // window.open(`/room/editroom/${_id}`, "_blank");
                      navigate(`/room/editroom/${_id}`);
                    }}
                  >
                    <FaEdit /> Edit
                  </button>
                )}
              </div>
              <div className="flex justify-between my-2">
                <p className="text-[25px] capitalize flex gap-1">
                  {rooms.city},
                  <p>
                    {rooms?.state?.length > 2
                      ? stateAbbreviations[rooms?.state]
                      : rooms.state}
                  </p>
                </p>
                <p className="text-green-700 font-bold capitalize">
                  $ {rooms.Expected_Rooms}
                </p>
              </div>
              <div>
                <p className=" text-xl capitalize">By {rooms.user_name}</p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-[1.2rem] lg:text-[25px]">
                {
                  <div className="flex ">
                    <img
                      className="h-9 w-9"
                      src={
                        "https://res.cloudinary.com/druohnmyv/image/upload/v1723819325/assests/zneulaispaafq6pzowd5.png"
                      }
                      alt=""
                    />
                    <p className="px-2">{rooms.Propertytype}</p>
                  </div>
                }
                <div
                  className={`flex ${
                    authstatus && "flex-row-reverse"
                  } justify-between `}
                >
                  <button
                    type="button"
                    onClick={() => {
                      if (authstatus) {
                        handleloginmodelopen();
                      } else {
                        dispatch(modalopen({ isloginmodalopen: true }));
                      }
                    }}
                    className="flex lg:gap-3 gap-[0.5px] self-center rounded-md bg-green-800 px-5 lg:py-4 py-3 lg:text-[1rem] text-[18px] text-white shadow-sm hover:bg-green-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                  >
                    <LuPhoneCall size={25} />
                    <span class="items-center justify-center">
                      Get In touch
                    </span>
                  </button>
                </div>
              </div>
              {locationsndString ? (
                <div className="mt-2 rounded-md">
                  <LeafletMap2
                    className="w-[9rem] rounded-md"
                    onLocationReceived={locationsndString}
                    style={{
                      height: "350px",
                      width: isMobile ? "100%" : "640px",
                    }}
                  />
                </div>
              ) : (
                <div>
                  <p className="font-['udemy-regular']">Loading</p>
                </div>
              )}
            </div>
            <div
              className={`flex ${
                authstatus && "flex-row-reverse"
              } justify-between mt-4`}
            ></div>
          </div>
        </div>
        {/* <div className="flex gap-1 text-[25px] font-bold mt-2">
          <MdInsertComment size={35} />
        </div> */}
        <div className="border mt-2 rounded-md">
          <h1 className="text-[#000] text-[25px] flex gap-3 py-2 items-center border-b">
            <p className=" text-[20px] ml-5">Description -</p>
          </h1>
          <p className=" text-[18px] text-gray-600 text-justify px-5 py-4 capitalize break-words">
            {rooms.Description}
          </p>
        </div>
        {/* <h1 className="text-[#0b5e86] text-[29px] font-bold items-center flex gap-3 mt-4"><PiClipboardTextFill size={40}/>Details for the Room-</h1> */}
        <div className="text-[22px] text-gray-500 justify-between max-w-[1600px] gap-3">
          <div className="border mt-3 rounded-md">
            <h1 className="text-[#000] text-[20px] flex gap-3 py-2 items-center border-b">
              <p className="ml-5"> More Info About Room -</p>
            </h1>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 px-5 py-3">
              <div className="flex gap-3 items-center">
                {/* <BsBuildingsFill className="" size={35} /> */}
                <img
                  className="h-9 w-9"
                  src={
                    "https://res.cloudinary.com/druohnmyv/image/upload/v1723819325/assests/zneulaispaafq6pzowd5.png"
                  }
                  alt=""
                />
                <div className="flex">
                  <p className="text-gray-500 text-[20px]">
                    Property Type
                    <p className="text-black flex text-[18px]">
                      {rooms.Propertytype || "Not Available"}
                    </p>
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                {/* <FaMapMarkerAlt className="" size={35} /> */}
                <img
                  className="h-9 w-9"
                  src={
                    "https://res.cloudinary.com/druohnmyv/image/upload/v1723819320/assests/lesvajdewhwtq2hja4ta.png"
                  }
                  alt=""
                />
                <div className="flex">
                  <p className="text-gray-500 text-[20px]">
                    City
                    <p className="text-black flex text-[18px]">{rooms.city}</p>
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                {/* <MdOutlineTimer className="" size={35} /> */}
                <img
                  className="h-9 w-9"
                  src={
                    "https://res.cloudinary.com/druohnmyv/image/upload/v1723819325/assests/zrtjmdv3unizy9kc4efj.png"
                  }
                  alt=""
                />

                <div className="flex">
                  <p className="text-gray-500 text-[20px]">
                    Stay/Lease
                    <p className="text-black flex text-[18px]">
                      {rooms.Stay_lease || "Not Available"}
                    </p>
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                {/* <LuClock10 size={35} /> */}
                <img
                  className="h-9 w-9"
                  src={
                    "https://res.cloudinary.com/druohnmyv/image/upload/v1723819315/assests/yab7dkq4ewer1lqj5bzw.png"
                  }
                  alt=""
                />
                <div className="flex">
                  <p className="text-gray-500 text-[20px]">
                    Avaliblity From
                    <p className="text-black flex text-[18px] break-all">
                      {rooms?.Avaliblity_from
                        ? new Date(rooms.Avaliblity_from).toLocaleDateString(
                            "en-US",
                            {
                              month: "2-digit",
                              day: "2-digit",
                              year: "numeric",
                            }
                          )
                        : "Immediate"}
                    </p>
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                {/* <LuClock3 size={35} /> */}
                <img
                  className="h-9 w-9"
                  src={
                    "https://res.cloudinary.com/druohnmyv/image/upload/v1723819315/assests/yab7dkq4ewer1lqj5bzw.png"
                  }
                  alt=""
                />
                <div className="flex">
                  <p className="text-gray-500 text-[20px]">
                    Available To
                    <p className="text-black flex text-[18px] break-all">
                      {rooms?.Available_to
                        ? new Date(rooms.Available_to).toLocaleDateString(
                            "en-US",
                            {
                              month: "2-digit",
                              day: "2-digit",
                              year: "numeric",
                            }
                          )
                        : "Immediate"}
                    </p>
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                {/* <IoToday size={35} /> */}
                <img
                  className="h-9 w-9"
                  src={
                    "https://res.cloudinary.com/druohnmyv/image/upload/v1723819324/assests/ykhntfquuh4c9jcr6tt7.png"
                  }
                  alt=""
                />
                <div className="flex">
                  <p className="text-gray-500 text-[20px]">
                    Day Available
                    <p className="text-black flex text-[18px]">
                      {rooms.Day_Available || "Not Available"}
                    </p>
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                {/* <FaBath size={35} /> */}
                <img
                  className="h-9 w-9"
                  src={
                    "https://res.cloudinary.com/druohnmyv/image/upload/v1723819314/assests/f5kwtmcletn80cos5jdf.png"
                  }
                  alt=""
                />
                <div className="flex">
                  <p className="text-gray-500 text-[20px]">
                    Attachted Bath
                    <p className="text-black flex text-[18px]">
                      {rooms.Attchd_Bath || "Not Available"}
                    </p>
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                {/* <BsGenderTrans size={35} /> */}
                <img
                  className="h-9 w-9"
                  src={
                    "https://res.cloudinary.com/druohnmyv/image/upload/v1723819318/assests/eaothlg3pgktke4bwcjn.png"
                  }
                  alt=""
                />
                <div className="flex">
                  <p className="text-gray-500 text-[20px]">
                    Preferred Gender
                    <p className="text-black flex text-[18px]">
                      {rooms.Preferred_gender || "Not Available"}
                    </p>
                  </p>
                </div>
              </div>
              {/* <div className="flex gap-3 items-center"><MdOutlineMeetingRoom size={35}/><div className="flex">
            <p className="text-gray-500 text-[20px]">Expected Rooms
            <p className="text-black flex">1</p>
            </p></div></div> */}
              <div className="flex gap-3 items-center">
                {/* <MdOutlinePriceChange size={35} /> */}{" "}
                <img
                  className="h-9 w-9"
                  src={
                    "https://res.cloudinary.com/druohnmyv/image/upload/v1723819323/assests/gbitwpzwnzlbilwykv1t.png"
                  }
                  alt=""
                />
                <div className="flex">
                  <p className="text-gray-500 text-[20px]">
                    Pricemodel
                    <p className="text-black flex text-[18px]">
                      {rooms.Pricemodel || "Not Available"}
                    </p>
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                {/* <RiMoneyDollarCircleFill size={35} /> */}
                <img
                  className="h-9 w-9"
                  src={
                    "https://res.cloudinary.com/druohnmyv/image/upload/v1723819314/assests/ixjbbnuet0gmrwbiiftf.png"
                  }
                  alt=""
                />
                <div className="flex">
                  <p className="text-gray-500 text-[20px]">
                    Deposit
                    <p className="text-black flex text-[18px]">
                      $ {rooms.Desposite || "Not Available"}
                    </p>
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                {/* <MdBedroomParent size={35} /> */}
                <img
                  className="h-9 w-9"
                  src={
                    "https://res.cloudinary.com/druohnmyv/image/upload/v1723819317/assests/lpw6k7vesuhd4kaipta8.png"
                  }
                  alt=""
                />
                <div className="flex">
                  <p className="text-gray-500 text-[20px]">
                    Is Room Furnished
                    <p className="text-black flex text-[18px]">
                      {rooms.is_room_furnished || "Not Available"}
                    </p>
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                {/* <GrDocumentTime size={35} /> */}
                <img
                  className="h-9 w-9"
                  src={
                    "https://res.cloudinary.com/druohnmyv/image/upload/v1723819324/assests/ykhntfquuh4c9jcr6tt7.png"
                  }
                  alt=""
                />
                <div className="flex">
                  <p className="text-gray-500 text-[20px]">
                    Open House Schedule
                    <p className="text-black flex text-[18px] break-all">
                      {rooms?.Open_house_schedule
                        ? new Date(
                            rooms.Open_house_schedule
                          ).toLocaleDateString("en-US", {
                            month: "2-digit",
                            day: "2-digit",
                            year: "numeric",
                          })
                        : "Immediate"}
                    </p>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="border mt-3 rounded-md">
            <h1 className="text-[#000] text-[20px] flex gap-3 py-2 items-center border-b">
              <p className="ml-5">Utilities Included -</p>
            </h1>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 px-5 py-3 text-[20px] text-gray-500 items-center">
              <div className="flex gap-3 items-center">
                <img
                  className="h-9 w-9"
                  src={
                    "https://res.cloudinary.com/druohnmyv/image/upload/v1725974351/1683015_kd8zal.png"
                  }
                  alt=""
                />
                <div className="flex">
                  <p className="text-black flex text-[18px]">Water </p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <img
                  className="h-9 w-9"
                  src={
                    "https://res.cloudinary.com/druohnmyv/image/upload/v1725974543/1864126_jerf1w.png"
                  }
                  alt=""
                />
                <div className="flex">
                  <p className="text-black flex text-[18px]">Wi-Fi </p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <img
                  className="h-9 w-9"
                  src={
                    "https://res.cloudinary.com/druohnmyv/image/upload/v1725974806/222506_x4nnoe.png"
                  }
                  alt=""
                />
                <div className="flex">
                  <p className="text-black flex text-[18px]">Electricity </p>
                </div>
              </div>
            </div>
          </div>

          {rooms.Amenities_include.length > 1 && (
            <div className="border mt-3 rounded-md">
              <h1 className="text-[#000] text-[20px] flex gap-3 py-2 items-center border-b">
                <p className="ml-5"> Amenities Included -</p>
              </h1>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 px-5 py-3 text-black text-[18px] items-center">
                {rooms?.Amenities_include?.map((amenity) => {
                  const IconComponent = amenityIcons[amenity];
                  return (
                    <div key={amenity} className="flex gap-3 items-center">
                      {IconComponent && (
                        // <IconComponent className="amenity-icon" size={30} />
                        <img src={IconComponent} className="h-9 w-9" alt="" />
                      )}
                      <p>{amenity}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          <div className="border mt-3 rounded-md">
            <h1 className="text-[#000] text-[20px] flex gap-3 py-2 items-center border-b">
              <p className="ml-5"> Additional Information -</p>
            </h1>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 px-5 py-3">
              <div className="flex gap-3 items-center">
                {/* <BiFoodTag size={35} /> */}
                <img
                  className="h-9 w-9"
                  src={
                    "https://res.cloudinary.com/druohnmyv/image/upload/v1723819315/assests/mlosfdjqkz3nvnfuhkjb.png"
                  }
                  alt=""
                />
                <div className="flex">
                  <p className="text-gray-500 text-[20px]">
                    Dietary Preference
                    <p className="text-black flex text-[18px]">
                      {rooms.Vegeterian_prefernce}
                    </p>
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                {/* <FaSmoking size={35} /> */}
                <img
                  className="h-9 w-9"
                  src={
                    "https://res.cloudinary.com/druohnmyv/image/upload/v1723819325/assests/vedl4zyyodlvjagqaz6v.png"
                  }
                  alt=""
                />
                <div className="flex">
                  <p className="text-gray-500 text-[20px]">
                    Smoking Policy
                    <p className="text-black flex text-[18px]">
                      {rooms.Smoking_policy}
                    </p>
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                {/* <MdPets size={35} /> */}
                <img
                  className="h-9 w-9"
                  src={
                    "https://res.cloudinary.com/druohnmyv/image/upload/v1723819315/assests/n0koqmlpu1kbdzkj50tk.png"
                  }
                  alt=""
                />
                <div className="flex">
                  <p className="text-gray-500 text-[20px]">
                    Pet Friendly
                    <p className="text-black flex text-[18px]">
                      {rooms.Pet_friendly}
                    </p>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="border mt-3 rounded-md">
            <h1 className="text-[#000] text-[20px] flex gap-3 py-2 items-center border-b">
              <p className="ml-5">User Details -</p>
              {!authstatus && (
                <span
                  onClick={() => {
                    dispatch(modalopen({ isloginmodalopen: true }));
                  }}
                  className="text-red-600 text-[20px] items-center text-center capitalize flex gap-1"
                >
                  <MdErrorOutline />
                  <p className=" cursor-pointer">Login To See Details</p>
                </span>
              )}
            </h1>
            {authstatus && (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 px-5 py-3">
                <div className="flex gap-3 items-center">
                  {/* <FaUserAlt size={35} /> */}
                  <img
                    className="h-9 w-9"
                    src={
                      "https://res.cloudinary.com/druohnmyv/image/upload/v1723819321/assests/xvg4sjgqjgjilynyxs0a.png"
                    }
                    alt=""
                  />
                  <div className="flex">
                    <p className="text-gray-500 text-[20px]">
                      Name
                      <p className="text-black flex text-[18px]">
                        {rooms.user_name}
                      </p>
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  {/* <FaPhoneVolume size={35} /> */}
                  <img
                    className="h-9 w-9"
                    src={
                      "https://res.cloudinary.com/druohnmyv/image/upload/v1723819322/assests/fljdbb2rrycts9fmradi.png"
                    }
                    alt=""
                  />
                  <div className="flex">
                    <p className="text-gray-500 text-[20px]">
                      Phone Number
                      <p className="text-black flex text-[18px]">
                        <a
                          href={`tel:${rooms.phone_number}`}
                          className="text-black"
                        >
                          {/* {rooms.phone_number} */}
                          {formatPhoneNumber(rooms.phone_number)}
                        </a>
                      </p>
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-center">
                  {/* <MdOutlineEmail size={35} /> */}
                  <img
                    className="h-8 w-8"
                    src={
                      "https://res.cloudinary.com/druohnmyv/image/upload/v1723819316/assests/mt0cax1frqy37toddlr6.png"
                    }
                    alt=""
                  />
                  <div className="flex flex-col">
                    <p className="text-gray-500 text-[20px]">
                      Email
                      <p className="text-blue-600 flex text-[18px] lowercase">
                        <a
                          href={`mailto:${rooms.email}`}
                          className="hover:underline"
                        >
                          {rooms.email}
                        </a>
                      </p>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mt-4 mb-2 capitalize">
          <div className="mt-2 flex items-center ">
            <div className=" flex justify-between w-full text-[23px] font-['udemy-regular'] text-black font-bold">
              <p>Similar room In The Area</p>
              <p
                className=" cursor-pointer"
                onClick={() => {
                  navigate("/rooms");
                }}
              >
                See full list of Rooms
              </p>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:mt-5 xl:grid-cols-3 xl:gap-8">
            {renderRooms()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rooms;
