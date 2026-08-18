import {
  Activity,
  MapPin,
  AlertTriangle,
  Clock3,
} from "lucide-react";

function getAQIColor(aqi) {
  const value = Number(aqi);

  if (!Number.isFinite(value)) {
    return "text-[#F5F7F8]";
  }

  if (value <= 50) return "text-[#35D07F]";
  if (value <= 100) return "text-[#9BC53D]";
  if (value <= 150) return "text-[#FFB547]";
  if (value <= 200) return "text-[#FF7A59]";

  return "text-[#FF5A5F]";
}

function getCategory(aqi) {
  const value = Number(aqi);

  if (!Number.isFinite(value)) {
    return "Unavailable";
  }

  if (value <= 50) return "Good";
  if (value <= 100) return "Satisfactory";
  if (value <= 200) return "Moderate";
  if (value <= 300) return "Poor";
  if (value <= 400) return "Very Poor";

  return "Severe";
}

function GovernmentStats({ data }) {
  const cityAQI =
    data?.currentAQI ??
    data?.cityAQI ??
    data?.aqi ??
    null;

  const stations =
    Array.isArray(data?.stations)
      ? data.stations
      : Array.isArray(
          data?.airQuality?.stations
        )
      ? data.airQuality.stations
      : [];

  const hotspots =
    Array.isArray(data?.hotspots)
      ? data.hotspots
      : [];

  const stationCount =
    data?.stationCount ??
    stations.length;

  const highRiskCount =
    hotspots.length > 0
      ? hotspots.filter(
          (item) =>
            Number(item?.predictedAQI ?? item?.aqi) >
            200
        ).length
      : stations.filter(
          (item) =>
            Number(item?.aqi) > 200
        ).length;

  const highestRisk =
    data?.highestRisk?.aqi ??
    data?.airQuality?.highestRisk?.aqi ??
    stations.reduce(
      (highest, station) =>
        Number(station?.aqi) >
        Number(highest?.aqi ?? -1)
          ? station
          : highest,
      null
    )?.aqi ??
    null;

  const nextPeak =
    data?.nextPeak ??
    data?.peakTime ??
    data?.prediction?.peakTime ??
    "—";

  const nextPeakLocation =
    data?.nextPeakLocation ??
    data?.peakLocation ??
    data?.prediction?.location ??
    "Upcoming";

  const stats = [
    {
      label: "City AQI",
      value:
        cityAQI !== null
          ? cityAQI
          : "—",
      status:
        cityAQI !== null
          ? getCategory(cityAQI)
          : "Unavailable",
      icon: Activity,
      valueClass:
        cityAQI !== null
          ? getAQIColor(cityAQI)
          : "text-[#F5F7F8]",
    },
    {
      label: "Active Stations",
      value: stationCount,
      status:
        highRiskCount > 0
          ? `${highRiskCount} high-risk`
          : "Monitoring active",
      icon: MapPin,
      valueClass: "text-[#F5F7F8]",
    },
    {
      label: "High-Risk Zones",
      value: highRiskCount,
      status:
        highRiskCount > 0
          ? "Requires attention"
          : "No critical zones",
      icon: AlertTriangle,
      valueClass:
        highRiskCount > 0
          ? "text-[#FF5A5F]"
          : "text-[#35D07F]",
    },
    {
      label: "Next Peak",
      value: nextPeak,
      status: nextPeakLocation,
      icon: Clock3,
      valueClass: "text-[#29C7F6]",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="min-w-0 rounded-2xl border border-white/10 bg-[#101B20] p-4 sm:p-5"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="truncate text-xs text-[#8A9AA3]">
                {stat.label}
              </p>

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-[#29C7F6]">
                <Icon size={17} />
              </div>
            </div>

            <p
              className={`mt-4 break-words text-2xl font-semibold tracking-tight sm:mt-5 sm:text-3xl ${stat.valueClass}`}
            >
              {stat.value}
            </p>

            <p className="mt-1 truncate text-xs text-[#64757d]">
              {stat.status}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default GovernmentStats;