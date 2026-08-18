import {
  Activity,
  Clock3,
  Database,
  RefreshCw,
} from "lucide-react";

function DataFreshness() {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#101B20] p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#64757d]">
            Data Freshness
          </p>

          <h2 className="mt-1 text-lg font-semibold text-[#F5F7F8]">
            Latest system updates
          </h2>
        </div>

        <RefreshCw size={18} className="text-[#29C7F6]" />
      </div>

      <div className="mt-6 space-y-3">
        <FreshnessRow
          icon={Activity}
          label="Air quality observations"
          value="2 min ago"
        />

        <FreshnessRow
          icon={Clock3}
          label="Weather conditions"
          value="5 min ago"
        />

        <FreshnessRow
          icon={Database}
          label="Prediction dataset"
          value="12 min ago"
        />
      </div>

      <div className="mt-5 rounded-xl border border-[#35D07F]/10 bg-[#35D07F]/[0.04] p-4">
        <p className="text-xs font-medium text-[#35D07F]">
          Pipeline healthy
        </p>

        <p className="mt-1 text-xs leading-5 text-[#64757d]">
          All configured data sources are currently reporting within the
          expected freshness window.
        </p>
      </div>
    </section>
  );
}

function FreshnessRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3">
      <div className="flex min-w-0 items-center gap-3">
        <Icon size={15} className="shrink-0 text-[#64757d]" />

        <span className="truncate text-sm text-[#8A9AA3]">
          {label}
        </span>
      </div>

      <span className="shrink-0 text-xs font-medium text-[#F5F7F8]">
        {value}
      </span>
    </div>
  );
}

export default DataFreshness;