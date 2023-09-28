import Image from "next/image";
import { useRouter } from "next/router";

// Hooks
import useAccount from "@/models/overview/useAccount";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/Card/Loader/Loader";
import NoData from "@/modules/Card/NoData/NoData";
import { formatLargeNumber } from "@/utils/functions";

import { MdCheckCircle, MdCancel } from "react-icons/md";

import { IAccount } from "@/types/overview/types";

export default function Account() {
  const { account, isLoading } = useAccount();
  const router = useRouter();

  if (isLoading)
    return (
      <CardLoader
        element={
          <CardHeader
            title="Account"
            tooltip=""
            route={router.asPath + "#account"}
          />
        }
      />
    );

  if (!account)
    return (
      <NoData element={<CardHeader title="Account" tooltip="" />} message="" />
    );

  function RewardsListCard({ data }: { data: IAccount; index: number }) {
    return (
      <div className="md:col-span-1 col-span-3 mb-6">
        <div className="border-2 border-polkadotpurple rounded-md p-4 hover:bg-gray-200/60 duration-100">
          <div className="relative flex items-center">
            <Image
              unoptimized={true}
              src="/polkadot-logo.jpg"
              alt="Description"
              className="mr-4 w-12 h-12 rounded-full"
              width={36}
              height={36}
            />
            <div className="flex flex-col">
              <div className="font-semibold">{account?.address}</div>
              <div>
                <span className="text-sm md:inline-block mr-1 hidden">
                  Balance: {/* For larger screens */}
                </span>
                <span className="md:inline hidden font-semibold text-sm">
                  {account?.balance}
                </span>
                {/* For small screens */}
                <span
                  className="md:hidden inline-block font-normal overflow-hidden whitespace-nowrap truncate"
                  style={{ maxWidth: "100px" }}
                >
                  {account?.balance}
                </span>
              </div>
            </div>
            <div className="absolute top-0 right-0 mt-3 bg-blue-200/70 border-2 border-blue-300 text-blue-800 rounded-lg px-2 text-sm">
              Extrinsic Count: {account?.count_extrinsic}
            </div>
          </div>
        </div>
      </div>
    );
  }

  function Badge({ name, status }: { name: string; status: any }) {
    return (
      <div className="flex justify-between items-center gap-2 py-1 px-2 bg-gray-100 border border-indigo-300 rounded hover:bg-gray-200">
        <div className="flex items-center gap-2">
          {status === true ? (
            <MdCheckCircle className="text-green-500" />
          ) : status === false ? (
            <MdCancel className="text-red-500 text-lg" />
          ) : null}
          <span className="font-semibold">{name}</span>
        </div>
        <span>{typeof status === "boolean" ? null : status}</span>
      </div>
    );
  }

  function RewardListCardItem({ data }: { data: IAccount; index: number }) {
    return (
      <div className="grid grid-cols-4 gap-6">
        <div className="md:col-span-1 col-span-4">
          <Badge name="Is EVM Contract" status={data.is_evm_contract} />
        </div>
        <div className="md:col-span-1 col-span-4">
          <Badge name="Is ERC20" status={data.is_erc20} />
        </div>
        <div className="md:col-span-1 col-span-4">
          <Badge name="Is ERC721" status={data.is_erc721} />
        </div>
        <div className="md:col-span-1 col-span-4">
          <Badge name="Is Council Member" status={data.is_council_member} />
        </div>
        <div className="md:col-span-1 col-span-4">
          <Badge name="Is Module Account" status={data.is_module_account} />
        </div>
        <div className="md:col-span-1 col-span-4">
          <Badge
            name="Is Fellowship Member"
            status={data.is_fellowship_member}
          />
        </div>
        <div className="md:col-span-1 col-span-4">
          <Badge name="Is Registrar" status={data.is_registrar} />
        </div>
        <div className="md:col-span-1 col-span-4">
          <Badge name="Is Techcomm Member" status={data.is_techcomm_member} />
        </div>
        <div className="md:col-span-1 col-span-4">
          <Badge
            name="Balance Lock"
            status={formatLargeNumber(data.balance_lock)}
          />
        </div>
        <div className="md:col-span-1 col-span-4">
          <Badge
            name="Conviction Lock"
            status={formatLargeNumber(data.conviction_lock)}
          />
        </div>
        <div className="md:col-span-1 col-span-4">
          <Badge
            name="Election Lock"
            status={formatLargeNumber(data.election_lock)}
          />
        </div>
        <div className="md:col-span-1 col-span-4">
          <Badge name="Lock" status={formatLargeNumber(data.lock)} />
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <CardHeader
        title="Account"
        tooltip=""
        route={router.asPath + "#account"}
      />
      <div>
        <RewardsListCard data={account} index={0} />
        <RewardListCardItem data={account} index={0} />
      </div>
    </Layout>
  );
}
