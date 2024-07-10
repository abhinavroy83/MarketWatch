import React from "react";

function Error() {
  return (
    <div className="h-screen justify-center items-center font-['udemy-regular'] flex flex-col mt-5">
      <img
        className="w-50 h-50"
        src={`https://media.istockphoto.com/id/1388733994/vector/404-error-icon-with-alien-spaceship-page-lost-and-message-not-found-ufo-vector-flat.jpg?s=612x612&w=0&k=20&c=OYQ4jo8uFdgJ6tN5PxorrgIbUBR2rlhJ7RRKdF8zgTw=`}
        alt="logo"
      />
      <p className="text-[55px] text-orange-600 font-bold">Oops!</p>
      <p className="text-[30px]">Page not found</p>
    </div>
  );
}

export default Error;
