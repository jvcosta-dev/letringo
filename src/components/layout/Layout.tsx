import { FunctionComponent, ReactNode } from "react";

import Navbar from "./Navbar";

interface LayoutProps {
  children?: ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <div className="w-screen h-screen flex flex-col justify-between">
      {children}
      <Navbar />
    </div>
  );
};

export default Layout;
