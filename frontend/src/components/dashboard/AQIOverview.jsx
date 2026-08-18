import {
  Activity,
  Wind,
  Droplets,
  AlertTriangle,
} from "lucide-react";

function getAQIColor(aqi) {
  if (aqi <= 50) return "#35D07F";
  if (aqi <= 100) return "#9BC53D";
  if (aqi <= 200) return "#FFB547";
  if (aqi <= 300) return "#FF7A59";
  return "#FF5A5F";
}

function getAQIMessage(aqi) {
  if (aqi <= 50) {
    return "Air quality is good and pollution levels are low.";
  }

  if (aqi <= 100) {
    return "Air quality is satisfactory with limited health concern.";
  }

  if (aqi <= 200) {
    return "Air quality is moderately polluted. Sensitive groups should take care.";
  }

  if (aqi <= 300) {
    return "Air quality is poor. Prolonged outdoor exposure should be reduced.";
  }

  if (aqi <= 400) {
    return "Air quality is very poor. Outdoor exposure should be limited.";
  }

  return "Air quality is severe. Outdoor exposure should be minimized.";
}

function AQIOverview({ data }) {
  const aqi = Number(data?.airQuality?.aqi) || 0;

  const category =
    data?.airQuality?.category ||
    "Unknown";

  const pm25 = Number(
    data?.airQuality?.pm2_5
  );

  const pm10 = Number(
    data?.airQuality?.pm10
  );

  const visibilityValue =
    data?.weather?.visibility;

  const visibility =
    visibilityValue !== undefined &&
    visibilityValue !== null &&
    Number.isFinite(
      Number(visibilityValue)
    )
      ? (
          Number(visibilityValue) / 1000
        ).toFixed(1)
      : "—";

  const color = getAQIColor(aqi);

  return (
    <section className="min-w-0 rounded-2xl border border-white/10 bg-[#101B20] p-4 sm:p-5 lg:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#64757d] sm:text-xs">
            Current Air Quality
          </p>

          <div className="mt-4 flex flex-wrap items-end gap-3">
            <h2
              className="text-5xl font-semibold tracking-tight sm:text-6xl"
              style={{ color }}
            >
              {aqi}
            </h2>

            <span
              className="mb-2 rounded-full px-3 py-1 text-xs font-medium"
              style={{
                color,
                backgroundColor: `${color}15`,
              }}
            >
              {category}
            </span>
          </div>

          <p className="mt-2 max-w-xl text-sm leading-6 text-[#8A9AA3]">
            {getAQIMessage(aqi)}
          </p>
        </div>

        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12"
          style={{
            color,
            backgroundColor: `${color}15`,
          }}
        >
          {aqi > 100 ? (
            <AlertTriangle size={21} />
          ) : (
            <Activity size={22} />
          )}
        </div>
      </div>

      <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Metric
          icon={Wind}
          label="PM2.5"
          value={
            Number.isFinite(pm25)
              ? pm25.toFixed(1)
              : "—"
          }
          unit="µg/m³"
        />

        <Metric
          icon={Wind}
          label="PM10"
          value={
            Number.isFinite(pm10)
              ? pm10.toFixed(1)
              : "—"
          }
          unit="µg/m³"
        />

        <Metric
          icon={Droplets}
          label="Visibility"
          value={visibility}
          unit="km"
        />
      </div>
    </section>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
  unit,
}) {
  return (
    <div className="min-w-0 rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
      <div className="flex items-center gap-2 text-[#64757d]">
        <Icon size={15} />

        <span className="text-xs">
          {label}
        </span>
      </div>

      <div className="mt-3 flex min-w-0 items-baseline">
        <span className="truncate text-xl font-semibold text-[#F5F7F8]">
          {value}
        </span>

        <span className="ml-1 shrink-0 text-[10px] text-[#64757d] sm:text-xs">
          {unit}
        </span>
      </div>
    </div>
  );
}

export default AQIOverview;