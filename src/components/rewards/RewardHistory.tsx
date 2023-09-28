import { useState } from "react";
import { useRouter } from "next/router";
import ReactECharts from "echarts-for-react";

// Hooks
import useRewardHistory from "@/models/rewards/useRewardHistory";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/Card/Loader/Loader";
import NoData from "@/modules/Card/NoData/NoData";

import { IRewardHistoryInterval } from "@/types/rewards/types";

const intervals: any[] = [
  { name: "Day", value: "DAY" },
  { name: "Week", value: "WEEK" },
  { name: "Month", value: "MONTH" },
  { name: "Year", value: "YEAR" },
];

export default function RewardHistory() {
  const [selectedInterval, setSelectedInterval] = useState(intervals[0]);
  const { rewardHistory, isLoading } = useRewardHistory(selectedInterval);
  const router = useRouter();

  if (isLoading)
    return (
      <CardLoader
        element={
          <CardHeader
            title="Reward History"
            tooltip=""
            selectedInterval={selectedInterval}
            setSelectedInterval={setSelectedInterval}
            intervals={intervals}
            route={router.asPath + "#reward-history"}
          />
        }
      />
    );

  if (!rewardHistory)
    return (
      <NoData
        element={
          <CardHeader
            title="Reward History"
            tooltip=""
            selectedInterval={selectedInterval}
            setSelectedInterval={setSelectedInterval}
            intervals={intervals}
          />
        }
        message=""
      />
    );

  const options = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
      formatter: function (params: any) {
        const [info] = params;
        return `${info.name}: ${info.value}`;
      },
    },
    xAxis: {
      type: rewardHistory.xAxis.type,
      data: rewardHistory.xAxis.data,
    },
    yAxis: {
      type: rewardHistory.yAxis.type,
    },
    series: [
      {
        data: rewardHistory.series[0].data,
        type: "line",
        symbol: "none", // Remove data points
        lineStyle: {
          color: "#007BFF", // Line color
          shadowColor: "rgba(0, 123, 255, 0.5)", // Shadow color
          shadowBlur: 10, // Shadow blur radius
        },
      },
    ],
    dataZoom: [
      {
        type: "slider",
        start: 0,
        end: 100,
      },
    ],
    grid: {
      top: "5%",
      left: "1%",
      right: "1%",
      bottom: "17%",
      containLabel: true,
    },
  };

  return (
    <Layout>
      <CardHeader
        title="Reward History"
        tooltip=""
        selectedInterval={selectedInterval}
        setSelectedInterval={setSelectedInterval}
        intervals={intervals}
        route={router.asPath + "#reward-history"}
      />{" "}
      <ReactECharts option={options} style={{ height: "350px" }} />
    </Layout>
  );
}
