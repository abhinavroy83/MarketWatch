import React, { useEffect, useState } from "react";
import { DashConatiner } from "../../../components";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { BiMinusCircle } from "react-icons/bi";
import { MdOutlineMeetingRoom } from "react-icons/md";
import { FaMapPin } from "react-icons/fa";
import door from "../../../assets/door.png";
import { SkyScrapper } from "../../../assets";
import map from "../../../assets/map.png";
import pricetag from "../../../assets/pricetag.png";
import removed from "../../../assets/removed.png";

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
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserRoomDetails();
  }, [userID, handledeleterooms]);

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
          <div className="text-[20px] text-gray-700">{items.city}</div>
        </td>
        <td className="whitespace-nowrap px-8 py-4 text-[20px] text-gray-700">
          {items.address}
        </td>
        <td className="whitespace-nowrap px-8 py-4 text-[20px] text-gray-700">
          {items.Expected_Rooms}
        </td>
        <td className="whitespace-nowrap gap-2 px-8 py-6 text-[20px] font-medium">
          <a
            onClick={() => {
              handledeleterooms(items._id);
            }}
            className="text-gray-700 cursor-pointer text-[20px]"
          >
            Delete
          </a>
        </td>
      </tr>
    ));
  };

  return (
    <DashConatiner>
      <section className="mx-auto w-full max-w-7xl rounded-sm px-4 py-4 font-['udemy-regular']">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-[1.5rem] font-semibold text-[#232f3e]">
              Rooms
            </h2>
            <p className="mt-1 text-[1.2rem] text-[#232f3e]">
              This is a list of all rooms. You can add new rooms, edit or delete
              existing ones.
            </p>
          </div>
          {isverified && (
            <div>
              <button
                type="button"
                onClick={() => {
                  navigate(`/addroom/${userID}`);
                }}
                className="font-['udemy-regular'] rounded-md bg-green-800 px-3 py-2 text-[1.2rem] text-white shadow-sm hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
              >
                Add Room
              </button>
            </div>
          )}
        </div>
        <div className="mt-6 flex flex-col text-[20px]">
          <div className="sm:-mx-6 lg:-mx-8 overflow-x-auto">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="border border-gray-200 md:rounded-lg gap-3 flex lg:w-full">
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
