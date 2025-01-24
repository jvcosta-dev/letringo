import { ElementType, FunctionComponent } from "react";

interface BookDetailItemProps {
  Icon: ElementType;
  label: string;
}

const BookDetailItem: FunctionComponent<BookDetailItemProps> = ({
  Icon,
  label,
}) => {
  return (
    <span className="flex items-center gap-1 p-3 border-b-4 border-neutral-gray dark:border-white">
      <Icon className="text-primary" style={{ width: 24, height: 24 }} />
      <p>{label}</p>
    </span>
  );
};

export default BookDetailItem;
