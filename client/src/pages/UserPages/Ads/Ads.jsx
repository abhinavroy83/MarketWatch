import React, { useEffect, useState } from "react";
import { Container } from "../../../components";
import WebsiteLogo from "../../../assets/website_logo.png";
import { useSelector } from "react-redux";
import { fetchcity } from "../../../Services/CityApi/Cityapi";
import { Link } from "react-router-dom";
import Avalableloc from "./Avalableloc";
import { IoMdArrowDropdown } from "react-icons/io";


function Ads() {
  const img = useSelector((state) => state.auth.userimg);
  const name = useSelector((state) => state.auth.user);
  const currntcty = useSelector((state) => state.auth.city);
  // console.log(currntcty);
  const [cty, setcty] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const res = await fetchcity();
      setcty(res.data.city);
      console.log();
    };
  }, []);
  const [isloginmodalopen, setloginmodeopen] = useState(false);

  const handleloginmodelopen = () => {
    setloginmodeopen(true);
  };
  const isloginmodelclose = () => {
    setloginmodeopen(false);
  };

  return (
    <div className="flex px-1 justify-between bg-white max-w-[1600px] w-full m-auto font-['udemy-regular']">
      <Avalableloc isOpen={isloginmodalopen} onClose={isloginmodelclose} />

      <div className="flex items-center gap-2">
        <Link to={"/"} className="bg-cover bg-center flex">
          <img
            // height={300}
            width={300}
            className="lg:w-[230px] w-[200px]"
            src={WebsiteLogo}
            alt=""
          />
        </Link>
        <p
          onClick={() => {
            handleloginmodelopen();
          }}
          className="text-[22px] flex cursor-pointer items-center hover:font-bold"
        >
          {currntcty}<IoMdArrowDropdown />

        </p>
      </div>

      <div className="mt-2 items-center bg-cover z-50">
        <img
          // height={100}
          width={150}
          // src={"https://m.media-amazon.com/images/I/61MsvBsj-ZL._AC_SY395_.jpg"}
          className="lg:w-[130px] w-[100px]"
          alt=""
        />
      </div>
      {/* <button
                type="button"
                className="rounded-md text-[17px] px-3 py-2 text-black font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Log In
      </button> */}
      <div className="mt-4 items-center justify-center flex flex-col">
        {/* <svg class="h-12 w-12 text-black items-center justify-center"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
       </svg> */}
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
        <p className="items-center justify-center text-[22px] m-2">
          Hi, {name}
        </p>
      </div>
    </div>
  );
}

export default Ads;
