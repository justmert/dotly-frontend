import { useRouter } from "next/router";

// Hooks
import useIdentity from "@/models/overview/useIdentity";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/Card/Loader/Loader";
import NoData from "@/modules/Card/NoData/NoData";

import { MdCheckCircle, MdCancel } from "react-icons/md";
import { IIdentity } from "@/types/overview/types";

export default function Identity() {
  const { identity, isLoading } = useIdentity();
  const router = useRouter();

  if (isLoading)
    return (
      <CardLoader
        element={
          <CardHeader
            title="Identity"
            tooltip=""
            route={router.asPath + "#identity"}
          />
        }
      />
    );

  if (!identity)
    return (
      <NoData element={<CardHeader title="Identity" tooltip="" />} message="" />
    );

  function Badge({
    name,
    status,
    link,
    iconStart,
  }: {
    name: string;
    status: any;
    link?: string;
    iconStart?: React.ReactElement;
  }) {
    return (
      <div className="flex justify-between items-center gap-2 py-3 px-4 bg-gray-100 border border-indigo-300 rounded hover:bg-gray-200">
        <div className="flex items-center gap-2">
          {iconStart}
          <span className="font-semibold">{name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-indigo-600">{status}</span>
        </div>
      </div>
    );
  }

  function RewardListCardItem({ data }: { data: IIdentity; index: number }) {
    return (
      <div className="grid grid-cols-4 gap-6">
        <div className="md:col-span-4 col-span-4">
          <Badge
            name="Network"
            status={data.network ? data.network : "-"}
            iconStart={<MdCheckCircle className="text-green-900 text-lg" />}
          />
        </div>
        <div className="md:col-span-4 col-span-4">
          <Badge
            name="Identity"
            status={String(
              data?.parent?.identity ? data.parent.identity : data.identity
            )}
            iconStart={<MdCheckCircle className="text-green-900 text-lg" />}
          />
        </div>
        <div className="md:col-span-4 col-span-4">
          <Badge
            name="Display"
            status={data?.parent?.display ? data.parent.display : data.display}
            iconStart={<MdCheckCircle className="text-green-900 text-lg" />}
          />
        </div>
        <div className="md:col-span-4 col-span-4">
          <Badge
            name="Sub Symbol"
            status={data?.parent?.sub_symbol ? data.parent.sub_symbol : "-"}
            iconStart={<MdCheckCircle className="text-green-900 text-lg" />}
          />
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <CardHeader
        title="Identity"
        tooltip=""
        route={router.asPath + "#identity"}
      />{" "}
      <div>
        <RewardListCardItem data={identity[0]} index={0} />
      </div>
    </Layout>
  );
}
