import { Activity, Wind, Droplets } from "lucide-react";

function AQIOverview() {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#101B20] p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#64757d]">
            Current Air Quality
          </p>

          <div className="mt-4 flex items-end gap-3">
            <h2 className="text-6xl font-semibold tracking-tight text-[#F5F7F8]">
              142
            </h2>

            <span className="mb-2 rounded-full bg-[#FFB547]/10 px-3 py-1 text-xs font-medium text-[#FFB547]">
              Moderate
            </span>
          </div>

          <p className="mt-2 text-sm text-[#8A9AA3]">
            Air quality is currently acceptable, but sensitive groups should
            remain cautious.
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#29C7F6]/10 text-[#29C7F6]">
          <Activity size={24} />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Metric icon={Wind} label="PM2.5" value="78" unit="µg/m³" />
        <Metric icon={Wind} label="PM10" value="121" unit="µg/m³" />
        <Metric icon={Droplets} label="Visibility" value="6.8" unit="km" />
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
        <span className="text-xl font-semibold text-[#F5F7F8]">{value}</span>
        <span className="ml-1 text-xs text-[#64757d]">{unit}</span>
      </div>
    </div>
  );
}

export default AQIOverview;