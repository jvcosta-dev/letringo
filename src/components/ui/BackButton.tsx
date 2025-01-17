import UndoRounded from "@mui/icons-material/UndoRounded";
import { FunctionComponent } from "react";

import Button from "./Button";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  path?: string;
}

const BackButton: FunctionComponent<BackButtonProps> = ({ path }) => {
  const navigate = useNavigate();
  return (
    <Button
      size="xl"
      ariaLabel="voltar"
      onClick={() => {
        path ? navigate(path) : navigate(-1);
      }}
    >
      <UndoRounded />
    </Button>
  );
};

export default BackButton;
