import {
  MapPin,
  Clock3,
  Wind,
  Activity,
  Navigation,
} from "lucide-react";

function getAQIColorClass(aqi) {
  if (aqi <= 50) {
    return "bg-[#35D07F]/10 text-[#35D07F]";
  }

  if (aqi <= 100) {
    return "bg-[#9BC53D]/10 text-[#9BC53D]";
  }

  if (aqi <= 150) {
    return "bg-[#FFB547]/10 text-[#FFB547]";
  }

  if (aqi <= 200) {
    return "bg-[#FF7A59]/10 text-[#FF7A59]";
  }

  return "bg-[#FF5A5F]/10 text-[#FF5A5F]";
}

function HotspotPanel({ hotspot }) {
  if (!hotspot) {
    return (
      <section className="flex min-h-[420px] items-center justify-center rounded-2xl border border-white/10 bg-[#101B20] p-5 sm:min-h-[500px] sm:p-6 lg:min-h-[600px]">
        <div className="max-w-xs text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#29C7F6]/10 text-[#29C7F6]">
            <MapPin size={22} />
          </div>

          <h3 className="mt-4 text-base font-semibold text-[#F5F7F8]">
            Select a monitoring station
          </h3>

          <p className="mt-2 text-sm leading-6 text-[#64757d]">
            Select a CPCB monitoring station on the map
            to view its current air-quality details.
          </p>
        </div>
      </section>
    );
  }

  const aqi = Number(hotspot.aqi) || 0;

  const coordinates =
    hotspot.latitude !== undefined &&
    hotspot.longitude !== undefined
      ? {
          latitude: hotspot.latitude,
          longitude: hotspot.longitude,
        }
      : null;

  return (
    <section className="rounded-2xl border border-white/10 bg-[#101B20] p-4 sm:p-5 lg:p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#64757d] sm:text-xs">
            Selected Monitoring Station
          </p>

          <div className="mt-2 flex min-w-0 items-start gap-2">
            <MapPin
              size={17}
              className="mt-1 shrink-0 text-[#29C7F6]"
            />

            <h2 className="break-words text-lg font-semibold leading-6 text-[#F5F7F8] sm:text-xl">
              {hotspot.name}
            </h2>
          </div>
        </div>

        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-medium sm:px-3 sm:text-xs ${getAQIColorClass(
            aqi
          )}`}
        >
          {hotspot.category}
        </span>
      </div>

      {/* AQI */}
      <div className="mt-6 rounded-xl border border-white/[0.07] bg-white/[0.025] p-4 sm:mt-8 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-[#64757d]">
            Current Station AQI
          </p>

          <Activity
            size={16}
            className="text-[#29C7F6]"
          />
        </div>

        <div className="mt-2 flex flex-wrap items-end gap-2">
          <span className="text-4xl font-semibold tracking-tight text-[#F5F7F8] sm:text-5xl">
            {aqi}
          </span>

          <span className="mb-1 text-xs text-[#64757d] sm:mb-2">
            AQI
          </span>
        </div>

        <p className="mt-2 text-xs leading-5 text-[#64757d]">
          Real-time station-level reading from CPCB
          monitoring data.
        </p>
      </div>

      {/* Details */}
      <div className="mt-4 space-y-2.5 sm:mt-5 sm:space-y-3">
        <DetailRow
          icon={Wind}
          label="Primary pollutant"
          value={
            hotspot.primaryPollutant ||
            "Unknown"
          }
        />

        <DetailRow
          icon={Clock3}
          label="Last update"
          value={
            hotspot.lastUpdate ||
            "Unavailable"
          }
        />

        {coordinates && (
          <DetailRow
            icon={Navigation}
            label="Coordinates"
            value={`${Number(
              coordinates.latitude
            ).toFixed(4)}, ${Number(
              coordinates.longitude
            ).toFixed(4)}`}
          />
        )}
      </div>

      {/* AQI interpretation */}
      <div className="mt-5 rounded-xl border border-[#29C7F6]/10 bg-[#29C7F6]/[0.04] p-4 sm:mt-6">
        <p className="text-xs font-medium text-[#29C7F6]">
          Station insight
        </p>

        <p className="mt-2 text-sm leading-6 text-[#8A9AA3]">
          {getAQIMessage(
            aqi,
            hotspot.primaryPollutant
          )}
        </p>
      </div>

      {/* Source */}
      <div className="mt-5 border-t border-white/[0.07] pt-4">
        <div className="flex flex-col gap-1.5 text-[10px] text-[#64757d] sm:text-[11px]">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#35D07F]" />

            <span>
              Source: CPCB / data.gov.in
            </span>
          </div>

          <span>
            Station-level monitoring data
          </span>
        </div>
      </div>
    </section>
  );
}

function getAQIMessage(aqi, pollutant) {
  if (aqi <= 50) {
    return `Air quality at this station is good. ${pollutant || "Current pollutant levels"} are within a low-risk range.`;
  }

  if (aqi <= 100) {
    return `Air quality is satisfactory at this station. Sensitive individuals should remain aware of changing conditions.`;
  }

  if (aqi <= 200) {
    return `Air quality is moderately polluted at this station. ${pollutant || "The primary pollutant"} is the main contributor to the current AQI.`;
  }

  if (aqi <= 300) {
    return `Air quality is poor at this station. Consider reducing prolonged outdoor exposure, particularly during periods of elevated ${pollutant || "pollution"}.`;
  }

  if (aqi <= 400) {
    return `Air quality is very poor at this station. Prolonged outdoor exposure should be limited.`;
  }

  return `Air quality is severe at this station. Outdoor exposure should be minimized.`;
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

      <span className="max-w-[55%] break-words text-right text-xs font-medium text-[#F5F7F8] sm:text-sm">
        {value}
      </span>
    </div>
  );
}

export default HotspotPanel;