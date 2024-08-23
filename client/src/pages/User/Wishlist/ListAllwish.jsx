import React, { useEffect, useState } from "react";
import { DashConatiner } from "../../../components";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { IoPeopleSharp } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { minuscart } from "../../../store/cartslice";
import Pagination from "../../../components/SharedCompontents/Pagination";
function ListAllwish() {
  const { userID } = useParams();
  const [data, setdata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const handleDeleteRoom = async (deleteId) => {
    // console.log(deleteId);
    try {
      const dat = { roomId: deleteId, status: false };
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

        setdata((prevRoomData) =>
          prevRoomData.filter((room) => room._id !== deleteId)
        );
        toast.success("Removed");
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  useEffect(() => {
    const fetchAllList = async () => {
      try {
        // Fetch the wishlist
        const listResponse = await axios.get(
          `https://api.verydesi.com/api/getlist/${userID}`
        );

        // console.log(listResponse);
        if (listResponse.data.status === "error") {
          // console.error(listResponse.data.msg);
          setLoading(false);
          return;
        }

        const list = listResponse.data.wishlist.rooms.map(
          (item) => item.roomId
        );
        // console.log(list);

        // Fetch the rooms
        const roomResponse = await Promise.all(
          list.map((roomId) =>
            axios.get(`https://api.verydesi.com/api/getspecificroom/${roomId}`)
          )
        );
        // console.log(roomResponse);
        const rooms = roomResponse.map((response) => response.data.rooms);
        // console.log(rooms);
        setdata(rooms);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching wishlist or rooms:", error);
        setLoading(false);
      }
    };

    fetchAllList();
  }, [userID]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // if (loading) {
  //   return <Loader className={"h-screen flex justify-center items-center"} />;
  // }

  const renderRows = () => {
    const startIndex = (currentPage - 1) * 7;
    const endIndex = Math.min(startIndex + 7, data.length);
    return data.slice(startIndex, endIndex).map((items) => (
      <tr key={items._id}>
        <td className="whitespace-nowrap px-4 py-4 font-['udemy-regular'] text-base">
          <div className="flex items-center font-['udemy-regular']">
            <div className="h-10 w-10 flex-shrink-0 font-['udemy-regular']">
              <img
                className="h-10 w-10 rounded-full object-cover"
                src={items?.Imgurl[0]}
                alt=""
              />
            </div>
            <div className="ml-4 font-['udemy-regular']">
              <div className=" font-medium text-gray-900">{items.Title}</div>
            </div>
          </div>
        </td>
        <td className="whitespace-nowrap px-12 py-4">
          <div className=" text-gray-700 font-['udemy-regular']">
            {items.city},{items.state}
          </div>
        </td>
        <td className="whitespace-nowrap px-8 py-4 text-gray-700 font-['udemy-regular']">
          {items.Expected_Rooms}
        </td>
        <td
          className="whitespace-nowrap px-8 py-4 text-gray-700 font-['udemy-regular'] cursor-pointer hover:text-blue-600"
          onClick={() => {
            navigate(`/rooms/${items._id}`);
          }}
        >
          Click here
        </td>
        <td className="whitespace-nowrap items-center gap-2 px-8 py-6 font-medium font-['udemy-regular']">
          <a
            onClick={() => {
              handleDeleteRoom(items._id);
            }}
            className="text-gray-700 cursor-pointer text-base hover:text-red-600"
          >
            {/* <BiMinusCircle size={25} />  */}
            Remove
          </a>
        </td>
      </tr>
    ));
  };
  return (
    <DashConatiner>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName={() =>
          "w-80 font-medium text-gray-900 flex items-center gap-2 bg-green-100 fixed top-[7rem] right-4 py-2  border border-gray-100"
        }
      />
      <section className="mx-auto w-full max-w-7xl font-['udemy-regular']">
        <div className="flex justify-center text-center self-center">
          <p className="text-[1.5rem] p-2 bg-[#232f3e] text-white w-full flex gap-2 justify-center items-center text-center">
            {/* <FaHeart size={25} /> */}
            <img
              className="w-[2rem] h-[2rem]"
              src={
                "https://res.cloudinary.com/druohnmyv/image/upload/v1723819316/assests/vhigwxcoye0vxytnraij.png"
              }
              alt="logo"
            />
            Favorites
          </p>
        </div>
        <div className="lg:hidden flex items-center text-gray-700 mt-2 ml-3">
          <Link to="/">
            <FaHome size={20} />
          </Link>
          <IoIosArrowForward />
          <Link to={`/myaccount/${userID}`}>
            <IoPeopleSharp size={20} />
          </Link>
          <IoIosArrowForward />
          <p>Favorites</p>
        </div>
        <div className="lg:mt-6 flex flex-col lg:px-4 text-base">
          <div className="mx-4 my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden rounded-md border border-gray-200 md:rounded-lg w-full">
                <table className="min-w-full divide-gray-200 divide-y">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left font-normal text-gray-700"
                      >
                        <span className="flex gap-1">
                          {/* <MdMeetingRoom size={25} /> */}
                          <img
                            className="h-7 w-7"
                            src={
                              "https://res.cloudinary.com/druohnmyv/image/upload/v1723819315/assests/ly9sxoqztlo9bh2fz6iv.png"
                            }
                            alt=""
                          />
                          Room
                        </span>
                      </th>
                      <th
                        scope="col"
                        className="px-8 py-3.5 text-left font-normal text-gray-700"
                      >
                        <span className="flex gap-1">
                          <img
                            className="h-7 w-7"
                            src={
                              "https://res.cloudinary.com/druohnmyv/image/upload/v1723819325/assests/zneulaispaafq6pzowd5.png"
                            }
                            alt=""
                          />
                          City,State
                        </span>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-left font-normal text-gray-700"
                      >
                        <span className="flex gap-1">
                          {/* <AiFillDollarCircle size={24} /> */}
                          <img
                            className="h-7 w-7"
                            src={
                              "https://res.cloudinary.com/druohnmyv/image/upload/v1723819323/assests/q0rjjk9jli8t8yorkfy9.png"
                            }
                            alt=""
                          />
                          Rent{" "}
                        </span>
                      </th>
                      <th
                        scope="col"
                        className="px-8 py-3.5 text-left font-normal text-gray-700 whitespace-nowrap"
                      >
                        <span className="flex gap-1">
                          {/* <MdFindInPage size={24} /> */}
                          <img
                            className="h-7 w-7"
                            src={
                              "https://res.cloudinary.com/druohnmyv/image/upload/v1723819322/assests/iv0ffu9emgi4k0q7frqg.png"
                            }
                            alt=""
                          />
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
                        className="px-8 py-3.5 font-normal text-gray-700"
                      >
                        <span className="flex gap-1">
                          {/* <IoIosRemoveCircle size={24} /> */}
                          <img
                            className="h-7 w-7"
                            src={
                              "https://res.cloudinary.com/druohnmyv/image/upload/v1723819315/assests/ypojptmu0i6hqvvsjd1r.png"
                            }
                            alt=""
                          />
                          Remove
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white text-base">
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
        totalRooms={data.length}
        roomsPerPage="8"
        paginate={paginate}
      />
    </DashConatiner>
  );
}

export default ListAllwish;
