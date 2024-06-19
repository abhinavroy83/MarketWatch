import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { PiClipboardTextFill } from "react-icons/pi";
import { MdAddBusiness } from "react-icons/md";
import { FaWifi } from "react-icons/fa6";
import { TbAirConditioning } from "react-icons/tb";
import { MdOutlineHeatPump } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import { MdPool } from "react-icons/md";

function Rooms() {
  const { _id } = useParams();
  const [rooms, setrooms] = useState([]);
  const [similarrooms, setsimilarrooms] = useState([]);
  const [locationsndString, setLocationsndString] = useState("");
  const [contactdet, setcontachdet] = useState(false);
  const [posteddate, setposteddate] = useState("");
  const authstatus = useSelector((state) => state.auth.status);
  const currentloc = useSelector((state) => state.auth.location);
  const [wishliststatys, setWishliststatys] = useState(false);
  const token = useSelector((state) => state.auth.token);

  const url = `https://api.verydesi.com/rooms/${_id}`;
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
    } catch (error) {
      console.log("error during fetching api", error);
    }
  };
  useEffect(() => {
    fetchroomdetails();
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

  const fetchNextRoom = async () => {
    try {
      const res = await axios.get(
        `https://api.verydesi.com/api/rooms/${_id}/previous`
      );
      // console.log(res);
      navigate(`/rooms/${res.data.previousRoom._id}`);
    } catch (error) {
      console.error("Error fetching next room:", error);
    }
  };

  const fetchPreviousRoom = async () => {
    try {
      const res = await axios.get(
        `https://api.verydesi.com/api/rooms/${_id}/next`
      );
      // console.log(res);

      navigate(`/rooms/${res.data.nextRoom._id}`);
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
    setloginmodeopen(true);
  };

  //close
  {
    /* <div className="flex">
              <svg
                class="h-12 w-12 ml-1 text-black-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="flex pb-3">
                <div className="ml-1">
                  <GiWashingMachine size={45} />
                </div>
              </div>
            </div> */
  }
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
  if (!rooms || !rooms.Imgurl) {
    return <div>Loading</div>;
  }

  const images = rooms.Imgurl.map((url) => ({
    original: url,
    thumbnail: url,
    renderItem: (item) => (
      <div className="image-gallery-image">
        <img
          src={item.original}
          alt=""
          className="h-[560px] w-[880px] rounded-md object-cover"
        />
      </div>
    ),
  }));

  return (
    <div className=" mt-40 h-full w-full max-w-[1600px] mx-auto">
      <ToastContainer
        position="top-center"
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
      <div className=" w-full mx-auto px-4 py-2 mt-5 font-['udemy-regular']">
        <div className="flex justify-between py-2 items-start">
          <div>
            <button className="rounded-full flex py-2 bg-pink-800 px-2 text-[22px] items-center text-white shadow-sm shadow-[#000] mb-3 gap-2 hover:shadow-lg">
              <MdKeyboardDoubleArrowLeft
                size={30}
                className="text-pink-800 bg-white rounded-full flex shadow-sm shadow-[#000]"
              />
              <button
                onClick={fetchPreviousRoom}
                type="submit"
                className="rounded-full flex bg-white px-7 text-[22px] items-center text-pink-800 shadow-sm shadow-[#000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Previous
              </button>
            </button>

            <p className=" text-[30px] font-bold text-black font-['udemy-regular']">
              {rooms.Adname && truncateWords(rooms.Adname, 6)}
            </p>
          </div>

          <div className="block ">
            <div className="flex justify-end">
              <button className="rounded-full flex py-2 bg-blue-700 px-2 text-[22px] items-center text-white shadow-sm shadow-[#000] mb-3 gap-2 hover:shadow-lg">
                <button
                  type="submit"
                  onClick={fetchNextRoom}
                  className="rounded-full flex bg-white px-7 text-[22px] items-center text-blue-700 shadow-sm shadow-[#000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Next
                </button>
                <MdKeyboardDoubleArrowRight
                  size={30}
                  className="text-blue-700 bg-white rounded-full flex shadow-sm shadow-[#000]"
                />
              </button>
            </div>

            <div className="gap-2 flex">
              {!wishliststatys ? (
                <div
                  className="cursor-pointer p-2 bg-red-600 rounded-full shadow-lg shadow-gray-500 hover:shadow-gray-600"
                  onClick={makewishlist}
                >
                  <FaHeart color="#fff" size={30} />
                </div>
              ) : (
                <div
                  className="cursor-pointer p-2 border border-gray-300 rounded-full"
                  onClick={unwish}
                >
                  <FaHeart color="red" size={30} />
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
                      onClose={toggleSharePopup}
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
        {/* <div className="text-[25px] mb-4">
           <div className="flex gap-1"><MdSubtitles size={30}/><p className="">Title: Cozy Apartment in Downtown</p></div>
            <div className="flex gap-1"><MdInsertComment size={30}/><p>Description: A spacious and cozy apartment in the heart of the city with all modern amenities.</p></div>
        </div> */}
        <div className="flex text-[25px]">
          <div>
            <ImageGallery
              items={images}
              showPlayButton={false}
              showFullscreenButton={false}
            />
          </div>
          <div className="px-3 font-['udemy-regular'] ml-7 flex flex-col gap-3 w-[660px]">
            <div>
              <p className="font-bold flex gap-3">
                <div className="text-[27px]">
                  <div className="flex gap-1 font-bold">
                    <p className="">{rooms.Title}</p>
                  </div>
                </div>
              </p>
              <div className="flex justify-between my-2">
                <p className="text-[25px]">{rooms.address}</p>
                <p>$300 monthly</p>
              </div>
              <div>
                <p className=" text-xl">By {rooms.user_name}</p>
              </div>
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
                    className="flex self-center rounded-md bg-green-800 px-5 py-4 text-[22px] text-white shadow-sm hover:bg-green-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                  >
                    <LuPhoneCall size={30} />
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
          <p className=" text-[18px] text-gray-600 text-justify px-1">{rooms.Description} Each room has its own character, shaped by the colors on the walls, the arrangement of furniture, and the personal touches that make it unique. Whether it's a cozy bedroom, a lively living room, a functional kitchen, or a tranquil study, rooms are spaces that reflect our personalities and lifestyles.Each room has its own character, shaped by the colors on the walls, the arrangement of furniture, and the personal touches that make it unique. Whether it's a cozy bedroom, a lively living room, a functional kitchen, or a tranquil study</p>
        </div>

        {/* <h1 className="text-[#0b5e86] text-[29px] font-bold items-center flex gap-2 mt-4"><PiClipboardTextFill size={40}/>Details for the Room-</h1> */}
        <div className="text-[22px] text-gray-500 justify-between max-w-[1600px] gap-3">
          {/* <div className=" gap-3 border p-5">
           <div className="flex gap-1 mt-2"><MdSubtitles size={30}/><p className="">Title: Cozy Apartment in Downtown</p></div>
            <div className="flex gap-1 mt-3"><MdInsertComment size={30}/><p>Description: A spacious and cozy apartment in the heart of the city with all modern amenities.</p></div>
           </div> */}
          <h1 className="text-[#000] text-[29px] font-bold mt-5 flex gap-2">
            <GiEntryDoor size={40} />
            More Info About Room-{" "}
          </h1>
          <div className="grid grid-cols-3 gap-4 border p-5">
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
                  Desposite
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
                    Every Saturday 10AM-12PM
                  </p>
                </p>
              </div>
            </div>
          </div>
          <h1 className="flex text-[#000] text-[29px] font-bold mt-5 gap-2">
            <MdRoomPreferences size={40} />
            Amenities included-{" "}
          </h1>
          <div className="border p-5 grid grid-cols-3 gap-4 text-[18px] text-black">
            <div className="flex gap-2">
              <FaWifi size={25} />
              <p>WiFi</p>
            </div>
            <div className="flex gap-2">
              <TbAirConditioning size={30} />
              <p>Air Conditioning</p>
            </div>
            <div className="flex gap-2">
              <MdOutlineHeatPump size={30} />
              <p>Heating</p>
            </div>
            <div className="flex gap-2">
              <CgGym size={30} />
              <p>Gym</p>
            </div>
            <div className="flex gap-2">
              <MdPool size={30} />
              <p>Pool</p>
            </div>
          </div>
          <h1 className="text-[#000] text-[29px] font-bold mt-5 flex gap-2">
            <MdAddBusiness size={40} />
            Additional Information-{" "}
          </h1>
          <div className="grid grid-cols-3 gap-3 border p-5">
            <div className="flex gap-2 items-center">
              <BiFoodTag size={35} />
              <div className="flex">
                <p className="text-gray-500 text-[20px]">
                  Vegeterian prefernce
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
          <h1 className="flex text-[#000] text-[29px] font-bold mt-5 gap-2">
            <FaUserFriends size={37} />
            User Details-{" "}
          </h1>
          <div className="grid grid-cols-3 gap-3 border p-5">
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
                    {rooms.phone_number}
                  </p>
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <FaAddressCard size={35} />
              <div className="flex">
                <p className="text-gray-500 text-[20px]">
                  Address
                  <p className="text-black flex text-[18px]">{rooms.address}</p>
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
              <div className="flex">
                <p className="text-gray-500 text-[20px]">
                  Email
                  <p className="text-black flex text-[18px]">{rooms.email}</p>
                </p>
              </div>
            </div>

            {/* <p>"Imgurl": [
            "https://photos.zillowstatic.com/fp/53c24e11ceb3ce05a9daf37eee7ed4ec-cc_ft_768.webp",
            "https://photos.zillowstatic.com/fp/c0423658b577c72e2686334307c6af5f-cc_ft_384.webp"]</p> */}
          </div>
        </div>

        <div className="mt-4 mb-2 border-t-2 border-black">
          <div className="mt-2 flex items-center ">
            <div className=" flex justify-between w-full text-[25px] font-['udemy-regular'] text-[#0b5e86] font-bold">
              <p>Similar room In The Area</p>
              <p
                className=" cursor-pointer"
                onClick={() => {
                  navigate("/rooms");
                }}
              >
                See full list of Roommates
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
