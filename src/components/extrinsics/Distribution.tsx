import { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import { useRouter } from "next/router";

// Hooks
import useDistribution from "@/models/extrinsics/useDistribution";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/Card/Loader/Loader";
import NoData from "@/modules/Card/NoData/NoData";
import CallActivity from "./CallActivity";

export default function Distribution() {
  const { distribution, isLoading } = useDistribution();
  const router = useRouter();

  // Call useState without conditional logic
  const [selectedPallet, setSelectedPallet] = useState<string | null>(null);
  const [selectedCall, setSelectedCall] = useState<string | null>(null);

  // Once the distribution data is available, determine default values
  useEffect(() => {
    if (distribution) {
      const largestPallet = Object.entries(distribution.pallets).sort(
        (a, b) => b[1] - a[1]
      )[0][0];

      setSelectedPallet(largestPallet);

      const initialPalletData = Object.entries(
        distribution.calls[largestPallet]
      );
      const largestCall = initialPalletData.length
        ? initialPalletData.sort((a, b) => b[1] - a[1])[0][0]
        : null;

      setSelectedCall(largestCall);
    }
  }, [distribution]);

  if (isLoading)
    return (
      <CardLoader
        element={
          <CardHeader
            title="Distribution"
            tooltip=""
            route={router.asPath + `#distribution`}
          />
        }
      />
    );

  if (!distribution)
    return (
      <NoData
        element={<CardHeader title="Distribution" tooltip="" />}
        message=""
      />
    );

  // Prepare data for the first pie chart showing pallets
  const palletsData = Object.entries(distribution.pallets).map(
    ([pallet, value]) => ({
      name: pallet,
      value,
      selected: pallet === selectedPallet, // Highlight the selected pallet
    })
  );

  // Prepare data for the second pie chart showing calls for the selected pallet
  const selectedPalletData = selectedPallet
    ? Object.entries(distribution.calls[selectedPallet]).map(
        ([call, value]) => ({
          name: call,
          value,
        })
      )
    : [];

  const option1 = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      left: "left",
      data: palletsData.map((item) => item.name),
    },
    series: [
      {
        name: "Pallets",
        type: "pie",
        radius: "65%",
        data: palletsData,
        label: {
          show: true,
          formatter: "{b}: {c}",
        },
      },
    ],
  };

  const option2 = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      left: "left",
      data: selectedPalletData.map((item) => item.name),
    },
    series: [
      {
        name: "Calls",
        type: "pie",
        radius: "65%",
        data: selectedPalletData,
        label: {
          show: true,
          formatter: "{b}: {c}",
        },
      },
    ],
  };

  const handlePalletClick = (event: any) => {
    // Retrieve the selected pallet from the clicked pie chart
    const selectedPalletName = event.name;
    setSelectedPallet(selectedPalletName);
    setSelectedCall(null); // Reset selectedCall when a new pallet is selected
  };

  const handleCallClick = (event: any) => {
    // Retrieve the selected call from the clicked pie chart
    const selectedCallName = event.name;
    setSelectedCall(selectedCallName);
  };

  return (
    <Layout>
      <CardHeader
        title="Distribution"
        tooltip=""
        route={router.asPath + `#distribution`}
      />{" "}
      <div className="flex">
        <div className="w-1/2 py-4 border-r-2 border-indigo-900">
          <ReactECharts
            option={option1}
            onEvents={{ click: handlePalletClick }}
          />
        </div>
        <div className="w-1/2 py-4 pl-6">
          <ReactECharts
            option={option2}
            onEvents={{ click: handleCallClick }}
          />
        </div>
      </div>
      {selectedCall && (
        <div className="w-full">
          <CallActivity selectedCall={selectedCall} />
        </div>
      )}
    </Layout>
  );
}
