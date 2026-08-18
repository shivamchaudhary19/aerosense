import {
  BrainCircuit,
  CheckCircle2,
  Clock3,
  Target,
} from "lucide-react";

const stats = [
  {
    label: "Model Status",
    value: "Operational",
    detail: "Prediction engine active",
    icon: CheckCircle2,
    valueClass: "text-[#35D07F]",
  },
  {
    label: "Forecast Horizon",
    value: "72 Hours",
    detail: "Rolling prediction window",
    icon: Clock3,
    valueClass: "text-[#29C7F6]",
  },
  {
    label: "Confidence",
    value: "91.4%",
    detail: "Current prediction confidence",
    icon: Target,
    valueClass: "text-[#F5F7F8]",
  },
  {
    label: "Model Version",
    value: "AeroSense v1",
    detail: "Production candidate",
    icon: BrainCircuit,
    valueClass: "text-[#F5F7F8]",
  },
];

function ModelStatus() {
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
              className={`mt-5 text-xl font-semibold ${stat.valueClass}`}
            >
              {stat.value}
            </p>

            <p className="mt-1 text-xs text-[#64757d]">
              {stat.detail}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default ModelStatus;