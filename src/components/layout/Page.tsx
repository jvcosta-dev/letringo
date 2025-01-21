import { FunctionComponent, ReactNode } from "react";
import { motion } from "framer-motion";

interface PageProps {
  children: ReactNode;
  exitDirection?: "up" | "down" | "left" | "right";
  isInLayout?: boolean;
  noDelay?: boolean;
}

const Page: FunctionComponent<PageProps> = ({
  children,
  exitDirection = "down",
  isInLayout,
  noDelay,
}) => {
  const exitVariants = {
    up: { y: -500 },
    down: { y: 500 },
    left: { x: -500 },
    right: { x: 500 },
  };

  return (
    <motion.main
      className={` flex flex-grow flex-col gap-5 pt-8 px-6 pb-6 md:px-32 lg:px-52 xl:px-[512px]  bg-white ${
        !isInLayout && "min-h-screen w-screen"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={exitVariants[exitDirection]}
      transition={{
        delay: noDelay ? 0 : 0.2,
        duration: 0.2,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.main>
  );
};

export default Page;
