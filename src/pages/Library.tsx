import useSWR from "swr";

import { useUser } from "../contexts/UserContext";
import Page from "../components/layout/Page";
import Error from "../components/ui/Error";
import Loading from "../components/ui/Loading";
import GenreList from "../components/books/GenreList";
import { Book } from "../interfaces/books";
import SearchBook from "../components/books/SearchBook";

function Library() {
  const { fetcher } = useUser();

  const { data, isLoading, error } = useSWR(`/books/library`, fetcher);
  if (error) return <Error code={error.code} />;
  if (isLoading)
    return (
      <Page isInLayout>
        <Loading singleElement />
        <Loading elementCount={4} />
      </Page>
    );

  return (
    <Page isInLayout>
      <SearchBook />
      {data.genres.map(
        (genre: {
          genre: string;
          count: number;
          books: Pick<Book, "id" | "name" | "author" | "thumb_url">[];
        }) => (
          <GenreList
            books={genre.books}
            genre={genre.genre}
            key={genre.genre}
          />
        )
      )}
    </Page>
  );
}

export default Library;
