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
          ? `http://localhost:8000/api/getmovie?city=${usercity}`
          : `http://localhost:8000/api/getmovie?lat=${currentloc.lat}&lng=${currentloc.lng}`
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
    dots: true,
    infinite: true,
    nextArrow: <div className="custom-arrow">Next</div>,
    prevArrow: <div className="custom-arrow">Previous</div>,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    rtl: true,
  };
  return (
    <Container>
      <div>Movie</div>

      <Slider {...settings}>
        {movie.map((item) => (
          <Moviecard key={item.id} {...item} />
        ))}
      </Slider>
    </Container>
  );
}

export default Getmovieforhome;
