import { FormEvent, FunctionComponent } from "react";
import useSWR, { mutate } from "swr";

import { useUser } from "../../contexts/UserContext";
import Loading from "../ui/Loading";
import Button from "../ui/Button";
import Error from "../ui/Error";
import { useNavigate } from "react-router-dom";

interface CreateRunButtonProps {
  book_id: number;
}

const CreateRunButton: FunctionComponent<CreateRunButtonProps> = ({
  book_id,
}) => {
  const { request, fetcher } = useUser();

  const navigate = useNavigate();

  const { data, isLoading, error } = useSWR(`/run/book/${book_id}`, fetcher);
  if (isLoading) return <Loading singleElement />;
  if (error && error.code) {
    return <Error code={error.code} />;
  }

  const createRun = (e: FormEvent) => {
    e.preventDefault();
    try {
      request(
        {
          url: "/run",
          method: "POST",
          data: {
            book_id,
          },
        },
        true
      );
      mutate("/run/active", undefined, true);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {data && data && data.run ? (
        data.run.finish_date ? (
          <Button ariaLabel="iniciar leitura" size="xl" fill disabled>
            Já Leu
          </Button>
        ) : (
          <Button ariaLabel="iniciar leitura" size="xl" fill disabled>
            Já Lendo
          </Button>
        )
      ) : (
        <form onSubmit={createRun}>
          <Button ariaLabel="iniciar leitura" size="xl" fill submit>
            Iniciar Leitura
          </Button>
        </form>
      )}
    </>
  );
};

export default CreateRunButton;
