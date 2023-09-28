import { useState } from "react";
import Image from "next/image";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { useRouter } from "next/router";

// Hooks
import useBalanceDistribution from "@/models/overview/useBalanceDistribution";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/Card/Loader/Loader";
import NoData from "@/modules/Card/NoData/NoData";
import { formatLargeNumber } from "@/utils/functions";

import { IBalanceDistribution } from "@/types/overview/types";

export default function BalanceDistribution() {
  const { balanceDistribution, isLoading } = useBalanceDistribution();
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  const router = useRouter();

  if (isLoading)
    return (
      <CardLoader
        element={
          <CardHeader
            title="Balance Distribution"
            tooltip=""
            route={router.asPath + "#balance-distribution"}
          />
        }
      />
    );

  if (!balanceDistribution)
    return (
      <NoData
        element={<CardHeader title="Balance Distribution" tooltip="" />}
        message=""
      />
    );

  function BalanceDistributionCard({
    data,
    index,
  }: {
    data: IBalanceDistribution;
    index: number;
  }) {
    const isActive = activeCardIndex === index;

    return (
      <div
        className="md:col-span-1 col-span-3"
        onClick={() => setActiveCardIndex(isActive ? null : index)}
      >
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
              <div className="font-semibold">{data.symbol}</div>
              <div>
                Balance:{" "}
                <span className="font-semibold">
                  {formatLargeNumber(data.balance)}
                </span>
              </div>
            </div>
            <div className="absolute top-0 right-0 mt-3">
              {isActive ? (
                <FaArrowUp className="text-xl" />
              ) : (
                <FaArrowDown className="text-xl" />
              )}
            </div>
          </div>
          <div
            className={`${
              isActive ? "flex border-t-2 border-polkadotpurple mt-4" : "hidden"
            }`}
          >
            <div className="space-y-1 mt-3 w-full">
              <div className="flex justify-between">
                Locked:{" "}
                <span className="font-semibold">
                  {formatLargeNumber(data.locked)}
                </span>
              </div>
              <div className="flex justify-between">
                Reserved:{" "}
                <span className="font-semibold">
                  {formatLargeNumber(data.reserved)}
                </span>
              </div>
              <div className="flex justify-between">
                Bonded:{" "}
                <span className="font-semibold">
                  {formatLargeNumber(data.bonded)}
                </span>
              </div>
              <div className="flex justify-between">
                Unbonding:{" "}
                <span className="font-semibold">
                  {formatLargeNumber(data.unbonding)}
                </span>
              </div>
              <div className="flex justify-between">
                Democracy Lock:{" "}
                <span className="font-semibold">
                  {formatLargeNumber(data.democracy_lock)}
                </span>
              </div>
              <div className="flex justify-between">
                Conviction Lock:{" "}
                <span className="font-semibold">
                  {formatLargeNumber(data.conviction_lock)}
                </span>
              </div>
              <div className="flex justify-between">
                Election Lock:{" "}
                <span className="font-semibold">
                  {formatLargeNumber(data.election_lock)}
                </span>
              </div>
              <div className="flex justify-between">
                Nomination Bonded:{" "}
                <span className="font-semibold">
                  {formatLargeNumber(data.nomination_bonded)}
                </span>
              </div>
              <div className="flex justify-between">
                Token Unique ID:{" "}
                <span className="font-semibold">{data.token_unique_id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <CardHeader
        title="Balance Distribution"
        tooltip=""
        route={router.asPath + "#balance-distribution"}
      />{" "}
      <div className="grid grid-cols-3 gap-3">
        {balanceDistribution
          .slice(0, 6)
          .sort(
            (a, b) =>
              (b.balance as unknown as number) -
              (a.balance as unknown as number)
          )
          .map((data, index) => (
            <BalanceDistributionCard
              data={data}
              index={index}
              key={data.token_unique_id}
            />
          ))}
      </div>
    </Layout>
  );
}
