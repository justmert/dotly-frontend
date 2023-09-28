import ReactECharts from "echarts-for-react";
import { useRouter } from "next/router";

// Hooks
import useSuccessRate from "@/models/extrinsics/useSuccessRate";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/Card/Loader/Loader";
import NoData from "@/modules/Card/NoData/NoData";

export default function SuccessRate() {
  const { successRate, isLoading } = useSuccessRate();
  const router = useRouter();

  if (isLoading)
    return (
      <CardLoader
        element={
          <CardHeader
            title="Success Rate"
            tooltip=""
            route={router.asPath + "#success-rate"}
          />
        }
      />
    );

  if (!successRate)
    return (
      <NoData
        element={<CardHeader title="Success Rate" tooltip="" />}
        message=""
      />
    );

  const options = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      orient: "horizontal",
      left: "center",
      top: "7%", // Adjust the margin-top here
      data: successRate.legendData, // Use the legendData from your API response
    },
    series: [
      {
        type: "pie",
        radius: "65%",
        center: ["50%", "60%"],
        data: successRate.seriesData, // Use the seriesData from your API response
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
    grid: {
      top: "11%",
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
  };

  return (
    <Layout>
      <CardHeader
        title="Success Rate"
        tooltip=""
        route={router.asPath + "#success-rate"}
      />{" "}
      <ReactECharts option={options} style={{ height: "350px" }} />
    </Layout>
  );
}
