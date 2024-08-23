import { getDomain } from "@/app/utils";
import Upvote from "@/components/upvote.client";
import { createCoffeeStore, findRecordByFilter } from "@/libs/aritable";
import { fetchCoffeeStore, fetchCoffeeStores } from "@/libs/coffee-stores";
import { CoffeeStoreType, ServerParamsType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function getData(id: string) {
  const coffeeStoreFromMapbox = await fetchCoffeeStore(id);
  const coffeeStore = await createCoffeeStore(coffeeStoreFromMapbox, id);
  const voting = coffeeStore ? coffeeStore[0].voting : 0;
  return coffeeStoreFromMapbox
    ? {
        ...coffeeStoreFromMapbox,
        voting,
      }
    : {};
}

export async function generateStaticParams() {
  const coffeeStores = await fetchCoffeeStores();

  return coffeeStores.map((coffeeStore: CoffeeStoreType) => {
    return { id: coffeeStore.id };
  });
}

export async function generateMetadata({
  params,
  searchParams,
}: ServerParamsType) {
  console.log(params);
  const coffeeStore = await fetchCoffeeStore(params.id);
  const { name = "" } = coffeeStore;
  return {
    title: name,
    description: `${name} - Coffee Store`,
    metadataBase: getDomain(),
    alternates: {
      canonical: `/coffee-store/${params.id}`,
    },
  };
}

export default async function Page(props: { params: { id: string } }) {
  const {
    params: { id },
  } = props;

  const coffeeStore = await getData(id);
  const { name = "", address = "", imgUrl = "", voting } = coffeeStore;

  return (
    <div className="h-full pb-80">
      <div className="m-auto grid max-w-full px-12 py-12 lg:max-w-6xl lg:grid-cols-2 lg:gap-4">
        <div>
          <div className="mb-2 mt-24 text-lg font-bold">
            <Link href="/">Back home</Link>
          </div>
          <div className="my-4">
            <h1 className="text-4xl">{name}</h1>
          </div>
          <Image
            className="max-h-[420px] min-w-full max-w-full rounded-lg border-2 lg:max-w-[470px] sepia"
            src={
              imgUrl ||
              "http://localhost:3000/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1501492673258-2bcfc17241fd%3Fq%3D80%26w%3D1976%26auto%3Dformat%26fit%3Dcrop%26ixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D&w=750&q=75"
            }
            width={740}
            height={360}
            alt={name}
          />
        </div>
        <div className="glass mt-12 flex-col rounded-lg p-4 lg:mt-48">
          {address && (
            <div className="mb-4 flex">
              <p className="pl-2">{address}</p>
            </div>
          )}
          <Upvote voting={voting} id={id} />
        </div>
      </div>
    </div>
  );
}
