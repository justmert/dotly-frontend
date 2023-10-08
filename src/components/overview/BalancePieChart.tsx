import ReactECharts from "echarts-for-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// Hooks
import useBalanceDistribution from "@/models/overview/useBalanceDistribution";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/Card/Loader/Loader";
import NoData from "@/modules/Card/NoData/NoData";

import { IBalanceDistribution } from "@/types/overview/types";

export default function BalancePieChart() {
  const { balanceDistribution, isLoading } = useBalanceDistribution();
  const router = useRouter();

  if (isLoading)
    return (
      <CardLoader
        element={
          <CardHeader
            title="Balance Pie Chart"
            tooltip=""
            route={router.asPath + "#balance-pie-chart"}
          />
        }
      />
    );

  if (!balanceDistribution)
    return (
      <NoData
        element={
          <CardHeader
            title="Balance Pie Chart"
            tooltip=""
            route={router.asPath + "#balance-pie-chart"}
          />
        }
        message=""
      />
    );

  const balanceChartOption = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      left: "left",
      data: balanceDistribution.map((item) => item.network).slice(0, 12),
    },
    series: [
      {
        name: "Parachain Balances",
        type: "pie",
        data: balanceDistribution.map((item) => ({
          value: parseFloat(item.balance),
          name: item.network,
        })),
        top: "5%",
        radius: "65%",
      },
    ],
  };

  const distributionChartOption = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      left: "left",
      data: ["Locked", "Reserved", "Bonded", "Unbonding"].slice(0, 4),
    },
    series: [
      {
        name: "Balance Types",
        type: "pie",
        data: [
          {
            value: balanceDistribution.reduce(
              (acc: number, curr) => acc + parseFloat(curr.locked),
              0
            ),
            name: "Locked",
          },
          {
            value: balanceDistribution.reduce(
              (acc: number, curr) => acc + parseFloat(curr.reserved),
              0
            ),
            name: "Reserved",
          },
          {
            value: balanceDistribution.reduce(
              (acc: number, curr) => acc + parseFloat(curr.bonded),
              0
            ),
            name: "Bonded",
          },
          {
            value: balanceDistribution.reduce(
              (acc: number, curr) => acc + parseFloat(curr.unbonding),
              0
            ),
            name: "Unbonding",
          },
        ],
        radius: "65%",
        top: "5%",
      },
    ],
  };

  const subDistributionChartOption = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      left: "left",
      data: [
        "Democracy Lock",
        "Election Lock",
        "Conviction Lock",
        "Nomination Bonded",
      ].slice(0, 5),
    },
    series: [
      {
        name: "Sub-Distribution",
        type: "pie",
        data: [
          {
            value: balanceDistribution.reduce(
              (acc: number, curr) => acc + parseFloat(curr.democracy_lock),
              0
            ),
            name: "Democracy Lock",
          },
          {
            value: balanceDistribution.reduce(
              (acc: number, curr) => acc + parseFloat(curr.election_lock),
              0
            ),
            name: "Election Lock",
          },
          {
            value: balanceDistribution.reduce(
              (acc: number, curr) => acc + parseFloat(curr.conviction_lock),
              0
            ),
            name: "Conviction Lock",
          },
          {
            value: balanceDistribution.reduce(
              (acc: number, curr) => acc + parseFloat(curr.nomination_bonded),
              0
            ),
            name: "Nomination Bonded",
          },
        ],
        radius: "65%",
        top: "5%",
      },
    ],
  };

  return (
    <Layout>
      <CardHeader
        title="Balance Pie Chart"
        tooltip=""
        route={router.asPath + "#balance-pie-chart"}
      />{" "}
      <div className="w-full border-b-2 border-indigo-900 pb-10">
        <ReactECharts option={balanceChartOption} />
      </div>
      <div className="flex">
        <div className="w-1/2 py-4 border-r-2 border-indigo-900">
          <ReactECharts option={distributionChartOption} />
        </div>
        <div className="w-1/2 py-4 pl-6">
          <ReactECharts option={subDistributionChartOption} />
        </div>
      </div>
    </Layout>
  );
}
