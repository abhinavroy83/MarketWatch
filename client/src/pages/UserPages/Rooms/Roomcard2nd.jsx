import React from "react";
import femaleLogo from '../../../assets/female.png'


function Roomcard2nd({ isSingleRow, ...item }) {
  function truncateWords(str, numWords) {
    const words = str.split(" ");

    const truncated = words.slice(0, numWords).join(" ");

    if (words.length > numWords) {
      return truncated + "...";
    }

    return truncated;
  }

  const calculateTimeDifference = (dateStr) => {
    const date = new Date(dateStr);
    const currentDate = new Date();
    const diffInMs = currentDate - date;
    const diffInMin = Math.floor(diffInMs / (1000 * 60));

    if (diffInMin < 60) {
      return `${diffInMin} min ago`;
    } else {
      const diffInHours = Math.floor(diffInMin / 60);
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    }
  };

  return (
    <article
      className={`flex gap-4 items-center mt-2 ${
        isSingleRow ? "justify-between pr-4" : "justify-start px-4 border shadow-md p-5 rounded-xl hover:shadow-lg"
      }`}
    >
      <div className="flex">
        <img
          className="flex"
          height={55}
          width={55}
          src={femaleLogo}        
          alt=""
        />
      </div>
      <div className="block grow">
        <h1 className="text-xl font-roboto text-black font-bold">
          {" "}
          {truncateWords(item.Adname, 3)}
        </h1>
        <h1 className="text-lg font-roboto text-gray-500 ">
          {item.address}
        </h1>
       <div className="flex gap-2"> 
       <p>BY : {item.postedby}</p> -
        <p> {calculateTimeDifference(item.postedon)}</p>
        </div> 
      </div>
      <div className="flex gap-4 justify-center items-center">
        <p className="text-xl text-black font-roboto font-bold">$550</p>
      </div>
    </article>
  );
}

export default Roomcard2nd;
