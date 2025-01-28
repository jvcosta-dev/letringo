import { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";

import { useUser } from "../contexts/UserContext";
import Page from "../components/layout/Page";
import Error from "../components/ui/Error";
import Loading from "../components/ui/Loading";
import NotFound from "./NotFound";
import BookDetails from "../components/books/BookDetails";
import BackButton from "../components/ui/BackButton";

interface BookProps {}

const Book: FunctionComponent<BookProps> = () => {
  const { fetcher } = useUser();
  const { id } = useParams();

  const { data, isLoading, error } = useSWR(`/books/${id}`, fetcher);
  if (isLoading) return <Loading />;
  if (error && error.code != "ERR_BAD_REQUEST") {
    return <Error code={error.code} />;
  }

  return (
    <>
      {data && data.book ? (
        <Page>
          <BackButton />
          <BookDetails book={data.book} />
        </Page>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default Book;
