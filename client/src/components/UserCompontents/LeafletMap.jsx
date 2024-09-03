import React, { useState, useRef, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
import { useDispatch, useSelector } from "react-redux";
import { location as redlocation } from "../../store/authslice";
import axios from "axios";
import markerIcon from "../../assets/map-marker2.png";
import { renderToString } from "react-dom/server";
import MapPopup from "./MapPopup";
import { useNavigate } from "react-router-dom";

const LeafletMap = ({ onLocationReceived, style }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerClusterRef = useRef(null);
  const usercity = useSelector((state) => state.auth.city);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      setlocdata(
        res.data.Allrooms.map((room) => ({
          id: room._id,
          coordinates: room.location.coordinates,
        }))
      );
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
      markerClusterRef.current.clearLayers();

      const locationMap = locdata.reduce((acc, room) => {
        const { coordinates, id } = room;

        if (
          coordinates.length < 2 ||
          typeof coordinates[0] !== "number" ||
          typeof coordinates[1] !== "number"
        ) {
          console.error("Invalid coordinates:", coordinates);
          return acc;
        }

        const key = `${coordinates[1]},${coordinates[0]}`; // [lat, lng] => lat,lng
        if (!acc[key]) {
          acc[key] = { coordinates, count: 0, roomIds: [] };
        }
        acc[key].count += 1;
        acc[key].roomIds.push(id);
        return acc;
      }, {});

      Object.values(locationMap).forEach((location) => {
        const { coordinates, count, roomIds } = location;
        const [lng, lat] = coordinates;

        if (typeof lat !== "number" || typeof lng !== "number") {
          console.error("Invalid latitude or longitude:", lat, lng);
          return;
        }

        const marker = L.marker([lat, lng], {
          icon: L.divIcon({
            className: "custom-div-icon",
            html: `
              <div style="
                background-color: white; 
                border-radius: 50%; 
                width: 40px; 
                height: 40px; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);">
                <img src="${markerIcon}" style="width: 25px; height: 25px;" />
              </div>
            `,
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40],
            tooltipAnchor: [20, -20],
          }),
        });
        marker.on("click", async () => {
          try {
            const _id = roomIds[0];
            const roomDetailResponse = await axios.get(
              `https://api.verydesi.com/api/getspecificroom/${_id}`
            );

            const roomDetails = roomDetailResponse.data.rooms;

            L.popup({
              maxWidth: 150,
              className: "custom-popup",
            })
              .setLatLng([lat, lng])
              .setContent(
                renderToString(<MapPopup roomDetails={roomDetails} />)
              )
              .openOn(mapRef.current);
          } catch (error) {
            console.log("Error fetching room details:", error);
          }
        });

        markerClusterRef.current.addLayer(marker);
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
