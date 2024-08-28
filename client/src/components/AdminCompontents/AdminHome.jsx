import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../Container/Container";
import { Link, useNavigate } from "react-router-dom";
import { logout as adminlogout } from "../../store/adminauthslice";
import AdminDashboard from "./container/Dashboard";
import AdminHeader from "./AdminHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AdminHome() {
  const role = useSelector((state) => state.adminauth.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notify = () => toast("Coming Soon...");

  return (
    <div className="font-['udemy-regular'] text-[20px]">
      <AdminHeader />
      <AdminDashboard>
        <div className="text-black lg:text-[25px] text-[22px] items-center justify-center text-center">
          <p className="">Home Page</p> <p className="mt-2">Welcome, {role}</p>
          <div className="grid grid-cols-3 gap-4 flex-wrap w-auto m-auto justify-center mt-4 max-w-[860px]">
            <Link>
              <div className="">
                <div className="bg-white text-center border flex flex-col gap-3 items-center rounded-lg shadow-md hover:shadow-xl w-full justify-center h-[110px] lg:h-[170px]">
                  <img
                    className="w-[2.5rem] h-[2.5rem] lg:w-[3.3rem] lg:h-[3.3rem]"
                    src={
                      "https://res.cloudinary.com/druohnmyv/image/upload/v1723819318/assests/akrrzl8olto182qtjfpk.png"
                    }
                    alt="logo"
                  />
                  <h1 className="text-[17px] lg:text-[22px] text-center text-[#000]">
                    Dashboard
                  </h1>
                </div>
              </div>
            </Link>
            <Link to={`/admin/alluser`}>
              <div className="">
                <div className="bg-white text-center border flex flex-col gap-3 items-center rounded-lg shadow-md hover:shadow-xl w-full justify-center h-[110px] lg:h-[170px]">
                  <img
                    className="w-[2.5rem] h-[2.5rem] lg:w-[3.3rem] lg:h-[3.3rem]"
                    src={
                      "https://res.cloudinary.com/druohnmyv/image/upload/v1723819314/assests/imzqwxnajxibddxvva8z.png"
                    }
                    alt="logo"
                  />
                  <h1 className="text-[17px] lg:text-[22px] text-center text-[#000]">
                    Basic Users
                  </h1>
                </div>
              </div>
            </Link>
            <div className="">
              <div className="bg-white text-center border flex flex-col gap-3 items-center rounded-lg shadow-md hover:shadow-xl w-full justify-center h-[110px] lg:h-[170px]">
                <img
                  className="w-[2.5rem] h-[2.5rem] lg:w-[3.3rem] lg:h-[3.3rem]"
                  src={
                    "https://res.cloudinary.com/druohnmyv/image/upload/v1723819313/assests/ovw4cjt2lh2vgjh8ldtc.png"
                  }
                  alt="logo"
                />
                <h1 className="text-[17px] lg:text-[22px] text-center text-[#000]">
                  Admin Users
                </h1>
              </div>
            </div>
            <Link className="" to={`/admin/getapproval`}>
              <div className="bg-white text-center border flex flex-col lg:gap-3 items-center rounded-lg shadow-md hover:shadow-xl w-full justify-center h-[110px] lg:h-[170px]">
                <img
                  className="w-[2rem] h-[2rem] lg:w-[3rem] lg:h-[3rem]"
                  src={
                    "https://res.cloudinary.com/druohnmyv/image/upload/v1723819322/assests/xyfjounlsemq9i8ttn3x.png"
                  }
                  alt="logo"
                />
                <h1 className="text-[17px] lg:text-[22px] text-center text-[#000]">
                  Pending Requests
                </h1>
              </div>
            </Link>
            <Link className="" to={`/admin/allarea`}>
              <div className="bg-white text-center border flex flex-col gap-3 items-center rounded-lg shadow-md hover:shadow-xl w-full justify-center h-[110px] lg:h-[170px]">
                <img
                  className="w-[2.5rem] h-[2.5rem] lg:w-[3rem] lg:h-[3rem]"
                  src={
                    "https://res.cloudinary.com/druohnmyv/image/upload/v1723819320/assests/lesvajdewhwtq2hja4ta.png"
                  }
                  alt="logo"
                />
                <h1 className="text-[17px] lg:text-[22px] text-center text-[#000]">
                  Area
                </h1>
              </div>
            </Link>
            <Link to={`/admin/allroom`}>
              <div className="">
                <div className="bg-white text-center border flex flex-col gap-3 items-center rounded-lg shadow-md hover:shadow-xl w-full justify-center h-[110px] lg:h-[170px]">
                  <img
                    className="w-[3rem] h-[3rem] lg:w-[4.4rem] lg:h-[4.4rem]"
                    src={
                      "https://res.cloudinary.com/druohnmyv/image/upload/v1723819317/assests/lpw6k7vesuhd4kaipta8.png"
                    }
                    alt="logo"
                  />
                  <h1 className="text-[17px] lg:text-[22px] text-center text-[#000]">
                    Rooms
                  </h1>
                </div>
              </div>
            </Link>
            <Link to={`/admin/getHelp`}>
              <div className="">
                <div className="bg-white text-center border flex flex-col lg:gap-3 items-center rounded-lg shadow-md hover:shadow-xl w-full justify-center h-[110px] lg:h-[170px]">
                  <img
                    className="w-[2rem] h-[2rem] lg:w-[3rem] lg:h-[3rem]"
                    src={
                      "https://res.cloudinary.com/druohnmyv/image/upload/v1724350531/assests/oyqisjnu9p3lotoidgry.png"
                    }
                    alt="logo"
                  />
                  <h1 className="text-[16px] lg:text-[22px] text-center text-[#000]">
                    Customer Message
                  </h1>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </AdminDashboard>
    </div>
  );
}

export default AdminHome;
