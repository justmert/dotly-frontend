import React from "react";
import Layout from "../Layout/Layout";
import { FaNotEqual } from "react-icons/fa";

export default function NoData({
  element,
  message,
}: {
  element: React.ReactNode;
  message: string;
}) {
  return (
    <Layout>
      <div>{element}</div>
      <div className="flex flex-col items-center justify-center h-full text-center -mt-16 min-h-[calc(5*5rem)]">
        <FaNotEqual className="w-16 h-16 mb-6 text-sfgreen-700" />
        <h2 className="text-lg md:text-xl text-sfgreen-900 font-semibold mb-4">
          No Data Available
        </h2>
        <p className="text-md text-sfgreen-800">
          {message ? message : "We could not find any data for this component!"}
        </p>
      </div>
    </Layout>
  );
}
