import React, { useEffect, useRef } from "react";
import { FaWhatsapp, FaFacebook, FaShareAlt } from "react-icons/fa";
import { TbBrandTwitter } from "react-icons/tb";
import { IoCloseCircleSharp } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import CopyToClipboard from "react-copy-to-clipboard";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { toast } from "react-toastify";

const ShareComponent = ({ url, title, onClose }) => {
  const handleCopy = () => {
    toast.success("Link Copied");
  };

  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="lg:grid lg:grid-cols-4 items-center flex flex-col lg:gap-[7rem] gap-12 max-w-2xl relative lg:p-20 p-[4rem]"
    >
      <div className="text-green-600 text-[25px] items-center justify-center w-full hover:text-black">
        <WhatsappShareButton
          className="flex flex-col gap-2 items-center justify-center"
          url={url}
          title={title}
        >
          <FaWhatsapp size={32} className="items-center" />
          <p className="text-[25px]">WhatsApp</p>
        </WhatsappShareButton>
      </div>

      <div className="text-blue-600 text-[25px] items-center hover:text-black">
        <FacebookShareButton
          className="flex flex-col gap-2 items-center justify-center"
          url={url}
          quote={title}
        >
          <FaFacebook size={32} />
          <p className="text-[25px]">Facebook</p>
        </FacebookShareButton>
      </div>

      <div className="text-red-600 text-[25px] items-center hover:text-black">
        <TwitterShareButton
          className="flex flex-col gap-2 items-center justify-center"
          url={url}
          title={title}
        >
          <TbBrandTwitter size={32} />
          <p className="text-[25px]">Twitter</p>
        </TwitterShareButton>
      </div>

      <div className="text-gray-600 text-[25px] items-center hover:text-black text">
        <CopyToClipboard
          className="flex flex-col gap-2 items-center justify-center"
          text={url}
          onCopy={handleCopy}
        >
          <FaShareAlt size={27} className="" />
        </CopyToClipboard>
        <p className="text-[25px] mt-3">Link</p>
      </div>

      <div className="absolute right-1 top-1">
        <button onClick={onClose}>
          <RxCross1
            className="h-5 w-5 text-black absolute top-3 right-3 cursor-pointer hover:rotate-[360deg] transition-transform duration-300 "
            onClick={() => handleModal(false, false)}
          />
          {/* <IoCloseCircleSharp
            size={35}
            className="font-bold hover:text-red-800"
          /> */}
        </button>
      </div>
    </div>
  );
};

export default ShareComponent;
