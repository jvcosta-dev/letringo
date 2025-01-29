import { FunctionComponent } from "react";
import { motion } from "framer-motion";

import { Book } from "../../interfaces/books";
import { useNavigate } from "react-router-dom";
import { springHover } from "../../utils/animations";
import { useColor } from "color-thief-react";

interface BookCardProps {
  book: Pick<Book, "id" | "name" | "author" | "thumb_url">;
}

const BookCard: FunctionComponent<BookCardProps> = ({ book }) => {
  const navigate = useNavigate();

  const { data, loading, error } = useColor(book.thumb_url, "hex", {
    crossOrigin: "anonymous",
    quality: 100,
  });
  return (
    <motion.div
      whileHover={springHover.whileHover}
      whileTap={springHover.whileTap}
      transition={springHover.transition}
      className="cursor-pointer w-max flex flex-col gap-1"
      onClick={() => navigate(`/book/${book.id}`)}
    >
      <img
        rel="preconnect"
        src={book.thumb_url}
        width={144}
        height={208}
        className="w-36 h-52 border-4 border-b-8 rounded-xl"
        style={{ borderColor: loading || error ? "" : data }}
      />
      <div className="flex flex-col w-36">
        <h3 className="text-xl font-bold truncate">{book.name}</h3>
        <p className="truncate">{book.author}</p>
      </div>
    </motion.div>
  );
};

export default BookCard;
