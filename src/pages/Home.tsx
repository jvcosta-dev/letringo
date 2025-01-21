import Page from "../components/layout/Page";
import ActiveRuns from "../components/run/ActiveRuns";

function Home() {
  return (
    <Page isInLayout exitDirection="right" noDelay>
      <ActiveRuns
        runs={[
          {
            id: 1,
            user_id: 101,
            book_id: 201,
            goal: 320,
            pages_count: 300,
            read_time: 12,
            finish_date: "2025-01-15",
            page_list: "1-50,51-100,101-150,151-200,201-250,251-300",
            book: {
              name: "O Alquimista",
              author: "Paulo Coelho",
              thumb_url:
                "https://m.media-amazon.com/images/I/81slUinjTlS._AC_UF1000,1000_QL80_.jpg",
            },
          },
          {
            id: 2,
            user_id: 102,
            book_id: 202,
            goal: 200,
            pages_count: 10,
            read_time: 8,
            finish_date: "2025-01-20",
            page_list: "1-30,31-60,61-90,91-120,121-150,151-180,181-210",
            book: {
              name: "Dom Casmurro",
              author: "Machado de Assis",
              thumb_url:
                "https://m.media-amazon.com/images/I/61Z2bMhGicL.jpghttps://m.media-amazon.com/images/I/61Z2bMhGicL.jpg",
            },
          },
        ]}
      />
    </Page>
  );
}

export default Home;
