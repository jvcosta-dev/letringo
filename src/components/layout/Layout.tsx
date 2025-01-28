import { FunctionComponent, ReactNode } from "react";

import Navbar from "./Navbar";

interface LayoutProps {
  children?: ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen flex flex-col justify-between text-neutral-dark dark:bg-black dark:text-white">
      {children}
      <Navbar />
    </div>
  );
};

export default Layout;
