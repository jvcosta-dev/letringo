import { FunctionComponent } from "react";
import useSWR from "swr";

import Section from "../layout/Section";
import { Run } from "../../interfaces/run";
import RunCard from "./RunCard";
import { useUser } from "../../contexts/UserContext";
import Loading from "../ui/Loading";
import Error from "../ui/Error";
import { Link } from "react-router-dom";

interface ActiveRunsProps {}

const ActiveRuns: FunctionComponent<ActiveRunsProps> = ({}) => {
  const { fetcher } = useUser();

  const { data, isLoading, error } = useSWR("/run/active", fetcher);

  if (isLoading) return <Loading elementCount={3} />;
  if (error) return <Error code={error.code} />;

  return (
    <>
      {data && data.runs.length >= 1 ? (
        <Section name="Continue Lendo">
          <div className="flex flex-col gap-3">
            {data.runs.map((run: Run) => (
              <RunCard run={run} key={run.id} />
            ))}
          </div>
        </Section>
      ) : (
        <Section name="Sem Leituras Ativas!">
          <p className="text-xl lowercase">
            Para começar uma nova leitura acesse a{" "}
            <Link to={"/library"} className="text-primary">
              Biblioteca.
            </Link>
          </p>
        </Section>
      )}
    </>
  );
};

export default ActiveRuns;
