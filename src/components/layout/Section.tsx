import { FunctionComponent, ReactNode } from "react";

interface SectionProps {
  name: string;
  children: ReactNode;
}

const Section: FunctionComponent<SectionProps> = ({ name, children }) => {
  return (
    <section id={name} className="flex flex-col gap-1">
      <h2 className="text-2xl font-bold">{name}</h2>
      {children}
    </section>
  );
};

export default Section;
