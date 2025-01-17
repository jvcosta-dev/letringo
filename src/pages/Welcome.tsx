import { Link } from "react-router-dom";

import Page from "../components/layout/Page";
import Button from "../components/ui/Button";

function Welcome() {
  return (
    <Page exitDirection="up">
      <div className="flex flex-grow flex-col justify-between">
        <div className="flex flex-grow flex-col items-center justify-center">
          <img
            src="/icons/rounded.png"
            alt="letringo logo"
            width={128}
            height={128}
            className="w-32 h-32"
          />
          <img
            src="/icons/text.png"
            alt="letringo logo"
            width={128}
            height={128}
          />
          <h1 className="text-xl text-center">
            Acompanhe o progresso de seus livros.
          </h1>
        </div>
        <div className="flex flex-col gap-3">
          <Link to={"/register"}>
            <Button ariaLabel="crie sua conta" size="xl" fill>
              começar agora
            </Button>
          </Link>
          <Link to={"/login"}>
            <Button ariaLabel="entrar em sua conta" size="xl" fill outlined>
              já tenho uma conta
            </Button>
          </Link>
        </div>
      </div>
    </Page>
  );
}

export default Welcome;
