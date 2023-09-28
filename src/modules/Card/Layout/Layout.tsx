import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="border-2 border-sfblack rounded-lg px-10 py-10 h-full shadow-s justify-center overflow-hidden">
      {children}
    </div>
  );
};

export default Layout;
