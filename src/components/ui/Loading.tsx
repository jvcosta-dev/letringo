import { FunctionComponent } from "react";
import Section from "../layout/Section";

interface LoadingProps {}

const Loading: FunctionComponent<LoadingProps> = () => {
  return (
    <Section name="Carregando...">
      <div
        className={`h-40 relative p-2 rounded-xl overflow-clip bg-neutral-gray dark:bg-neutral-dark animate-pulse`}
      ></div>
    </Section>
  );
};

export default Loading;
