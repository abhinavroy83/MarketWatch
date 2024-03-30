import React from "react";

function Roomcard2nd({ isSingleRow }) {
  return (
    <article
      className={`flex gap-2 items-center mt-2 ${
        isSingleRow ? "justify-between pr-4" : "justify-start px-4"
      }`}
    >
      <div className="flex">
        <img
          className="flex"
          height={55}
          width={55}
          src="https://media.istockphoto.com/id/1284444739/vector/female-symbol-on-transparent-background.jpg?s=612x612&w=0&k=20&c=EK8Uhpixm-Bo-Es4bVvaGWLlJQcFAf99lCOAR04qOTk="
          alt=""
        />
      </div>
      <div className="block grow ">
        <h1 className="text-xl font-roboto text-black">Name Of Ad</h1>
        <h1 className="text-lg font-roboto text-gray-500 pb-2">
          City Name, State Posted By[First Name] 30 Mins Ago
        </h1>
      </div>
      <div className="flex gap-4 justify-center items-center">
        <p className="text-xl text-black font-roboto">$550</p>
      </div>
    </article>
  );
}

export default Roomcard2nd;
