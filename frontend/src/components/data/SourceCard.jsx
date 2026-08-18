import {
  CloudSun,
  Wind,
  Satellite,
  CarFront,
  CheckCircle2,
  Clock3,
} from "lucide-react";

const iconMap = {
  weather: CloudSun,
  airQuality: Wind,
  satellite: Satellite,
  traffic: CarFront,
};

function SourceCard({ source }) {
  const Icon = iconMap[source.type] || CloudSun;

  return (
    <div className="rounded-2xl border border-white/10 bg-[#101B20] p-5 transition-colors hover:border-white/15 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#29C7F6]/10 text-[#29C7F6]">
            <Icon size={20} />
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-[#F5F7F8]">
              {source.name}
            </h3>

            <p className="mt-1 text-xs text-[#64757d]">
              {source.category}
            </p>
          </div>
        </div>

        <span className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-[#35D07F]">
          <CheckCircle2 size={14} />
          Connected
        </span>
      </div>

      <p className="mt-5 text-sm leading-6 text-[#8A9AA3]">
        {source.description}
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] pt-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.14em] text-[#64757d]">
            Data type
          </p>

          <p className="mt-1 text-xs text-[#F5F7F8]">
            {source.dataType}
          </p>
        </div>

        <div className="text-left sm:text-right">
          <p className="text-[10px] uppercase tracking-[0.14em] text-[#64757d]">
            Last update
          </p>

          <p className="mt-1 flex items-center gap-1 text-xs text-[#8A9AA3] sm:justify-end">
            <Clock3 size={12} />
            {source.updated}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SourceCard;