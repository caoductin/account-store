import BagGrid from "./components/BagGrid";
import HeroBanner from "./components/Herobanner";
import LiveActivity from "./components/LiveActivity";

export default function Home() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <HeroBanner />

      <div className="mt-12">
        <div className="flex items-center gap-2 mb-8 border-l-4 border-blue-600 pl-4">
          <h2 className="text-2xl md:text-3xl font-black text-slate-800 uppercase tracking-tight">
            Túi Mù FreeFire
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          
          <div className="lg:col-span-3">
            <BagGrid />
          </div>

          <div className="lg:col-span-1">
            <LiveActivity />
          </div>

        </div>
      </div>
    </div>
  );
}