import React, { useState, useRef, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useDispatch, useSelector } from "react-redux";
import { location as redlocation } from "../../store/authslice";
import axios from "axios";
import markerIcon from "../../assets/map-marker5.png";

const LeafletMap = ({ onLocationReceived, style }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const usercity = useSelector((state) => state.auth.city);
  const circleRef = useRef(null);
  const dispatch = useDispatch();
  const currentloc = useSelector((state) => state.auth.location);
  const [locdata, setlocdata] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({
    lat: 0,
    lng: 0,
  });

  const getRooms = async () => {
    try {
      const res = await axios.get(
        usercity
          ? `https://api.verydesi.com/api/getallrooms?city=${usercity}`
          : `https://api.verydesi.com/api/getallrooms?lat=${currentloc.lat}&lng=${currentloc.lng}`
      );
      // console.log(res.data.Allrooms);
      setlocdata(res.data.Allrooms.map((room) => room.location.coordinates));
    } catch (error) {
      console.log("error during fetching api", error);
    }
  };

  useEffect(() => {
    let lat, lng;
    if (onLocationReceived) {
      lat = onLocationReceived.lat;
      lng = onLocationReceived.lng;
    } else if (currentloc) {
      lat = currentloc.lat;
      lng = currentloc.lng;
    } else {
      return;
    }
    if (mapContainerRef.current) {
      const map = L.map(mapContainerRef.current).setView(
        [45.56123,-122.61345],
        10
      );
      mapRef.current = map;
      setCurrentLocation({ lat, lng });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: "© ",
      }).addTo(map);

      // markerRef.current = L.marker([lat, lng], {
      //   draggable: true,
      // }).addTo(map);

      // markerRef.current = L.circle([lat, lng], {
      //   color: "",
      //   fillColor: "#f03",
      //   fillOpacity: 0.3,
      //   radius: 1000,
      // }).addTo(map);

      getRooms();

      return () => map.remove();
    }
  }, [onLocationReceived, usercity]);

  useEffect(() => {
    if (mapRef.current && locdata.length > 0) {
      locdata.forEach((coords) => {
        L.marker([coords[1], coords[0]], {
          icon: L.icon({
            iconUrl: markerIcon,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            tooltipAnchor: [16, -28],
          }),
        }).addTo(mapRef.current);
      });
    }
  }, [locdata]);

  useEffect(() => {
    // dispatch(redlocation({ location: currentLocation }));
    // console.log(currentLocation);
  }, [currentLocation]);

  return (
    <div
      ref={(div) => {
        mapContainerRef.current = div;
      }}
      style={{ ...style, position: "relative", zIndex: 0 }}
    />
  );
};

export default LeafletMap;
