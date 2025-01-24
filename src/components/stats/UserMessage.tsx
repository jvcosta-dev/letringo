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

  const { data, isLoading, error } = useSWR(`/auth/me`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });
  if (isLoading) return <Loading />;
  if (error) {
    return <Error code={error.code} />;
  }

  return (
    <section className="w-full flex items-center justify-between">
      <MainTitle start>Olá @{data.display_name}!</MainTitle>
      <Streak />
    </section>
  );
};

export default UserMessage;
