import useSWR from "swr";
import { PersonRounded, SettingsRounded } from "@mui/icons-material";

import Page from "../components/layout/Page";
import { useUser } from "../contexts/UserContext";
import Loading from "../components/ui/Loading";
import Error from "../components/ui/Error";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import AllStats from "../components/stats/AllStats";

function Profile() {
  const { fetcher } = useUser();

  const { data, isLoading, error } = useSWR(`/auth/me`, fetcher);
  if (isLoading) return <Loading />;
  if (error) {
    return <Error code={error.code} />;
  }
  return (
    <Page isInLayout>
      <div className="flex justify-end">
        <Link to={"/settings"}>
          <Button ariaLabel="" size="xl">
            <SettingsRounded />
          </Button>
        </Link>
      </div>
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
      <AllStats />
    </Page>
  );
}

export default Profile;
