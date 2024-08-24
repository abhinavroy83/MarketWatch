import React, { useEffect, useState } from "react";
import {
  AdminDashboard,
  AdminHeader,
} from "../../../components/AdminCompontents";
import axios from "axios";
import Pagination from "../../../components/SharedCompontents/Pagination";

function AdminHelpMessage() {
  const [data, setdata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchdata = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/admin/gethepmessages"
      );
      // console.log(res);
      setdata(res.data.data);
    } catch (error) {
      console.log("error while fetcing api in helpdahs", error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const renderRows = () => {
    const startIndex = (currentPage - 1) * 7;
    const endIndex = Math.min(startIndex + 7, data.length);
    return data.slice(startIndex, endIndex).map((items) => (
      <tr key={items._id}>
        <td className="whitespace-nowrap cursor-pointer px-12 py-4">
          <div className=" text-gray-700 font-['udemy-regular']">
            {items.username}
          </div>
        </td>
        <td className="whitespace-nowrap cursor-pointer px-8 py-4 text-gray-700 font-['udemy-regular']">
          {items.useremail}
        </td>
        <td className="whitespace-nowrap px-8  py-4 text-gray-700 font-['udemy-regular'] cursor-pointer hover:text-blue-600">
          {items.user_phone_number}
        </td>
        <td className="whitespace-nowrap px-8  py-4 text-gray-700 font-['udemy-regular'] cursor-pointer hover:text-blue-600">
          {items.msg}
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

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <AdminHeader />
      <AdminDashboard>
        <div className="lg:hidden flex items-center text-gray-700 mt-2 text-[16px] font-['udemy-regular'] ">
          {/* <Link to="/admin/dashboard">
            <FaHome size={20} />
          </Link>
          <IoIosArrowForward /> */}
          <p className="text-[16px]">Help</p>
        </div>
        <section className="mx-auto font-['udemy-regular'] w-full max-w-7xl px-4 py-4">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <p className="text-[20px] font-semibold">Helped Messages</p>
              <p className="mt-1 text-[17px] text-gray-700 font-['udemy-regular']">
                This is list of all messages.
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-col">
            <div className="-mx-4 -my-2 overflow-scroll sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr className="">
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-base font-normal text-gray-700"
                        >
                          <div className="flex gap-1">
                            {" "}
                            {/* <MdOutlineMeetingRoom size={23} /> */}
                            <img
                              className="h-7 w-7"
                              src={
                                "https://res.cloudinary.com/druohnmyv/image/upload/v1723819322/assests/nxmtyldoiednbigmryxy.png"
                              }
                              alt=""
                            />
                            Name
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-base font-normal text-gray-700"
                        >
                          <div className="flex gap-1">
                            {" "}
                            {/* <MdOutlineEmail size={23} /> */}
                            <img
                              className="h-6 w-6"
                              src={
                                "https://res.cloudinary.com/druohnmyv/image/upload/v1723819316/assests/mt0cax1frqy37toddlr6.png"
                              }
                              alt=""
                            />
                            Email
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3.5 text-left text-base font-normal text-gray-700"
                        >
                          <div className="flex gap-1">
                            {" "}
                            {/* <TfiMoney size={20} /> */}
                            <img
                              className="h-7 w-7"
                              src={
                                "https://res.cloudinary.com/druohnmyv/image/upload/v1723819322/assests/fljdbb2rrycts9fmradi.png"
                              }
                              alt=""
                            />
                            Phone Number
                          </div>
                        </th>
                        {/* <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-base font-normal text-gray-500"
                      >
                        Address
                      </th> */}
                        <th
                          scope="col"
                          className="px-8 py-3.5 text-left text-base font-normal text-gray-700"
                        >
                          <div className="flex gap-1">
                            {" "}
                            {/* <FaMapPin size={20} />  */}
                            <img
                              className="h-7 w-7"
                              src={
                                "https://res.cloudinary.com/druohnmyv/image/upload/v1723819320/assests/lesvajdewhwtq2hja4ta.png"
                              }
                              alt=""
                            />
                            Messages
                          </div>
                        </th>
                        {/* <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-base font-normal text-gray-700"
                        >
                          <div className="flex gap-1">
                            {" "}
                            <img
                              className="h-7 w-7"
                              src={
                                "https://res.cloudinary.com/druohnmyv/image/upload/v1723819315/assests/g4etlnb8nxgrgxdfusct.png"
                              }
                              alt=""
                            />
                            Edit
                          </div>
                        </th> */}
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-base font-normal text-gray-700"
                        >
                          <div className="flex gap-1">
                            {" "}
                            {/* <MdDeleteForever size={25} /> */}
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
          totalRooms={data.length}
          roomsPerPage="8"
          paginate={paginate}
        />
      </AdminDashboard>
    </div>
  );
}

export default AdminHelpMessage;
