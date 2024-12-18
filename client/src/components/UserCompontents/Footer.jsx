import React, { useState } from "react";
import { Link } from "react-router-dom";
import Avalableloc from "../../pages/UserPages/Ads/Avalableloc";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { IoIosGlobe } from "react-icons/io";

export default function Footer() {
  const [isHovered, setIsHovered] = useState(false);
  const currntcty = useSelector((state) => state.auth.city);

  //  https://api.verydesi.com/
  return (
    <div className="lg:mt-9 mt-6 w-full">
      {/* <div className="justify-center flex mb-2 gap-7">
        <img
          className="w-[3.9rem] h-15 lg:w-[7.9rem]"
          src={`https://c1.staticflickr.com/4/3943/15620462055_c69f120931_z.jpg`}
          alt="logo"
        />
        <img
          className="w-[3.9rem] h-15 lg:w-[7.9rem]"
          src={`https://c1.staticflickr.com/4/3943/15620462055_c69f120931_z.jpg`}
          alt="logo"
        />
        <img
          className="w-[3.9rem] h-15 lg:w-[7.9rem]"
          src={`https://c1.staticflickr.com/4/3943/15620462055_c69f120931_z.jpg`}
          alt="logo"
        />
        <img
          className="w-[3.9rem] h-15 lg:w-[7.9rem]"
          src={`https://c1.staticflickr.com/4/3943/15620462055_c69f120931_z.jpg`}
          alt="logo"
        />
      </div> */}
      <div
        onClick={() => {
          window.open("https://redletterweb.com/", "_blank");
        }}
        className="flex flex-col justify-center items-center mb-2 font-['udemy-regular']"
      >
        <div className="cursor-pointer lg:w-[44rem] w-[22rem] bg-red-700 border-4 border-[#232f3e] justify-between gap-4 lg:gap-7 flex  lg:p-0 shadow-sm shadow-gray-500 rounded-md">
          <div className="flex flex-col gap-3 ">
            <span className="text-[#232f3e] bg-white rounded-br-full font-bold px-6 text-[18px]">
              Very Desi Guides
            </span>
          </div>
          <div className="flex flex-col items-center justify-center text-white">
            <h2 className="lg:text-[23px] text-[20px] font-bold">
              Get Your Business Online
            </h2>
            <p className="lg:text-[19px] text-[15px] mb-4">
              Elevate Your Online Presence
            </p>
          </div>
          <img
            className="w-[120px] lg:w-[190px] md:bg-none hidden md:block"
            src={`https://res.cloudinary.com/druohnmyv/image/upload/v1724996141/R.2894cf285c04316dd503b8d215827e2c_vbweas.png`}
            alt="logo"
          />
        </div>
      </div>
      <div className="flex justify-center lg:px-0 px-3">
        <div className="w-[500px] h-[170px] bg-[#232f3e] text-white p-6  mt-3 rounded-lg shadow-lg flex items-center justify-between font-['udemy-regular'] mb-4">
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-[23px] font-bold mb-2">Red Letter Web</h2>
              <p className="text-[19px] mb-4">Elevate Your Online Presence</p>
            </div>
            <button className="bg-white text-[#232f3e] px-6 py-2 rounded-full font-semibold text-sm transition-colors w-fit">
              Get Started
            </button>
          </div>
          <div className="flex flex-col justify-center">
            <ul className="text-[#DDD] text-[14px] cursor-pointer space-y-2">
              <li className="flex items-center">
                {/* <ArrowRight className="w-4 h-4 mr-2 text-emerald-200" /> */}
                Custom Web Design
              </li>
              <li className="flex items-center">
                {/* <ArrowRight className="w-4 h-4 mr-2 text-emerald-200" /> */}
                Responsive Development
              </li>
              <li className="flex items-center">
                {/* <ArrowRight className="w-4 h-4 mr-2 text-emerald-200" /> */}
                SEO Optimization
              </li>
              <li className="flex items-center">
                {/* <ArrowRight className="w-4 h-4 mr-2 text-emerald-200" /> */}
                24/7 Support
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className=" mx-auto">
        <div className="bg-[#232f3e] flex text-[#232f3e] justify-center items-center gap-10 ">
          <p>hi</p>
          {/* <Link to={"/"} className="bg-cover bg-center flex">
            <img
              // height={300}
              width={300}
              className="w-[140px] lg:w-[140px]"
              src={WebsiteLogo}
              alt=""
            />
          </Link> */}
          {/* <div
            className="relative inline-block text-black border p-1 border-[#999] rounded-md"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <p className="text-[14px] flex cursor-pointer items-center hover:font-bold gap-1 group text-[#ddd]">
              <IoIosGlobe size={20} />
              {currntcty}
              <MdOutlineKeyboardArrowDown
                className={`transition-transform duration-300 ${
                  isHovered ? "rotate-180" : ""
                }`}
                size={22}
              />
            </p>

            {isHovered && <Avalableloc />}
          </div> */}
        </div>
        <div className=" w-full bg-[#131A22] border-t-7 border-[#232f3e]">
          <div className="max-w-[1370px] lg:max-w-[1600px] mx-auto bg-[#131A22] font-['udemy-regular']">
            <div className="max-w-[1600px] w-full m-auto flex flex-col items-center pb-3 lg:flex-row py-2 justify-center">
              <div className="">
                {/* <a
              href="/"
              aria-label="Go home"
              title="Company"
              className="inline-flex items-center"
            >
              <img
                height={200}
                width={230}
                className="w-50 h-50"
                src={WebsiteLogo}
                alt=""
              />
            </a> */}

                {/* <p className="text-[20px] text-white">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam.
              </p>
              <p className="mt-2 text-[20px] text-white">
                Eaque ipsa quae ab illo inventore veritatis et quasi architecto
                beatae vitae.
              </p> */}
                {/* <button className="flex rounded-md bg-green-800 mt-4 p-2 px-3 my-4 text-[22px] border-2 border-white text-white shadow-sm hover:bg-green-900 hover:text-white" type="submit">Get Started</button> */}
              </div>
            </div>
            <div className="lg:flex justify-center gap-10">
              <div className="flex text-white items-center gap-5 px-3 lg:px-0">
                <Link to={"/"} className="bg-cover bg-center flex">
                  <img
                    // height={300}
                    width={300}
                    className="w-[170px] lg:w-[140px]"
                    src={
                      "https://res.cloudinary.com/druohnmyv/image/upload/v1723819327/assests/x31ydsmb8hkg05fqbkjf.png"
                    }
                    alt=""
                  />
                </Link>
                <div
                  className="relative inline-block text-black border p-1 border-[#999] rounded-md"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <p className="text-[14px] flex cursor-pointer items-center hover:font-bold gap-1 group text-[#ddd]">
                    <IoIosGlobe size={20} />
                    {currntcty}
                    <MdOutlineKeyboardArrowDown
                      className={`transition-transform duration-300 ${
                        isHovered ? "rotate-180" : ""
                      }`}
                      size={22}
                    />
                  </p>

                  {isHovered && <Avalableloc />}
                </div>
              </div>
              <div className="grid grid-cols-2  lg:grid-cols-3 justify-center gap-10 px-4 lg:px-0 lg:mt-0 mt-3">
                {/* <div className="flex text-white items-center gap-5">
                <Link to={"/"} className="bg-cover bg-center flex">
                  <img
                    // height={300}
                    width={300}
                    className="w-[200px] lg:w-[140px]"
                    src={WebsiteLogo}
                    alt=""
                  />
                </Link>
                <div
                  className="relative inline-block text-black border p-1 border-[#999] rounded-md"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <p className="text-[14px] flex cursor-pointer items-center hover:font-bold gap-1 group text-[#ddd]">
                    <IoIosGlobe size={20} />
                    {currntcty}
                    <MdOutlineKeyboardArrowDown
                      className={`transition-transform duration-300 ${
                        isHovered ? "rotate-180" : ""
                      }`}
                      size={22}
                    />
                  </p>

                  {isHovered && <Avalableloc />}
                </div>
              </div> */}

                <div className="">
                  <p className="font-semibold tracking-wide text-[#DDD]">
                    Make Money
                  </p>
                  <ul className="mt-2 space-y-1 leading-4 text-[14px]">
                    <li>
                      <a
                        href="/"
                        className="text-[#999] transition-colors duration-300 hover:text-deep-purple-accent-400 hover:underline "
                      >
                        Facebook
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="text-[#999] transition-colors duration-300 hover:text-deep-purple-accent-400 hover:underline"
                      >
                        Twitter
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="text-[#999] transition-colors duration-300 hover:text-deep-purple-accent-400 hover:underline"
                      >
                        Instagram
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="">
                  <p className="font-semibold tracking-wide text-[#DDD]">
                    Make Money
                  </p>
                  <ul className="mt-2 space-y-1 leading-4 text-[14px]">
                    <li>
                      <a
                        href="/"
                        className="text-[#999] transition-colors duration-300 hover:text-deep-purple-accent-400 hover:underline "
                      >
                        Facebook
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="text-[#999] transition-colors duration-300 hover:text-deep-purple-accent-400 hover:underline"
                      >
                        Twitter
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="text-[#999] transition-colors duration-300 hover:text-deep-purple-accent-400 hover:underline"
                      >
                        Instagram
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="">
                  <p className="font-semibold tracking-wide text-[#DDD]">
                    Let Us Help You
                  </p>
                  <ul className="mt-2 space-y-1 leading-4 text-[14px]">
                    <li>
                      <a
                        href="/"
                        className="text-[#999] transition-colors duration-300 hover:text-deep-purple-accent-400 hover:underline "
                      >
                        Facebook
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="text-[#999] transition-colors duration-300 hover:text-deep-purple-accent-400 hover:underline"
                      >
                        Twitter
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="text-[#999] transition-colors duration-300 hover:text-deep-purple-accent-400 hover:underline"
                      >
                        Instagram
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="text-[#999] transition-colors duration-300 hover:text-deep-purple-accent-400 hover:underline"
                      >
                        Instagram
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-[#DDD] text-[14px] flex gap-6 font-bold justify-center mt-4 cursor-pointer px-4 lg:px-0">
              <p> Conditions of Use</p>
              <p> Privacy Notice</p>
              <p> Consumer Health Data Privacy </p>
              <p> Your Ads</p>
            </div>
            <p className="text-[#DDD] text-[14px] flex gap-4 font-bold justify-center mt-2 cursor-pointer">
              © 2024, VeryDesi.com, Inc.
            </p>

            <div className="flex flex-col justify-between pt-5 sm:flex-row sm:items-center max-w-[1600px] w-full mx-auto">
              {/* <a
            href="/"
            aria-label="Go home"
            title="Company"
            className="inline-flex items-center"
          >
            <img
              height={130}
              width={150}
              className="w-50 h-50"
              src={WebsiteLogo}
              alt=""
            />
          </a> */}

              {/* <p className="text-[20px] text-white ml-10 lg:ml-2 sm:items-center md:justify-center">
            © Copyright 2024 Lorem Inc. All rights reserved.
          </p> */}
              {/* <div className="flex items-center space-x-4 mt-2 ml-7 lg:ml-2">
            <a
              href="/"
              className="text-white transition-colors duration-300 hover:text-deep-purple-accent-400"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z" />
              </svg>
            </a>
            <a
              href="/"
              className="text-white transition-colors duration-300 hover:text-deep-purple-accent-400"
            >
              <svg viewBox="0 0 30 30" fill="currentColor" className="h-6">
                <circle cx="15" cy="15" r="4" />
                <path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10   C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1   c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z" />
              </svg>
            </a>
            <a
              href="/"
              className="text-white transition-colors duration-300 hover:text-deep-purple-accent-400"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
              </svg>
            </a>
          </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
