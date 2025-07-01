import BackButton from "../../../components/BackBtn";

interface HeaderIndexProps {
  bookType: string;
}

export default function HeaderIndex({ bookType }: HeaderIndexProps) {
  return (
    <header className="shirink-0 py-[12px] px-[16px] h-[64px] shadow-sm flex items-center gap-[8px]">
      <BackButton />
      <h1 className="text-lg font-bold">{bookType}</h1>
    </header>
  );
}