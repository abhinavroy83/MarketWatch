import React, { useEffect, useRef } from "react";
import { FaWhatsapp, FaFacebook, FaShareAlt } from "react-icons/fa";
import { TbBrandTwitter } from "react-icons/tb";
import { IoCloseCircleSharp } from "react-icons/io5";
import CopyToClipboard from "react-copy-to-clipboard";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

const ShareComponent = ({ url, title, onClose }) => {
  const handleCopy = () => {
    alert("Link Copied");
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
    <div ref={ref} className="grid grid-cols-4 gap-12 max-w-2xl relative p-20">
      <div className="text-green-600 text-[25px] font-bold items-center justify-center w-full hover:text-black">
        <WhatsappShareButton
          className="flex flex-col gap-2 items-center justify-center"
          url={url}
          title={title}
        >
          <FaWhatsapp size={32} className="items-center" />
          <p className=" text-2xl">WhatsApp</p>
        </WhatsappShareButton>
      </div>

      <div className="text-blue-600 text-[25px] font-bold items-center hover:text-black">
        <FacebookShareButton
          className="flex flex-col gap-2 items-center justify-center"
          url={url}
          quote={title}
        >
          <FaFacebook size={32} />
          <p className=" text-2xl">Facebook</p>
        </FacebookShareButton>
      </div>

      <div className="text-red-600 text-[25px] font-bold items-center hover:text-black">
        <TwitterShareButton
          className="flex flex-col gap-2 items-center justify-center"
          url={url}
          title={title}
        >
          <TbBrandTwitter size={32} />
          <p className=" text-2xl">Twitter</p>
        </TwitterShareButton>
      </div>

      <div className="text-gray-600 text-[25px] font-bold items-center hover:text-black text">
        <CopyToClipboard
          className="flex flex-col gap-2 items-center justify-center ml-2"
          text={url}
          onCopy={handleCopy}
        >
          <FaShareAlt size={27} />
        </CopyToClipboard>
        <p className=" text-2xl mt-3">Link</p>
      </div>

      <div className="absolute right-1 top-1">
        <button onClick={onClose}>
          <IoCloseCircleSharp
            size={35}
            className="font-bold hover:text-red-800"
          />
        </button>
      </div>
    </div>
  );
};

export default ShareComponent;
