import React from "react";
import { useSelector } from "react-redux";
import { DashConatiner } from "../../components";
import { Link, useParams } from "react-router-dom";

function User() {
  const username = useSelector((state) => state.auth.user);
  // console.log(username);
  const { userID } = useParams();
  return (
    <DashConatiner>
      <h1 className="text-4xl text-center font-bold text-red-700 mt-7 font-[Montserrat]">
        Welcome Back {username}
      </h1>
      <div className="flex col-auto gap-4 flex-wrap w-[70%] m-auto justify-center mt-10">
        <Link to={`/dashboard/profile/${userID}`}>
          <div className="flex w-[200px] h-[150px]">
            <div className="bg-white text-center flex flex-col items-center rounded-lg shadow-md hover:shadow-xl w-full justify-center">
              <img
                className="w-[3.9rem] h-15"
                src={`https://t4.ftcdn.net/jpg/04/83/90/95/360_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg`}
                alt="logo"
              />
              <h1 className="text-xl text-center font-bold text-[#000] mt-3 font-[Montserrat]">
                Your Profile
              </h1>
            </div>
          </div>
        </Link>
        <Link to={`/user/room/${userID}`}>
          <div className="flex w-[200px] h-[150px]">
            <div className="bg-white py-7 text-center flex flex-col items-center rounded-lg shadow-md hover:shadow-xl w-full justify-center">
              <img
                className="w-[4.9rem] h-15"
                src={`https://cdn-icons-png.flaticon.com/512/751/751683.png`}
                alt="logo"
              />
              <h1 className="text-xl text-center font-bold text-[#000] mt-3 font-[Montserrat]">
                Rooms
              </h1>
            </div>
          </div>
        </Link>
        <div className="flex w-[200px] h-[150px]">
          <div className="bg-white text-center flex flex-col items-center rounded-lg shadow-md hover:shadow-xl w-full justify-center">
            <img
              className="w-[4.9rem] h-15"
              src={`https://cdn-icons-png.flaticon.com/512/3688/3688609.png`}
              alt="logo"
            />
            <h1 className="text-xl text-center font-bold text-[#000] mt-3 font-[Montserrat]">
              Jobs
            </h1>
          </div>
        </div>
        <div className="flex w-[200px] h-[150px]">
          <div className="bg-white text-center flex flex-col items-center rounded-lg shadow-md hover:shadow-xl w-full justify-center">
            <img
              className="w-[6.4rem] h-13"
              src={`https://img.freepik.com/premium-vector/upcoming-events-announcement-megaphone-label-loudspeaker-speech-bubble_123447-5297.jpg`}
              alt="logo"
            />
            <h1 className="text-xl text-center font-bold text-[#000] mt-3 font-[Montserrat]">
              Events
            </h1>
          </div>
        </div>
        <div className="flex w-[200px] h-[150px]">
          <div className="bg-white text-center flex flex-col items-center rounded-lg shadow-md hover:shadow-xl w-full justify-center">
            <img
              className="w-[4.9rem] h-15"
              src={`https://www.freeiconspng.com/thumbs/movie-icon/movie-icon-6.png`}
              alt="logo"
            />
            <h1 className="text-xl text-center font-bold text-[#000] mt-3 font-[Montserrat]">
              Movies
            </h1>
          </div>
        </div>
        <Link to={`/user/bussiness/${userID}`}>
          <div className="flex w-[200px] h-[150px]">
            <div className="bg-white text-center flex flex-col items-center rounded-lg shadow-md hover:shadow-xl w-full justify-center">
              <img
                className="w-[4.9rem] h-15"
                src={`https://freepngimg.com/download/business/70298-management-business-icons-consultant-company-social-marketing.png`}
                alt="logo"
              />
              <h1 className="text-xl text-center font-bold text-[#000] mt-3 font-[Montserrat]">
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
