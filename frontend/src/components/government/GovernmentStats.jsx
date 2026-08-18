import {
  Activity,
  MapPin,
  AlertTriangle,
  Clock3,
} from "lucide-react";

const stats = [
  {
    label: "City AQI",
    value: "156",
    status: "Unhealthy",
    icon: Activity,
    valueClass: "text-[#FFB547]",
  },
  {
    label: "Active Hotspots",
    value: "7",
    status: "3 high-risk",
    icon: MapPin,
    valueClass: "text-[#F5F7F8]",
  },
  {
    label: "High-Risk Zones",
    value: "3",
    status: "Requires attention",
    icon: AlertTriangle,
    valueClass: "text-[#FF5A5F]",
  },
  {
    label: "Next Peak",
    value: "4 PM",
    status: "Sector 62",
    icon: Clock3,
    valueClass: "text-[#29C7F6]",
  },
];

function GovernmentStats() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="rounded-2xl border border-white/10 bg-[#101B20] p-5"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs text-[#8A9AA3]">{stat.label}</p>

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04] text-[#29C7F6]">
                <Icon size={17} />
              </div>
            </div>

            <p
              className={`mt-5 text-3xl font-semibold tracking-tight ${stat.valueClass}`}
            >
              {stat.value}
            </p>

            <p className="mt-1 text-xs text-[#64757d]">
              {stat.status}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default GovernmentStats;
