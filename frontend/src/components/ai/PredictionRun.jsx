import {
  MapPin,
  Clock3,
  Timer,
  ShieldCheck,
  Activity,
} from "lucide-react";

function PredictionRun({ data, location }) {
  const predictedAQI =
    data?.predictedAQI ??
    data?.prediction?.predictedAQI ??
    data?.prediction?.aqi ??
    null;

  const category =
    data?.category ??
    data?.prediction?.category ??
    "—";

  const horizon =
    data?.forecastHorizon ??
    data?.prediction?.forecastHorizon ??
    data?.horizon ??
    "—";

  const generatedAt =
    data?.generatedAt ??
    data?.timestamp ??
    data?.prediction?.generatedAt ??
    null;

  const confidence =
    data?.confidence ??
    data?.prediction?.confidence ??
    null;

  const status =
    data?.status ||
    (predictedAQI !== null
      ? "Prediction completed"
      : "Prediction unavailable");

  return (
    <section className="min-w-0 rounded-2xl border border-white/10 bg-[#101B20] p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#64757d]">
            Latest Prediction Run
          </p>

          <h2 className="mt-1 text-lg font-semibold text-[#F5F7F8]">
            Prediction status
          </h2>
        </div>

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#35D07F]/10 text-[#35D07F]">
          <ShieldCheck size={17} />
        </div>
      </div>

      <div className="mt-5 space-y-3 sm:mt-6">
        <InfoRow
          icon={MapPin}
          label="Location"
          value={location || "—"}
        />

        <InfoRow
          icon={Activity}
          label="Predicted AQI"
          value={
            predictedAQI !== null
              ? String(predictedAQI)
              : "—"
          }
        />

        <InfoRow
          icon={Timer}
          label="Forecast horizon"
          value={String(horizon)}
        />

        <InfoRow
          icon={Clock3}
          label="Generated"
          value={formatDate(generatedAt)}
        />

        <InfoRow
          icon={ShieldCheck}
          label="Confidence"
          value={formatConfidence(confidence)}
        />
      </div>

      <div className="mt-5 rounded-xl border border-[#35D07F]/10 bg-[#35D07F]/[0.04] p-4">
        <p className="text-xs font-medium text-[#35D07F]">
          {status}
        </p>

        <p className="mt-1 text-xs leading-5 text-[#64757d]">
          {predictedAQI !== null
            ? `The ML model predicted an AQI of ${predictedAQI} (${category}) for ${location}.`
            : "The prediction service did not return a valid AQI prediction."}
        </p>
      </div>
    </section>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-3 py-3 sm:px-4">
      <div className="flex min-w-0 items-center gap-3">
        <Icon
          size={15}
          className="shrink-0 text-[#64757d]"
        />

        <span className="truncate text-xs text-[#8A9AA3] sm:text-sm">
          {label}
        </span>
      </div>

      <span className="max-w-[55%] truncate text-right text-xs font-medium text-[#F5F7F8] sm:text-sm">
        {value}
      </span>
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

function formatDate(value) {
  if (!value) {
    return "Just now";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default PredictionRun;