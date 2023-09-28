import ReactECharts from "echarts-for-react";
import { useRouter } from "next/router";

// Hooks
import useTransferHistory from "@/models/stats/useTransferHistory";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/Card/Loader/Loader";
import NoData from "@/modules/Card/NoData/NoData";

import { ITransferHistoryInterval } from "@/types/stats/types";

export default function TransferHistory() {
  const interval: ITransferHistoryInterval = {
    value: "DAY",
  };

  const { transferHistory, isLoading } = useTransferHistory(interval);
  const router = useRouter();

  if (isLoading)
    return (
      <CardLoader
        element={
          <CardHeader
            title="Transfer History"
            tooltip=""
            route={router.asPath + "#transfer-history"}
          />
        }
      />
    );

  if (!transferHistory)
    return (
      <NoData
        element={<CardHeader title="Transfer History" tooltip="" />}
        message=""
      />
    );

  const options = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Incoming Transfers", "Outgoing Transfers"],
    },
    xAxis: transferHistory.xAxis,
    yAxis: transferHistory.yAxis,
    series: [
      {
        name: "Incoming Transfers",
        type: "line", // You can set this to 'line' or another appropriate type
        data: transferHistory.series[0].data,
        showSymbol: false, // Set showSymbol to false to remove symbols
      },
      {
        name: "Outgoing Transfers",
        type: "line", // You can set this to 'line' or another appropriate type
        data: transferHistory.series[1].data,
        showSymbol: false, // Set showSymbol to false to remove symbols
      },
    ],
    dataZoom: [
      {
        type: "inside", // 'inside' or 'slider'
        start: 0, // Zoom start percentage
        end: 100, // Zoom end percentage
      },
      {
        type: "slider", // 'inside' or 'slider'
        start: 0, // Slider start percentage
        end: 100, // Slider end percentage
        height: 30, // Height of the slider
        bottom: 10, // Position of the slider
      },
    ],
    grid: {
      left: "1%",
      right: "3%",
      bottom: "18%",
      top: "14%",
      containLabel: true,
    },
  };

  return (
    <Layout>
      <CardHeader
        title="Transfer History"
        tooltip=""
        route={router.asPath + "#transfer-history"}
      />{" "}
      <ReactECharts option={options} style={{ height: "350px" }} />
    </Layout>
  );
}
