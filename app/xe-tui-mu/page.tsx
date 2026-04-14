import BagList from "./components/BagList";
import FilterBar from "./components/FilterBar";
import SectionHeader from "./components/SectionHeader";

export default function XeTuiMuPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      {/* <SectionHeader title="Xé túi mù Free Fire" /> */}
      <FilterBar />
      <BagList />
    </div>
  );
}