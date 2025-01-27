import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { Run } from "../../interfaces/run";
import ProgressBar from "../ui/ProgressBar";
import { springHover } from "../../utils/animations";
import { useColor } from "color-thief-react";

interface RunCardProps {
  run: Run;
}

const RunCard: FunctionComponent<RunCardProps> = ({ run }) => {
  const navigate = useNavigate();

  const { data, loading, error } = useColor(run.book.thumb_url, "hex", {
    crossOrigin: "anonymous",
    quality: 100,
  });

  const pageList = run.page_list.split(",");
  return (
    <motion.div
      whileHover={springHover.whileHover}
      whileTap={springHover.whileTap}
      transition={springHover.transition}
      className={`cursor-pointer relative p-2 rounded-xl overflow-clip text-white bg-neutral-dark`}
      style={{ backgroundColor: loading || error ? "" : data }}
      onClick={() =>
        navigate(
          `/read/${run.id}?page=${parseInt(pageList[pageList.length - 1]) + 1}`
        )
      }
    >
      <div className="flex flex-col gap-4 p-3 rounded-xl border-2 border-b-4 z-20 relative border-white">
        <div className="flex flex-col gap-0">
          <h3 className="text-xl font-bold">{run.book.name}</h3>
          <p>{run.book.author}</p>
        </div>
        <ProgressBar value={run.pages_count} maxValue={run.goal} />
      </div>
      <img
        src={run.book.thumb_url}
        alt={`capa de: ${run.book.name}`}
        className="absolute w-28 h-40 -rotate-12 origin-top-right top-0 right-0 z-10"
      />
    </motion.div>
  );
};

export default RunCard;
