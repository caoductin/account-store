import BagCard from "./BagCard";

// Mock data - thay bằng API
const bags = [
  {
    id: 1,
    name: "Túi Mù FreeFire 19K - Cơ bản",
    price: 19000,
    image: "https://i.imgur.com/W2S1VzB.png", // Link demo ảnh túi quà
    playCount: 5837,
    tag: "HOT",
    tagColor: "red",
  },
  {
    id: 2,
    name: "Túi Mù Kim Cương 50K",
    price: 50000,
    image: "https://i.imgur.com/W2S1VzB.png",
    playCount: 3421,
    tag: "POPULAR",
    tagColor: "purple",
  },
  {
    id: 3,
    name: "Túi Mù ACC VIP 99K",
    price: 99000,
    image: "https://i.imgur.com/W2S1VzB.png",
    playCount: 1518,
    tag: null,
    tagColor: null,
  },
  {
    id: 4,
    name: "Siêu Túi Mù 499K",
    price: 499000,
    image: "https://i.imgur.com/W2S1VzB.png",
    playCount: 892,
    tag: "VIP",
    tagColor: "yellow",
  },
  {
    id: 5,
    name: "Bao Lì Xì May Mắn 49K",
    price: 49000,
    image: "https://i.imgur.com/W2S1VzB.png",
    playCount: 2104,
    tag: "NEW",
    tagColor: "green",
  },
  {
    id: 6,
    name: "Hộp Mù Bí Ẩn 139K",
    price: 139000,
    image: "https://i.imgur.com/W2S1VzB.png",
    playCount: 756,
    tag: null,
    tagColor: null,
  },
];
export default function BagGrid() {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">🎁 Túi Mù Đang Hot</h2>
        <select className="bg-gray-800 text-gray-300 px-4 py-2 rounded-lg border border-gray-700 focus:border-purple-500 outline-none">
          <option>Tất cả</option>
          <option>Giá thấp → cao</option>
          <option>Giá cao → thấp</option>
          <option>Phổ biến nhất</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bags.map((bag) => (
          <BagCard key={bag.id} bag={bag} />
        ))}
      </div>
    </section>
  );
}
