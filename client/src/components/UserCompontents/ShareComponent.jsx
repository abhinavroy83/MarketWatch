import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { TbBrandTwitter } from "react-icons/tb";
import { IoCloseCircleSharp } from "react-icons/io5";



import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
const ShareComponent = ({ url, title, onClose }) => {
  return (
    <div className="flex justify-between gap-20">
      <div className="text-green-600 text-[25px] font-bold items-center justify-center w-full hover:text-black">
      <WhatsappShareButton className="flex flex-col gap-2 items-center justify-center" url={url} title={title}>
         <FaWhatsapp size={32} className="items-center"/>
         <p>WhatsApp</p>
      </WhatsappShareButton>
      </div>
      
      <div className="text-blue-600 text-[25px] font-bold items-center hover:text-black">
      <FacebookShareButton className="flex flex-col gap-2 items-center justify-center" url={url} quote={title}>
        <FaFacebook size={32}/>
        <p>Facebook</p>
      </FacebookShareButton>
      </div>

      <div className="text-red-600 text-[25px] font-bold items-center hover:text-black">
      <TwitterShareButton className="flex flex-col gap-2 items-center justify-center" url={url} title={title}>
        <TbBrandTwitter size={32}/>
        <p>Twitter</p>
      </TwitterShareButton>
      </div>
      <div className="items-end top-0">
      <button onClick={onClose}><IoCloseCircleSharp size={35} className="font-bold hover:text-red-800"/></button>
      </div>
    </div>
  );
};

export default ShareComponent;
