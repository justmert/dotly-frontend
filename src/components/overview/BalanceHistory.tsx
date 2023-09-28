import ReactECharts from "echarts-for-react";
import { useRouter } from "next/router";

// Hooks
import useBalanceHistory from "@/models/overview/useBalanceHistory";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/Card/Loader/Loader";
import NoData from "@/modules/Card/NoData/NoData";

export default function BalanceHistory() {
  const { balanceHistory, isLoading } = useBalanceHistory();
  const router = useRouter();

  if (isLoading)
    return (
      <CardLoader
        element={
          <CardHeader
            title="Balance History"
            tooltip=""
            route={router.asPath + "#balance-history"}
          />
        }
      />
    );

  if (!balanceHistory)
    return (
      <NoData
        element={<CardHeader title="Balance History" tooltip="" />}
        message=""
      />
    );

  // Prepare data for the chart
  const chartData = balanceHistory.map((item) => ({
    value: parseFloat(item.value),
    date: item.date,
  }));

  const chartOptions = {
    tooltip: {
      trigger: "axis",
      formatter: (params: any) => {
        const { name, value } = params[0];
        return `${name}: ${value}`;
      },
    },
    xAxis: {
      type: "category",
      data: chartData.map((item) => item.date),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Balance",
        type: "line",
        data: chartData.map((item) => item.value),
        showSymbol: false,
        smooth: true,
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
      top: "10%",
      containLabel: true,
    },
  };

  return (
    <Layout>
      <CardHeader
        title="Balance History"
        tooltip=""
        route={router.asPath + "#balance-history"}
      />{" "}
      <ReactECharts option={chartOptions} style={{ height: "400px" }} />
    </Layout>
  );
}
