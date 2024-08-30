import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function AdminDashboard({ children }) {
  const navigate = useNavigate();
  const role = useSelector((state) => state.adminauth.role);

  return (
    <div className="max-w-screen mx-auto flex max-h-full mt-16 justify-center  overflow-hidden font-['udemy-regular'] text-[20px]">
      <div className="w-[20%] h-full border p-2 hidden lg:flex flex-col items-center overflow-y-hidden fixed top-0 left-0 mt-20  ">
        <button
          onClick={() => {
            navigate(`/admin/dashboard`);
          }}
          className="bg-transparent rounded-md py-1 px-4 w-full flex gap-4 items-center hover:bg-gray-200 text-black leading-8 self-start lg:mt-2 capitalize text-[1.1rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visibl2:outline-black "
        >
          {/* <FaHome size={22} /> */}
          <img
            className="w-[1.7rem] h-[1.7rem]"
            src={
              "https://res.cloudinary.com/druohnmyv/image/upload/v1723819318/assests/akrrzl8olto182qtjfpk.png"
            }
            alt="logo"
          />{" "}
          Dashboard
        </button>
        <button
          onClick={() => {
            navigate(`/admin/alluser`);
          }}
          className="bg-transparent rounded-md py-1 px-4 w-full flex gap-4 items-center hover:bg-gray-200 text-black leading-8 self-start lg:mt-2 capitalize text-[1.1rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visibl2:outline-black "
        >
          {/* <IoPeopleSharp size={25} /> */}
          <img
            className="w-[1.9rem] h-[1.9rem]"
            src={
              "https://res.cloudinary.com/druohnmyv/image/upload/v1723819314/assests/imzqwxnajxibddxvva8z.png"
            }
            alt="logo"
          />
          Basic Users
        </button>
        {role === "Admin" && (
          <button
            onClick={() => {
              navigate(`/admin/getalladminsuser`);
            }}
            className="bg-transparent rounded-md py-1 px-4 w-full flex gap-4 items-center hover:bg-gray-200 text-black leading-8 self-start lg:mt-2 capitalize text-[1.1rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visibl2:outline-black "
          >
            {/* <RiAdminFill size={25} /> */}
            <img
              className="w-[1.9rem] h-[1.9rem]"
              src={
                "https://res.cloudinary.com/druohnmyv/image/upload/v1723819313/assests/ovw4cjt2lh2vgjh8ldtc.png"
              }
              alt="logo"
            />
            Admin Users
          </button>
        )}
        {role === "Admin" || role === "Manager" ? (
          <button
            onClick={() => {
              navigate(`/admin/getapproval`);
            }}
            className="bg-transparent rounded-md py-1 px-4 w-full flex gap-4 items-center hover:bg-gray-200 text-black leading-8 self-start lg:mt-2 capitalize text-[1.1rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visibl2:outline-black "
          >
            {/* <MdPendingActions size={25} /> */}
            <img
              className="w-[1.7rem] h-[1.7rem]"
              src={
                "https://res.cloudinary.com/druohnmyv/image/upload/v1723819322/assests/xyfjounlsemq9i8ttn3x.png"
              }
              alt="logo"
            />
            Pending Requests
          </button>
        ) : null}
        {role === "Admin" || role === "Manager" ? (
          <button
            onClick={() => {
              navigate(`/admin/allarea`);
            }}
            className="bg-transparent rounded-md py-1 px-4 w-full flex gap-4 items-center hover:bg-gray-200 text-black leading-8 self-start lg:mt-2 capitalize text-[1.1rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visibl2:outline-black "
          >
            {/* <FaMapPin size={22} /> */}
            <img
              className="w-[1.7rem] h-[1.7rem]"
              src={
                "https://res.cloudinary.com/druohnmyv/image/upload/v1723819320/assests/lesvajdewhwtq2hja4ta.png"
              }
              alt="logo"
            />
            Area
          </button>
        ) : null}
        {role === "CustomerSupport" ? (
          <button
            onClick={() => {
              navigate(`/admin/requests`);
            }}
            className="bg-transparent rounded-md py-1 px-4 w-full flex gap-4 items-center hover:bg-gray-200 text-black leading-8 self-start lg:mt-2 capitalize text-[1.1rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visibl2:outline-black "
          >
            {/* <MdOutlineSpatialTracking size={25} /> Track Status */}
            {/* <img className="w-[1.7rem] h-[1.7rem]" src={track} alt="logo" /> */}
          </button>
        ) : null}
        {role === "Admin" || role === "CustomerSupport" ? (
          <button
            onClick={() => {
              navigate(`/admin/allroom`);
            }}
            className="bg-transparent rounded-md py-1 px-4 w-full flex gap-4 items-center hover:bg-gray-200 text-black leading-8 self-start lg:mt-2 capitalize text-[1.1rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visibl2:outline-black "
          >
            <img
              className="w-[1.9rem] h-[1.9rem]"
              src={
                "https://res.cloudinary.com/druohnmyv/image/upload/v1723819317/assests/lpw6k7vesuhd4kaipta8.png"
              }
              alt="logo"
            />
            {/* <BsPostcard size={25} />  */}
            Rooms
          </button>
        ) : null}
        <button
          onClick={() => {
            navigate(`/admin/getHelp`);
          }}
          className="bg-transparent rounded-md py-1 px-4 w-full flex gap-4 items-center hover:bg-gray-200 text-black leading-8 self-start lg:mt-2 capitalize text-[1.1rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visibl2:outline-black "
        >
          <img
            className="w-[1.9rem] h-[1.9rem]"
            src={
              "https://res.cloudinary.com/druohnmyv/image/upload/v1724350531/assests/oyqisjnu9p3lotoidgry.png"
            }
            alt="logo"
          />
          {/* <BsPostcard size={25} />  */}
          Customer Message
        </button>
        {/* <button
          onClick={() => {
            // navigate(`/user/job/${userID}`);
          }}
          className="text-[22px] text-white rounded-md bg-transparent px-3 py-2 font-semibold transition duration-300 ease-in-out hover:bg-white hover:text-[#0b5e86] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Jobs
        </button> */}
        {/* <button
          onClick={() => {
            navigate(`/admin/allbussiness`);
          }}
          className="text-[22px] text-white rounded-md bg-transparent px-3 py-2 font-semibold transition duration-300 ease-in-out hover:bg-white hover:text-[#0b5e86] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Bussiness
        </button> */}
      </div>

      <main className="w-auto h-screen lg:w-4/5 border p-2 ml-[20%] overflow-y-auto  mt-3 lg:mt-0">
        {children}
      </main>
    </div>
  );
}

export default AdminDashboard;
