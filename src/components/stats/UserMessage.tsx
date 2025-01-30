import { FunctionComponent } from "react";
import useSWR from "swr";

import { useUser } from "../../contexts/UserContext";
import MainTitle from "../ui/MainTitle";
import Error from "../ui/Error";
import Streak from "./Streak";
import Loading from "../ui/Loading";

interface UserMessageProps {}

const UserMessage: FunctionComponent<UserMessageProps> = () => {
  const { fetcher } = useUser();

  const {
    data: streakData,
    isLoading: isStreakLoading,
    error: streakError,
  } = useSWR(`/stats/streak`, fetcher);
  const {
    data: userData,
    isLoading: isUserLoading,
    error: userError,
  } = useSWR(`/auth/me`, fetcher);

  if (isStreakLoading || isUserLoading) return <Loading singleElement />;
  if (streakError || userError) {
    return <Error code={streakError?.code || userError?.code} />;
  }

  return (
    <section className="w-full flex items-center justify-between">
      <MainTitle start>
        Bem vindo ao Letringo! @{userData.display_name}
      </MainTitle>
      <Streak streak={streakData.streak} />
    </section>
  );
};

export default UserMessage;
