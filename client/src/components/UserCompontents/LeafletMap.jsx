import React, { useState, useRef, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
import { useDispatch, useSelector } from "react-redux";
import { location as redlocation } from "../../store/authslice";
import axios from "axios";

const LeafletMap = ({ onLocationReceived, style }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerClusterRef = useRef(null); // To store marker cluster
  const usercity = useSelector((state) => state.auth.city);
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
      setlocdata(res.data.Allrooms.map((room) => room.location.coordinates));
    } catch (error) {
      console.log("Error fetching API:", error);
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

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      const markerClusterGroup = L.markerClusterGroup({
        iconCreateFunction: (cluster) => {
          const count = cluster.getChildCount();

          return L.divIcon({
            html: `<div style="
              background-color: blue;
              color: white;
              font-size: 14px;
              font-weight: bold;
              text-align: center;
              border-radius: 50%;
              width: 30px;
              height: 30px;
              display: flex;
              align-items: center;
              justify-content: center;
            ">${count}</div>`,
            className: "custom-cluster-icon",
            iconSize: [30, 30],
          });
        },
      });
      markerClusterRef.current = markerClusterGroup;
      map.addLayer(markerClusterGroup);
      setCurrentLocation({ lat, lng });

      getRooms();

      return () => map.remove();
    }
  }, [onLocationReceived, usercity]);

  useEffect(() => {
    if (mapRef.current && locdata.length > 0) {
      // Clear previous markers from the cluster group
      markerClusterRef.current.clearLayers();

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
            background-color: blue; 
            color: white;
            font-size: 14px;
            font-weight: bold;
            text-align: center;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
          ">${count}</div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        });

        // Add the marker to the cluster group
        L.marker([lat, lng], { icon }).addTo(markerClusterRef.current);
      });
    }
  }, [locdata]);

  return (
    <div
      ref={(div) => {
        mapContainerRef.current = div;
      }}
      style={{
        ...style,
        height: "400px",
        width: "320px",
        borderRadius: "8px",
        position: "relative",
        zIndex: 0,
      }}
    />
  );
};

export default LeafletMap;
