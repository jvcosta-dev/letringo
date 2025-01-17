import { FunctionComponent, ReactNode } from "react";

interface MainTitleProps {
  color?: string;
  children: ReactNode;
}

const MainTitle: FunctionComponent<MainTitleProps> = ({ color, children }) => {
  return (
    <h1
      className={`${
        color && `text-${color}`
      } text-3xl font-bold w-full text-center`}
    >
      {children}
    </h1>
  );
};

export default MainTitle;
