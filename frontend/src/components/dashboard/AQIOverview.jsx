import { Activity, Wind, Droplets } from "lucide-react";

function AQIOverview({ data }) {
  const aqi = data?.airQuality?.aqi ?? 0;
  const category = data?.airQuality?.category ?? "Unknown";
  const pm25 = data?.airQuality?.pm2_5 ?? 0;
  const pm10 = data?.airQuality?.pm10 ?? 0;
  const visibility = data?.weather?.visibility
    ? (data.weather.visibility / 1000).toFixed(1)
    : "—";

  return (
    <section className="rounded-2xl border border-white/10 bg-[#101B20] p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#64757d]">
            Current Air Quality
          </p>

          <div className="mt-4 flex flex-wrap items-end gap-3">
            <h2 className="text-5xl font-semibold tracking-tight text-[#F5F7F8] sm:text-6xl">
              {aqi}
            </h2>

            <span className="mb-2 rounded-full bg-[#FFB547]/10 px-3 py-1 text-xs font-medium text-[#FFB547]">
              {category}
            </span>
          </div>

          <p className="mt-2 max-w-xl text-sm leading-6 text-[#8A9AA3]">
            Current air quality based on live environmental conditions.
          </p>
        </div>

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#29C7F6]/10 text-[#29C7F6]">
          <Activity size={24} />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Metric
          icon={Wind}
          label="PM2.5"
          value={pm25.toFixed(2)}
          unit="µg/m³"
        />

        <Metric
          icon={Wind}
          label="PM10"
          value={pm10.toFixed(2)}
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

function Metric({ icon: Icon, label, value, unit }) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
      <div className="flex items-center gap-2 text-[#64757d]">
        <Icon size={15} />
        <span className="text-xs">{label}</span>
      </div>

      <div className="mt-3">
        <span className="text-xl font-semibold text-[#F5F7F8]">
          {value}
        </span>

        <span className="ml-1 text-xs text-[#64757d]">
          {unit}
        </span>
      </div>
    </div>
  );
}

export default AQIOverview;