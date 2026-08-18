import {
  AlertTriangle,
  Bell,
  ShieldAlert,
} from "lucide-react";

function AlertSummary({ alerts = [] }) {
  const highRisk = alerts.filter(
    (alert) => alert.severity === "high"
  ).length;

  const mediumRisk = alerts.filter(
    (alert) => alert.severity === "medium"
  ).length;

  return (
    <section className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
      <SummaryCard
        icon={ShieldAlert}
        label="High Risk"
        value={highRisk}
        description="Require immediate attention"
        iconClass="bg-[#FF5A5F]/10 text-[#FF5A5F]"
      />

      <SummaryCard
        icon={AlertTriangle}
        label="Medium Risk"
        value={mediumRisk}
        description="Require monitoring"
        iconClass="bg-[#FFB547]/10 text-[#FFB547]"
      />

      <SummaryCard
        icon={Bell}
        label="Active Alerts"
        value={alerts.length}
        description="Across monitored areas"
        iconClass="bg-[#29C7F6]/10 text-[#29C7F6]"
      />
    </section>
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
    <div className="rounded-2xl border border-white/10 bg-[#101B20] p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
        >
          <Icon size={19} />
        </div>

        <span className="text-2xl font-semibold text-[#F5F7F8] sm:text-3xl">
          {value}
        </span>
      </div>

      <p className="mt-4 text-sm font-medium text-[#F5F7F8] sm:mt-5">
        {label}
      </p>

      <p className="mt-1 text-xs leading-5 text-[#64757d]">
        {description}
      </p>
    </div>
  );
}

export default AlertSummary;