import ReactEChart from "echarts-for-react";
import Image from "next/image";
import { useRouter } from "next/router";

// Hooks
import useRewardRelationship from "@/models/rewards/useRewardRelationship";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/Card/Loader/Loader";
import NoData from "@/modules/Card/NoData/NoData";

import { publicKeyToAddress, formatLargeNumber } from "@/utils/functions";

export default function RewardRelationship() {
  const { rewardRelationship, isLoading } = useRewardRelationship();
  const router = useRouter();

  if (isLoading)
    return (
      <CardLoader
        element={
          <CardHeader
            title="Reward Relationship"
            tooltip=""
            route={router.asPath + "#reward-relationship"}
          />
        }
      />
    );

  if (!rewardRelationship)
    return (
      <NoData
        element={<CardHeader title="Reward Relationship" tooltip="" />}
        message=""
      />
    );

  const countData = [
    ...rewardRelationship.count.map((sender) => ({
      name: publicKeyToAddress(sender.validator_id),
      value: sender.count,
    })),
  ]
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const amountData = [
    ...rewardRelationship.amount.map((receiver) => ({
      name: publicKeyToAddress(receiver.validator_id),
      value: receiver.amount,
    })),
  ].sort((a, b) => b.value - a.value);

  const countOption = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
      data: countData.map((item) => item.name),
    },
    series: [
      {
        name: "Count",
        type: "pie",
        radius: "60%",
        data: countData,
        label: {
          show: false,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  function TransferAmountsCard({ data, index }: { data: any; index: number }) {
    return (
      <div className="md:col-span-1 col-span-3">
        <div className="border-2 border-polkadotpurple rounded-md p-4 hover:bg-gray-200/60 duration-100">
          {" "}
          <div className="relative flex">
            <Image
              unoptimized={true}
              src="/polkadot-logo.jpg"
              alt="Description"
              className="mr-4 w-12 h-12 rounded-full"
              width={36}
              height={36}
            />
            <div className="flex flex-col">
              <div className="font-normal truncate w-72">
                {publicKeyToAddress(data.name)}
              </div>
              <div>
                Amount:{" "}
                <span className="font-semibold">
                  {formatLargeNumber(data.value)}
                </span>
              </div>
            </div>
            <div className="absolute font-semibold top-0 right-0 mt-3">
              {index + 1}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col md:flex-row space-y-10 md:space-x-6 md:space-y-0 w-full">
        <div className="w-full md:w-1/3">
          <Layout>
            <CardHeader
              title="Top 5 Reward Amounts"
              tooltip=""
              route={router.asPath + "#reward-relationship"}
            />{" "}
            {amountData.map((data, index) => (
              <TransferAmountsCard data={data} key={index} index={index} />
            ))}
          </Layout>
        </div>
        <div className="w-full md:w-2/3">
          <Layout>
            <CardHeader
              title="Reward Relationship"
              tooltip=""
              route={router.asPath + "#reward-relationship"}
            />{" "}
            <ReactEChart option={countOption} style={{ height: "400px" }} />
          </Layout>
        </div>
      </div>
    </>
  );
}
