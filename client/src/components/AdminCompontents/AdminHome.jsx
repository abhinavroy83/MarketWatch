import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../Container/Container";
import { Link, useNavigate } from "react-router-dom";
import { logout as adminlogout } from "../../store/adminauthslice";
import AdminDashboard from "./container/Dashboard";
import AdminHeader from "./AdminHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import home from "../../assets/home.png";
import basicuser from "../../assets/basicuser.png";
import adminuser from "../../assets/adminuser.png";
import pending from "../../assets/pending.png";
import map from "../../assets/map.png";
import rooms from "../../assets/rooms.png";
function AdminHome() {
  const role = useSelector((state) => state.adminauth.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notify = () => toast("Coming Soon...");

  return (
    <div className="font-['udemy-regular'] text-[20px]">
      <AdminHeader />
      <AdminDashboard>
        <div className="text-black text-[25px] mt-4 items-center justify-center text-center">
          <p className="border-b-2 border-gray-500 pb-4">Home Page</p>{" "}
          <hr className="text-black"></hr>
          <p className="mt-4">Welcome , {role}</p>
          <div className="grid grid-cols-3 gap-4 flex-wrap w-auto m-auto justify-center mt-10 max-w-[860px]">
            <Link>
              <div className="">
                <div className="bg-white text-center border flex flex-col gap-3 items-center rounded-lg shadow-md hover:shadow-xl w-full justify-center h-[110px] lg:h-[170px]">
                  <img
                    className="w-[2.5rem] h-[2.5rem] lg:w-[4rem] lg:h-[4rem]"
                    src={home}
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
                    className="w-[2.5rem] h-[2.5rem] lg:w-[4rem] lg:h-[4rem]"
                    src={basicuser}
                    alt="logo"
                  />
                  <h1 className="text-[17px] lg:text-[22px] text-center text-[#000]">
                    Basic Users
                  </h1>
                </div>
              </div>
            </Link>
            <div className="" onClick={notify}>
              <div className="bg-white text-center border flex flex-col gap-3 items-center rounded-lg shadow-md hover:shadow-xl w-full justify-center h-[110px] lg:h-[170px]">
                <img
                  className="w-[2.5rem] h-[2.5rem] lg:w-[4rem] lg:h-[4rem]"
                  src={adminuser}
                  alt="logo"
                />
                <h1 className="text-[17px] lg:text-[22px] text-center text-[#000]">
                  Admin Users
                </h1>
              </div>
            </div>
            <Link className="" onClick={notify} to={`/admin/getapproval`}>
              <div className="bg-white text-center border flex flex-col gap-3 items-center rounded-lg shadow-md hover:shadow-xl w-full justify-center h-[110px] lg:h-[170px]">
                <img
                  className="w-[2.5rem] h-[2.5rem] lg:w-[4rem] lg:h-[4rem]"
                  src={pending}
                  alt="logo"
                />
                <h1 className="text-[17px] lg:text-[22px] text-center text-[#000]">
                  Pending Requestes
                </h1>
              </div>
            </Link>
            <Link className="" onClick={notify} to={`/admin/allarea`}>
              <div className="bg-white text-center border flex flex-col gap-3 items-center rounded-lg shadow-md hover:shadow-xl w-full justify-center h-[110px] lg:h-[170px]">
                <img
                  className="w-[2.5rem] h-[2.5rem] lg:w-[4rem] lg:h-[4rem]"
                  src={map}
                  alt="logo"
                />
                <h1 className="text-[17px] lg:text-[22px] text-center text-[#000]">
                  Area
                </h1>
              </div>
            </Link>
            <Link
              onClick={notify}
              // to={`/user/bussiness/${userID}`}
              to={`/admin/allroom`}
            >
              <div className="">
                <div className="bg-white text-center border flex flex-col gap-3 items-center rounded-lg shadow-md hover:shadow-xl w-full justify-center h-[110px] lg:h-[170px]">
                  <img
                    className="w-[2.5rem] h-[2.5rem] lg:w-[4rem] lg:h-[4rem]"
                    src={rooms}
                    alt="logo"
                  />
                  <h1 className="text-[17px] lg:text-[22px] text-center text-[#000]">
                    Rooms
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
