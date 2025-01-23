import { FunctionComponent } from "react";

import Section from "../layout/Section";
import { Book } from "../../interfaces/books";
import BookCard from "./BookCard";

interface GenreListProps {
  genre: string;
  books: Pick<Book, "id" | "name" | "author" | "thumb_url">[];
}

const GenreList: FunctionComponent<GenreListProps> = ({ genre, books }) => {
  return (
    <Section name={genre}>
      <div className="flex flex-row gap-3 overflow-x-scroll py-[10px] pl-2">
        {books.map((book) => (
          <BookCard book={book} key={book.id} />
        ))}
      </div>
    </Section>
  );
};

export default GenreList;
