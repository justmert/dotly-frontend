import Head from "next/head";

// Page Components
import Activity from "@/components/extrinsics/Activity";
import CallActivity from "@/components/extrinsics/CallActivity";
import Distribution from "@/components/extrinsics/Distribution";
import RecentExtrinsics from "@/components/extrinsics/RecentExtrinsics";
import SuccessRate from "@/components/extrinsics/SuccessRate";
import Stats from "@/components/extrinsics/Stats";

export default function Extrinsics() {
  return (
    <>
      <Head>
        <title>Extrinsics</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="flex flex-wrap space-y-10">
        <div className="flex flex-col md:flex-row space-y-10 md:space-x-6 md:space-y-0 w-full">
          <div id="recent-extrinsics" className="w-full md:w-2/3">
            <RecentExtrinsics />
          </div>
          <div id="success-rate" className="w-full md:w-1/3">
            <SuccessRate />
          </div>
        </div>
        <div id="distribution" className="w-full">
          <Distribution />
        </div>
        <div className="flex flex-col md:flex-row space-y-10 md:space-x-6 md:space-y-0 w-full">
          <div id="activity" className="w-full md:w-2/3">
            <Activity />
          </div>
          <div id="stats" className="w-full md:w-1/3">
            <Stats />
          </div>
        </div>
      </div>
    </>
  );
}
