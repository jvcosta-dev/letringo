import { FunctionComponent } from "react";
import { Navigate } from "react-router-dom";

interface ErrorProps {
  code: string | undefined;
}

const Error: FunctionComponent<ErrorProps> = ({ code }) => {
  return <Navigate to={`/sorry?code=${code}`} replace />;
};

export default Error;
