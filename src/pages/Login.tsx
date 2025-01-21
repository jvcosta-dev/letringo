import { ChangeEvent, FormEvent, useState } from "react";
import { PersonRounded, VpnKeyRounded } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

import Page from "../components/layout/Page";
import BackButton from "../components/ui/BackButton";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import MainTitle from "../components/ui/MainTitle";
import { useUser } from "../contexts/UserContext";
import { getErrorMessage } from "../utils/errors";
import { AxiosError } from "axios";

function Login() {
  const { login } = useUser();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [err, setErr] = useState("");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setErr("");

    try {
      await login(username, password);
      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        setErr(getErrorMessage(error.response?.data.errorCode));
      } else {
        setErr("Erro de conexão");
      }
      return;
    }
  };

  return (
    <Page exitDirection="down">
      <BackButton path="/welcome" />
      <MainTitle color="primary">Login</MainTitle>
      <form
        onSubmit={submit}
        className="flex flex-grow flex-col justify-between"
      >
        <div className="flex flex-col gap-2">
          <Input
            label="Nome de Usuário"
            name="username"
            placeholder="usuário123"
            type="text"
            value={username}
            Icon={PersonRounded}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            required
          />
          <Input
            label="Senha"
            name="password"
            type="password"
            value={password}
            Icon={VpnKeyRounded}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            required
          />
          {err && (
            <span className="w-full text-center text-sm text-red font-bold uppercase">
              {err}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <Button
            submit
            disabled={!username || !password}
            size="xl"
            fill
            ariaLabel="fazer registro"
          >
            Entrar
          </Button>
          <Link to={"/forgot-password"}>
            <Button outlined submit size="xl" fill ariaLabel="fazer registro">
              Esqueceu a Senha
            </Button>
          </Link>
          <p className="w-full text-center">
            Ao entrar no Letringo, você concorda com os nossos
            <b> Termos</b> e <b>Política de Privacidade.</b>
          </p>
        </div>
      </form>
    </Page>
  );
}

export default Login;
