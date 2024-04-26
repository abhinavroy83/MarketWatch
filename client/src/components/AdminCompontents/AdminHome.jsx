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
    <div className="font-roboto text-[20px]">
      <AdminHeader />
      <AdminDashboard>
        <div className="text-[#0b5e86] font-bold text-[30px] mt-4 items-center justify-center text-center">
          <p className="border-b-2 border-gray-500 pb-4">Home Page</p>{" "}
          <hr className="text-black"></hr>
          <p className="mt-4">Welcome , {role}</p>
          <div className="grid grid-cols-3 gap-4 flex-wrap w-auto m-auto justify-center mt-10 max-w-[860px]">
            <Link>
              <div className="">
                <div className="bg-white text-center flex flex-col items-center rounded-lg shadow-md hover:shadow-xl w-full justify-center h-[170px]">
                  <img
                    className="w-[3.9rem] h-15"
                    src={`https://t4.ftcdn.net/jpg/04/83/90/95/360_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg`}
                    alt="logo"
                  />
                  <h1 className="text-[22px] text-center font-bold text-[#000] mt-3 font-roboto">
                    Your Profile
                  </h1>
                </div>
              </div>
            </Link>
            <Link>
              <div className="">
                <div className="bg-white text-center flex flex-col items-center rounded-lg shadow-md hover:shadow-xl w-full justify-center h-[170px]">
                  <img
                    className="w-[4.9rem] h-15"
                    src={`https://cdn-icons-png.flaticon.com/512/751/751683.png`}
                    alt="logo"
                  />
                  <h1 className="text-[22px] text-center font-bold text-[#000] mt-3 font-roboto">
                    Rooms
                  </h1>
                </div>
              </div>
            </Link>
            <div className="" onClick={notify}>
              <div className="bg-white text-center flex flex-col items-center rounded-lg shadow-md hover:shadow-xl w-full justify-center h-[170px]">
                <img
                  className="w-[4.9rem] h-15"
                  src={`https://cdn-icons-png.flaticon.com/512/3688/3688609.png`}
                  alt="logo"
                />
                <h1 className="text-[22px] text-center font-bold text-[#000] mt-3 font-roboto">
                  Jobs
                </h1>
              </div>
            </div>
            <div className="" onClick={notify}>
              <div className="bg-white text-center flex flex-col items-center rounded-lg shadow-md hover:shadow-xl w-full justify-center h-[170px]">
                <img
                  className="w-[6.4rem] h-13"
                  src={`https://img.freepik.com/premium-vector/upcoming-events-announcement-megaphone-label-loudspeaker-speech-bubble_123447-5297.jpg`}
                  alt="logo"
                />
                <h1 className="text-[22px] text-center font-bold text-[#000] mt-3 font-roboto">
                  Events
                </h1>
              </div>
            </div>
            <div className="" onClick={notify}>
              <div className="bg-white text-center flex flex-col items-center rounded-lg shadow-md hover:shadow-xl w-full justify-center h-[170px]">
                <img
                  className="w-[4.9rem] h-15"
                  src={`https://www.freeiconspng.com/thumbs/movie-icon/movie-icon-6.png`}
                  alt="logo"
                />
                <h1 className="text-[22px] text-center font-bold text-[#000] mt-3 font-roboto">
                  Movies
                </h1>
              </div>
            </div>
            <Link
              onClick={notify}
              // to={`/user/bussiness/${userID}`}
            >
              <div className="">
                <div className="bg-white text-center flex flex-col items-center rounded-lg shadow-md hover:shadow-xl w-full justify-center h-[170px]">
                  <img
                    className="w-[4.9rem] h-15"
                    src={`https://freepngimg.com/download/business/70298-management-business-icons-consultant-company-social-marketing.png`}
                    alt="logo"
                  />
                  <h1 className="text-[22px] text-center font-bold text-[#000] mt-3 font-roboto">
                    Business
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
