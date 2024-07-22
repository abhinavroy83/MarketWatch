import React, { useEffect, useState } from "react";
import { DashConatiner } from "../../../components";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import Loader from "../../../components/UserCompontents/Loader";
import { BiMinusCircle } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { MdMeetingRoom } from "react-icons/md";
import { FaMapPin } from "react-icons/fa";
import { AiFillDollarCircle } from "react-icons/ai";
import { MdFindInPage } from "react-icons/md";
import { IoIosRemoveCircle } from "react-icons/io";

function ListAllwish() {
  const { userID } = useParams();
  const [data, setdata] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const handleDeleteRoom = async (deleteId) => {
    // console.log(deleteId);
    try {
      const res = await axios.delete(
        ` https://api.verydesi.com/api/deletelist/${deleteId}`
      );
      if (res) {
        setdata((prevRoomData) =>
          prevRoomData.filter((room) => room._id !== deleteId)
        );
        alert("Unwish Successful");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchAllList = async () => {
      try {
        const listResponse = await axios.get(
          `https://api.verydesi.com/api/getlist/${userID}`
        );
        // console.log(listResponse.data.list);
        const list = listResponse.data.list.map((item) => item.roomId);
        // console.log(list);
        const roomResponse = await axios.get(
          `https://api.verydesi.com/api/getrooms/${userID}`
        );
        const rooms = roomResponse.data.rooms;
        // console.log(rooms);
        const matchedRooms = rooms.filter((room) => list.includes(room._id));
        // console.log(matchedRooms);
        setdata(matchedRooms);
        // console.log(matchedRooms);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllList();
  }, [userID, handleDeleteRoom]);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  if (loading) {
    return <Loader className={"h-screen flex justify-center items-center"} />;
  }

  const renderRows = () => {
    const startIndex = (currentPage - 1) * 10;
    const endIndex = Math.min(startIndex + 10, data.length);
    return data.slice(startIndex, endIndex).map((items) => (
      <tr key={items._id}>
        <td className="whitespace-nowrap px-4 py-4 font-['udemy-regular'] text-[22px]">
          <div className="flex items-center font-['udemy-regular']">
            <div className="h-10 w-10 flex-shrink-0 font-['udemy-regular']">
              <img
                className="h-10 w-10 rounded-full object-cover"
                src={items.Imgurl}
                alt=""
              />
            </div>
            <div className="ml-4 font-['udemy-regular']">
              <div className="text-[22px] font-medium text-gray-900">
                {items.Title}
              </div>
            </div>
          </div>
        </td>
        <td className="whitespace-nowrap px-12 py-4">
          <div className="text-[22px] text-gray-700 font-['udemy-regular']">
            {items.city}
          </div>
        </td>
        <td className="whitespace-nowrap px-4 py-4 text-[22px] text-gray-700 font-['udemy-regular']">
          {items.Expected_Rooms}
        </td>
        <td
          className="whitespace-nowrap px-4 py-4 text-[22px] text-gray-700 font-['udemy-regular']  cursor-pointer"
          onClick={() => {
            navigate(`/rooms/${items._id}`);
          }}
        >
          Click here
        </td>
        <td className="whitespace-nowrap flex justify-center items-center gap-2 px-4 py-6 text-right text-[22px] font-medium font-['udemy-regular']">
          <a
            onClick={() => {
              handleDeleteRoom(items._id);
            }}
            className="text-red-500 font-semibold cursor-pointer flex items-center gap-3"
          >
            <BiMinusCircle size={25} /> Remove
          </a>
        </td>
      </tr>
    ));
  };
  return (
    <DashConatiner>
      <section className="mx-auto w-full max-w-7xl font-['udemy-regular']">
        <div className="flex justify-center text-center self-center">
          <p className="text-[1.5rem] p-2 text-black font-['udemy-regular'] bg-gray-300 w-full flex gap-2 justify-center shadow-black shadow-sm items-center text-center">
            <FaHeart size={25} /> Favorites
          </p>
        </div>
        <div className="mt-6 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden rounded-md text-[1.2rem]">
                <table className="min-w-full divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left font-normal text-gray-700"
                      >
                        <span className="flex gap-1">
                          <MdMeetingRoom size={25} />
                          Room
                        </span>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-left font-normal text-gray-700"
                      >
                        <span className="flex gap-1">
                          <FaMapPin size={22} /> City
                        </span>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left font-normal text-gray-700"
                      >
                        <span className="flex gap-1">
                          <AiFillDollarCircle size={24} />
                          Price{" "}
                        </span>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left font-normal text-gray-700"
                      >
                        <span className="flex gap-1">
                          <MdFindInPage size={24} />
                          Visit Page
                        </span>
                      </th>
                      {/* <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-[22px] font-normal text-gray-700"
                      >
                        Price
                      </th> */}
                      <th
                        scope="col"
                        className="px-4 py-3.5 font-normal text-gray-700"
                      >
                        <span className="flex gap-1">
                          <IoIosRemoveCircle size={24} />
                          Remove
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white ">
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
                  className="mx-2 px-4 py-2 border rounded-md flex items-center justify-center gap-2 bg-white text-gray-500 text-[17px] hover:bg-gray-300 hover:text-black"
                  onClick={prevPage}
                >
                  <FaArrowLeft /> Previous
                </button>
              )}
              {data.length > currentPage * 4 && (
                <button
                  className="mx-2 px-4 py-2 border rounded-md flex items-center justify-center gap-2 bg-white text-gray-500 text-[17px] hover:bg-gray-300 hover:text-black"
                  onClick={nextPage}
                >
                  Next <FaArrowRight />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </DashConatiner>
  );
}

export default ListAllwish;
