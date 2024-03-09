import React from "react";
import { Container } from "../../../components";

function Eventcard({ ...item }) {
  return (
    <Container>
     <div className="mx-auto flex w-70 flex-col justify-center bg-white rounded-2xl shadow-md border-gray-700 mb-5">
        <img
          className="aspect-video w-80 rounded-t-2xl object-cover object-center"
          src={item.img}
        />
        <div className="p-6">
          <h1 className="text-[15px] font-semibold text-gray-500 pb-2 font-[Montserrat] ">
           LATEST EVENTS ARE - </h1>
          <p className="text-[18px] mt-2 font-semibold text-black-500 leading-6 font-[OpenSans]">
            A wonderful serenity has taken possession of soul. 
          </p>
          <article className="flex gap-2 mt-4">
          <img  className="h-7 w-7"
          src={`https://static.thenounproject.com/png/368899-200.png`}/>
          <h1 className="text-[16px] font-semibold font-[Montserrat] text-gray-400 pt-1">
           New Events. </h1>
           </article>
        </div>
      </div>
    </Container>
  );
}

export default Eventcard;
