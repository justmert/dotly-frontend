import Layout from "../Layout/Layout";

export default function Loader({ element }: { element: React.ReactNode }) {
  return (
    <Layout>
      <div>{element}</div>
      <div className="flex flex-col items-center justify-center h-full text-center -mt-16 min-h-[calc(5*5rem)]">
        <div className="w-16 h-16 border-t-4 border-sfgreen-800 border-solid rounded-full animate-spin"></div>
      </div>
    </Layout>
  );
}
