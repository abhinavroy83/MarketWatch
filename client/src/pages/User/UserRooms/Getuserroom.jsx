import React, { useEffect, useState } from "react";
import { DashConatiner } from "../../../components";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaArrowAltCircleRight, FaHome } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import door from "../../../assets/door.png";
import { SkyScrapper } from "../../../assets";
import map from "../../../assets/map.png";
import pricetag from "../../../assets/pricetag.png";
import removed from "../../../assets/removed.png";
import { IoIosArrowForward } from "react-icons/io";
import { IoPeopleSharp } from "react-icons/io5";
import rooms from "../../../assets/rooms.png";
function Getuserroom() {
  const { userID } = useParams();
  const token = useSelector((state) => state.auth.token);
  const isverified = useSelector((state) => state.auth.isverified);
  const navigate = useNavigate();
  const [roomsdeatails, setRoomDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchUserRoomDetails = async () => {
    try {
      const res = await axios.get(
        ` https://api.verydesi.com/api/getrooms/${userID}`
      );
      if (!res) {
        console.log("unable to fetch the data or it may be empty");
      }
      setRoomDetails(res.data.rooms);
    } catch (error) {
      console.error(
        "error during fetching data in room details for personal user",
        error
      );
    }
  };
  const handledeleterooms = async (deleteid) => {
    // console.log(deleteid);
    try {
      const res = await axios.delete(
        ` https://api.verydesi.com/rooms/${deleteid}`
      );
      if (res) {
        alert("Room delete Sucessfully");
        setRoomDetails((prevRooms) =>
          prevRooms.filter((room) => room._id !== deleteid)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserRoomDetails();
  }, [userID]);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const renderRows = () => {
    const startIndex = (currentPage - 1) * 5;
    const endIndex = Math.min(startIndex + 5, roomsdeatails.length);
    return roomsdeatails.slice(startIndex, endIndex).map((items, index) => (
      <tr key={items._id}>
        <td className="whitespace-nowrap px-4 py-4 font-['udemy-regular'] text-[20px]">
          <div className="flex items-center font-['udemy-regular']">
            <div className="h-10 w-10 flex-shrink-0 font-['udemy-regular']">
              <img
                className="h-10 w-10 rounded-full object-cover"
                src={items.Imgurl[0]}
                alt=""
              />
            </div>
            <div className="ml-4 font-['udemy-regular']">
              <div className="text-[20px] font-medium text-gray-900">
                {items.Hotelname}
              </div>
            </div>
          </div>
        </td>
        <td className="whitespace-nowrap px-12 py-4">
          <div className="text-base text-gray-700">{items.city}</div>
        </td>
        <td className="whitespace-nowrap px-8 py-4 text-base text-gray-700">
          {items.address}
        </td>
        <td className="whitespace-nowrap px-8 py-4 text-base text-gray-700">
          {items.Expected_Rooms}
        </td>
        <td className="whitespace-nowrap gap-2 px-8 py-6 text-base font-medium">
          <a
            onClick={() => {
              handledeleterooms(items._id);
            }}
            className="text-gray-700 cursor-pointer text-base"
          >
            Delete
          </a>
        </td>
      </tr>
    ));
  };

  return (
    <DashConatiner>
      <section className="mx-auto w-full max-w-7xl rounded-sm font-['udemy-regular']">
        <p className="text-[1.5rem] p-2 bg-[#232f3e] text-white w-full flex gap-2 justify-center items-center text-center">
          {/* <FaHeart size={25} /> */}
          {/* <img className="w-[2rem] h-[2rem]" src={Favorites} alt="logo" /> */}
          <img className="w-[2rem] h-[2rem]" src={rooms} alt="" />
          Rooms Posted
        </p>
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="lg:hidden items-center text-gray-700 flex ml-3 mt-2">
            <Link to="/">
              <FaHome size={20} />
            </Link>
            <IoIosArrowForward />
            <Link to={`/myaccount/${userID}`}>
              <IoPeopleSharp size={20} />
            </Link>
            <IoIosArrowForward />
            <p>Rooms</p>
          </div>
          <div className="flex-col w-full">
            <div className="flex items-center justify-between w-full lg:mt-4 px-4">
              <p className="text-[17px] text-[#232f3e]">
                This is a list of all rooms. You can add new rooms, edit or
                delete existing ones.
              </p>
              {isverified && (
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      navigate(`/addroom/${userID}`);
                    }}
                    className="font-['udemy-regular'] rounded-md bg-green-800 px-3 py-2 text-[19px] text-white shadow-sm hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
                  >
                    Add Room
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-col text-base px-4">
          <div className="sm:-mx-6 lg:-mx-8 overflow-x-auto">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="border border-gray-200 rounded-md gap-3 flex lg:w-full ">
                <table className="min-w-full gap-4 divide-y divide-gray-200 ">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left font-normal text-gray-700"
                      >
                        <div className="flex">
                          {" "}
                          <img className="h-7 w-7" src={door} alt="" />
                          Room
                        </div>{" "}
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-left font-normal text-gray-700"
                      >
                        <div className="flex gap-1">
                          {" "}
                          <img className="h-7 w-7" src={SkyScrapper} alt="" />
                          City
                        </div>{" "}
                      </th>
                      <th
                        scope="col"
                        className="px-8 py-3.5 text-left font-normal text-gray-700"
                      >
                        <div className="flex gap-1">
                          <img className="h-7 w-7" src={map} alt="" />
                          Address
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-8 py-3.5 text-left font-normal text-gray-700"
                      >
                        {" "}
                        <div className="flex gap-1">
                          <img className="h-7 w-7" src={pricetag} alt="" />
                          Price
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-8 py-3.5 text-left font-normal text-gray-700 flex gap-1"
                      >
                        <div className="flex gap-1">
                          <img className="h-7 w-7" src={removed} alt="" />
                          Delete
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {renderRows()}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 w-full border-gray-300">
          <div className="mt-2 flex items-center justify-end">
            <div className="space-x-2 flex">
              {currentPage > 1 && (
                <button
                  className="rounded-md bg-green-800 px-3 py-2 text-[20px] flex items-center justify-center gap-2 font-semibold text-white shadow-sm hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
                  onClick={prevPage}
                >
                  <FaArrowAltCircleLeft /> Previous
                </button>
              )}
              {roomsdeatails.length > currentPage * 4 && (
                <button
                  className="rounded-md bg-green-800 px-3 py-2 text-[20px] flex items-center justify-center gap-2 font-semibold text-white shadow-sm hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
                  onClick={nextPage}
                >
                  Next <FaArrowAltCircleRight />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </DashConatiner>
  );
}

export default Getuserroom;
