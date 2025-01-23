import { FunctionComponent, ReactNode } from "react";
import { motion } from "framer-motion";
import { useSettings } from "../../contexts/SettingsContext";

interface PageProps {
  children: ReactNode;
  exitDirection?: "up" | "down" | "left" | "right";
  isInLayout?: boolean;
  instant?: boolean;
}

const Page: FunctionComponent<PageProps> = ({
  children,
  exitDirection = "down",
  isInLayout,
  instant,
}) => {
  const { animations } = useSettings();

  const exitVariants = {
    up: { y: -500 },
    down: { y: 500 },
    left: { x: -500 },
    right: { x: 500 },
  };

  const defaultTransition = {
    delay: 0.2,
    duration: 0.2,
    ease: "easeInOut",
  };

  return (
    <motion.main
      className={`flex flex-grow h-full flex-col gap-5 px-6 pt-6 pb-6 md:px-32 lg:px-52 xl:px-[512px] ${
        isInLayout
          ? "overflow-scroll"
          : "w-screen h-screen text-neutral-dark dark:bg-[#202020] dark:text-white"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={
        animations ? (instant ? "" : exitVariants[exitDirection]) : undefined
      }
      transition={
        animations
          ? instant
            ? { duration: 0.1 }
            : defaultTransition
          : undefined
      }
    >
      {children}
    </motion.main>
  );
};

export default Page;
