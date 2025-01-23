import Page from "../components/layout/Page";

import ActiveRuns from "../components/run/ActiveRuns";
import MonthlyStats from "../components/stats/MonthlyStats";
import UserMessage from "../components/stats/UserMessage";

function Home() {
  return (
    <Page isInLayout instant>
      <UserMessage />
      <ActiveRuns />
      <MonthlyStats />
    </Page>
  );
}

export default Home;
