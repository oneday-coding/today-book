import BackButton from "../../../components/BackBtn";
import { bookTypeMap, type BookType } from "../../../models/bookType.model";

interface HeaderIndexProps {
  bookType: string | undefined;
}

export default function HeaderIndex({ bookType }: HeaderIndexProps) {

  return (
    <header className="layout-header">
      <BackButton />
      <h1 className="text-lg font-bold">{ bookType ? bookTypeMap[bookType as BookType] : '책 리스트' }</h1>
    </header>
  );
}