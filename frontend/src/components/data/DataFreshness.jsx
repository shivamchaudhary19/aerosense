import {
  Activity,
  Clock3,
  Database,
  RefreshCw,
} from "lucide-react";

const freshnessData = [
  {
    icon: Activity,
    label: "Air quality observations",
    value: "Live",
  },
  {
    icon: Clock3,
    label: "Weather conditions",
    value: "Live",
  },
  {
    icon: Database,
    label: "ML prediction model",
    value: "Available",
  },
];

function DataFreshness() {
  return (
    <section className="min-w-0 rounded-2xl border border-white/10 bg-[#101B20] p-4 sm:p-5 lg:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#64757d] sm:text-xs">
            Data Freshness
          </p>

          <h2 className="mt-1 text-lg font-semibold text-[#F5F7F8]">
            System data status
          </h2>
        </div>

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#29C7F6]/10 text-[#29C7F6]">
          <RefreshCw size={16} />
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {freshnessData.map((item) => (
          <FreshnessRow
            key={item.label}
            icon={item.icon}
            label={item.label}
            value={item.value}
          />
        ))}
      </div>

      <div className="mt-5 rounded-xl border border-[#35D07F]/10 bg-[#35D07F]/[0.04] p-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#35D07F]" />

          <p className="text-xs font-medium text-[#35D07F]">
            Pipeline healthy
          </p>
        </div>

        <p className="mt-2 text-xs leading-5 text-[#64757d]">
          Core AeroSense data and prediction services are
          available for the current session.
        </p>
      </div>
    </section>
  );
}

function FreshnessRow({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-3 py-3 sm:px-4">
      <div className="flex min-w-0 items-center gap-3">
        <Icon
          size={15}
          className="shrink-0 text-[#64757d]"
        />

        <span className="min-w-0 truncate text-xs text-[#8A9AA3] sm:text-sm">
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