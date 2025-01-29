import { AnimatePresence, motion } from "framer-motion";
import { FunctionComponent, ReactNode } from "react";
import { useSettings } from "../../contexts/SettingsContext";
import Button from "./Button";
import { CloseRounded } from "@mui/icons-material";
import MainTitle from "./MainTitle";

interface GenericModalProps {
  children: ReactNode;
  label: string;
  onClose?: () => void;
}

const GenericModal: FunctionComponent<GenericModalProps> = ({
  children,
  label,
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
        className="z-40 absolute p-6  top-0 left-0 w-screen min-h-screen flex items-center justify-center bg-neutral-dark/90 px-2 no-doc-scroll"
      >
        <div className="w-max flex flex-col gap-5 rounded-3xl border-4 border-b-8 p-6 border-neutral-gray dark:border-white bg-white min-w-80">
          <div className="flex items-center justify-between">
            <MainTitle start={onClose ? true : false}>{label}</MainTitle>
            {onClose && (
              <Button size="xl" ariaLabel="fechar" onClick={onClose}>
                <CloseRounded />
              </Button>
            )}
          </div>
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GenericModal;
