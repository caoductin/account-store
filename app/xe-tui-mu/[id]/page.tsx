import GameBoard from "./components/GameBoard";

export default function Page() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-black mb-6">
        🎁 Xé túi mù
      </h1>

      <GameBoard />
    </div>
  );
}

