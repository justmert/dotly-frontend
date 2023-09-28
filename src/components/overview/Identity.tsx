import { useRouter } from "next/router";

// Hooks
import useIdentity from "@/models/overview/useIdentity";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/Card/Loader/Loader";
import NoData from "@/modules/Card/NoData/NoData";

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

  return (
    <Layout>
      <CardHeader
        title="Identity"
        tooltip=""
        route={router.asPath + "#identity"}
      />{" "}
    </Layout>
  );
}
