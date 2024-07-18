import Banner from "@/components/banner.client";
import Link from "next/link";

export default function Home() {
  const coffeeStoreId = "dark-horse-coffee";
  return (
    <main className="mx-auto mt-10 max-w-6xl px-4">
      <Banner />
      <Link href={`coffee-store/${coffeeStoreId}`}>Dark horse coffee</Link>
    </main>
  );
}
