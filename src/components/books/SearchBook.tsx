import { FunctionComponent, useState } from "react";
import useSWR from "swr";
import { Delete, Search } from "@mui/icons-material";

import Loading from "../ui/Loading";
import Error from "../ui/Error";
import { useUser } from "../../contexts/UserContext";
import GenreList from "./GenreList";
import Input from "../ui/Input";
import Button from "../ui/Button";

interface SearchBookProps {}

const SearchBook: FunctionComponent<SearchBookProps> = () => {
  const { fetcher } = useUser();

  const [term, setTerm] = useState("");
  const [query, setQuery] = useState("");

  const { data, isLoading, error } = useSWR(
    query ? `/books/search?term=${query}` : null,
    fetcher
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery(term);
  };

  if (error) return <Error code={error.code} />;
  if (isLoading) return <Loading />;

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-row gap-1">
        <Input
          Icon={Search}
          placeholder="Clique aqui para pesquisar..."
          name="term"
          onChange={(e) => setTerm(e.target.value)}
          value={term}
          type="text"
          required
        />
        <Button
          ariaLabel="pesquisar livro"
          size="xl"
          disabled={term.length < 3}
          submit
        >
          <Search style={{ width: 28, height: 28 }} />
        </Button>
        <Button
          ariaLabel="apagar pesquisa"
          size="xl"
          bgColor="red"
          disabled={!term && (!data || !data.books || data.books.length === 0)}
          onClick={() => {
            setTerm("");
            setQuery("");
            data.books = [];
          }}
        >
          <Delete style={{ width: 28, height: 28 }} />
        </Button>
      </form>
      {query && data && (!data.books || data.books.length === 0) && (
        <div className="text-xl text-center font-bold">
          Nenhum resultado encontrado.
        </div>
      )}
      {data && data.books && data.books.length >= 1 && (
        <GenreList books={data.books} genre="Resultados" />
      )}
    </>
  );
};

export default SearchBook;
