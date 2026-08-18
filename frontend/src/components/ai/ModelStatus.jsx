import {
  BrainCircuit,
  CheckCircle2,
  Clock3,
  Target,
} from "lucide-react";

function ModelStatus({ data }) {
  const confidence =
    data?.confidence ??
    data?.prediction?.confidence ??
    null;

  const horizon =
    data?.forecastHorizon ??
    data?.prediction?.forecastHorizon ??
    data?.horizon ??
    "24 hours";

  const modelVersion =
    data?.modelVersion ??
    data?.prediction?.modelVersion ??
    "AeroSense ML";

  const isOperational =
    data?.status !== "error" &&
    data?.prediction?.status !== "error";

  const stats = [
    {
      label: "Model Status",
      value: isOperational
        ? "Operational"
        : "Unavailable",
      detail: isOperational
        ? "Prediction engine active"
        : "Prediction engine unavailable",
      icon: CheckCircle2,
      valueClass: isOperational
        ? "text-[#35D07F]"
        : "text-[#FF5A5F]",
    },
    {
      label: "Forecast Horizon",
      value: String(horizon),
      detail: "Available prediction window",
      icon: Clock3,
      valueClass: "text-[#29C7F6]",
    },
    {
      label: "Confidence",
      value: formatConfidence(confidence),
      detail:
        confidence !== null
          ? "Model confidence"
          : "Not provided by backend",
      icon: Target,
      valueClass: "text-[#F5F7F8]",
    },
    {
      label: "Model Version",
      value: String(modelVersion),
      detail: "Active prediction model",
      icon: BrainCircuit,
      valueClass: "text-[#F5F7F8]",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="min-w-0 rounded-2xl border border-white/10 bg-[#101B20] p-4 sm:p-5"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="truncate text-xs text-[#8A9AA3]">
                {stat.label}
              </p>

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-[#29C7F6]">
                <Icon size={17} />
              </div>
            </div>

            <p
              className={`mt-4 break-words text-xl font-semibold sm:mt-5 ${stat.valueClass}`}
            >
              {stat.value}
            </p>

            <p className="mt-1 truncate text-xs text-[#64757d]">
              {stat.detail}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function formatConfidence(value) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "—";
  }

  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "—";
  }

  const percentage =
    number <= 1 ? number * 100 : number;

  return `${percentage.toFixed(1)}%`;
}

export default ModelStatus;