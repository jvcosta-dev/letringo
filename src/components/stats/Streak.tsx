import { Whatshot } from "@mui/icons-material";
import { FunctionComponent } from "react";
import useSWR from "swr";

import { useUser } from "../../contexts/UserContext";
import Loading from "../ui/Loading";

interface StreakProps {}

const Streak: FunctionComponent<StreakProps> = () => {
  const { fetcher } = useUser();

  const { data, isLoading, error } = useSWR(`/stats/streak`, fetcher);
  if (isLoading) return <Loading />;
  if (error) return <></>;

  return (
    <div className="w-max flex flex-row gap-1 items-center rounded-xl">
      <Whatshot
        className={`${data.streak >= 1 && "text-red"}`}
        style={{ width: 40, height: 40 }}
      />
      <p className="text-2xl font-bold">{data.streak}</p>
    </div>
  );
};

export default Streak;
