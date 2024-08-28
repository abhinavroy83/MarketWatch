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
        [45.56123, -122.61345],
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
      // Group locations by coordinates
      const locationMap = locdata.reduce((acc, coords) => {
        if (
          coords.length < 2 ||
          typeof coords[0] !== "number" ||
          typeof coords[1] !== "number"
        ) {
          console.error("Invalid coordinates:", coords); // Log invalid coordinates
          return acc;
        }

        const key = `${coords[1]},${coords[0]}`; // [lat, lng] => lat,lng
        if (!acc[key]) {
          acc[key] = { coordinates: coords, count: 0 };
        }
        acc[key].count += 1;
        return acc;
      }, {});

      console.log("Grouped locations:", locationMap); // Log the grouped locations

      // Create markers for each unique location with a count
      Object.values(locationMap).forEach((location) => {
        const { coordinates, count } = location;
        const [lng, lat] = coordinates;

        if (typeof lat !== "number" || typeof lng !== "number") {
          console.error("Invalid latitude or longitude:", lat, lng); // Log invalid lat/lng
          return;
        }

        // Create a custom icon with a count displayed
        const icon = L.divIcon({
          className: "custom-div-icon",
          html: `<div style="
            background-color:blue ;
            color: white;
            font-size: 14px;
            font-weight: bold;
            text-align: center;
            border-radius: 50%;
            padding: 5px;
            width: 25px;
            height: 25px;
            line-height: 25px;
          ">${count}</div>`,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28],
        });

        L.marker([lat, lng], { icon }).addTo(mapRef.current);
      });
    }
  }, [locdata]);

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
