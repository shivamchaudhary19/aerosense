import { useMemo, useState } from "react";
import { MapPinned, Activity } from "lucide-react";

import PollutionMap from "../components/heatmap/PollutionMap";
import MapLegend from "../components/heatmap/MapLegend";
import HotspotPanel from "../components/heatmap/HotspotPanel";
import HotspotFilters from "../components/heatmap/HotspotFilters";

const hotspots = [
  {
    id: "sector-62",
    name: "Sector 62",
    latitude: 28.628,
    longitude: 77.364,
    aqi: 187,
    category: "Unhealthy",
  },
  {
    id: "sector-63",
    name: "Sector 63",
    latitude: 28.625,
    longitude: 77.377,
    aqi: 174,
    category: "Unhealthy",
  },
  {
    id: "sector-18",
    name: "Sector 18",
    latitude: 28.57,
    longitude: 77.321,
    aqi: 161,
    category: "Unhealthy",
  },
  {
    id: "sector-15",
    name: "Sector 15",
    latitude: 28.587,
    longitude: 77.337,
    aqi: 148,
    category: "Moderate",
  },
  {
    id: "sector-27",
    name: "Sector 27",
    latitude: 28.584,
    longitude: 77.337,
    aqi: 139,
    category: "Moderate",
  },
];

function Heatmap() {
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [search, setSearch] = useState("");

  const filteredHotspots = useMemo(() => {
    if (!search.trim()) return hotspots;

    return hotspots.filter((hotspot) =>
      hotspot.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="mx-auto max-w-[1600px] space-y-8">
      {/* Header */}
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="flex items-center gap-2 text-sm text-[#8A9AA3]">
            <MapPinned size={15} className="text-[#29C7F6]" />
            Pollution Intelligence
          </div>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#F5F7F8]">
            Pollution Heatmap
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64757d]">
            Explore current and predicted pollution hotspots and identify
            locations where air quality may deteriorate.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#64757d]">
          <Activity size={14} className="text-[#35D07F]" />
          Predictive hotspot monitoring
        </div>
      </section>

      {/* Filters */}
      <HotspotFilters
        search={search}
        onSearchChange={setSearch}
      />

      {/* Main content */}
      <div className="grid gap-5 xl:grid-cols-[1.5fr_0.8fr]">
        <div className="relative">
          <PollutionMap
            hotspots={filteredHotspots}
            selectedHotspot={selectedHotspot}
            onSelectHotspot={setSelectedHotspot}
          />

          <MapLegend />
        </div>

        <HotspotPanel hotspot={selectedHotspot} />
      </div>

      {/* Hotspot count */}
      <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#101B20] px-5 py-4">
        <p className="text-sm text-[#8A9AA3]">
          Monitoring{" "}
          <span className="font-medium text-[#F5F7F8]">
            {filteredHotspots.length}
          </span>{" "}
          predicted hotspots
        </p>

        <p className="text-xs text-[#64757d]">
          Data currently in demo mode
        </p>
      </div>
    </div>
  );
}

export default Heatmap;