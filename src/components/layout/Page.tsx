import { FunctionComponent, ReactNode } from "react";
import { motion } from "framer-motion";

interface PageProps {
  children: ReactNode;
  exitDirection?: "up" | "down" | "left" | "right";
}

const Page: FunctionComponent<PageProps> = ({
  children,
  exitDirection = "down",
}) => {
  const exitVariants = {
    up: { y: -500 },
    down: { y: 500 },
    left: { x: -500 },
    right: { x: 500 },
  };

  return (
    <motion.main
      className="min-h-screen w-screen flex flex-grow flex-col gap-5 pt-8 px-6 pb-6 bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={exitVariants[exitDirection]}
      transition={{ delay: 0.2, duration: 0.2, ease: "easeInOut" }}
    >
      {children}
    </motion.main>
  );
};

export default Page;
