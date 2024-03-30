import React, { useEffect } from "react";
import { Container } from "../../../components";
import WebsiteLogo from "../../../assets/website_logo.png";
import { useSelector } from "react-redux";
import { fetchcity } from "../../../Services/CityApi/Cityapi";

function Ads() {
  const img = useSelector((state) => state.auth.userimg);
  const name = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchdata = async () => {
      const citys = await fetchcity();
      console.log(citys.data.city);
    };

    // const uniqueCities = Array.from(
    //   new Set(citys.data.city.map((item) => item.city))
    // );
    fetchdata();
  }, []);

  return (
    <div className="flex px-1 justify-between bg-white max-w-[1600px] w-full m-auto font-roboto">
      <div className="bg-cover bg-center">
        <img
          height={300}
          width={350}
          className="w-50 h-50"
          src={WebsiteLogo}
          alt=""
        />
      </div>

      <div className="mt-2 items-center bg-cover z-50">
        <img
          height={100}
          width={150}
          src={"https://m.media-amazon.com/images/I/61MsvBsj-ZL._AC_SY395_.jpg"}
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
          className="rounded-full"
          height={50}
          width={50}
          src={
            img ||
            "https://cdn1.iconfinder.com/data/icons/bokbokstars-121-classic-stock-icons-1/512/person-man.png"
          }
          alt={"not found"}
        />
        <p className="items-center justify-center text-[20px] mt-2">
          Hi, {name}
        </p>
      </div>
    </div>
  );
}

export default Ads;
