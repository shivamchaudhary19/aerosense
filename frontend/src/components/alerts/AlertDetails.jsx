import {
  AlertTriangle,
  MapPin,
  Clock3,
  ShieldCheck,
  Activity,
  Database,
} from "lucide-react";

function getSeverityStyles(severity) {
  if (severity === "high") {
    return {
      badge: "bg-[#FF5A5F]/10 text-[#FF5A5F]",
      icon: "bg-[#FF5A5F]/10 text-[#FF5A5F]",
    };
  }

  return {
    badge: "bg-[#FFB547]/10 text-[#FFB547]",
    icon: "bg-[#FFB547]/10 text-[#FFB547]",
  };
}

function AlertDetails({ alert }) {
  if (!alert) {
    return (
      <aside className="flex min-h-[360px] items-center justify-center rounded-2xl border border-white/10 bg-[#101B20] p-5 sm:min-h-[420px] sm:p-6 lg:sticky lg:top-24">
        <div className="max-w-xs text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#29C7F6]/10 text-[#29C7F6]">
            <AlertTriangle size={21} />
          </div>

          <h3 className="mt-4 font-semibold text-[#F5F7F8]">
            Select an alert
          </h3>

          <p className="mt-2 text-sm leading-6 text-[#64757d]">
            Select an alert to view its full pollution
            reading and recommended action.
          </p>
        </div>
      </aside>
    );
  }

  const styles = getSeverityStyles(alert.severity);

  const pollutant =
    alert.pollutant || "Primary pollutant";

  return (
    <aside className="rounded-2xl border border-white/10 bg-[#101B20] p-4 sm:p-5 lg:sticky lg:top-24 lg:p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#64757d] sm:text-xs">
            Alert Details
          </p>

          <h2 className="mt-2 break-words text-lg font-semibold leading-6 text-[#F5F7F8] sm:text-xl">
            {alert.title}
          </h2>
        </div>

        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-medium capitalize sm:px-3 sm:text-xs ${styles.badge}`}
        >
          {alert.severity}
        </span>
      </div>

      {/* AQI */}
      <div className="mt-5 rounded-xl border border-white/[0.07] bg-white/[0.025] p-4 sm:mt-6 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs text-[#64757d]">
              Current AQI
            </p>

            <p className="mt-1 text-4xl font-semibold tracking-tight text-[#F5F7F8] sm:text-5xl">
              {alert.predictedAQI ?? "—"}
            </p>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#29C7F6]/10 text-[#29C7F6]">
            <Activity size={17} />
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[#FFB547]/10 px-2.5 py-1 text-[10px] font-medium text-[#FFB547] sm:text-xs">
            {alert.category || "Unknown"}
          </span>

          <span className="text-[10px] text-[#64757d] sm:text-xs">
            {pollutant}
          </span>
        </div>
      </div>

      {/* Station information */}
      {alert.station && (
        <div className="mt-4 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#29C7F6]/10 text-[#29C7F6]">
              <Database size={15} />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.12em] text-[#64757d]">
                Monitoring station
              </p>

              <p className="mt-1 break-words text-sm font-medium text-[#F5F7F8]">
                {alert.station}
              </p>

              {alert.stationAQI !== null &&
                alert.stationAQI !== undefined && (
                  <p className="mt-1 text-xs text-[#64757d]">
                    Station AQI{" "}
                    <span className="font-medium text-[#FFB547]">
                      {alert.stationAQI}
                    </span>
                  </p>
                )}
            </div>
          </div>
        </div>
      )}

      {/* Details */}
      <div className="mt-4 space-y-2.5 sm:mt-5 sm:space-y-3">
        <InfoRow
          icon={MapPin}
          label="Location"
          value={alert.location || "Unknown"}
        />

        <InfoRow
          icon={Clock3}
          label="Latest observation"
          value={
            alert.stationLastUpdate ||
            alert.time ||
            "Live monitoring"
          }
        />

        <InfoRow
          icon={ShieldCheck}
          label="Audience"
          value={formatAudience(alert.audience)}
        />
      </div>

      {/* Pollutant reading */}
      {alert.value !== null &&
        alert.value !== undefined && (
          <div className="mt-5 rounded-xl border border-[#FFB547]/10 bg-[#FFB547]/[0.04] p-4">
            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#FFB547] sm:text-xs">
              Pollutant reading
            </p>

            <div className="mt-2 flex flex-wrap items-end gap-2">
              <span className="text-2xl font-semibold text-[#F5F7F8] sm:text-3xl">
                {alert.value}
              </span>

              {alert.unit && (
                <span className="mb-1 text-xs text-[#64757d]">
                  {alert.unit}
                </span>
              )}
            </div>

            <p className="mt-1 text-xs text-[#64757d]">
              {pollutant}
            </p>
          </div>
        )}

      {/* Recommended action */}
      <div className="mt-5 rounded-xl border border-[#29C7F6]/10 bg-[#29C7F6]/[0.04] p-4 sm:mt-6 sm:p-5">
        <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#29C7F6] sm:text-xs">
          Recommended action
        </p>

        <p className="mt-3 text-sm leading-6 text-[#8A9AA3]">
          {alert.recommendation}
        </p>
      </div>

      <p className="mt-4 text-[10px] leading-5 text-[#64757d] sm:mt-5 sm:text-xs">
        This advisory is generated from current CPCB
        monitoring conditions and should be treated as
        environmental guidance.
      </p>
    </aside>
  );
}

function InfoRow({
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

      <span className="max-w-[58%] break-words text-right text-[10px] font-medium capitalize text-[#F5F7F8] sm:text-xs">
        {value}
      </span>
    </div>
  );
}

function formatAudience(audience) {
  if (!audience) {
    return "General";
  }

  return audience.replace(/-/g, " ");
}

export default AlertDetails;