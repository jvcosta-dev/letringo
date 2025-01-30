import { Link } from "react-router-dom";
import Page from "../components/layout/Page";
import { SettingsRounded } from "@mui/icons-material";

import Me from "../components/profile/Me";
import AllStats from "../components/stats/AllStats";
import Button from "../components/ui/Button";

function Profile() {
  return (
    <Page isInLayout>
      <div className="flex justify-end">
        <Link to={"/settings"}>
          <Button ariaLabel="" size="xl">
            <SettingsRounded />
          </Button>
        </Link>
      </div>
      <Me />
      <AllStats />
    </Page>
  );
}

export default Profile;
