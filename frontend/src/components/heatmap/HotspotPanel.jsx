import {
  MapPin,
  Clock3,
  Wind,
  Activity,
  Navigation,
  Gauge,
} from "lucide-react";

function getAQIColorClass(aqi) {
  if (aqi <= 50) {
    return "bg-[#35D07F]/10 text-[#35D07F]";
  }

  if (aqi <= 100) {
    return "bg-[#9BC53D]/10 text-[#9BC53D]";
  }

  if (aqi <= 200) {
    return "bg-[#FFB547]/10 text-[#FFB547]";
  }

  if (aqi <= 300) {
    return "bg-[#FF7A59]/10 text-[#FF7A59]";
  }

  return "bg-[#FF5A5F]/10 text-[#FF5A5F]";
}

function getAQIMessage(aqi, pollutant) {
  const pollutantName =
    pollutant || "the primary pollutant";

  if (aqi <= 50) {
    return `Air quality at this station is good. Current pollutant levels are within a low-risk range.`;
  }

  if (aqi <= 100) {
    return `Air quality is satisfactory at this station. Sensitive individuals should remain aware of changing conditions.`;
  }

  if (aqi <= 200) {
    return `Air quality is moderately polluted. ${pollutantName} is the main contributor to the current station AQI.`;
  }

  if (aqi <= 300) {
    return `Air quality is poor at this station. Consider reducing prolonged outdoor exposure, particularly when ${pollutantName} levels remain elevated.`;
  }

  if (aqi <= 400) {
    return `Air quality is very poor at this station. Prolonged outdoor exposure should be limited.`;
  }

  return `Air quality is severe at this station. Outdoor exposure should be minimized and local health advisories should be followed.`;
}

function formatCoordinate(value) {
  const number = Number(value);

  return Number.isFinite(number)
    ? number.toFixed(4)
    : "—";
}

function formatPollutantName(pollutant) {
  if (!pollutant) {
    return "Unknown";
  }

  const names = {
    "PM2.5": "PM2.5",
    PM10: "PM10",
    NO2: "NO₂",
    OZONE: "Ozone",
    O3: "Ozone",
    SO2: "SO₂",
    NH3: "NH₃",
    CO: "CO",
  };

  return (
    names[pollutant] ||
    pollutant
  );
}

function HotspotPanel({ hotspot }) {
  if (!hotspot) {
    return (
      <section className="flex min-h-[380px] items-center justify-center rounded-2xl border border-white/10 bg-[#101B20] p-5 sm:min-h-[480px] sm:p-6 lg:min-h-[600px]">
        <div className="max-w-xs text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#29C7F6]/10 text-[#29C7F6]">
            <MapPin size={22} />
          </div>

          <h3 className="mt-4 text-base font-semibold text-[#F5F7F8]">
            Select a monitoring station
          </h3>

          <p className="mt-2 text-sm leading-6 text-[#64757d]">
            Select a CPCB monitoring station on
            the map to view its current
            air-quality details.
          </p>
        </div>
      </section>
    );
  }

  const aqi = Number(hotspot.aqi) || 0;

  const latitude =
    hotspot.latitude ??
    hotspot.coordinates?.latitude;

  const longitude =
    hotspot.longitude ??
    hotspot.coordinates?.longitude;

  const pollutant =
    hotspot.primaryPollutant ||
    "Unknown";

  return (
    <section className="rounded-2xl border border-white/10 bg-[#101B20] p-4 sm:p-5 lg:p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#64757d] sm:text-xs">
            Selected Monitoring Station
          </p>

          <div className="mt-2 flex min-w-0 items-start gap-2">
            <MapPin
              size={17}
              className="mt-1 shrink-0 text-[#29C7F6]"
            />

            <h2 className="break-words text-lg font-semibold leading-6 text-[#F5F7F8] sm:text-xl">
              {hotspot.name ||
                "Unknown station"}
            </h2>
          </div>
        </div>

        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-medium sm:px-3 sm:text-xs ${getAQIColorClass(
            aqi
          )}`}
        >
          {hotspot.category ||
            "Unknown"}
        </span>
      </div>

      {/* AQI card */}
      <div className="mt-6 rounded-xl border border-white/[0.07] bg-white/[0.025] p-4 sm:mt-8 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Gauge
              size={16}
              className="text-[#29C7F6]"
            />

            <p className="text-xs text-[#64757d]">
              Current Station AQI
            </p>
          </div>

          <span className="text-[10px] text-[#64757d]">
            CPCB
          </span>
        </div>

        <div className="mt-3 flex flex-wrap items-end gap-2">
          <span className="text-4xl font-semibold tracking-tight text-[#F5F7F8] sm:text-5xl">
            {aqi}
          </span>

          <span className="mb-1 text-xs text-[#64757d] sm:mb-2">
            AQI
          </span>
        </div>

        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${Math.min(
                (aqi / 500) * 100,
                100
              )}%`,
              backgroundColor:
                getAQIColor(aqi),
            }}
          />
        </div>

        <p className="mt-3 text-xs leading-5 text-[#64757d]">
          Station-level air-quality reading
          from CPCB monitoring data.
        </p>
      </div>

      {/* Details */}
      <div className="mt-4 space-y-2.5 sm:mt-5 sm:space-y-3">
        <DetailRow
          icon={Wind}
          label="Primary pollutant"
          value={formatPollutantName(
            pollutant
          )}
        />

        <DetailRow
          icon={Clock3}
          label="Last update"
          value={
            hotspot.lastUpdate ||
            "Unavailable"
          }
        />

        {(latitude !== undefined ||
          longitude !== undefined) && (
          <DetailRow
            icon={Navigation}
            label="Coordinates"
            value={`${formatCoordinate(
              latitude
            )}, ${formatCoordinate(
              longitude
            )}`}
          />
        )}
      </div>

      {/* Station insight */}
      <div className="mt-5 rounded-xl border border-[#29C7F6]/10 bg-[#29C7F6]/[0.04] p-4 sm:mt-6">
        <div className="flex items-center gap-2">
          <Activity
            size={15}
            className="text-[#29C7F6]"
          />

          <p className="text-xs font-medium text-[#29C7F6]">
            Station insight
          </p>
        </div>

        <p className="mt-2 text-sm leading-6 text-[#8A9AA3]">
          {getAQIMessage(
            aqi,
            formatPollutantName(pollutant)
          )}
        </p>
      </div>

      {/* Source */}
      <div className="mt-5 border-t border-white/[0.07] pt-4">
        <div className="flex flex-col gap-2 text-[10px] text-[#64757d] sm:text-[11px]">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#35D07F]" />

            <span>
              Source: CPCB / data.gov.in
            </span>
          </div>

          <span>
            Real-time station-level monitoring
            data
          </span>
        </div>
      </div>
    </section>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex min-w-0 items-start justify-between gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-3 py-3 sm:px-4">
      <div className="flex min-w-0 items-center gap-2.5">
        <Icon
          size={15}
          className="shrink-0 text-[#64757d]"
        />

        <span className="text-xs text-[#8A9AA3] sm:text-sm">
          {label}
        </span>
      </div>

      <span className="max-w-[58%] break-words text-right text-xs font-medium text-[#F5F7F8] sm:text-sm">
        {value}
      </span>
    </div>
  );
}

function getAQIColor(aqi) {
  if (aqi <= 50) return "#35D07F";
  if (aqi <= 100) return "#9BC53D";
  if (aqi <= 150) return "#FFB547";
  if (aqi <= 200) return "#FF7A59";

  return "#FF5A5F";
}

export default HotspotPanel;