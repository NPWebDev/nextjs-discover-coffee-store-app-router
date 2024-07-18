import Link from "next/link";
import React from "react";

export default function Page(props: { params: { id: string } }) {
  const {
    params: { id },
  } = props;
  return (
    <div className="h-full pb-80">
      <div className="m-auto grid max-w-full px-12 py-12 lg:max-w-6xl lg:grid-cols-2">
        <div className="mb-2 mt-24 text-lg font-bold">
          <Link href="/">Back home</Link>
        </div>
      </div>
    </div>
  );
}
