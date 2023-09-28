import ReactECharts from "echarts-for-react";
import Image from "next/image";
import { useRouter } from "next/router";

// Hooks
import useRecentExtrinsics from "@/models/extrinsics/useRecentExtrinsics";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/Card/Loader/Loader";
import NoData from "@/modules/Card/NoData/NoData";
import { formatDistanceToNow } from "@/utils/functions";

import { IRecentExtrinsics } from "@/types/extrinsics/types";

export default function RecentExtrinsics() {
  const { recentExtrinsics, isLoading } = useRecentExtrinsics();
  const router = useRouter();

  if (isLoading)
    return (
      <CardLoader
        element={
          <CardHeader
            title="Recent Extrinsics"
            tooltip=""
            route={router.asPath + "#recent-extrinsics"}
          />
        }
      />
    );

  if (!recentExtrinsics)
    return (
      <NoData
        element={<CardHeader title="Recent Extrinsics" tooltip="" />}
        message=""
      />
    );

  function ExtrinsicsListCard({
    data,
    index,
  }: {
    data: IRecentExtrinsics;
    index: number;
  }) {
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
              <div className="font-semibold">{data.mainCall.palletName}</div>
              <div>
                Call:{" "}
                <span className="font-semibold">{data.mainCall.callName}</span>
              </div>
            </div>
            <div className="absolute top-0 right-0 mt-3">
              {formatDistanceToNow(data.timestamp)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <CardHeader
        title="Recent Extrinsics"
        tooltip=""
        route={router.asPath + "#recent-extrinsics"}
      />{" "}
      <div className="grid grid-cols-2 gap-3">
        {recentExtrinsics.slice(0, 8).map((data, index) => (
          <ExtrinsicsListCard data={data} index={index} key={data.id} />
        ))}
      </div>
    </Layout>
  );
}
