import {
  AlertTriangle,
  MapPin,
  Clock3,
  ShieldCheck,
} from "lucide-react";

function AlertDetails({ alert }) {
  if (!alert) {
    return (
      <aside className="flex min-h-[420px] items-center justify-center rounded-2xl border border-white/10 bg-[#101B20] p-6">
        <div className="max-w-xs text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#29C7F6]/10 text-[#29C7F6]">
            <AlertTriangle size={21} />
          </div>

          <h3 className="mt-4 font-semibold text-[#F5F7F8]">
            Select an alert
          </h3>

          <p className="mt-2 text-sm leading-6 text-[#64757d]">
            Select an alert to view its full prediction and recommended
            action.
          </p>
        </div>
      </aside>
    );
  }

  const isHigh = alert.severity === "high";

  return (
    <aside className="rounded-2xl border border-white/10 bg-[#101B20] p-6 lg:sticky lg:top-24">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#64757d]">
            Alert Details
          </p>

          <h2 className="mt-2 text-xl font-semibold text-[#F5F7F8]">
            {alert.title}
          </h2>
        </div>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
            isHigh
              ? "bg-[#FF5A5F]/10 text-[#FF5A5F]"
              : "bg-[#FFB547]/10 text-[#FFB547]"
          }`}
        >
          {alert.severity}
        </span>
      </div>

      <div className="mt-6 rounded-xl border border-white/[0.07] bg-white/[0.025] p-5">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-[#64757d]">Predicted AQI</p>

            <p className="mt-1 text-4xl font-semibold text-[#F5F7F8]">
              {alert.predictedAQI}
            </p>
          </div>

          <p className="text-sm text-[#FFB547]">{alert.category}</p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <InfoRow
          icon={MapPin}
          label="Location"
          value={alert.location}
        />

        <InfoRow
          icon={Clock3}
          label="Peak period"
          value={alert.time}
        />

        <InfoRow
          icon={ShieldCheck}
          label="Audience"
          value={alert.audience.replace("-", " ")}
        />
      </div>

      <div className="mt-6 rounded-xl border border-[#29C7F6]/10 bg-[#29C7F6]/[0.04] p-5">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#29C7F6]">
          Recommended action
        </p>

        <p className="mt-3 text-sm leading-6 text-[#8A9AA3]">
          {alert.recommendation}
        </p>
      </div>

      <p className="mt-5 text-xs leading-5 text-[#64757d]">
        This recommendation is generated from the predicted pollution
        conditions and is intended as an actionable advisory.
      </p>
    </aside>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3">
      <div className="flex items-center gap-3">
        <Icon size={15} className="text-[#64757d]" />
        <span className="text-sm text-[#8A9AA3]">{label}</span>
      </div>

      <span className="text-right text-sm font-medium capitalize text-[#F5F7F8]">
        {value}
      </span>
    </div>
  );
}

export default AlertDetails;