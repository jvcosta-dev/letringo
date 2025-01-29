import { FunctionComponent } from "react";
import { AnimatePresence, motion } from "framer-motion";

import MainTitle from "./MainTitle";
import Button from "./Button";
import { useSettings } from "../../contexts/SettingsContext";

interface ConfirmModalProps {
  label: string;
  description: string;
  onClose: () => void;
}

const ConfirmModal: FunctionComponent<ConfirmModalProps> = ({
  label,
  description,
  onClose,
}) => {
  const { animations } = useSettings();
  return (
    <AnimatePresence>
      <motion.div
        key="modal"
        initial={animations ? { opacity: 0, scale: 0 } : undefined}
        animate={animations ? { opacity: 1, scale: 1 } : undefined}
        exit={animations ? { opacity: 0, scale: 0 } : undefined}
        className="z-40 absolute top-0 left-0 w-screen min-h-screen flex items-center justify-center bg-neutral-dark/90 dark:bg-neutral-950 px-2 no-doc-scroll"
      >
        <div className="w-max flex flex-col gap-5 rounded-3xl border-4 border-b-8 p-6 border-neutral-gray dark:border-white dark:bg-black min-w-80">
          <MainTitle start>{label}</MainTitle>
          <blockquote className="text-xl">{description}</blockquote>
          <div className="flex justify-end">
            <Button ariaLabel="confirmar" size="xl" onClick={onClose}>
              Certo!
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ConfirmModal;
