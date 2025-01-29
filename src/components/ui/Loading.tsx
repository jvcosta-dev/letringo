import { FunctionComponent } from "react";

interface LoadingProps {}

const Loading: FunctionComponent<LoadingProps> = () => {
  return (
    <p className="text-2xl font-bold">
      Carregando <span className="animate-pulse">...</span>
    </p>
  );
};

export default Loading;
