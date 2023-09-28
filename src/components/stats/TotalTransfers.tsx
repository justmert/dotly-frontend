import { useRouter } from "next/router";

// Hooks
import useTotalTransfers from "@/models/stats/useTotalTransfers";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/Card/Loader/Loader";
import NoData from "@/modules/Card/NoData/NoData";

import { FaArrowAltCircleDown, FaMedal } from "react-icons/fa";

export default function TotalTransfers() {
  const { totalTransfers, isLoading } = useTotalTransfers();
  const router = useRouter();

  if (isLoading)
    return (
      <CardLoader
        element={
          <CardHeader
            title="Total Transfers"
            tooltip=""
            route={router.asPath + "#total-transfers"}
          />
        }
      />
    );

  if (!totalTransfers)
    return (
      <NoData
        element={<CardHeader title="Total Transfers" tooltip="" />}
        message=""
      />
    );

  function BalanceStatsItem({
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
      <CardHeader
        title="Total Transfers"
        tooltip=""
        route={router.asPath + "#total-transfers"}
      />{" "}
      <div className="grid grid-cols-1 h-[90%] justify-between">
        <BalanceStatsItem
          title="Received"
          value={totalTransfers.received}
          icon={<FaArrowAltCircleDown className="text-green-500 text-3xl" />}
        />
        <BalanceStatsItem
          title="Sent"
          value={totalTransfers.sent}
          icon={<FaArrowAltCircleDown className="text-orange-500 text-3xl" />}
        />
        <BalanceStatsItem
          title="Total Count"
          value={totalTransfers.total_count}
          icon={<FaMedal className="text-purple-500 text-3xl" />}
        />
      </div>
    </Layout>
  );
}
