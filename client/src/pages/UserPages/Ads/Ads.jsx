import React, { useEffect, useState } from "react";
import { Container } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { fetchcity } from "../../../Services/CityApi/Cityapi";
import { Link, useNavigate } from "react-router-dom";
import Avalableloc from "./Avalableloc";
import { RiContactsFill } from "react-icons/ri";
import { IoSettingsSharp } from "react-icons/io5";
import { IoIosHelpCircle } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { logout } from "../../../store/authslice";
import { GrLocation } from "react-icons/gr";
import { FaCaretDown, FaRegHeart } from "react-icons/fa";
import { modalopen } from "../../../store/modalslice";
import { MdOutlineBedroomParent } from "react-icons/md";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { GiExitDoor } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Login from "../../../components/UserCompontents/Login";
import Signup from "../../../components/UserCompontents/Signup";
import axios from "axios";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { IoLocationSharp } from "react-icons/io5";
import { FaBell } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { LuHeart } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import AdsNotification from "../../../components/UserCompontents/Notification/AdsNotification";
import cartslice, { pluscart, setCartCount } from "../../../store/cartslice";

function Ads() {
  const img = useSelector((state) => state.auth.userimg);
  const name = useSelector((state) => state.auth.user);
  const currntcty = useSelector((state) => state.auth.city);
  // console.log(currntcty);
  const [cty, setcty] = useState([]);
  const dispatch = useDispatch();
  const isloged = useSelector((state) => state.auth.status);
  const userID = useSelector((state) => state.auth.userID);
  const authstatus = useSelector((state) => state.auth.status);
  const [isHovered, setIsHovered] = useState(false);
  const cartcount = useSelector((state) => state.cart.cartcount);
  const navigate = useNavigate();
  const fetchcount = async () => {
    if (userID) {
      try {
        const res = await axios.get(
          ` https://api.verydesi.com/api/getlist/${userID}`
        );
        // console.log(res.data.count);
        if (res.data.status === "error") {
          setCartno("");
        } else {
          dispatch(setCartCount(res.data.count));
        }
      } catch (error) {
        console.log("error during fetcing count api in header", error);
      }
    }
  };
  useEffect(() => {
    fetchcount();
  }, [userID]);

  const [isloginmodalopen, setloginmodeopen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openNotification, setopenNotfication] = useState(false);

  const toggleAdminMenu = () => {
    setOpenMenu(!openMenu);
  };
  const handlelogout = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="bg-gray-200 rounded-md text-black flex flex-col p-5 lg:p-10 items-center justify-center font-['udemy-regular'] relative">
            <RxCross1
              className="h-5 w-5 text-black absolute top-3 right-3 cursor-pointer hover:rotate-[360deg] transition-transform duration-300"
              onClick={onClose}
            />
            <GiExitDoor className="items-center" size={70} />
            <h1 className="text-[25px] mt-3 font-semibold">Confirm Logout</h1>
            <p className="text-[20px] text-gray-600">
              Are you sure you want to logout?
            </p>
            <div className="flex gap-4 items-center mt-4">
              <button
                className="bg-red-700 text-[20px] cursor-pointer px-7 py-2 rounded-md text-white"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="bg-green-700 text-[20px] cursor-pointer px-7 py-2 rounded-md text-white"
                onClick={() => {
                  dispatch(logout());
                  localStorage.removeItem("userdetails");
                  navigate("/");
                  onClose();
                }}
              >
                Yes, Logout
              </button>
            </div>
          </div>
        );
      },
    });
  };

  const handlemModal = (loginModalState) => {
    // console.log(loginModalState);
    dispatch(modalopen({ isloginmodalopen: loginModalState }));
  };
  useEffect(() => {
    // Create the script element
    const script = document.createElement("script");
    script.src =
      "https://affiliates.expediagroup.com/products/banners/assets/eg-affiliate-banners.js";
    script.className = "eg-affiliate-banners-script";

    // Append the script to the body or a specific element
    document.body.appendChild(script);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="flex px-1 py-2 lg:py-0 lg:gap-0 bg-white max-w-[1400px] lg:max-w-[1600px] w-full m-auto font-['udemy-regular'] items-center relative">
      {/* <Avalableloc /> */}
      <div className="w-[100%]">
        <div className=" justify-center gap-3 lg:gap-7 flex lg:hidden">
          {/* <img
            className="w-[3.9rem] h-15 lg:w-[6.9rem]"
            src={`https://c1.staticflickr.com/4/3943/15620462055_c69f120931_z.jpg`}
            alt="logo"
          />
          <img
            className="w-[3.9rem] h-15 lg:w-[6.9rem]"
            src={`https://c1.staticflickr.com/4/3943/15620462055_c69f120931_z.jpg`}
            alt="logo"
          />
          <img
            className="w-[3.9rem] h-15 lg:w-[6.9rem]"
            src={`https://c1.staticflickr.com/4/3943/15620462055_c69f120931_z.jpg`}
            alt="logo"
          /> */}
          {/* <img
          className="w-[6.9rem] h-15"
          src={`https://c1.staticflickr.com/4/3943/15620462055_c69f120931_z.jpg`}
          alt="logo"
        /> */}
        </div>
        <div className="flex lg:items-center justify-between gap-3 lg:gap-0">
          <div className="flex items-center justify-between">
            <Login />
            <Signup />
            <Link to={"/"} className="bg-cover bg-center flex">
              <img
                // height={300}
                width={300}
                className="w-[120px] lg:w-[190px]"
                src={
                  "https://res.cloudinary.com/druohnmyv/image/upload/v1723819319/assests/ydvr3eeqwwho5kimj5hk.png"
                }
                alt=""
              />
            </Link>
            <div
              className="relative inline-block"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <p className="text-[16px] flex cursor-pointer items-center hover:font-bold gap-0 lg:gap-1 group ">
                <IoLocationSharp size={20} /> {currntcty || "Portland"}
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

          <div
            className="eg-affiliate-banners"
            data-program="us-expedia"
            data-network="pz"
            data-layout="leaderboard"
            data-image="city"
            data-message="explore-world-travel"
            data-link="flights"
            data-camref="1011l44Fgm"
            data-pubref=""
          />
          <div className="flex-row">
            {isloged ? (
              <div className="flex gap-2 lg:gap-4 items-center cursor-pointer">
                <div
                  className=" relative inline-block"
                  onMouseEnter={() => setopenNotfication(true)}
                  onMouseLeave={() => setopenNotfication(false)}
                >
                  <HiOutlineBellAlert
                    className="hover:text-blue-700"
                    size={25}
                  />
                  {openNotification && <AdsNotification />}
                </div>
                <div className="relative mr-4 hover:text-blue-700">
                  <LuHeart
                    className="cursor-pointer"
                    size={23}
                    onClick={() => {
                      navigate(`/dashboard/wishlist/${userID}`);
                    }}
                  />
                  {cartcount > 0 && (
                    <div className="absolute top-[0.2rem] right-[-0.2rem] transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-[14px] text-white w-5 h-5 flex justify-center items-center rounded-full">
                      {cartcount}
                    </div>
                  )}
                </div>
                <div
                  className="relative inline-block"
                  onMouseEnter={() => setOpenMenu(true)}
                  onMouseLeave={() => setOpenMenu(false)}
                >
                  <div
                    className="items-center justify-center flex cursor-pointer group"
                    // onClick={toggleAdminMenu}
                  >
                    <img
                      className="rounded-full w-[45px] h-[45px]"
                      height={50}
                      width={50}
                      src={
                        img ||
                        "data:image/png;base64,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"
                      }
                      alt={"not found"}
                    />
                    <FaCaretDown
                      className="group-hover:rotate-[360deg] transition-transform duration-300 ml-1 hover:text-blue-700"
                      size={20}
                    />
                  </div>

                  {openMenu && (
                    <div className="bg-white flex flex-col rounded-md gap-3 absolute bottom-0 top-[45px] right-[2px] w-[270px] h-[270px] shadow-lg shadow-gray-700">
                      {/* <div className="bg-[url('https://img.freepik.com/premium-vector/abstract-nature-geometric-triangular-low-poly-background_48799-402.jpg')] bg-cover p-2 flex text-white gap-4 items-center"> */}
                      <div className="bg-[#232f3e] bg-cover p-2 flex text-white gap-4 items-center rounded-tr-md rounded-tl-md">
                        <img
                          className="rounded-full w-[50px] h-[50px]"
                          height={50}
                          width={50}
                          src={
                            img ||
                            "data:image/png;base64,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"
                          }
                          alt={"not found"}
                        />
                        <div className="flex flex-col">
                          <p className="flex items-center text-[18px] gap-2 whitespace-nowrap text-ellipsis overflow-auto text-center">
                            {name}
                          </p>
                        </div>
                      </div>
                      <div className="px-2 flex flex-col gap-1">
                        <Link
                          to={`/myaccount/${userID}`}
                          className="flex items-center text-[18px] gap-2 whitespace-nowrap text-ellipsis overflow-auto text-center cursor-pointer p-2 hover:bg-[#232f3e] hover:text-white rounded-md"
                        >
                          <RiAccountPinCircleFill /> Dashboard
                        </Link>
                        <Link
                          to={`/dashboard/profile/${userID}`}
                          className="flex items-center text-[18px] gap-2 p-2 whitespace-nowrap text-ellipsis hover:bg-[#232f3e] hover:text-white overflow-auto text-center cursor-pointer rounded-md"
                        >
                          <IoSettingsSharp /> Settings{" "}
                        </Link>
                        {/* <p className="flex items-center text-[22px] gap-2 whitespace-nowrap text-ellipsis overflow-auto text-center cursor-pointer hover:text-[#0b5e86] pb-2">
                       <ImProfile /> Personality Profile
                  </p> */}
                        {/* <p className="flex items-center text-[18px] gap-2 whitespace-nowrap text-ellipsis overflow-auto text-center cursor-pointer p-2 hover:bg-[#232f3e] hover:text-white">
                          <IoSettingsSharp /> Settings
                        </p> */}
                        <Link
                          to={`/user/help/${userID}`}
                          className="flex items-center text-[18px] gap-2 whitespace-nowrap text-ellipsis overflow-auto text-center cursor-pointer p-2 hover:bg-[#232f3e] hover:text-white rounded-md"
                        >
                          <IoIosHelpCircle size={25} /> Help
                        </Link>
                        <p
                          onClick={handlelogout}
                          className="flex items-center text-[18px] gap-2 whitespace-nowrap text-ellipsis overflow-auto text-center cursor-pointer p-2 hover:bg-[#232f3e] hover:text-white rounded-md"
                        >
                          <BiLogOut /> Logout{" "}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                {/* <p className="items-center justify-center text-[15px]">
            Hi, {name}
          </p> */}
                {/* <button
            type="button"
            onClick={handlelogout}
            className="rounded-md py-1 text-[12px] text-black ml-3 font-medium font-sans transition duration-300 ease-in-out hover:shadow-md"
          >
            Logout
          </button> */}
              </div>
            ) : (
              <div className="leading-4 flex items-center gap-2 mr-0 lg:mr-3">
                <img
                  className="rounded-full w-[45px] h-[45px]"
                  height={50}
                  width={50}
                  src={
                    img ||
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAS1BMVEWmpqb////z9fSjo6P2+PegoKD5+fn8/Pyrq6uysrKoqKi4uLjNzc2+vr7m5ubd3d3s7u3a2trDw8PT1NTn6ejh4+LLzMu8vbywr7CAkAlGAAAK2UlEQVR4nO2dW5erKBCFE/GuSYxJTvL/f+mgJh0voMDeqD2r98OsNf1w5AtQFFRRHI7/dx22boB3/RH+fv0R/n79Ef5+rUqYJEkcx/K/yYof9U6YxMH5Wtan4pXmIuok8jQrTnV5PQexd1ifhHF1KU9ZLokaHYZq/xZFeXYqL1XssRW+CINzWaQimoBNJTlFWpTnwFNLfBDG51L2nAHcADPPyrOPvqQTxpdTbgXXx8xPFzoklzC5FNMZZwcpigvX+DAJzydpVAC8N2QUnc7EVtEIg1tKwPtApjea4SER3mtocCogRX3nNI1C+CjIfB1j8WA0jkB4yWjDc8QYZZcdED4yD/33wygyuB9BwnvmD+8NmYGGFSIMnp7G5wAxekJ2FSBMyhX4OsYScALcCR/pOnwtY+o+HV0Jwzpaja9RdArXJbzk63VgJ5E7rhxOhPFpbb6W8eS073AhPK/egW/E1GXhcCAst+FrGcsVCONiXRMzVFRYj1RbwmrFNUIlkVZ+CS/b8rWMljbVjrDccoR+FNlNRivClVd5naLaE2FSbD9EO4nCwk81J4y9b5TMJTJzk2pMGL72A9iYVGM31ZQw2HiVGEukpptGQ8K9AVogmhHGuwM0H6hGhHsEbBCNzI0JYbIjK9qXyEwWDRPC3ayDY4mCQ1jvFVAiGng3y4S78EV1MvBRFwkvewaUiIs7jSXCar9DtJNY2i8uEMbp1gSLWlozFgh3a0a/WjKo84S7tjIfLVibWcIzO677I+6/O3vIOEcY57xGSKVFXd5u1+utrIuUijk7FecIWSfbkqUoH0HYV/AoiwMLUpzcCEnnahLvWjVMQ8m/VFcJyfnGzKqoJwwoY1Tk/+4Tui/l/R9n25LrN4t6QoY7KvkqHd4bsioZUZAZB1VL+CAsFKJe4OsYGb9lpA2h6ggT3JkR6WOZr2VkhJNT3V5RR4gHmKI6MAOUiAF+1qwNS2kIA/yLN1O+lvGG/6IaY6MhfIIfFLnhCP2OVNTgiKcN4R3sQpHe7QAl4h2djJE61U9NCB49OQASEEVmTvgAf83cAbBBBH0MtWejJMzAL1nOwR9E9JdVdqKKEHRIIysrOkC8YfNf2YkqQmwWipMroETEtjPKmaggBP211JmvEeZKqXw3BSF2NuM6Cd+diP28qjObKWGFfaNGAOFxqlgTp4Sgp19BgEFQQV9X7KImhAE2Rv9hXSg78R/WgIl3OiHEXOAc7ULZidC6L26LhJAxQ2dh24nYNEmXCM+YnbnDgEFwx2zN+PB0TAiZMlHgXSg7EVquJieLI8IE60Jnf21AiJmCKJklBKOFjEEqhynUhnFEcUSI+TMvRhcGQQztbcZ+zZAw3ngx7IQuifEMIbZvEhcSIdqMGUJw88KZhuh6MbKmA0I0nMbpQtmJWDPyWEsIRkQzGiF2jDKMmA4IsYNu8aQRYse1w+PvASH40xGc0jchuIPLdIRgxJC1WMDLxTCa2CfEvG45OGiEYFxo4H33CcF/l+OVMggHE7FPCKYH7acPB45bjxDN8NrPPBykn/QI0SS9/djSQTpfjxDNs+Tsf1tCNJ2uv4PqEcKBbdLmSRK+wJb0TU2PEE+BIgEGAdqQvvP9JUzAmNpu9haNeln8X0I8T09cSfvDK0zY2158CQnpFyRjCpvSQWLGlxD02RqlJEI8W6nnt30J8aFxOJwphNhZWytxVRASrtlz/DbYozkMlosvISN/7kUADALYqA+ibF9CRkYwFgDuBGdktA05KQgZFw+QLIUfQspPXSgICWODsujjy32jTEFIuR2DL4mULuyHEX8IE87VA3EGMxVIdzzyZEpIypoHt1DwxunTDgUh6QKQe85XCwjmfX2b4Y8QyzfBck16UhDGLEIBHO6HtDvVUeyPELCnhE3FR14JnQ9OCensP1IQ8uaha6gUDIwO5dXSNHLwT8MLswEqQu6tR+te5AIq10Pedcr2C5ZzkTkHGyl8Go5f+pWdRSVa0U4Kv5Szt+hJZAYX1958Fb22yEtBSL+YLuRINWEM5Qilf1u1P/RQzzLKHouMYfjI+HfilXt8HyVMhHieZxnD8Pz0UUtaeU7jp6Rl8xJAoIGUf774qHV+0Jy1Mc5LlR8Tr/oxhWwurNcvX7XAleelhDNv7fdE+rw9qt51/Opxe6YeS50rz7zxuMWcmhIKefasGz2z/MCuHDGSMm5BrBGhlY+qGEopY094/HBHUsYPfSyIW0kdA96yAjJbmjj+zmte2UiTi7H7olfm0uTTrFD1ai1bqsmJ8lj2qnlhLRLpqyiep2dRvNL2//19TpPX5sfUNF2W1dKjGdUYkl5NXXha+LW5iXS/TTb/VV/vHdLU75a6X+sXrZjSj7T5pZyqQh8JkRe3u4ptxHm/Fa4vtWmkzRFmHmS8q0MtbH8/lNWVuovS5nnzJmKUzlSHUkPe/6W0yIk+V58UnYyyq3HxnR5kcCUdZ8zct6CcmZoczug6knNkkydaQoLzLV4XR76O8YKXjJq79wQXoRO52QHiHOMNLjY0d3cNvH8ozItfzTAG4EuDs/cPIcdNvAgZUS3jA6nhP3+HFNlBUTrwjRgAh7cL94Cdo4giJV0gfTO6F6lbuMvtak1FYRyGMUSsHCfM0n18R+87ol0m6TG61eFbrKngFEbk3ekaIDoFTRfrYjjVNiHZ0AmiQ6apQW0T+/o0btXZjBDtM74N6tPYRtmEP0CHOnwmNYZsaya6FBC0QrQjNKkTZefX+OzBFvFss98xq/VlV6/Nk5HpIdqYG8N6bRY191iVMGYRzTc8pjX3zPdQftbBCaLxAmZcN9H0RIp3LXYB0dS8G9e+NOxEJFXWEtFs3ljULzWciXhtNlMZJUfb1KA18r+jFazMR6HJvtWqjrBBLei1JuEbcXkq2tWCNkjMwMqU2mvRt7Gs5714/L3GStjX4qpoW5N9qa4+45KaJeLC6YN1Xf0F341Q49JW8zUx7d9GmN9F8Yp8mGu24InL+xbHcOY3W9vMdJqZOE5vlMx4Nuv4o2PN+Kdu78zMnCyS7t1bI+o60fWtIG0uH3YBDyDUXd3LXd970jlv+TaAElH9k7u/2aV5d41XD8qaUGlOkXfX1Gc2Yv218CNVYhr2dp4qE2xdl3solQMOvn+oSOeLvB8+zRBOPS30DUtFRJFT+8JV4wpS+DukE2uzhcP21bjuCeMt2bGDSisG5aZhTQnOe8Ajg5ptCjgs7cJ603nwLve2g3Q4THnvch/jb24EowINRPg95Ce+rS53Uj9BrnS75b5TldoBGhIegzcirzaiqz6lQUSq3xK6EH4Qt9kZDgg739QY0JjwGHZzcdu1olE7EcUrNG24MeExbizqaqGKGaWNFTWbg3aEx6QQ222cvgqfQhQmy4Q9ofRuIk5RPYzwFhl4Mo6Ex3JrvEb3f1ZttiM8JlvjSZlPQRfCHSBaTEEnQrlsbMpnvEgAhMf4VwG6EG44Um1HqCvhViPVoQOdCTfpRpcOdCc8JqtHSB0b6ky4djc6diBEuKZRde5AkHAti4PwoYRrDNXQfYAyCP0zgnwEQr9mFeajEHpjRMdnJwqhF0YOH43wyF47YhIfk5DYkazua8UkPFIgqXhHOuERhGTjHX0QSiVuc5I39/ryQtgoia1qKviha+SNsFFiginhvNE18kr4VpKEsaKqYBz6RXtrDcJt9Uf4+/VH+Pv1R/j79Uf4+/Ufwona2swAATAAAAAASUVORK5CYII="
                  }
                  alt={"not found"}
                />
                <p
                  className="text-[12px] cursor-pointer"
                  onClick={() => handlemModal(true)}
                >
                  Hello, Sign in
                  <p className="text-[15px]">Or Sign up</p>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ads;
