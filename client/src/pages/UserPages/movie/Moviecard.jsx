import React from "react";
import { Container } from "../../../components";

function Moviecard({ ...item }) {
  return (
    <Container>
      <div className="mx-auto flex w-80 flex-col justify-center bg-white rounded-2xl shadow-xl shadow-gray-400/20">
        <img
          className="aspect-video w-80 rounded-t-2xl object-cover object-center"
          src={item.img}
        />
        <div className="p-6">
          <h1 className="text-2xl font-medium text-gray-700 pb-2">
            Your Heading
          </h1>
          <p className="text text-gray-500 leading-6">
            A wonderful serenity has taken possession of my entire soul, like
            these sweet mornings of spring which I enjoy with my whole heart.
          </p>
        </div>
      </div>
    </Container>
  );
}

export default Moviecard;
