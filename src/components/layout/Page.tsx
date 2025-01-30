import { FunctionComponent, ReactNode } from "react";
import { motion } from "framer-motion";

interface PageProps {
  children: ReactNode;
  isInLayout?: boolean;
}

const Page: FunctionComponent<PageProps> = ({ children, isInLayout }) => {
  return (
    <motion.main
      className={`flex flex-grow h-full flex-col gap-5 px-6 py-6 md:px-32 lg:px-52 xl:px-[512px] ${
        isInLayout
          ? "overflow-y-scroll"
          : "w-screen h-screen text-neutral-dark dark:bg-black dark:text-white"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.15, duration: 0.25, ease: "easeInOut" }}
    >
      {children}
    </motion.main>
  );
};

export default Page;
