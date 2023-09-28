import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// Hooks
import useRecentTransfers from "@/models/stats/useRecentTransfers";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/Card/Loader/Loader";
import NoData from "@/modules/Card/NoData/NoData";
import {
  formatDistanceToNow,
  publicKeyToAddress,
  formatLargeNumber,
} from "@/utils/functions";

import { IRecentTransfers } from "@/types/stats/types";

export default function RecentTransfers() {
  const { recentTransfers, isLoading } = useRecentTransfers();
  const router = useRouter();

  if (isLoading)
    return (
      <CardLoader
        element={
          <CardHeader
            title="Recent Transfers"
            tooltip=""
            route={router.asPath + "#recent-transfers"}
          />
        }
      />
    );

  if (!recentTransfers)
    return (
      <NoData
        element={<CardHeader title="Recent Transfers" tooltip="" />}
        message=""
      />
    );

  function TransferRow({ transfer }: { transfer: IRecentTransfers }) {
    // Destructuring the required data from the proposal object

    return (
      <div className="hover:bg-gray-100/50 flex bg-white rounded-lg border-2 border-indigo-900">
        <div className="py-4 px-4 w-1/2 flex items-center">
          {/* Displaying the image on the left */}
          <div className="w-12 h-12 overflow-hidden rounded">
            <Image
              unoptimized
              src={"/polkadot-logo.jpg"}
              alt="Proposal"
              className="w-full h-full object-cover rounded-full"
              width={50}
              height={50}
            />
          </div>
          {/* Content to the right of the image */}
          <Link
            href={`https://explorer.polkascan.io/polkadot/extrinsic/${transfer.transfer.extrinsicHash}`}
            target="_blank"
          >
            <div className="ml-4">
              <div className="text-md font-semibold text-gray-900 truncate max-w-xl">
                {publicKeyToAddress(transfer.transfer.to.publicKey)}
              </div>
              <div className="flex items-center space-x-2 mt-2">
                {/* <div
                  className={`text-xs ${statusColors.textColor} ${statusColors.bgColor} p-1 rounded inline-block`}
                >
                  {statusChanges[statusChanges.length - 1].type}
                </div> */}
                <div className="text-sm text-sfblue-800">
                  Hash: {transfer.transfer.extrinsicHash}
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="px-6 py-4 w-1/6 flex flex-col justify-center">
          {/* Votes For */}
          {/* Count */}
          <div className="bg-sky-200/70 border-2 border-sky-300 text-sky-800 text-xs font-semibold px-2 py-1 rounded">
            {formatDistanceToNow(transfer.transfer.timestamp)}
          </div>
        </div>

        <div className="px-6 py-4 w-1/6 flex flex-col justify-center">
          {/* Votes Against */}
          {/* Count */}
          <div className="bg-orange-200/70 border-2 border-orange-300 text-orange-800 text-xs font-semibold px-2 py-1 rounded">
            {transfer.direction === "From" ? "Receive From" : "Send To"}
          </div>
        </div>
        <div className="px-6 py-4 whitespace-nowrap flex flex-col justify-center items-end w-1/6">
          {/* Total Votes */}
          <div className="text-md font-semibold text-gray-900 text-right">
            {formatLargeNumber(transfer.transfer.amount)}
          </div>
          <div className="text-xs text-gray-500 text-right">
            {transfer.transfer.success}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="min-w-full mt-2">
        <div className="bg-gradient-to-r from-[#3C4D6E] to-[#4D5E7E] p-1 rounded-lg shadow-md flex">
          {/* First div now has flex-2 to take up half the space */}
          <div className="py-1.5 px-4 text-left text-md font-semibold text-white tracking-wider w-1/2">
            Address
          </div>
          {/* Each of the following divs have flex-1 to share the remaining space equally */}
          <div className="py-1.5 px-4 text-left text-md font-semibold text-white tracking-wider w-1/6">
            Time
          </div>
          <div className="py-1.5 px-4 text-left text-md font-semibold text-white tracking-wider w-1/6">
            Direction
          </div>
          <div className="py-1.5 px-4 text-end text-md font-semibold text-white tracking-wider w-1/6 justify-end items-end">
            Amount
          </div>
        </div>

        <div className="mt-3 space-y-3">
          {recentTransfers.slice(0, 5).map((transfer) => (
            <TransferRow key={transfer.id} transfer={transfer} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
