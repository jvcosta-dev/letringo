import { FunctionComponent } from "react";
import Section from "../layout/Section";
import { Run } from "../../interfaces/run";
import RunCard from "./RunCard";

interface ActiveRunsProps {
  runs: Run[];
}

const ActiveRuns: FunctionComponent<ActiveRunsProps> = ({ runs }) => {
  return (
    <Section name="Continue Lendo">
      <div className="flex flex-col gap-3">
        {runs.map((run) => (
          <RunCard run={run} key={run.id} />
        ))}
      </div>
    </Section>
  );
};

export default ActiveRuns;
