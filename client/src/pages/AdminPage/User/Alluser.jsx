import React, { useEffect, useState } from "react";
import {
  AdminDashboard,
  AdminHeader,
} from "../../../components/AdminCompontents";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowAltCircleRight, FaHome } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import Pagination from "../../../components/SharedCompontents/Pagination";
function Alluser() {
  const [data, setdata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const role = useSelector((state) => state.adminauth.role);
  const token = useSelector((state) => state.adminauth.token);
  const [disabledButtons, setDisabledButtons] = useState([]);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const fetchuser = async () => {
    try {
      const res = await axios.get(
        " https://api.verydesi.com/api/admin/alluser"
      );
      // console.log(res.data);
      setdata(res.data.user);
    } catch (error) {
      console.log("error during fetcing all user", error);
    }
  };
  useEffect(() => {
    fetchuser();
  }, []);

  const deleteuser = async (_id) => {
    console.log(_id);
    try {
      const userId = _id;

      if (role === "CustomerSupport") {
        // console.log("userId", userId);
        const res = await axios.post(
          ` https://api.verydesi.com/api/admin/createapproval`,
          { userId: _id },
          {
            headers: {
              jwttoken: `${token}`,
            },
            withCredentials: true,
          }
        );
        if (res) {
          alert("done");
          setDisabledButtons((prevButtons) => [...prevButtons, _id]);
        }
      } else {
        const dlt = await axios.delete(
          ` https://api.verydesi.com/api/admin/deleteuser/${_id}`
        );
        if (dlt) {
          alert("successfully deleted");
        }
      }
    } catch (error) {
      console.log("some issue while deleting try again", error);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const renderRows = () => {
    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, data.length);
    return data.slice(startIndex, endIndex).map((items) => (
      <tr key={items._id} className="">
        <td className="whitespace-nowrap px-8 py-4 text-base text-gray-500">
          {items.firstName}
        </td>
        <td className="whitespace-nowrap px-8 py-4 text-base text-gray-500">
          {items.lastName}
        </td>
        <td className="whitespace-nowrap px-6 py-4">
          <div className="text-base text-gray-500">{items.email}</div>
        </td>
        <td
          className={`whitespace-nowrap px-8 py-4 text-base   ${
            items.isVerified ? "text-green-500" : "text-red-500"
          }`}
        >
          {items.isVerified ? "verified" : "unverified"}
        </td>
        {/* <td className="whitespace-nowrap px-4 py-4 text-base text-gray-500">
          {items.country}
        </td> */}
        <td className="whitespace-nowrap px-8 py-4 text-base font-medium">
          <button
            onClick={() => {
              navigate(`/admin/userprofile/${items._id}`);
            }}
            className="text-indigo-600"
          >
            Edit
          </button>
        </td>
        <td className="whitespace-nowrap px-8 py-4 text-base font-medium text-red-600">
          <button
            onClick={() => {
              const _id = items._id;
              if (role === "CustomerSupport") {
                if (confirm("Send Approved") == true) {
                  deleteuser(_id);
                  console.log(token);
                } else {
                  console.log("cancle");
                }
              } else {
                if (confirm("Confirm to delete") == true) {
                  // deleteuser(_id);
                  navigate(`/admin/confirmtodelete/${_id}`, {
                    state: { id: _id },
                  });
                } else {
                  console.log("cancle");
                }
              }
            }}
            disabled={disabledButtons.includes(items._id)}
          >
            {disabledButtons.includes(items._id) ? (
              <p className=" cursor-not-allowed">process</p>
            ) : (
              "Delete"
            )}
          </button>
        </td>
      </tr>
    ));
  };
  return (
    <div>
      <AdminDashboard>
        <section className="mx-auto w-full  px-4 py-4">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="lg:hidden flex items-center text-gray-700 mt-2  font-['udemy-regular'] ">
              <Link to="/admin/dashboard">
                <FaHome size={20} />
              </Link>
              <IoIosArrowForward />
              <p>users</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">All User</h2>
              
              <nav className="text-sm font-medium my-1" aria-label="Breadcrumb">
                <ol className="list-none p-0 inline-flex">
                  <li className="flex items-center">
                    <Link
                      to="/admin/dashboard"
                      className="text-gray-500 hover:text-gray-700"
                    >
                      Home
                    </Link>
                    <svg
                      className="fill-current w-3 h-3 mx-3"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                    >
                      <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
                    </svg>
                  </li>

                  <li>
                    <span className="text-gray-700" aria-current="page">
                      Users List
                    </span>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <div className="mt-6 flex flex-col">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr className="">
                        <th
                          scope="col"
                          className="px-8 py-3.5 text-left text-base font-normal text-gray-700 whitespace-nowrap"
                        >
                          <div className="flex gap-2">
                            {" "}
                            {/* <BsFillPersonBadgeFill size={20} /> */}
                            <img
                              className="h-7 w-7"
                              src={
                                "https://res.cloudinary.com/druohnmyv/image/upload/v1723819322/assests/nxmtyldoiednbigmryxy.png"
                              }
                              alt=""
                            />
                            First Name
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-8 py-3.5 text-left text-base font-normal text-gray-700 whitespace-nowrap"
                        >
                          <div className="flex gap-2">
                            {" "}
                            {/* <BsFillPersonBadgeFill size={20} />  */}
                            <img
                              className="h-7 w-7"
                              src={
                                "https://res.cloudinary.com/druohnmyv/image/upload/v1723819322/assests/nxmtyldoiednbigmryxy.png"
                              }
                              alt=""
                            />
                            Last Name
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-8 py-3.5 text-left text-base font-normal text-gray-700"
                        >
                          <div className="flex gap-2">
                            {/* <MdOutlineEmail size={23} /> */}
                            <img
                              className="h-7 w-7"
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
                          className="px-8 py-3.5 text-left text-base font-normal text-gray-700"
                        >
                          <div className="flex gap-2">
                            {" "}
                            {/* <FaMapPin size={20} />  */}
                            <img
                              className="h-7 w-7"
                              src={
                                "https://res.cloudinary.com/druohnmyv/image/upload/v1723819320/assests/lesvajdewhwtq2hja4ta.png"
                              }
                              alt=""
                            />
                            status
                          </div>
                        </th>
                        {/* <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-base font-normal text-gray-700"
                        >
                          <div className="flex gap-1">
                            {" "}
                            <FaMapLocationDot size={20} /> Country
                          </div>
                        </th> */}
                        <th
                          scope="col"
                          className="px-8 py-3.5 text-left text-base font-normal text-gray-700"
                        >
                          <div className="flex gap-2">
                            {/* <MdEdit size={23} /> Edit */}
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
                          className="px-8 py-3.5 text-left text-base font-normal text-gray-700"
                        >
                          <div className="flex gap-2">
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
          <Pagination
            currentPage={currentPage}
            totalRooms={data.length}
            roomsPerPage="10"
            paginate={paginate}
          />
        </section>
      </AdminDashboard>
    </div>
  );
}

export default Alluser;
