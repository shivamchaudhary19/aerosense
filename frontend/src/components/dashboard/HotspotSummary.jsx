import {
  MapPin,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";

function getAQIColor(aqi) {
  if (aqi <= 50) return "#35D07F";
  if (aqi <= 100) return "#9BC53D";
  if (aqi <= 150) return "#FFB547";
  if (aqi <= 200) return "#FF7A59";
  return "#FF5A5F";
}

function HotspotSummary({ data }) {
  const stations =
    data?.airQuality?.stations || [];

  const hotspots = [...stations]
    .filter((station) =>
      Number.isFinite(Number(station?.aqi))
    )
    .sort(
      (a, b) =>
        Number(b.aqi) - Number(a.aqi)
    )
    .slice(0, 4);

  return (
    <section className="h-full rounded-2xl border border-white/10 bg-[#101B20] p-4 sm:p-5 lg:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#64757d] sm:text-xs">
            Environmental Hotspots
          </p>

          <h3 className="mt-1 text-base font-semibold text-[#F5F7F8] sm:text-lg">
            Highest-risk locations
          </h3>

          <p className="mt-1 text-xs leading-5 text-[#64757d]">
            CPCB monitoring stations
          </p>
        </div>

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#29C7F6]/10 text-[#29C7F6] sm:h-10 sm:w-10">
          <MapPin size={18} />
        </div>
      </div>

      <div className="mt-5 divide-y divide-white/[0.07]">
        {hotspots.length > 0 ? (
          hotspots.map((station, index) => {
            const aqi =
              Number(station.aqi) || 0;

            const color =
              getAQIColor(aqi);

            return (
              <div
                key={`${station.station}-${index}`}
                className="group flex min-w-0 items-center gap-2.5 py-3.5 first:pt-0 last:pb-0 sm:gap-3 sm:py-4"
              >
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[10px] font-semibold sm:h-9 sm:w-9 sm:text-xs"
                  style={{
                    color,
                    backgroundColor: `${color}15`,
                  }}
                >
                  {String(index + 1).padStart(
                    2,
                    "0"
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex min-w-0 items-center gap-1.5">
                    <p className="min-w-0 truncate text-xs font-medium text-[#F5F7F8] sm:text-sm">
                      {station.station ||
                        "Unknown station"}
                    </p>

                    {index === 0 && (
                      <AlertTriangle
                        size={12}
                        className="shrink-0 text-[#FF5A5F]"
                      />
                    )}
                  </div>

                  <div className="mt-1 flex min-w-0 items-center gap-1.5">
                    <p className="truncate text-[10px] text-[#64757d] sm:text-xs">
                      {station.primaryPollutant ||
                        "Pollution hotspot"}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <p
                    className="text-sm font-semibold sm:text-base"
                    style={{ color }}
                  >
                    {aqi}
                  </p>

                  <p className="max-w-[75px] truncate text-[9px] text-[#64757d] sm:text-[10px]">
                    {station.category ||
                      "Unknown"}
                  </p>
                </div>

                <ChevronRight
                  size={14}
                  className="hidden shrink-0 text-[#64757d] transition-transform group-hover:translate-x-1 sm:block"
                />
              </div>
            );
          })
        ) : (
          <div className="py-8 text-center">
            <MapPin
              size={20}
              className="mx-auto text-[#64757d]"
            />

            <p className="mt-3 text-sm text-[#64757d]">
              No CPCB station data available
            </p>
          </div>
        )}
      </div>

      {hotspots.length > 0 && (
        <div className="mt-5 border-t border-white/[0.07] pt-4">
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[10px] text-[#64757d] sm:text-[11px]">
              Showing {hotspots.length} highest-risk
              stations
            </p>

            <div className="flex items-center gap-1.5 text-[10px] text-[#64757d] sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#35D07F]" />
              Live CPCB data
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default HotspotSummary;