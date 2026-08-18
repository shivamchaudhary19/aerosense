import { MapPin, TrendingUp, ChevronRight } from "lucide-react";

const hotspots = [
  {
    name: "Sector 62",
    aqi: 187,
    risk: "Unhealthy",
    peak: "4–7 PM",
  },
  {
    name: "Sector 63",
    aqi: 174,
    risk: "Unhealthy",
    peak: "5–8 PM",
  },
  {
    name: "Sector 18",
    aqi: 161,
    risk: "Unhealthy",
    peak: "4–6 PM",
  },
];

function HotspotSummary() {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#101B20] p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#64757d]">
            Predicted Hotspots
          </p>

          <h3 className="mt-1 text-lg font-semibold text-[#F5F7F8]">
            Highest-risk locations
          </h3>
        </div>

        <MapPin size={20} className="text-[#29C7F6]" />
      </div>

      <div className="mt-5 divide-y divide-white/[0.07]">
        {hotspots.map((hotspot, index) => (
          <div
            key={hotspot.name}
            className="group flex items-center gap-4 py-4 first:pt-0 last:pb-0"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#29C7F6]/10 text-xs font-semibold text-[#29C7F6]">
              0{index + 1}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-medium text-[#F5F7F8]">
                  {hotspot.name}
                </p>

                <TrendingUp size={13} className="text-[#FF5A5F]" />
              </div>

              <p className="mt-1 text-xs text-[#64757d]">
                Peak {hotspot.peak}
              </p>
            </div>

            <div className="text-right">
              <p className="text-base font-semibold text-[#FFB547]">
                {hotspot.aqi}
              </p>

              <p className="text-[10px] text-[#64757d]">{hotspot.risk}</p>
            </div>

            <ChevronRight
              size={16}
              className="text-[#64757d] transition-transform group-hover:translate-x-1"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default HotspotSummary;