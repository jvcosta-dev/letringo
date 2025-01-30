import { Whatshot } from "@mui/icons-material";
import { FunctionComponent } from "react";

interface StreakProps {
  streak: number;
}

const Streak: FunctionComponent<StreakProps> = ({ streak }) => {
  return (
    <div className="w-max flex flex-row gap-1 items-center rounded-xl">
      <Whatshot
        className={`${streak >= 1 && "text-red"}`}
        style={{ width: 40, height: 40 }}
      />
      <p className="text-2xl font-bold">{streak}</p>
    </div>
  );
};

export default Streak;
