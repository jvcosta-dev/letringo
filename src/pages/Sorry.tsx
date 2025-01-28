import { FunctionComponent } from "react";
import { SyncProblemRounded } from "@mui/icons-material";
import { Link } from "react-router-dom";

import MainTitle from "../components/ui/MainTitle";
import { useQuery } from "../hooks/useQuery";
import Button from "../components/ui/Button";
import { useUser } from "../contexts/UserContext";

interface SorryProps {}

const Sorry: FunctionComponent<SorryProps> = () => {
  const { logout } = useUser();
  const query = useQuery();
  const code = query.get("code");
  return (
    <div className="top-0 fixed w-screen h-screen flex flex-col gap-4 items-center justify-center bg-red text-white">
      <SyncProblemRounded
        className="animate-bounce"
        style={{ width: 144, height: 144 }}
      />
      <MainTitle>Nós sentimos muito.</MainTitle>
      {code && <p className="text-xl font-bold">Erro no servidor: {code}</p>}
      <Link to={"/login"}>
        <Button ariaLabel="entrar novamente" size="xl" onClick={logout}>
          logar novamente
        </Button>
      </Link>
    </div>
  );
};

export default Sorry;
