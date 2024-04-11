import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
const ShareComponent = ({ url, title, onClose }) => {
  return (
    <div>
      <WhatsappShareButton url={url} title={title}>
        WhatsApp
      </WhatsappShareButton>
      <FacebookShareButton url={url} quote={title}>
        Facebook
      </FacebookShareButton>
      <TwitterShareButton url={url} title={title}>
        Twitter
      </TwitterShareButton>
      <button onClick={onClose}>Cut</button>
    </div>
  );
};

export default ShareComponent;
