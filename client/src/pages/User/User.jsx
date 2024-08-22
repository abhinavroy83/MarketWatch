import React, { useState } from "react";
import { useSelector } from "react-redux";
import { DashConatiner } from "../../components";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoSettingsSharp } from "react-icons/io5";
import Alert from "../../components/UserCompontents/Alert/Alert";
function User() {
  const username = useSelector((state) => state.auth.user);
  const [showAlert, setShowAlert] = useState(false);

  const handleAlertBar = () => {
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const notify = () =>
    toast("Coming Soon", {
      type: "error",
      className: "!bg-red-100",
    });
  const { userID } = useParams();
  return (
    <DashConatiner>
      {/* <ToastContainer
        position="top-right"
        autoClose={700000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        // theme="dark"
      /> */}
      {showAlert && <Alert close={false} type="error" text="Coming Soon" />}
      <div className="p-3">
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
                  src={
                    "https://res.cloudinary.com/druohnmyv/image/upload/v1723819325/assests/jxhk73i2js2oxrdxwb1h.png"
                  }
                  alt="logo"
                />
                {/* <IoSettingsSharp /> */}
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
                  src={
                    "https://res.cloudinary.com/druohnmyv/image/upload/v1723819324/assests/q6veig3biuyx8y2ggv2e.png"
                  }
                  alt="logo"
                />
                <h1 className="text-[17px] lg:text-[22px] text-center text-[#000] font-['udemy-regular']">
                  Rooms
                </h1>
              </div>
            </div>
          </Link>
          <Link to={`/dashboard/wishlist/${userID}`} className="">
            <div className="bg-white text-center border flex flex-col gap-3 items-center rounded-lg shadow-md hover:shadow-xl w-full justify-center h-[110px] lg:h-[170px]">
              <img
                className="w-[2.5rem] h-[2.5rem] lg:w-[3.7rem] lg:h-[3.7rem]"
                src={
                  "https://res.cloudinary.com/druohnmyv/image/upload/v1723819316/assests/vhigwxcoye0vxytnraij.png"
                }
                alt="logo"
              />
              <h1 className="text-[17px] lg:text-[22px] text-center text-[#000] font-['udemy-regular']">
                Favorites
              </h1>
            </div>
          </Link>
          {/* <div className="" onClick={notify}>
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
        </div> */}
          <div className="" onClick={handleAlertBar}>
            <div className="bg-white text-center border flex flex-col gap-3 items-center rounded-lg shadow-md hover:shadow-xl w-full justify-center h-[110px] lg:h-[170px]">
              <img
                className="w-[2.5rem] h-[2.5rem] lg:w-[4rem] lg:h-[4rem]"
                src={
                  "https://res.cloudinary.com/druohnmyv/image/upload/v1723819316/assests/bmskguxwd4vaiasjioux.png"
                }
                alt="logo"
              />
              <h1 className="text-[17px] lg:text-[22px] text-center text-[#000] font-['udemy-regular']">
                Events
              </h1>
            </div>
          </div>
          {/* <div className="" onClick={notify}>
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
        </div> */}
          {/* <Link onClick={notify} to={`/user/bussiness/${userID}`}>
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
        </Link> */}
        </div>
      </div>
    </DashConatiner>
  );
}

export default User;
