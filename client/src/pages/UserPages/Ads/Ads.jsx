import React from "react";
import { Container } from "../../../components";
import WebsiteLogo from "../../../assets/website_logo.png";

function Ads() {
  return (
    <div className="flex justify-between px-16 bg-white">
      <div class="bg-cover bg-center">
        <img
          height={300}
          width={350}
          className="w-50 h-50"
          src={WebsiteLogo}
          alt=""
        />
      </div>
     
      <div className="ml-40 mt-2 text-center bg-cover z-50">
        <img
          height={100}
          width={150}
          src={"https://m.media-amazon.com/images/I/61MsvBsj-ZL._AC_SY395_.jpg"}
          alt=""
        />
      </div>
    </div>
  );
}

export default Ads;
