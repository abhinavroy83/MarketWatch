import React, { useEffect, useState } from "react";
import { DashConatiner } from "../../../components";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaArrowAltCircleRight, FaHome } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { IoPeopleSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import Pagination from "../../../components/SharedCompontents/Pagination";
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
        toast.success("Room delete Sucessfully");
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
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderRows = () => {
    const startIndex = (currentPage - 1) * 5;
    const endIndex = Math.min(startIndex + 5, roomsdeatails.length);
    return roomsdeatails.slice(startIndex, endIndex).map((items, index) => (
      <tr key={items._id}>
        <td className=" px-4 py-4 font-['udemy-regular'] text-[20px]">
          <div className="flex items-center font-['udemy-regular']">
            <div className="h-10 w-10 flex-shrink-0 font-['udemy-regular'] ">
              <img
                className="h-10 w-10 rounded-full object-cover"
                src={items.Imgurl[0]}
                alt=""
              />
            </div>
            <div className="ml-4 font-['udemy-regular'] cursor-pointer">
              <div className="text-base text-gray-700">{items.Title}</div>
            </div>
          </div>
        </td>
        <td className="whitespace-nowrap px-12 py-4 cursor-pointer">
          <div className="text-base text-gray-700">
            {items.city}, {items.state}
          </div>
        </td>
        <td className="whitespace-nowrap px-8 py-4 text-base text-gray-700 cursor-pointer">
          {items.address}
        </td>
        <td className="whitespace-nowrap px-8 py-4 text-base text-gray-700 cursor-pointer">
          ${items.Expected_Rooms}
        </td>
        <td
          onClick={(e) => {
            // e.preventDefault();
            // window.open(`/room/editroom/${_id}`, "_blank");
            navigate(`/room/editroom/${items._id}`);
          }}
          className="whitespace-nowrap px-8 py-4 text-base text-gray-700 cursor-pointer hover:text-blue-700"
        >
          Edit
        </td>
        <td className="whitespace-nowrap gap-2 px-8 py-6 text-base font-medium">
          <a
            onClick={() => {
              handledeleterooms(items._id);
            }}
            className="text-gray-700 cursor-pointer text-base hover:text-red-600"
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
          <img
            className="w-[2rem] h-[2rem]"
            src={
              "https://res.cloudinary.com/druohnmyv/image/upload/v1723819324/assests/q6veig3biuyx8y2ggv2e.png"
            }
            alt=""
          />
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
                          <img
                            className="h-7 w-7"
                            src={
                              "https://res.cloudinary.com/druohnmyv/image/upload/v1723819315/assests/ly9sxoqztlo9bh2fz6iv.png"
                            }
                            alt=""
                          />
                          Room
                        </div>{" "}
                      </th>
                      <th
                        scope="col"
                        className="px-8 py-3.5 text-left font-normal text-gray-700 w-[11rem] inline-block"
                      >
                        <div className="flex gap-1">
                          {" "}
                          <img
                            className="h-7 w-7"
                            src={
                              "https://res.cloudinary.com/druohnmyv/image/upload/v1723819325/assests/zneulaispaafq6pzowd5.png"
                            }
                            alt=""
                          />
                          City, State
                        </div>{" "}
                      </th>
                      <th
                        scope="col"
                        className="px-8 py-3.5 text-left font-normal text-gray-700"
                      >
                        <div className="flex gap-1">
                          <img
                            className="h-7 w-7"
                            src={
                              "https://res.cloudinary.com/druohnmyv/image/upload/v1723819320/assests/lesvajdewhwtq2hja4ta.png"
                            }
                            alt=""
                          />
                          Address
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-8 py-3.5 text-left font-normal text-gray-700"
                      >
                        {" "}
                        <div className="flex gap-1">
                          <img
                            className="h-7 w-7"
                            src={
                              "https://res.cloudinary.com/druohnmyv/image/upload/v1723819323/assests/q0rjjk9jli8t8yorkfy9.png"
                            }
                            alt=""
                          />
                          Rent
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-8 py-3.5 text-left font-normal text-gray-700"
                      >
                        {" "}
                        <div className="flex gap-1">
                          <img
                            className="h-7 w-7"
                            src={
                              "https://res.cloudinary.com/druohnmyv/image/upload/v1723819315/assests/g4etlnb8nxgrgxdfusct.png"
                            }
                            alt=""
                          />
                          Edit
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-8 py-3.5 text-left font-normal text-gray-700 flex gap-1 items-center"
                      >
                        <div className="flex gap-1 items-center">
                          <img
                            className="h-7 w-7"
                            src={
                              "https://res.cloudinary.com/druohnmyv/image/upload/v1723819315/assests/ypojptmu0i6hqvvsjd1r.png"
                            }
                            alt=""
                          />
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
      </section>
      <Pagination
        currentPage={currentPage}
        totalRooms={roomsdeatails.length}
        roomsPerPage="8"
        paginate={paginate}
      />
    </DashConatiner>
  );
}

export default Getuserroom;
