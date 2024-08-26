import Header from "./components/Header";

export default function Home() {
  return (
    <main className="w-full mt-5 flex flex-col">
      <div className="w-full items-center flex flex-col gap-5">
        <Header />
      </div>
    </main>
  );
}
