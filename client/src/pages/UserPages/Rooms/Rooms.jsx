import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ChildContainer,
  LeafletMap,
  LeafletMap2,
  ShareComponent,
} from "../../../components";
import { useSelector } from "react-redux";
import CopyToClipboard from "react-copy-to-clipboard";
import Roomcard from "./Roomcard";
import { IoIosShareAlt } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { BiSolidMessageRounded } from "react-icons/bi";
import { GiWashingMachine } from "react-icons/gi";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { FaShare } from "react-icons/fa";
import Conractform from "../Contactform/Conractform";
import Roomcardforsimilar from "./Roomcardforsimilar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LuPhoneCall } from "react-icons/lu";
import femaleLogo from "../../../assets/female.png";
import maleLogo from "../../../assets/male.jpeg";
import { CgSmartHomeWashMachine } from "react-icons/cg";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { MdSubtitles } from "react-icons/md";
import { MdInsertComment } from "react-icons/md";
import { BsBuildingsFill } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineTimer } from "react-icons/md";
import { LuClock10 } from "react-icons/lu";
import { LuClock3 } from "react-icons/lu";
import { IoToday } from "react-icons/io5";
import { FaBath } from "react-icons/fa6";
import { BsGenderTrans } from "react-icons/bs";
import { MdOutlineMeetingRoom } from "react-icons/md";
import { MdOutlinePriceChange } from "react-icons/md";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { MdBedroomParent } from "react-icons/md";
import { MdRoomPreferences } from "react-icons/md";
import { BiFoodTag } from "react-icons/bi";
import { FaSmoking } from "react-icons/fa6";
import { MdPets } from "react-icons/md";
import { GrDocumentTime } from "react-icons/gr";
import { FaUserAlt } from "react-icons/fa";
import { FaPhoneVolume } from "react-icons/fa6";
import { FaAddressCard } from "react-icons/fa";
import { BiSolidMessageRoundedDots } from "react-icons/bi";
import { MdOutlineEmail } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { GiEntryDoor } from "react-icons/gi";
import { MdAddBusiness } from "react-icons/md";
import Loader from "../../../components/UserCompontents/Loader";
import { MdErrorOutline } from "react-icons/md";
import { amenityIcons } from "../../../constants/Index";
import { FaEdit } from "react-icons/fa";
import stateAbbreviations from "../../../Services/StateAprevation/stateAbbreviations.json";

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
  const [wishliststatys, setWishliststatys] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const [hasNextRoom, setHasNextRoom] = useState(true);
  const [hasPreviousRoom, setHasPreviousRoom] = useState(true);
  const [userstatus, setuserstatus] = useState(false);
  // console.log(usrid);

  const url = `https://verydesi.com/rooms/${_id}`;
  const fetchroomdetails = async () => {
    try {
      const res = await axios.get(
        `https://api.verydesi.com/api/getspecificroom/${_id}`
      );
      setrooms(res.data.rooms);
      console.log(res.data.rooms);
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

  const renderRooms = () => {
    return similarrooms
      .slice(0, 3)
      .map((item) => <Roomcardforsimilar {...item} key={item._id} />);
  };

  const [isloginmodalopen, setloginmodeopen] = useState(false);

  const handleloginmodelopen = () => {
    if (authstatus) {
      setloginmodeopen(true);
    } else {
      toast("login to contact");
    }
  };

  const isloginmodelclose = () => {
    setloginmodeopen(false);
  };

  // console.log(rooms._id);
  const notify = () => toast("Added to Wishlist.");
  const unnotify = () => toast("Remove from Wishlist.");

  const makewishlist = async () => {
    try {
      const dat = {
        roomId: _id,
        status: true,
      };
      // console.log(dat);
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
      if (res) {
        setWishliststatys(true);
        notify();
        // alert("successfully added to wishlist");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const unwish = async () => {
    try {
      const res = await axios.delete(
        `https://api.verydesi.com/api/deletelist/${_id}`
      );
      if (res) {
        setWishliststatys(false);
        unnotify();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchwishstatus = async () => {
      try {
        const res = await axios.get(
          `https://api.verydesi.com/api/getlistbyroom/${_id}`
        );
        if (res.data.status == "not") {
          setWishliststatys(false);
        } else if (res.data.list[0].status) {
          setWishliststatys(true);
        } else {
          setWishliststatys(false);
        }
      } catch (error) {
        console.log("error during fetcignlist", error);
      }
    };
    fetchwishstatus();
  }, [_id]);

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
          className="h-[560px] w-[880px] rounded-md object-cover"
        />
      </div>
    ),
  }));

  return (
    <div className=" mt-[5%] h-full w-full max-w-[1600px] mx-auto">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Conractform isOpen={isloginmodalopen} onClose={isloginmodelclose} />
      <div className=" w-full mx-auto px-4 py-2 mt-10 font-['udemy-regular']">
        {/*
  Heads up! 👋

  This component comes with some `rtl` classes. Please remove them if they are not needed in your project.
*/}

        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1 py-1 text-sm text-gray-600">
            <li>
              <Link to="/" className="block transition hover:text-gray-700">
                <span className="sr-only"> Home </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
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
        <div className="flex justify-between items-start">
          <div className=" flex gap-2">
            <div>
              {hasNextRoom ? (
                <div className="">
                  <div
                    className="text-center flex gap-2"
                    onClick={fetchPreviousRoom}
                    disabled={!hasNextRoom}
                  >
                    <button className="p-1 px-2 rounded-xl flex bg-red-600 text-[22px] items-center text-white shadow-sm shadow-[#000] mb-3 gap-2 hover:shadow-lg">
                      <MdKeyboardDoubleArrowLeft
                        size={45}
                        className="text-white flex"
                      />
                      <button
                        // type="submit"
                        // disabled={!hasPreviousRoom}
                        className="flex text-[22px] items-center text-white font-bold px-2 pl-0"
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
                  <button className="p-1 px-2 rounded-xl flex bg-blue-600 text-[22px] items-center text-white shadow-sm shadow-[#000] mb-3 gap-2 hover:shadow-lg">
                    <button
                      // type="submit"
                      className="flex text-[22px] items-center text-white font-bold"
                    >
                      NEXT
                    </button>
                    <MdKeyboardDoubleArrowRight
                      size={45}
                      className="flex text-[22px] items-center text-white font-bold"
                    />
                  </button>
                </div>
              ) : (
                <p></p>
              )}
            </div>
          </div>

          <div className="flex gap-4 items-center self-center">
            {/* <div
              className="flex justify-end"
              onClick={fetchNextRoom}
              disabled={!hasPreviousRoom}
            >
              <button className="rounded-xl flex p-1 px-3 bg-blue-700 text-[22px] items-center text-white shadow-sm shadow-[#000] gap-2 hover:shadow-lg">
                <button
                  // type="submit"
                  className="flex text-[22px] items-center text-white font-bold"
                >
                  NEXT
                </button>
                <MdKeyboardDoubleArrowRight
                  size={45}
                  className="flex text-[22px] items-center text-white font-bold"
                />
              </button>
            </div> */}
            <div className="gap-2 flex">
              {!wishliststatys ? (
                <div
                  className="cursor-pointer p-2 bg-gray-600 rounded-full shadow-lg shadow-gray-500 hover:shadow-gray-600"
                  onClick={makewishlist}
                >
                  <FaHeart color="#fff" size={30} />
                </div>
              ) : (
                <div
                  className="cursor-pointer p-2 border border-gray-300 rounded-full bg-red-600 "
                  onClick={unwish}
                >
                  <FaHeart color="#fff" size={30} />
                </div>
              )}
              <div className="cursor-pointer p-2 bg-green-500 rounded-full shadow-lg shadow-gray-500 hover:shadow-gray-600">
                <BiSolidMessageRounded color="#fff" size={30} />
              </div>
              {/* <div className="cursor-pointer p-2 bg-blue-600 rounded-full">
                <CopyToClipboard text={url} onCopy={handlecopy}>
                  <IoIosShareAlt color="#fff" size={30} />
                </CopyToClipboard>
              </div> */}
              <button
                type="submit"
                onClick={toggleSharePopup}
                className="rounded-md justify-between bg-gray-400 gap-2 px-5 py-2 text-[19px] flex items-center text-black shadow-lg shadow-gray-500 hover:shadow-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                <FaShare className="text-black" /> Share Now
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
        <div className="flex text-[25px]">
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
                  "https://www.freeiconspng.com/uploads/no-image-icon-11.PNG"
                }
                alt="not"
                className="h-[560px] w-[880px] rounded-md object-cover"
              />
            )}
          </div>
          <div className="px-3 font-['udemy-regular'] ml-7 flex flex-col gap-3 w-[660px]">
            <div className="">
              <div className="flex justify-between">
                <p className="font-bold flex gap-3">
                  <div className="text-[27px]">
                    <div className="flex gap-1 font-bold">
                      <p className=" capitalize">{rooms.Title}</p>
                    </div>
                  </div>
                </p>
                {userstatus && (
                  <button
                    className="flex items-center text-black gap-2 text-[24px]"
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
                <p className="text-[25px] capitalize">
                  {rooms.city},
                  {rooms?.state?.length > 2
                    ? stateAbbreviations[rooms?.state]
                    : rooms.state}
                </p>
                <p className="text-green-700 font-bold capitalize">
                  $ {rooms.Expected_Rooms}
                </p>
              </div>
              <div>
                <p className=" text-xl capitalize">By {rooms.user_name}</p>
              </div>
              {/* {userstatus && (
                <button className="flex items-center text-red-700 gap-2 text-[24px]"
                  onClick={() => {
                    navigate(`/room/editroom/${_id}`);
                  }}
                >
                 <FaEdit/> Edit
                </button>
              )} */}
            </div>

            <div>
              <div className="flex items-center justify-between">
                {
                  <div className="flex ">
                    <BsBuildingsFill className="" size={35} />
                    <p className=" px-2">{rooms.Propertytype}</p>
                  </div>
                }
                <div
                  className={`flex ${
                    authstatus && "flex-row-reverse"
                  } justify-between `}
                >
                  <button
                    type="button"
                    onClick={handleloginmodelopen}
                    className="flex self-center rounded-md bg-green-800 px-5 py-4 mb-2 text-[19px] text-white shadow-sm hover:bg-green-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                  >
                    <LuPhoneCall size={25} />
                    <span class="ml-2 items-center justify-center">
                      Get In touch{" "}
                    </span>
                  </button>
                </div>
              </div>
              {locationsndString ? (
                <div className="mt-2">
                  <LeafletMap2
                    onLocationReceived={locationsndString}
                    style={{ height: "350px", width: "638px" }}
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
        <div className="border p-3 mt-2">
          <p className=" text-[22px] font-bold px-1">Description -</p>
          <p className=" text-[18px] text-gray-600 text-justify px-1 capitalize ">
            {rooms.Description}
          </p>
        </div>
        {/* <h1 className="text-[#0b5e86] text-[29px] font-bold items-center flex gap-2 mt-4"><PiClipboardTextFill size={40}/>Details for the Room-</h1> */}
        <div className="text-[22px] text-gray-500 justify-between max-w-[1600px] gap-3">
          {/* <div className=" gap-3 border p-5">
           <div className="flex gap-1 mt-2"><MdSubtitles size={30}/><p className="">Title: Cozy Apartment in Downtown</p></div>
            <div className="flex gap-1 mt-3"><MdInsertComment size={30}/><p>Description: A spacious and cozy apartment in the heart of the city with all modern amenities.</p></div>
           </div> */}
          <h1 className="text-[#000] text-[22px] font-bold mt-5 flex gap-2">
            <GiEntryDoor size={30} />
            More Info About Room-{" "}
          </h1>
          <div className="grid grid-cols-3 gap-4 border p-5 mt-2">
            <div className="flex gap-2 items-center">
              <BsBuildingsFill className="" size={35} />
              <div className="flex">
                <p className="text-gray-500 text-[20px]">
                  Property type
                  <p className="text-black flex text-[18px]">
                    {rooms.Propertytype}
                  </p>
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <FaMapMarkerAlt className="" size={35} />
              <div className="flex">
                <p className="text-gray-500 text-[20px]">
                  City
                  <p className="text-black flex text-[18px]">{rooms.city}</p>
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <MdOutlineTimer className="" size={35} />
              <div className="flex">
                <p className="text-gray-500 text-[20px]">
                  Stay/lease
                  <p className="text-black flex text-[18px]">
                    {rooms.Stay_lease}
                  </p>
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <LuClock10 size={35} />
              <div className="flex">
                <p className="text-gray-500 text-[20px]">
                  Avaliblity from
                  <p className="text-black flex text-[18px]">
                    {rooms.Avaliblity_from}
                  </p>
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <LuClock3 size={35} />
              <div className="flex">
                <p className="text-gray-500 text-[20px]">
                  Available to
                  <p className="text-black flex text-[18px]">
                    {rooms.Available_to}
                  </p>
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <IoToday size={35} />
              <div className="flex">
                <p className="text-gray-500 text-[20px]">
                  Day Available
                  <p className="text-black flex text-[18px]">
                    {rooms.Day_Available}
                  </p>
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <FaBath size={35} />
              <div className="flex">
                <p className="text-gray-500 text-[20px]">
                  Attachted Bath
                  <p className="text-black flex text-[18px]">
                    {rooms.Attchd_Bath}
                  </p>
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <BsGenderTrans size={35} />
              <div className="flex">
                <p className="text-gray-500 text-[20px]">
                  Preferred Gender
                  <p className="text-black flex text-[18px]">
                    {rooms.Preferred_gender}
                  </p>
                </p>
              </div>
            </div>
            {/* <div className="flex gap-2 items-center"><MdOutlineMeetingRoom size={35}/><div className="flex">
            <p className="text-gray-500 text-[20px]">Expected Rooms
            <p className="text-black flex">1</p>
            </p></div></div> */}
            <div className="flex gap-2 items-center">
              <MdOutlinePriceChange size={35} />
              <div className="flex">
                <p className="text-gray-500 text-[20px]">
                  Pricemodel
                  <p className="text-black flex text-[18px]">
                    {rooms.Pricemodel}
                  </p>
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <RiMoneyDollarCircleFill size={35} />
              <div className="flex">
                <p className="text-gray-500 text-[20px]">
                  Deposit
                  <p className="text-black flex text-[18px]">
                    {rooms.Desposite}
                  </p>
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <MdBedroomParent size={35} />
              <div className="flex">
                <p className="text-gray-500 text-[20px]">
                  Is room furnished
                  <p className="text-black flex text-[18px]">
                    {rooms.is_room_furnished}
                  </p>
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <GrDocumentTime size={35} />
              <div className="flex">
                <p className="text-gray-500 text-[20px]">
                  Open house schedule
                  <p className="text-black flex text-[18px]">
                    {rooms?.Open_house_schedule}
                  </p>
                </p>
              </div>
            </div>
          </div>
          {rooms.Amenities_include.length > 1 && (
            <div>
              <h1 className="flex text-[#000] text-[22px] font-bold mt-5 gap-2">
                <MdRoomPreferences size={30} />
                Amenities included-
              </h1>
              <div className="border p-5 grid grid-cols-3 gap-4 text-[18px] text-black mt-2">
                {rooms?.Amenities_include?.map((amenity) => {
                  const IconComponent = amenityIcons[amenity];
                  return (
                    <div key={amenity} className="flex gap-2">
                      {IconComponent && (
                        <IconComponent className="amenity-icon" size={30} />
                      )}
                      <p>{amenity}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          <h1 className="text-[#000] text-[22px] font-bold mt-5 flex gap-2">
            <MdAddBusiness size={30} />
            Additional Information-{" "}
          </h1>
          <div className="grid grid-cols-3 gap-3 border p-5 mt-2">
            <div className="flex gap-2 items-center">
              <BiFoodTag size={35} />
              <div className="flex">
                <p className="text-gray-500 text-[20px]">
                  Dietary Preference
                  <p className="text-black flex text-[18px]">
                    {rooms.Vegeterian_prefernce}
                  </p>
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <FaSmoking size={35} />
              <div className="flex">
                <p className="text-gray-500 text-[20px]">
                  Smoking policy
                  <p className="text-black flex text-[18px]">
                    {rooms.Smoking_policy}
                  </p>
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <MdPets size={35} />
              <div className="flex">
                <p className="text-gray-500 text-[20px]">
                  Pet friendly
                  <p className="text-black flex text-[18px]">
                    {rooms.Pet_friendly}
                  </p>
                </p>
              </div>
            </div>
          </div>
          <h1 className="flex text-[#000] text-[22px] font-bold mt-5 gap-2 items-center">
            <FaUserFriends size={37} />
            User Details-{" "}
            {!authstatus && (
              <span className="text-red-600 text-[20px] items-center text-center capitalize flex gap-1">
                <MdErrorOutline /> login to see Details
              </span>
            )}
          </h1>
          {authstatus && (
            <div className="grid grid-cols-3 gap-3 border p-5 mt-2">
              <div className="flex gap-2 items-center">
                <FaUserAlt size={35} />
                <div className="flex">
                  <p className="text-gray-500 text-[20px]">
                    User name
                    <p className="text-black flex text-[18px]">
                      {rooms.user_name}
                    </p>
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <FaPhoneVolume size={35} />
                <div className="flex">
                  <p className="text-gray-500 text-[20px]">
                    Phone number
                    <p className="text-black flex text-[18px]">
                      <a
                        href={`tel:${rooms.phone_number}`}
                        className="text-black"
                      >
                        {rooms.phone_number}
                      </a>
                    </p>
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <FaAddressCard size={35} />
                <div className="flex">
                  <p className="text-gray-500 text-[20px]">
                    Address
                    <p className="text-black flex text-[18px]">
                      {rooms.address}
                    </p>
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <BiSolidMessageRoundedDots size={35} />
                <div className="flex">
                  <p className="text-gray-500 text-[20px]">
                    Zip code
                    <p className="text-black flex text-[18px]">
                      {rooms.zip_code}
                    </p>
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <MdOutlineEmail size={35} />
                <div className="flex flex-col">
                  <p className="text-gray-500 text-[20px]">
                    Email
                    <p className="text-black flex text-[18px]">
                      <a href={`mailto:${rooms.email}`} className="text-black">
                        {rooms.email}
                      </a>
                    </p>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="mt-4 mb-2">
          <div className="mt-2 flex items-center ">
            <div className=" flex justify-between w-full text-[25px] font-['udemy-regular'] text-[#0b5e86] font-bold">
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
