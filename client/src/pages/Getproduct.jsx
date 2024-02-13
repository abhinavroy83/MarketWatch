import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function Getproduct() {
  const cuurentlocation = useSelector((state) => state.auth.location);
  // console.log("first", cuurentlocation);
  const [products, setproducts] = useState([]);

  const fetchdata = async () => {
    try {
      if (cuurentlocation) {
        const res = await axios.get(
          `https://marketplace-8nn9.onrender.com/api/getProducts?lat=${cuurentlocation.lat}&lng=${cuurentlocation.lng}`
        );
        if (res) {
          setproducts(res.data.Products);
        }
      }
    } catch (error) {
      console.log("error during fetcing api", error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, [cuurentlocation]);
  return (
    <div>
      {products.length > 0 ? (
        <div>
          <p className="text-white font-dm-sans ml-3 text-2xl font-bold leading-[144.023%]">
            Products Near you
          </p>

          <div className="flex flex-wrap justify-evenly py-2 my-2">
            {products.map((item, key) => (
              <div key={key} className="w-[250px] rounded-md border mx-2 my-2">
                <img
                  src={item.Imageurl}
                  alt="Laptop"
                  className="h-[150px] w-full rounded-md object-cover"
                />
                <div className="p-4">
                  <h1 className="text-lg font-semibold">{item.Productname}</h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h2>There is no product near you</h2>
        </div>
      )}
    </div>
  );
}

export default Getproduct;
