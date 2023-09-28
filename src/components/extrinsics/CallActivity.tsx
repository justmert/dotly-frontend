import ReactECharts from "echarts-for-react";
import { useRouter } from "next/router";

// Hooks
import useCallActivity from "@/models/extrinsics/useCallActivity";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/Card/Loader/Loader";
import NoData from "@/modules/Card/NoData/NoData";

import { IActivityInterval } from "@/types/extrinsics/types";

export default function CallActivity({
  selectedCall,
}: {
  selectedCall: string;
}) {
  const interval: IActivityInterval = {
    value: "DAY",
  };

  const { callActivity, isLoading } = useCallActivity(selectedCall, interval);
  const router = useRouter();

  if (isLoading)
    return (
      <CardLoader
        element={
          <CardHeader
            title="Call Activity"
            tooltip=""
            route={router.asPath + `#distribution`}
          />
        }
      />
    );

  if (!callActivity)
    return (
      <NoData
        element={<CardHeader title="Call Activity" tooltip="" />}
        message=""
      />
    );

  const options = {
    xAxis: {
      type: callActivity.xAxis.type,
      data: callActivity.xAxis.data,
    },
    yAxis: {
      type: callActivity.yAxis.type,
    },
    series: [
      {
        data: callActivity.series[0].data,
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
    <div className="mt-8">
      <CardHeader
        title="Call Activity"
        tooltip=""
        route={router.asPath + `#distribution`}
      />
      <ReactECharts option={options} style={{ height: "350px" }} />
    </div>
  );
}
