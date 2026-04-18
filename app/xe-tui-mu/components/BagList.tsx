import BagCard from "./BagCard";

const data = Array.from({ length: 8 }).map((_, i) => ({
  id: i,
  name: `Túi mù #${i + 1}`,
  price: 10000 + i * 5000,
  image: "/images/bag.png",
}));

interface BagListProps {
  onRequireLogin: () => void;
}

export default function BagList({ onRequireLogin }: BagListProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data.map((bag) => (
        <BagCard key={bag.id} bag={bag} onRequireLogin={onRequireLogin}  />
      ))}
    </div>
  );
}