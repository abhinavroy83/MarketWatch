import React from "react";
import { Container } from "../../../components";

function Eventcard({ ...item }) {
  return (
    <Container>
     <div className="mx-auto flex w-70 flex-col justify-center bg-white rounded-lg shadow-md border-gray-700 mb-5">
        <img
          className="aspect-video w-90 rounded-t-lg object-cover object-center"
          src={item.img}
        />
        <div className="p-2 ml-3">
          <h1 className="text-[13px] font-semibold text-gray-500 pb-1 font-[Montserrat] mt-1">
           LATEST EVENTS ARE - </h1>
          <p className="text-[18px] mt-1 text-black-500 leading-6 font-[OpenSans]">
            A wonderful serenity has taken possession of soul. 
          </p>
          <article className="flex gap-2 mt-2">
          <img  className="h-7 w-7"
          src={`https://static.thenounproject.com/png/368899-200.png`}/>
          <h1 className="text-[14px] font-semibold font-[Montserrat] text-gray-400 pt-1 pb-2">
           New Events. </h1>
           </article>
        </div>
      </div>
    </Container>
  );
}

export default Eventcard;
