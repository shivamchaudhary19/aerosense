import {
  MapPin,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";

function HotspotTable({ data }) {
  const hotspots = getHotspots(data);

  return (
    <section className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#101B20]">
      <div className="flex flex-col gap-3 border-b border-white/10 p-4 sm:p-5 md:flex-row md:items-center md:justify-between">
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

      {hotspots.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px]">
            <thead>
              <tr className="border-b border-white/[0.07] text-left">
                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#64757d] sm:px-5">
                  Location
                </th>

                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#64757d] sm:px-5">
                  Current AQI
                </th>

                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#64757d] sm:px-5">
                  Predicted AQI
                </th>

                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#64757d] sm:px-5">
                  Risk
                </th>

                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#64757d] sm:px-5">
                  Peak
                </th>

                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#64757d] sm:px-5">
                  Trend
                </th>
              </tr>
            </thead>

            <tbody>
              {hotspots.map((hotspot) => (
                <tr
                  key={hotspot.id}
                  className="border-b border-white/[0.06] last:border-0"
                >
                  <td className="px-4 py-4 sm:px-5">
                    <div className="flex min-w-0 items-center gap-2">
                      <MapPin
                        size={15}
                        className="shrink-0 text-[#29C7F6]"
                      />

                      <span className="max-w-[220px] truncate text-sm font-medium text-[#F5F7F8]">
                        {hotspot.location}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-sm text-[#8A9AA3] sm:px-5">
                    {hotspot.currentAQI}
                  </td>

                  <td className="px-4 py-4 sm:px-5">
                    <span className="text-sm font-semibold text-[#FFB547]">
                      {hotspot.predictedAQI}
                    </span>
                  </td>

                  <td className="px-4 py-4 sm:px-5">
                    <RiskBadge
                      risk={hotspot.risk}
                    />
                  </td>

                  <td className="px-4 py-4 text-sm text-[#8A9AA3] sm:px-5">
                    {hotspot.peak}
                  </td>

                  <td className="px-4 py-4 sm:px-5">
                    <TrendIcon
                      trend={hotspot.trend}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex min-h-[220px] items-center justify-center px-5 py-8">
          <div className="text-center">
            <MapPin
              size={22}
              className="mx-auto text-[#64757d]"
            />

            <p className="mt-3 text-sm font-medium text-[#F5F7F8]">
              No priority locations
            </p>

            <p className="mt-1 text-xs text-[#64757d]">
              Hotspot data is currently unavailable.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

function getHotspots(data) {
  const source =
    data?.hotspots ||
    data?.priorityLocations ||
    data?.stations ||
    data?.airQuality?.stations ||
    [];

  if (!Array.isArray(source)) {
    return [];
  }

  return source
    .map((item, index) => {
      const currentAQI = Number(
        item?.currentAQI ??
          item?.aqi ??
          item?.current
      );

      const predictedAQI = Number(
        item?.predictedAQI ??
          item?.estimatedAQI ??
          item?.prediction ??
          currentAQI
      );

      const safeCurrentAQI =
        Number.isFinite(currentAQI)
          ? currentAQI
          : "—";

      const safePredictedAQI =
        Number.isFinite(predictedAQI)
          ? predictedAQI
          : safeCurrentAQI;

      const location =
        typeof item?.location ===
        "string"
          ? item.location
          : typeof item?.station ===
            "string"
          ? item.station
          : typeof item?.name ===
            "string"
          ? item.name
          : `Station ${index + 1}`;

      const risk =
        typeof item?.risk === "string"
          ? item.risk
          : getRisk(safePredictedAQI);

      const trend =
        item?.trend ||
        getTrend(
          safeCurrentAQI,
          safePredictedAQI
        );

      return {
        id:
          item?.id ||
          item?.station ||
          `${location}-${index}`,
        location,
        currentAQI: safeCurrentAQI,
        predictedAQI: safePredictedAQI,
        risk,
        peak:
          item?.peak ||
          item?.peakTime ||
          "—",
        trend,
      };
    })
    .filter(Boolean)
    .sort(
      (a, b) =>
        Number(b.predictedAQI) -
        Number(a.predictedAQI)
    )
    .slice(0, 10);
}

function getRisk(aqi) {
  const value = Number(aqi);

  if (!Number.isFinite(value)) {
    return "Unknown";
  }

  if (value > 300) return "Critical";
  if (value > 200) return "High";
  if (value > 150) return "High";
  if (value > 100) return "Moderate";

  return "Low";
}

function getTrend(current, predicted) {
  const currentValue = Number(current);
  const predictedValue = Number(predicted);

  if (
    !Number.isFinite(currentValue) ||
    !Number.isFinite(predictedValue)
  ) {
    return "stable";
  }

  if (predictedValue > currentValue + 5) {
    return "up";
  }

  if (predictedValue < currentValue - 5) {
    return "down";
  }

  return "stable";
}

function RiskBadge({ risk }) {
  const styles = {
    Critical:
      "bg-[#FF5A5F]/10 text-[#FF5A5F]",
    High:
      "bg-[#FF5A5F]/10 text-[#FF5A5F]",
    Moderate:
      "bg-[#FFB547]/10 text-[#FFB547]",
    Low:
      "bg-[#35D07F]/10 text-[#35D07F]",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${
        styles[risk] ||
        "bg-white/[0.05] text-[#8A9AA3]"
      }`}
    >
      {risk}
    </span>
  );
}

function TrendIcon({ trend }) {
  if (trend === "up") {
    return (
      <TrendingUp
        size={17}
        className="text-[#FF5A5F]"
      />
    );
  }

  if (trend === "down") {
    return (
      <TrendingDown
        size={17}
        className="text-[#35D07F]"
      />
    );
  }

  return (
    <Minus
      size={17}
      className="text-[#64757d]"
    />
  );
}

export default HotspotTable;