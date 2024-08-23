import Banner from "@/components/banner.client";
import Card from "@/components/card.server";
import NearbyCoffeeStores from "@/components/nearby-coffee-stores.client";
import { fetchCoffeeStores } from "@/libs/coffee-stores";
import { CoffeeStoreType } from "@/types";
import { Metadata } from "next";
import { getDomain } from "./utils";

async function getData() {
  if (
    !process.env.MAPBOX_API_TOKEN ||
    !process.env.UNSPLASH_ACCESS_KEY ||
    !process.env.AIRTABLE_API_KEY
  ) {
    throw new Error("One of API keys is not configured");
  }
  const SHANGHAI_LONG_LAT = "121.4247566111859%2C31.2902297137895";
  return await fetchCoffeeStores(SHANGHAI_LONG_LAT);
}

export const metadata: Metadata = {
  title: "Coffee Connoisseur",
  description: "Allow you to discover coffee store near you",
  metadataBase: getDomain(),
  alternates: {
    canonical: "/",
  },
};
export default async function Home() {
  const coffeeStores = await getData();

  return (
    <main className="mx-auto mt-10 max-w-6xl px-4">
      <NearbyCoffeeStores />
      <div className="mt-20">
        <h2 className="mt-8 pb-8 text-4xl font-bold text-white">
          Shanghai Stores
        </h2>
        <div className="grid grid-col-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
          {coffeeStores.map((coffeeStore: CoffeeStoreType, idx: Number) => (
            <Card
              key={`${coffeeStore.name}-${idx}`}
              name={coffeeStore.name}
              imgUrl={coffeeStore.imgUrl}
              href={`coffee-store/${coffeeStore.id}`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
