import SearchCity from "./ui/SearchCity";

export default function Header() {
  return (
    <header className="w-full h-fit flex gap-1 sm:gap-5 justify-start sm:justify-center">
      <SearchCity />
    </header>
  );
}
