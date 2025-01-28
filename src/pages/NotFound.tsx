import { FunctionComponent } from "react";
import MainTitle from "../components/ui/MainTitle";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

interface NotFoundProps {}

const NotFound: FunctionComponent<NotFoundProps> = () => {
  return (
    <div className="top-0 fixed w-screen h-screen flex flex-col gap-4 items-center justify-center bg-primary text-white">
      <img
        src="/icons/splash.png"
        alt="letringo logo"
        width={144}
        height={144}
        className={`w-36 h-w-36 animate-bounce`}
      />
      <MainTitle>Página não encontrada.</MainTitle>
      <Link to={"/"}>
        <Button ariaLabel="voltar ao início" size="xl">
          Voltar ao início
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
