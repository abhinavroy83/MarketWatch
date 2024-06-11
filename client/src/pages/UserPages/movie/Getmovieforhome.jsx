import React, { useEffect, useState } from "react";
import { Container } from "../../../components";
import axios from "axios";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Moviecard from "./Moviecard";

function Getmovieforhome() {
  const [movie, setmovie] = useState([]);
  const currentloc = useSelector((state) => state.auth.location);
  const usercity = useSelector((state) => state.auth.city);

  const fetchevents = async () => {
    try {
      const res = await axios.get(
        usercity
          ? ` https://api.verydesi.com/api/getmovie?city=${usercity}`
          : ` https://api.verydesi.com/api/getmovie?lat=${currentloc.lat}&lng=${currentloc.lng}`
      );
      console.log(res.data.allmovie);
      setmovie(res.data.allmovie);
    } catch (error) {
      console.log("error during fetching api", error);
    }
  };
  useEffect(() => {
    fetchevents();
  }, [currentloc, usercity]);
  const settings = {
    dots: false,
    infinite: true,
    nextArrow: <div className="custom-arrow">Next</div>,
    prevArrow: <div className="custom-arrow">Previous</div>,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    rtl: true,
  };
  return movie.length > 0 ? (
    <Container>
      <div className="text-black text-4xl font-[OpenSans] font-bold ml-6 mb-1">
        Movie
      </div>
      <div>
        <Slider {...settings} className="pb-2">
          {movie.map((item) => (
            <Moviecard key={item.id} {...item} />
          ))}
        </Slider>
      </div>
    </Container>
  ) : null;
}

export default Getmovieforhome;
