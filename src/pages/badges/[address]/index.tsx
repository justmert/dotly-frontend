import Head from "next/head";

// Page Components
import CheckBadges from "@/components/badges/CheckBadges";

export default function Badges() {
  return (
    <>
      <Head>
        <title>Badges</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="flex flex-wrap space-y-10">
        <div id="check-badges" className="w-full">
          <CheckBadges />
        </div>
      </div>
    </>
  );
}
