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
  const notify = () =>
    toast("Coming Soon...");

  return (
    <div className="font-['udemy-regular'] text-[20px]">
      <AdminHeader />
      <AdminDashboard>
        <div className="text-black font-bold text-[25px] mt-4 items-center justify-center text-center">
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
                    Home Page
                  </h1>
                </div>
              </div>
            </Link>
            <Link to={`/admin/alluser`}>
              <div className="">
                <div className="bg-white text-center flex flex-col items-center rounded-lg shadow-md hover:shadow-xl w-full justify-center h-[170px]">
                  <img
                    className="w-[4.9rem] h-15"
                    src={`https://static.vecteezy.com/system/resources/thumbnails/000/439/520/small_2x/Basic_Ui__28185_29.jpg`}
                    alt="logo"
                  />
                  <h1 className="text-[22px] text-center font-bold text-[#000] mt-3 font-roboto">
                    Basic Users
                  </h1>
                </div>
              </div>
            </Link>
            <div className="" onClick={notify}>
              <div className="bg-white text-center flex flex-col items-center rounded-lg shadow-md hover:shadow-xl w-full justify-center h-[170px]">
                <img
                  className="w-[4.9rem] h-15"
                  src={`https://cdn-icons-png.flaticon.com/512/4668/4668808.png`}
                  alt="logo"
                />
                <h1 className="text-[22px] text-center font-bold text-[#000] mt-3 font-roboto">
                  Admin Users
                </h1>
              </div>
            </div>
            <Link className="" onClick={notify} to={`/admin/getapproval`}>
              <div className="bg-white text-center flex flex-col items-center rounded-lg shadow-md hover:shadow-xl w-full justify-center h-[170px]">
                <img
                  className="w-[4.4rem] h-13"
                  src={`https://cdn-icons-png.freepik.com/512/12179/12179310.png`}
                  alt="logo"
                />
                <h1 className="text-[22px] text-center font-bold text-[#000] mt-3 font-roboto">
                  Pending Requestes
                </h1>
              </div>
            </Link>
            <Link className="" onClick={notify} to={`/admin/allarea`}>
              <div className="bg-white text-center flex flex-col items-center rounded-lg shadow-md hover:shadow-xl w-full justify-center h-[170px]">
                <img
                  className="w-[4.9rem] h-15"
                  src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSshtTS_vGs6BYaAZgseMNvqzmW4UAqXhT4WVNtAgHI-w&s`}
                  alt="logo"
                />
                <h1 className="text-[22px] text-center font-bold text-[#000] mt-3 font-roboto">
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
          </div>
        </div>
      </AdminDashboard>
    </div>
  );
}

export default AdminHome;
