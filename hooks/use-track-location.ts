"use client";

import { useState } from "react";

export default function useTrackLocation() {
  const [isFindingLocation, setIsFindingLocation] = useState(false);
  const [longLat, setLongLat] = useState("");
  const [locationError, setLocationError] = useState("");

  const success = (position: GeolocationPosition) => {
    setIsFindingLocation(false);
    setLocationError("");
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLongLat(`${longitude},${latitude}`);
    console.log(`latitude:${latitude} longitude:${longitude}`);
  };

  const error = () => {
    setIsFindingLocation(false);
    setLocationError("Unable to retrieve your location");
    console.error("Unable to retrieve location");
  };

  const handleTrackLocation = () => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
    } else {
      setIsFindingLocation(true);
      console.log("locating....");
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return {
    locationError,
    longLat,
    isFindingLocation,
    handleTrackLocation,
  };
}
