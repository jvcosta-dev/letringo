import { FunctionComponent, useState } from "react";
import { useColor } from "color-thief-react";
import {
  AutoStoriesRounded,
  CalendarMonthRounded,
  DomainRounded,
} from "@mui/icons-material";

import Section from "../layout/Section";
import { Book } from "../../interfaces/books";
import MainTitle from "../ui/MainTitle";
import Button from "../ui/Button";
import BookDetailItem from "./BookDetailItem";
import ConfirmModal from "../ui/ConfirmModal";
import CreateRunButton from "./CreateRunButton";

interface BookDetailsProps {
  book: Book;
}

const BookDetails: FunctionComponent<BookDetailsProps> = ({ book }) => {
  const { data, loading, error } = useColor(book.thumb_url, "hex", {
    crossOrigin: "anonymous",
    quality: 100,
  });

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleShareBook = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsShareModalOpen(true);
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex justify-center">
          <img
            src={book.thumb_url}
            alt={`capa do livro: ${book.name}`}
            className="w-52 h-80 border-4 border-b-8 rounded-xl"
            style={{ borderColor: loading || error ? "" : data }}
          />
        </div>
        <div className="flex flex-col items-center">
          <MainTitle>{book.name}</MainTitle>
          <h2 className="text-xl">{book.author}</h2>
        </div>
        <div className="flex flex-col gap-2">
          <CreateRunButton book_id={book.id} />
          <Button
            outlined
            ariaLabel="compartilhar url do livro"
            size="xl"
            fill
            onClick={handleShareBook}
          >
            Compartilhar
          </Button>
        </div>
      </div>
      <Section name="Detalhes">
        <div className="flex flex-col rounded-xl border-2 border-neutral-gray dark:border-white">
          <BookDetailItem
            Icon={AutoStoriesRounded}
            label={`${book.total_pages} Páginas`}
          />
          <BookDetailItem Icon={DomainRounded} label={book.publisher} />
          <BookDetailItem
            Icon={CalendarMonthRounded}
            label={`${new Date(book.launch_date).toLocaleDateString("pt-BR")}`}
          />
        </div>
      </Section>
      <Section name="Descrição">
        <blockquote className="pb-4">{book.description}</blockquote>
      </Section>
      {isShareModalOpen && (
        <ConfirmModal
          label="Compartilhe o Livro!"
          description="O link foi copiado para sua área de transferência."
          onClose={() => setIsShareModalOpen(false)}
        />
      )}
    </>
  );
};

export default BookDetails;
