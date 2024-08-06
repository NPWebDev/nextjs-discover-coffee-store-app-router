"use client";

export default function useTrackLocation() {
  const success = (position: GeolocationPosition) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(`latitude:${latitude} longitude:${longitude}`);
  };

  const error = () => {
    console.error("Unable to retrieve location");
  };

  const handleTrackLocation = () => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
    } else {
      console.log("locating....");
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return {
    handleTrackLocation,
  };
}
