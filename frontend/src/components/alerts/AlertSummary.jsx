import { AlertTriangle, Bell, ShieldAlert } from "lucide-react";

function AlertSummary({ alerts }) {
  const highRisk = alerts.filter((alert) => alert.severity === "high").length;
  const mediumRisk = alerts.filter(
    (alert) => alert.severity === "medium"
  ).length;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <SummaryCard
        icon={ShieldAlert}
        label="High Risk"
        value={highRisk}
        description="Require immediate attention"
        iconClass="text-[#FF5A5F] bg-[#FF5A5F]/10"
      />

      <SummaryCard
        icon={AlertTriangle}
        label="Medium Risk"
        value={mediumRisk}
        description="Require monitoring"
        iconClass="text-[#FFB547] bg-[#FFB547]/10"
      />

      <SummaryCard
        icon={Bell}
        label="Active Alerts"
        value={alerts.length}
        description="Across monitored areas"
        iconClass="text-[#29C7F6] bg-[#29C7F6]/10"
      />
    </div>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  description,
  iconClass,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#101B20] p-5">
      <div className="flex items-center justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconClass}`}
        >
          <Icon size={19} />
        </div>

        <span className="text-3xl font-semibold text-[#F5F7F8]">
          {value}
        </span>
      </div>

      <p className="mt-5 text-sm font-medium text-[#F5F7F8]">{label}</p>

      <p className="mt-1 text-xs text-[#64757d]">{description}</p>
    </div>
  );
}

export default AlertSummary;