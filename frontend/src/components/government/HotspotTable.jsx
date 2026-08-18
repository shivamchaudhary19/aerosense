import {
  MapPin,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";

const hotspots = [
  {
    location: "Sector 62",
    currentAQI: 142,
    predictedAQI: 187,
    risk: "High",
    peak: "4–7 PM",
    trend: "up",
  },
  {
    location: "Sector 63",
    currentAQI: 138,
    predictedAQI: 174,
    risk: "High",
    peak: "5–8 PM",
    trend: "up",
  },
  {
    location: "Sector 18",
    currentAQI: 145,
    predictedAQI: 161,
    risk: "High",
    peak: "4–6 PM",
    trend: "up",
  },
  {
    location: "Sector 15",
    currentAQI: 131,
    predictedAQI: 148,
    risk: "Moderate",
    peak: "3–6 PM",
    trend: "up",
  },
  {
    location: "Sector 27",
    currentAQI: 139,
    predictedAQI: 136,
    risk: "Moderate",
    peak: "5–7 PM",
    trend: "down",
  },
];

function HotspotTable() {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#101B20]">
      <div className="flex flex-col gap-3 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#64757d]">
            Risk Monitoring
          </p>

          <h2 className="mt-1 text-lg font-semibold text-[#F5F7F8]">
            Priority locations
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#64757d]">
          <span className="h-2 w-2 rounded-full bg-[#35D07F]" />
          Live monitoring
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px]">
          <thead>
            <tr className="border-b border-white/[0.07] text-left">
              <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#64757d]">
                Location
              </th>
              <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#64757d]">
                Current AQI
              </th>
              <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#64757d]">
                Predicted AQI
              </th>
              <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#64757d]">
                Risk
              </th>
              <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#64757d]">
                Peak
              </th>
              <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#64757d]">
                Trend
              </th>
            </tr>
          </thead>

          <tbody>
            {hotspots.map((hotspot) => (
              <tr
                key={hotspot.location}
                className="border-b border-white/[0.06] last:border-0"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <MapPin size={15} className="text-[#29C7F6]" />

                    <span className="text-sm font-medium text-[#F5F7F8]">
                      {hotspot.location}
                    </span>
                  </div>
                </td>

                <td className="px-5 py-4 text-sm text-[#8A9AA3]">
                  {hotspot.currentAQI}
                </td>

                <td className="px-5 py-4">
                  <span className="text-sm font-semibold text-[#FFB547]">
                    {hotspot.predictedAQI}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${
                      hotspot.risk === "High"
                        ? "bg-[#FF5A5F]/10 text-[#FF5A5F]"
                        : "bg-[#FFB547]/10 text-[#FFB547]"
                    }`}
                  >
                    {hotspot.risk}
                  </span>
                </td>

                <td className="px-5 py-4 text-sm text-[#8A9AA3]">
                  {hotspot.peak}
                </td>

                <td className="px-5 py-4">
                  <TrendIcon trend={hotspot.trend} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function TrendIcon({ trend }) {
  if (trend === "up") {
    return <TrendingUp size={17} className="text-[#FF5A5F]" />;
  }

  if (trend === "down") {
    return <TrendingDown size={17} className="text-[#35D07F]" />;
  }

  return <Minus size={17} className="text-[#64757d]" />;
}

export default HotspotTable;