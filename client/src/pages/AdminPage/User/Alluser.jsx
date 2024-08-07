import React, { useEffect, useState } from "react";
import {
  AdminDashboard,
  AdminHeader,
} from "../../../components/AdminCompontents";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowAltCircleRight, FaHome } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaMapPin } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { BsFillPersonBadgeFill } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { IoPeopleSharp } from "react-icons/io5";
import removed from "../../../assets/removed.png";
import edit from "../../../assets/edit.png";
import map from "../../../assets/map.png";
import email from "../../../assets/email.png";
import namee from "../../../assets/namee.png";
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

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  const renderRows = () => {
    const itemsPerPage = 7;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, data.length);
    return data.slice(startIndex, endIndex).map((items) => (
      <tr key={items._id} className="">
        <td className="whitespace-nowrap px-4 py-4 text-base text-gray-500">
          {items.firstName}
        </td>
        <td className="whitespace-nowrap px-4 py-4 text-base text-gray-500">
          {items.lastName}
        </td>
        <td className="whitespace-nowrap px-6 py-4">
          <div className="text-base text-gray-500">{items.email}</div>
        </td>
        <td className="whitespace-nowrap px-4 py-4 text-base text-gray-500">
          {items.city}
        </td>
        {/* <td className="whitespace-nowrap px-4 py-4 text-base text-gray-500">
          {items.country}
        </td> */}
        <td className="whitespace-nowrap px-4 py-4 text-base font-medium">
          <a href="#" className="text-gray-500 hover:text-indigo-600">
            Edit
          </a>
        </td>
        <td className="whitespace-nowrap px-4 py-4 text-base font-medium hover:text-red-600 text-gray-500">
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
      <AdminHeader />
      <AdminDashboard>
        <section className="mx-auto w-full max-w-7xl px-4 py-4">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="lg:hidden flex items-center text-gray-700 mt-2  font-['udemy-regular'] ">
              <Link to="/admin/dashboard">
                <FaHome size={20} />
              </Link>
              <IoIosArrowForward />
              <p>users</p>
            </div>
            <div>
              <h2 className="text-[20px] font-semibold">All User</h2>
              <p className="mt-1 text-[17px] text-gray-700">
                This is a list of all All User. You can add new User, edit or
                delete existing ones.
              </p>
            </div>
            <div>
              {/* <button
                type="button"
                onClick={() => {
                  // navigate(`/addjobs/${userID}`);
                }}
                className="rounded-md bg-black px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Add new User
              </button> */}
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
                          className="px-6 py-3.5 text-left text-base font-normal text-gray-700 whitespace-nowrap"
                        >
                          <div className="flex gap-2">
                            {" "}
                            {/* <BsFillPersonBadgeFill size={20} /> */}
                            <img className="h-7 w-7" src={namee} alt="" />
                            First Name
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-base font-normal text-gray-700 whitespace-nowrap"
                        >
                          <div className="flex gap-2">
                            {" "}
                            {/* <BsFillPersonBadgeFill size={20} />  */}
                            <img className="h-7 w-7" src={namee} alt="" />
                            Last Name
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-base font-normal text-gray-700"
                        >
                          <div className="flex gap-2">
                            {/* <MdOutlineEmail size={23} /> */}
                            <img className="h-7 w-7" src={email} alt="" />
                            Email
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-base font-normal text-gray-700"
                        >
                          <div className="flex gap-2">
                            {" "}
                            {/* <FaMapPin size={20} />  */}
                            <img className="h-7 w-7" src={map} alt="" />
                            City
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
                          className="px-4 py-3.5 text-left text-base font-normal text-gray-700"
                        >
                          <div className="flex gap-2">
                            {/* <MdEdit size={23} /> Edit */}
                            <img className="h-7 w-7" src={edit} alt="" />
                            Edit
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-base font-normal text-gray-700"
                        >
                          <div className="flex gap-2">
                            {/* <MdDeleteForever size={25} /> */}
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
      </AdminDashboard>
    </div>
  );
}

export default Alluser;
