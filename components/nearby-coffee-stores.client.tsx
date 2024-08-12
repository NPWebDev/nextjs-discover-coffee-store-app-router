"use client";

import React, { useEffect, useState } from "react";
import Banner from "./banner.client";
import useTrackLocation from "@/hooks/use-track-location";
import Card from "./card.server";
import { CoffeeStoreType } from "@/types";
import { fetchCoffeeStores } from "@/libs/coffee-stores";

export default function NearbyCoffeeStores() {
  const { handleTrackLocation, isFindingLocation, longLat, locationError } =
    useTrackLocation();

  const [coffeeStores, setCoffeeStores] = useState([]);

  const handleOnClick = () => {
    handleTrackLocation();
  };

  useEffect(() => {
    async function coffeeStoresByLocation() {
      if (longLat) {
        const response = await fetchCoffeeStores(longLat);
        setCoffeeStores(response);
      }
    }
    coffeeStoresByLocation();
  }, [longLat]);

  return (
    <div>
      <Banner
        handleOnClick={handleOnClick}
        buttonText={isFindingLocation ? "Locating..." : "View store nearby"}
      />
      {locationError && <p>{locationError}</p>}
      <div className="mt-20">
        <h2 className="mt-8 pb-8 text-4xl font-bold text-white">
          Store near me
        </h2>
        <div className="grid grid-col-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
          {coffeeStores &&
            coffeeStores.map((coffeeStore: CoffeeStoreType, idx: Number) => (
              <Card
                key={`${coffeeStore.name}-${idx}`}
                name={coffeeStore.name}
                imgUrl={coffeeStore.imgUrl}
                href={`coffee-store/${coffeeStore.id}`}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
