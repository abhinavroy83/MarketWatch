import React from "react";
import { useSelector } from "react-redux";
import { DashConatiner } from "../../components";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import settings2 from "../../assets/settings2.png";
import rooms from "../../assets/rooms.png";
import job2 from "../../assets/job2.png";
import event2 from "../../assets/event2.png";
import movie2 from "../../assets/movie2.png";
import work from "../../assets/work.png";
function User() {
  const username = useSelector((state) => state.auth.user);
  // console.log(username);
  const notify = () => toast("Coming Soon...");
  const { userID } = useParams();
  return (
    <DashConatiner>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <h1 className="lg:text-[25px] text-[22px] text-center text-[#232f3e] mt-0 lg:mt-7 font-['udemy-regular']">
        Welcome Back {username}
      </h1>
      <p className="text-gray-600 text-center lg:hidden">address</p>

      <div className="grid grid-cols-3 gap-4 flex-wrap w-auto m-auto justify-center mt-4 lg:mt-10 max-w-[860px] font-['udemy-regular']">
        <Link to={`/dashboard/profile/${userID}`}>
          <div className="">
            <div className="bg-white text-center border flex flex-col gap-3 items-center rounded-lg shadow-md hover:shadow-xl w-full justify-center h-[110px] lg:h-[170px]">
              <img
                className="w-[2.5rem] h-[2.5rem] lg:w-[4rem] lg:h-[4rem]"
                src={settings2}
                alt="logo"
              />
              <h1 className="text-[17px] lg:text-[22px] text-center text-[#000]">
                Settings
              </h1>
            </div>
          </div>
        </Link>
        <Link to={`/user/room/${userID}`}>
          <div className="">
            <div className="bg-white text-center border flex flex-col gap-3 items-center rounded-lg shadow-md hover:shadow-xl w-full justify-center h-[110px] lg:h-[170px]">
              <img
                className="w-[2.5rem] h-[2.5rem] lg:w-[4rem] lg:h-[4rem]"
                src={rooms}
                alt="logo"
              />
              <h1 className="text-[17px] lg:text-[22px] text-center text-[#000] font-['udemy-regular']">
                Rooms
              </h1>
            </div>
          </div>
        </Link>
        <div className="" onClick={notify}>
          <div className="bg-white text-center border flex flex-col gap-3 items-center rounded-lg shadow-md hover:shadow-xl w-full justify-center h-[110px] lg:h-[170px]">
            <img
              className="w-[2.5rem] h-[2.5rem] lg:w-[4rem] lg:h-[4rem]"
              src={job2}
              alt="logo"
            />
            <h1 className="text-[17px] lg:text-[22px] text-center text-[#000] font-['udemy-regular']">
              Jobs
            </h1>
          </div>
        </div>
        <div className="" onClick={notify}>
          <div className="bg-white text-center border flex flex-col gap-3 items-center rounded-lg shadow-md hover:shadow-xl w-full justify-center h-[110px] lg:h-[170px]">
            <img
              className="w-[2.5rem] h-[2.5rem] lg:w-[4rem] lg:h-[4rem]"
              src={event2}
              alt="logo"
            />
            <h1 className="text-[17px] lg:text-[22px] text-center text-[#000] font-['udemy-regular']">
              Events
            </h1>
          </div>
        </div>
        <div className="" onClick={notify}>
          <div className="bg-white text-center border flex flex-col gap-3 items-center rounded-lg shadow-md hover:shadow-xl w-full justify-center h-[110px] lg:h-[170px]">
            <img
              className="w-[2.5rem] h-[2.5rem] lg:w-[4rem] lg:h-[4rem]"
              src={movie2}
              alt="logo"
            />
            <h1 className="text-[17px] lg:text-[22px] text-center text-[#000] font-['udemy-regular']">
              Movies
            </h1>
          </div>
        </div>
        <Link
          onClick={notify}
          // to={`/user/bussiness/${userID}`}
        >
          <div className="">
            <div className="bg-white text-center border flex flex-col gap-3 items-center rounded-lg shadow-md hover:shadow-xl w-full justify-center h-[110px] lg:h-[170px]">
              <img
                className="w-[2.5rem] h-[2.5rem] lg:w-[4rem] lg:h-[4rem]"
                src={work}
                alt="logo"
              />
              <h1 className="text-[17px] lg:text-[22px] text-center text-[#000] font-['udemy-regular']">
                Business
              </h1>
            </div>
          </div>
        </Link>
      </div>
    </DashConatiner>
  );
}

export default User;
