import Image from "next/image";
import { useRouter } from "next/router";

// Hooks
import useRecentRewards from "@/models/rewards/useRecentRewards";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/Card/Loader/Loader";
import NoData from "@/modules/Card/NoData/NoData";
import { formatDistanceToNow, publicKeyToAddress } from "@/utils/functions";

import { IRecentRewards } from "@/types/rewards/types";

export default function RecentRewards() {
  const { recentRewards, isLoading } = useRecentRewards();
  const router = useRouter();

  if (isLoading)
    return (
      <CardLoader
        element={
          <CardHeader
            title="Recent Rewards"
            tooltip=""
            route={router.asPath + "#recent-rewards"}
          />
        }
      />
    );

  if (!recentRewards)
    return (
      <NoData
        element={<CardHeader title="Recent Rewards" tooltip="" />}
        message=""
      />
    );

  function RewardsListCard({ data }: { data: IRecentRewards; index: number }) {
    return (
      <div className="md:col-span-1 col-span-3">
        <div className="border-2 border-polkadotpurple rounded-md p-4 hover:bg-gray-200/60 duration-100">
          <div className="relative flex items-center">
            <Image
              unoptimized={true}
              src="/polkadot-logo.jpg"
              alt="Description"
              className="mr-4 w-12 h-12 rounded-full"
              width={36}
              height={36}
            />
            <div className="flex flex-col">
              <div className="font-semibold">{data.amount.toFixed(2)}</div>
              <div>
                <span className="text-sm md:inline-block mr-1 hidden">
                  Validator: {/* For larger screens */}
                </span>
                <span className="md:inline hidden font-semibold text-sm">
                  {publicKeyToAddress(data.validatorId)}
                </span>
                {/* For small screens */}
                <span
                  className="md:hidden inline-block font-normal overflow-hidden whitespace-nowrap truncate"
                  style={{ maxWidth: "100px" }}
                >
                  {data.validatorId}
                </span>
              </div>
            </div>
            <div className="absolute top-0 right-0 mt-3 bg-blue-200/70 border-2 border-blue-300 text-blue-800 rounded-lg px-2 text-sm">
              {formatDistanceToNow(data.timestamp)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <CardHeader
        title="Recent Rewards"
        tooltip=""
        route={router.asPath + "#recent-rewards"}
      />{" "}
      <div className="grid grid-cols-2 gap-3">
        {recentRewards.slice(0, 8).map((data, index) => (
          <RewardsListCard data={data} index={index} key={data.id} />
        ))}
      </div>
    </Layout>
  );
}
