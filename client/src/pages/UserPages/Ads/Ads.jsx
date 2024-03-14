import React from "react";
import { Container } from "../../../components";
import WebsiteLogo from "../../../assets/website_logo.png";

function Ads() {
  return (
    <div className="flex ml-[13rem] bg-white">
      <div class="bg-cover bg-center">
        <img
          height={300}
          width={350}
          className="w-50 h-50"
          src={WebsiteLogo}
          alt=""
        />
      </div>
      <div className="ml-40 text-center bg-cover z-50">
        <img
          height={200}
          width={200}
          src={
            "https://media.istockphoto.com/id/610675644/photo/demo-sign-on-red-cubes.jpg?s=612x612&w=0&k=20&c=8dU_a2Th99KQ8ih6oIoLMh-Ge4hbFd32IUKgQrDP35s="
          }
          alt=""
        />
      </div>
      <div className="ml-40 mt-2 text-center bg-cover z-50">
        <img
          height={100}
          width={150}
          src={
            "https://m.media-amazon.com/images/I/61MsvBsj-ZL._AC_SY395_.jpg"
          }
          alt=""
        />
      </div>
    </div>
  );
}

export default Ads;
