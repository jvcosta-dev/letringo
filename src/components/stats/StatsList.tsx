import { FunctionComponent } from "react";

import { Stat as IStat } from "../../interfaces/stat";
import Stat from "./Stat";
import {
  AutoStoriesRounded,
  BookRounded,
  Timer,
  Whatshot,
} from "@mui/icons-material";

interface StatsListProps {
  stats: IStat[];
  completed_count: number;
  streak?: number;
}

const StatsList: FunctionComponent<StatsListProps> = ({
  stats,
  completed_count,
  streak,
}) => {
  const read_time = (
    stats.reduce((total, stat) => total + stat.read_time, 0) / 3600
  ).toFixed(2);

  const pages_count = stats.reduce(
    (total, stat) => total + stat.pages_count,
    0
  );

  return (
    <div className="w-full grid grid-cols-2 grid-rows-1 gap-3">
      <Stat
        Icon={AutoStoriesRounded}
        value={pages_count}
        label="Páginas Lidas"
      />
      <Stat
        Icon={Whatshot}
        iconColor="red"
        value={streak ? streak : stats.length}
        label="Dias Ativos"
      />
      <Stat Icon={BookRounded} value={completed_count} label="Conclusões" />
      <Stat Icon={Timer} value={read_time} label="Horas Lidas" />
    </div>
  );
};

export default StatsList;
