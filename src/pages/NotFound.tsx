import { FunctionComponent } from "react";
import MainTitle from "../components/ui/MainTitle";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

interface NotFoundProps {}

const NotFound: FunctionComponent<NotFoundProps> = () => {
  return (
    <div className="top-0 fixed w-screen h-screen flex flex-col gap-4 items-center justify-center dark:text-white dark:bg-[#202020]">
      <img
        src="/icons/rounded.png"
        alt="letringo logo"
        width={252}
        height={252}
        className={`w-64 h-64`}
      />
      <MainTitle>[404] Página não encontrada.</MainTitle>
      <Link to={"/"}>
        <Button ariaLabel="voltar ao início" size="xl">
          Voltar ao início
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
