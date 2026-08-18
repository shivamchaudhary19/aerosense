import {
  MapPin,
  Clock3,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";

function AlertCard({ alert, onSelect, selected }) {
  const isHigh = alert.severity === "high";

  return (
    <button
      onClick={() => onSelect(alert)}
      className={`w-full rounded-2xl border p-5 text-left transition-all ${
        selected
          ? "border-[#29C7F6]/40 bg-[#29C7F6]/[0.04]"
          : "border-white/10 bg-[#101B20] hover:border-white/20"
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
            isHigh
              ? "bg-[#FF5A5F]/10 text-[#FF5A5F]"
              : "bg-[#FFB547]/10 text-[#FFB547]"
          }`}
        >
          <ArrowUpRight size={19} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold text-[#F5F7F8]">
                {alert.location}
              </h3>

              <span
                className={`rounded-full px-2 py-1 text-[10px] font-medium uppercase tracking-wide ${
                  isHigh
                    ? "bg-[#FF5A5F]/10 text-[#FF5A5F]"
                    : "bg-[#FFB547]/10 text-[#FFB547]"
                }`}
              >
                {alert.severity} risk
              </span>
            </div>

            <ChevronRight
              size={16}
              className="hidden text-[#64757d] sm:block"
            />
          </div>

          <p className="mt-2 text-sm leading-6 text-[#8A9AA3]">
            {alert.title}
          </p>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#64757d]">
            <span className="flex items-center gap-1.5">
              <Clock3 size={13} />
              {alert.time}
            </span>

            <span className="flex items-center gap-1.5">
              <MapPin size={13} />
              Predicted AQI {alert.predictedAQI}
            </span>

            <span className="capitalize">{alert.audience}</span>
          </div>
        </div>
      </div>
    </button>
  );
}

export default AlertCard;