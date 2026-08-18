import {
  MapPin,
  Clock3,
  ArrowUpRight,
  ChevronRight,
  Activity,
} from "lucide-react";

function getSeverityStyles(severity) {
  if (severity === "high") {
    return {
      icon: "bg-[#FF5A5F]/10 text-[#FF5A5F]",
      badge: "bg-[#FF5A5F]/10 text-[#FF5A5F]",
    };
  }

  return {
    icon: "bg-[#FFB547]/10 text-[#FFB547]",
    badge: "bg-[#FFB547]/10 text-[#FFB547]",
  };
}

function AlertCard({
  alert,
  onSelect,
  selected,
}) {
  const styles = getSeverityStyles(alert.severity);

  return (
    <button
      type="button"
      onClick={() => onSelect(alert)}
      className={`w-full rounded-2xl border p-4 text-left transition-all duration-200 sm:p-5 ${
        selected
          ? "border-[#29C7F6]/40 bg-[#29C7F6]/[0.04]"
          : "border-white/10 bg-[#101B20] hover:border-white/20 hover:bg-[#101B20]"
      }`}
    >
      <div className="flex min-w-0 items-start gap-3 sm:gap-4">
        {/* Alert icon */}
        <div
          className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl sm:h-10 sm:w-10 ${styles.icon}`}
        >
          <ArrowUpRight size={18} />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          {/* Title row */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="break-words text-sm font-semibold text-[#F5F7F8] sm:text-base">
                  {alert.location}
                </h3>

                <span
                  className={`shrink-0 rounded-full px-2 py-1 text-[9px] font-medium uppercase tracking-wide sm:text-[10px] ${styles.badge}`}
                >
                  {alert.severity} risk
                </span>
              </div>
            </div>

            <ChevronRight
              size={16}
              className={`mt-1 shrink-0 transition-transform ${
                selected
                  ? "translate-x-1 text-[#29C7F6]"
                  : "text-[#64757d]"
              }`}
            />
          </div>

          {/* Alert title */}
          <p className="mt-2 text-sm leading-6 text-[#8A9AA3]">
            {alert.title}
          </p>

          {/* Metadata */}
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[10px] text-[#64757d] sm:gap-x-5 sm:text-xs">
            <span className="flex min-w-0 items-center gap-1.5">
              <Clock3
                size={13}
                className="shrink-0"
              />

              <span className="break-words">
                {alert.time}
              </span>
            </span>

            <span className="flex items-center gap-1.5">
              <Activity
                size={13}
                className="shrink-0"
              />

              AQI {alert.predictedAQI}
            </span>

            {alert.pollutant && (
              <span className="flex items-center gap-1.5">
                <MapPin
                  size={13}
                  className="shrink-0"
                />

                {alert.pollutant}
              </span>
            )}
          </div>

          {/* Pollutant reading */}
          {alert.value !== null &&
            alert.value !== undefined && (
              <div className="mt-3 inline-flex max-w-full items-center rounded-lg border border-white/[0.07] bg-white/[0.02] px-2.5 py-1.5">
                <span className="truncate text-[10px] text-[#64757d] sm:text-xs">
                  {alert.pollutant || "Pollutant"}:
                </span>

                <span className="ml-1.5 text-[10px] font-medium text-[#F5F7F8] sm:text-xs">
                  {alert.value}
                  {alert.unit ? ` ${alert.unit}` : ""}
                </span>
              </div>
            )}
        </div>
      </div>
    </button>
  );
}

export default AlertCard;