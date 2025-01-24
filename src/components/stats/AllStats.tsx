import { FunctionComponent } from "react";
import useSWR from "swr";

import Section from "../layout/Section";
import Loading from "../ui/Loading";
import { useUser } from "../../contexts/UserContext";
import StatsList from "./StatsList";
import Error from "../ui/Error";

interface AllStatsProps {}

const AllStats: FunctionComponent<AllStatsProps> = () => {
  const { fetcher } = useUser();

  const { data, isLoading, error } = useSWR(`/stats`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });
  if (error) return <Error code={error.code} />;

  if (isLoading) return <Loading />;

  return (
    <>
      {data && (
        <Section name="Resumo Geral">
          <StatsList
            completed_count={data.completed_books}
            stats={data.stats}
            streak={data.streak}
          />
        </Section>
      )}
    </>
  );
};

export default AllStats;
