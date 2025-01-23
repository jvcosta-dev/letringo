import { FunctionComponent } from "react";
import Section from "../layout/Section";
import { Block } from "@mui/icons-material";

interface ErrorProps {
  code: string | undefined;
}

const Error: FunctionComponent<ErrorProps> = ({ code }) => {
  return (
    <Section name={`Erro: ${code}`}>
      <div
        className={`h-40 flex justify-center items-center relative p-2 rounded-xl overflow-clip bg-red`}
      >
        <Block style={{ width: 48, height: 48 }} />
      </div>
    </Section>
  );
};

export default Error;
