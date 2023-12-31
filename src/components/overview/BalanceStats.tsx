import { useRouter } from "next/router";

// Hooks
import useBalanceStats from "@/models/overview/useBalanceStats";
import useWeeklyTransactionRate from "@/models/extrinsics/useWeeklyTransactionRate";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/Card/Loader/Loader";
import NoData from "@/modules/Card/NoData/NoData";
import { formatLargeNumber } from "@/utils/functions";

import { FaArrowDown, FaArrowUp, FaCalendar } from "react-icons/fa";

export default function BalanceStats() {
  const router = useRouter();

  const { balanceStats, isLoading } = useBalanceStats();
  const { weeklyTransactionRate, isLoading: isLoading2 } = useWeeklyTransactionRate();

  if (isLoading && isLoading2)
    return (
      <CardLoader
        element={
          <CardHeader
            title="Balance Stats"
            tooltip=""
            route={router.asPath + "#balance-stats"}
          />
        }
      />
    );

  if (!balanceStats)
    return (
      <NoData
        element={<CardHeader title="Balance Stats" tooltip="" />}
        message=""
      />
    );

  function BalanceStatsItem({
    title,
    value,
    icon,
  }: {
    title: string;
    value: string;
    icon: JSX.Element;
  }) {
    return (
      <div className="border border-gray-300 p-4 flex justify-between items-center mb-4 rounded-md">
        <div>
          <div className="font-semibold">{title}</div>
          <div>{value}</div>
        </div>
        <div>{icon}</div>
      </div>
    );
  }

  return (
    <Layout>
      <CardHeader
        title="Balance Stats"
        tooltip=""
        route={router.asPath + "#balance-stats"}
      />{" "}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        <BalanceStatsItem
          title="Max Balance"
          value={formatLargeNumber(balanceStats.max)}
          icon={<FaArrowUp className="text-green-500 text-2xl" />}
        />
        <BalanceStatsItem
          title="Min Balance"
          value={formatLargeNumber(balanceStats.min)}
          icon={<FaArrowDown className="text-red-500 text-2xl" />}
        />
      </div>
      <div className="grid grid-cols-1">
        <BalanceStatsItem
          title="Previous 24H Balance"
          value={formatLargeNumber(balanceStats.prev24H)}
          icon={<FaArrowUp className="text-green-500 text-2xl" />}
        />
      </div>
      <div className="grid grid-cols-1">
        <BalanceStatsItem
          title="Weekly Transaction Rate"
          value={formatLargeNumber(
            (weeklyTransactionRate?.last_week_transaction_count as number) ||
              "NaN"
          )}
          icon={<FaCalendar className="text-green-500 text-2xl" />}
        />
      </div>
    </Layout>
  );
}
