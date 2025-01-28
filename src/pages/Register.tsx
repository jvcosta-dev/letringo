import { ChangeEvent, FormEvent, useState } from "react";
import {
  AlternateEmailRounded,
  MailRounded,
  PersonRounded,
  VpnKeyRounded,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import Page from "../components/layout/Page";
import BackButton from "../components/ui/BackButton";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import MainTitle from "../components/ui/MainTitle";
import { useUser } from "../contexts/UserContext";
import { getErrorMessage } from "../utils/errors";
import { AxiosError } from "axios";

function Register() {
  const { login, request } = useUser();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [err, setErr] = useState("");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setErr("");
    console.log(name, email, username, password, confirmPassword);

    if (password != confirmPassword) {
      setErr("As senhas precisam ser idênticas");
      return;
    }

    if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
      setErr(
        "As senha precisa conter no mínimo 8 caractere uma letra maiúscula, uma minúscula eum números"
      );
      return;
    }

    try {
      await request({
        url: "/auth/signup",
        method: "POST",
        data: { full_name: name, display_name: username, email, password },
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        setErr(getErrorMessage(error.response?.data.errorCode));
      } else {
        setErr("Erro de conexão");
      }
      return;
    }

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setErr("Erro de conexão");
      return;
    }
  };

  return (
    <Page>
      <BackButton path="/welcome" />
      <MainTitle color="primary">Registre-se</MainTitle>
      <form
        onSubmit={submit}
        className="flex flex-grow flex-col justify-between"
      >
        <div className="flex flex-col gap-2">
          <Input
            label="Nome Completo"
            name="name"
            placeholder="Joaquim Santos"
            type="text"
            value={name}
            Icon={PersonRounded}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            required
          />
          <Input
            label="Email"
            name="email"
            placeholder="endereço@domínio.com"
            type="email"
            value={email}
            Icon={MailRounded}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            required
          />
          <Input
            label="Nome de Usuário"
            name="username"
            placeholder="joaquim_santos"
            type="text"
            value={username}
            Icon={AlternateEmailRounded}
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
          <Input
            label="Confirmar Senha"
            name="confirmPassword"
            placeholder="Repita aqui"
            type="password"
            value={confirmPassword}
            Icon={VpnKeyRounded}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(e.target.value)
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
            disabled={
              !name || !email || !username || !password || !confirmPassword
            }
            size="xl"
            fill
            ariaLabel="fazer registro"
          >
            Criar Conta
          </Button>
          <p className="w-full text-center">
            Ao se cadastrar no Letringo, você concorda com os nossos
            <b> Termos</b> e <b>Política de Privacidade.</b>
          </p>
        </div>
      </form>
    </Page>
  );
}

export default Register;
