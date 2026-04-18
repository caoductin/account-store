import BagList from "./components/BagList";
import FilterBar from "./components/FilterBar";

export default function XeTuiMuPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      <FilterBar />
      <BagList />
    </div>
  );
}