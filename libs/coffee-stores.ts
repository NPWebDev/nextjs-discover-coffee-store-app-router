import { MapboxType } from "@/types";

const transformCoffeeData = (result: MapboxType) => {
  return {
    id: result.id,
    address: result.properties?.address || "",
    name: result.text,
    imgUrl:
      "https://images.unsplash.com/photo-1501492673258-2bcfc17241fd?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };
};

export const fetchCoffeeStores = async (longLat: string) => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/coffee.json?proximity=${longLat}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}`
    );
    const data = await response.json();

    return data.features.map((result: MapboxType) =>
      transformCoffeeData(result)
    );
  } catch (error) {
    console.error("Error while fetching coffee stores", error);
  }
};

export const fetchCoffeeStore = async (id: string) => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${id}.json?proximity=ip&access_token=${process.env.MAPBOX_API_TOKEN}`
    );
    const data = await response.json();

    const transformedData = data.features.map((result: MapboxType) =>
      transformCoffeeData(result)
    );

    return transformedData.length > 0 ? transformedData[0] : {};
  } catch (error) {
    console.error("Error while fetching coffee stores", error);
  }
};
