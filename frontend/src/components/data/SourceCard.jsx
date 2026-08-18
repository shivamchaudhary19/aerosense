import {
  CloudSun,
  Wind,
  Satellite,
  CarFront,
  Database,
  BrainCircuit,
  CheckCircle2,
  Clock3,
} from "lucide-react";

const iconMap = {
  weather: CloudSun,
  airQuality: Wind,
  satellite: Satellite,
  traffic: CarFront,
  model: Database,
  prediction: BrainCircuit,
};

function SourceCard({ source }) {
  const Icon = iconMap[source.type] || Database;

  const isOperational =
    source.status === "Connected" ||
    source.status === "Operational";

  return (
    <div className="min-w-0 rounded-2xl border border-white/10 bg-[#101B20] p-4 transition-all duration-200 hover:border-white/15 hover:bg-[#111D22] sm:p-5 lg:p-6">
      {/* Header */}
      <div className="flex min-w-0 items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#29C7F6]/10 text-[#29C7F6] sm:h-11 sm:w-11">
            <Icon size={19} />
          </div>

          <div className="min-w-0">
            <h3 className="break-words text-sm font-semibold text-[#F5F7F8]">
              {source.name}
            </h3>

            <p className="mt-1 text-[11px] text-[#64757d] sm:text-xs">
              {source.category}
            </p>
          </div>
        </div>

        <span
          className={`flex shrink-0 items-center gap-1.5 text-[10px] font-medium sm:text-xs ${
            isOperational
              ? "text-[#35D07F]"
              : "text-[#FFB547]"
          }`}
        >
          <CheckCircle2 size={13} />
          {source.status}
        </span>
      </div>

      {/* Description */}
      <p className="mt-5 text-xs leading-6 text-[#8A9AA3] sm:text-sm">
        {source.description}
      </p>

      {/* Metadata */}
      <div className="mt-5 grid grid-cols-1 gap-4 border-t border-white/[0.07] pt-4 sm:grid-cols-2">
        <div className="min-w-0">
          <p className="text-[9px] uppercase tracking-[0.14em] text-[#64757d] sm:text-[10px]">
            Data type
          </p>

          <p className="mt-1 break-words text-xs leading-5 text-[#F5F7F8]">
            {source.dataType}
          </p>
        </div>

        <div className="min-w-0 sm:text-right">
          <p className="text-[9px] uppercase tracking-[0.14em] text-[#64757d] sm:text-[10px]">
            Update
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