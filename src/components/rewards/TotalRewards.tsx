import { useRouter } from "next/router";

// Hooks
import useTotalRewards from "@/models/rewards/useTotalRewards";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/Card/Loader/Loader";
import NoData from "@/modules/Card/NoData/NoData";
import { formatLargeNumber } from "@/utils/functions";

import { FaCoins, FaMedal } from "react-icons/fa";

export default function TotalRewards() {
  const { totalRewards, isLoading } = useTotalRewards();
  const router = useRouter();

  if (isLoading)
    return (
      <CardLoader
        element={
          <CardHeader
            title="Total Rewards"
            tooltip=""
            route={router.asPath + "#total-rewards"}
          />
        }
      />
    );

  if (!totalRewards)
    return (
      <NoData
        element={<CardHeader title="Total Rewards" tooltip="" />}
        message=""
      />
    );

  function TotalRewardsItem({
    title,
    value,
    icon,
  }: {
    title: string;
    value: number;
    icon: JSX.Element;
  }) {
    return (
      <div className="border border-gray-300 p-4 flex justify-between items-center mb-4 rounded-md">
        <div>
          <div className="font-semibold ml-4 mb-1 text-lg">{title}</div>
          <div className="ml-4 text-lg">{formatLargeNumber(value)}</div>
        </div>
        <div className="mr-4">{icon}</div>
      </div>
    );
  }

  return (
    <Layout>
      <CardHeader
        title="Total Rewards"
        tooltip=""
        route={router.asPath + "#total-rewards"}
      />{" "}
      <div className="grid grid-cols-1 h-[85%] md:h-[90%] justify-between">
        <TotalRewardsItem
          title="Total Amount"
          value={totalRewards.total_amount}
          icon={<FaCoins className="text-green-500 text-3xl" />}
        />
        <TotalRewardsItem
          title="Total Count"
          value={totalRewards.total_count}
          icon={<FaMedal className="text-orange-500 text-3xl" />}
        />
      </div>
    </Layout>
  );
}
