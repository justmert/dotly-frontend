import { ReactNode } from "react";
import Sidebar from "@/modules/Sidebar/Sidebar";

export default function Layout({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  return (
    <>
      <Sidebar content={children} />
    </>
  );
}
