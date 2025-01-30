import { PersonRounded } from "@mui/icons-material";
import { FunctionComponent } from "react";
import useSWR from "swr";
import { useUser } from "../../contexts/UserContext";
import Loading from "../ui/Loading";
import Error from "../ui/Error";

interface MeProps {}

const Me: FunctionComponent<MeProps> = () => {
  const { fetcher } = useUser();

  const { data, isLoading, error } = useSWR(`/auth/me`, fetcher);
  if (isLoading) return <Loading />;
  if (error) {
    return <Error code={error.code} />;
  }
  return (
    <>
      <div className="flex items-center justify-center">
        {data.avatar_url ? (
          <img
            src={data.avatar_url}
            alt="foto de perfl"
            width={144}
            height={144}
            className="rounded-full"
          />
        ) : (
          <PersonRounded
            style={{ width: 144, height: 144 }}
            className="bg-primary rounded-full text-white"
          />
        )}
      </div>
      <div className="flex flex-col">
        <h1 className="text-xl font-bold">@{data.display_name}</h1>
        <p>
          Membro desde {new Date(data.createdAt).toLocaleDateString("pt-BR")}
        </p>
      </div>
    </>
  );
};

export default Me;
