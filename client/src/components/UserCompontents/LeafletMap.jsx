import React, { useState, useRef, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useDispatch, useSelector } from "react-redux";
import { location as redlocation } from "../../store/authslice";

const LeafletMap = ({ onLocationReceived, style }) => {
  const mapContainerRef = useRef(null);
  const markerRef = useRef(null);
  const circleRef = useRef(null);
  const dispatch = useDispatch();
  const currentloc = useSelector((state) => state.auth.location);

  const [currentLocation, setCurrentLocation] = useState({
    lat: 0,
    lng: 0,
  });

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
    if (mapContainerRef) {
      const map = L.map(mapContainerRef.current).setView([lat, lng], 15);
      setCurrentLocation({ lat, lng });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© ",
      }).addTo(map);

      markerRef.current = L.marker([lat, lng], {
        draggable: true,
      }).addTo(map);

      markerRef.current.on("dragend", (e) => {
        const { lat, lng } = e.target.getLatLng();
        setCurrentLocation({ lat, lng });
      });

      map.on("click", (e) => {
        const { lat, lng } = e.latlng;
        markerRef.current.setLatLng([lat, lng]);
        setCurrentLocation({ lat, lng });
      });

      return () => map.remove();
    }
  }, [onLocationReceived]);

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
