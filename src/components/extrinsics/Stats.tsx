// Hooks
import useTotalExtrinsics from "@/models/extrinsics/useTotalExtrinsics";
import useWeeklyTransactionRate from "@/models/extrinsics/useWeeklyTransactionRate";
import { useRouter } from "next/router";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/Card/Loader/Loader";
import NoData from "@/modules/Card/NoData/NoData";

import { FaAddressBook, FaCalendar } from "react-icons/fa";

export default function Stats() {
  const { totalExtrinsics, isLoading } = useTotalExtrinsics();
  const { weeklyTransactionRate, isLoading: isLoading2 } =
    useWeeklyTransactionRate();
  const router = useRouter();

  if (isLoading && isLoading2)
    return (
      <CardLoader
        element={
          <CardHeader
            title="Stats"
            tooltip=""
            route={router.asPath + "#stats"}
          />
        }
      />
    );

  if (!totalExtrinsics || !weeklyTransactionRate)
    return (
      <NoData element={<CardHeader title="Stats" tooltip="" />} message="" />
    );

  function StatsItem({
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
          <div className="ml-4 text-lg">{value}</div>
        </div>
        <div className="mr-4">{icon}</div>
      </div>
    );
  }

  return (
    <Layout>
      <CardHeader title="Stats" tooltip="" route={router.asPath + "#stats"} />{" "}
      <div className="grid grid-cols-1 h-[90%] justify-between">
        <StatsItem
          title="Total Extrinsics"
          value={totalExtrinsics.total_count}
          icon={<FaAddressBook className="text-green-500 text-3xl" />}
        />
        <StatsItem
          title="Weekly Transaction Rate"
          value={weeklyTransactionRate.last_week_transaction_count}
          icon={<FaCalendar className="text-orange-500 text-3xl" />}
        />
      </div>
    </Layout>
  );
}
