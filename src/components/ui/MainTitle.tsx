import { FunctionComponent, ReactNode } from "react";

interface MainTitleProps {
  color?: string;
  start?: boolean;
  children: ReactNode;
}

const MainTitle: FunctionComponent<MainTitleProps> = ({
  color,
  start,
  children,
}) => {
  return (
    <h1
      className={`${color && `text-${color}`} text-3xl font-bold ${
        start ? "text-start" : "text-center w-full"
      }`}
    >
      {children}
    </h1>
  );
};

export default MainTitle;
