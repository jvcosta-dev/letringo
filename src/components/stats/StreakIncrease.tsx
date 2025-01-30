import { WhatshotRounded } from "@mui/icons-material";
import { motion } from "framer-motion";
import { FunctionComponent, useEffect, useState } from "react";
import Button from "../ui/Button";
import { useSettings } from "../../contexts/SettingsContext";
import { useUser } from "../../contexts/UserContext";
import useSWR from "swr";

interface StreakIncreaseProps {}

const StreakIncrease: FunctionComponent<StreakIncreaseProps> = () => {
  const { fetcher } = useUser();
  const { sound } = useSettings();
  const [close, setClosed] = useState(false);

  const { data, isLoading } = useSWR(`/stats/streak`, fetcher);

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (data && data.streak) {
      if (sound) {
        const audio = new Audio("/sounds/tada.mp3");
        audio.play();
      }
      const timer = setTimeout(() => {
        setDisplayValue(data.streak);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [data]);

  if (close) {
    return null;
  }

  if (isLoading) {
    return <div></div>;
  }
  return (
    <div className="bg-white fixed top-0 left-0 w-screen h-screen flex flex-col justify-between py-6 px-6 md:px-32 lg:px-52 xl:px-[512px]">
      <motion.div
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.8, ease: "anticipate" }}
        className="flex flex-col flex-grow items-center justify-center"
      >
        <motion.span
          initial={{ scale: 4 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "anticipate" }}
        >
          <WhatshotRounded
            style={{ width: 144, height: 144 }}
            className="text-red"
          />
        </motion.span>
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-5xl font-bold">{displayValue}</h1>

          <h2 className="text-2xl font-bold">Dias de Ofensiva!</h2>
          <p className="text-xl text-center">
            Complete a leitura de uma página todos os dias para construir sua
            ofensiva.
          </p>
        </div>
      </motion.div>
      <Button
        size="xl"
        ariaLabel="continuar"
        fill
        onClick={() => setClosed(true)}
      >
        continuar
      </Button>
    </div>
  );
};

export default StreakIncrease;
