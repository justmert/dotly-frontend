import ReactECharts from "echarts-for-react";
import { useRouter } from "next/router";

// Hooks
import useActivity from "@/models/extrinsics/useActivity";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/Card/Loader/Loader";
import NoData from "@/modules/Card/NoData/NoData";

import { IActivityInterval } from "@/types/extrinsics/types";

export default function Activity() {
  const interval: IActivityInterval = {
    value: "DAY",
  };

  const { activity, isLoading } = useActivity(interval);
  const router = useRouter();

  if (isLoading)
    return (
      <CardLoader
        element={
          <CardHeader
            title="Activity"
            tooltip=""
            route={router.asPath + `#activity`}
          />
        }
      />
    );

  if (!activity)
    return (
      <NoData element={<CardHeader title="Activity" tooltip="" />} message="" />
    );

  const options = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "line",
        label: {
          backgroundColor: "#6a7985",
        },
      },
      backgroundColor: "rgba(0,0,0,0.7)", // Background of the tooltip box
      borderColor: "#333",
      borderWidth: 1,
      padding: 10, // Padding inside the tooltip box
      textStyle: {
        color: "#ffffff",
      },
      formatter: function (params: any) {
        const data = params[0];
        return `${data.name}: ${data.value}`;
      },
    },
    xAxis: {
      type: activity.xAxis.type,
      data: activity.xAxis.data,
    },
    yAxis: {
      type: activity.yAxis.type,
    },
    series: [
      {
        data: activity.series[0].data,
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
        title="Activity"
        tooltip=""
        route={router.asPath + `#activity`}
      />{" "}
      <ReactECharts option={options} style={{ height: "350px" }} />
    </Layout>
  );
}
