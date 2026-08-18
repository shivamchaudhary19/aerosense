import {
  TrendingUp,
  Target,
  Activity,
} from "lucide-react";

function ModelMetrics({ data }) {
  const metrics = getMetrics(data);

  return (
    <section className="min-w-0 rounded-2xl border border-white/10 bg-[#101B20] p-5 sm:p-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#64757d]">
          Model Performance
        </p>

        <h2 className="mt-1 text-lg font-semibold text-[#F5F7F8]">
          Prediction quality
        </h2>
      </div>

      <div className="mt-5 space-y-3 sm:mt-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <div
              key={metric.label}
              className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#29C7F6]/10 text-[#29C7F6]">
                    <Icon size={17} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#F5F7F8]">
                      {metric.label}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#64757d]">
                      {metric.description}
                    </p>
                  </div>
                </div>

                <span className="shrink-0 text-lg font-semibold text-[#29C7F6]">
                  {metric.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function getMetrics(data) {
  const confidence =
    data?.confidence ??
    data?.prediction?.confidence;

  const mae =
    data?.mae ??
    data?.metrics?.mae ??
    data?.modelMetrics?.mae;

  const r2 =
    data?.r2 ??
    data?.metrics?.r2 ??
    data?.modelMetrics?.r2;

  return [
    {
      label: "Model Confidence",
      value: formatConfidence(confidence),
      description:
        confidence !== undefined &&
        confidence !== null
          ? "Confidence reported by prediction service"
          : "Confidence metric not provided",
      icon: Target,
    },
    {
      label: "Mean Absolute Error",
      value:
        mae !== undefined &&
        mae !== null
          ? Number(mae).toFixed(2)
          : "—",
      description:
        "Average AQI prediction error",
      icon: Activity,
    },
    {
      label: "R² Score",
      value:
        r2 !== undefined &&
        r2 !== null
          ? Number(r2).toFixed(3)
          : "—",
      description:
        "Model goodness-of-fit score",
      icon: TrendingUp,
    },
  ];
}

function formatConfidence(value) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "—";
  }

  const percentage =
    number <= 1 ? number * 100 : number;

  return `${percentage.toFixed(1)}%`;
}

export default ModelMetrics;