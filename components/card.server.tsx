import Image from "next/image";
import Link from "next/link";
import React from "react";

type CardType = {
  name: string;
  imgUrl: string;
  href: string;
};

export default function Card({ name, imgUrl, href }: CardType) {
  return (
    <Link href={href} className="m-auto rounded-xl border-gray-400 shadow-2xl">
      <div className="glass w-72 min-h-52 rounded-xl px-5 pb-5 pt-1 backdrop-blur-3xl">
        <div className="my-3">
          <h2 className="text-ellipsis overflow-hidden whitespace-nowrap text-xl font-bold">
            {name}
          </h2>
        </div>
        <div className="relative w-full h-48">
          <Image
            className="rounded-lg shadow-lg"
            src={imgUrl}
            alt={"Coffee Store Image"}
            fill
            objectFit="cover"
            priority
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
            placeholder="blur"
          />
        </div>
      </div>
    </Link>
  );
}
