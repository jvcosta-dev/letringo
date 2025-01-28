import { EngineeringRounded } from "@mui/icons-material";
import Page from "../components/layout/Page";
import MainTitle from "../components/ui/MainTitle";

function Ranking() {
  return (
    <Page isInLayout>
      <div className="flex flex-col flex-grow items-center justify-center">
        <EngineeringRounded
          className="text-primary"
          style={{ width: 144, height: 144 }}
        />
        <MainTitle>Em desenvolvimento...</MainTitle>
      </div>
    </Page>
  );
}

export default Ranking;
