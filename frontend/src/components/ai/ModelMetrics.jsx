import {
  TrendingUp,
  Target,
  Activity,
} from "lucide-react";

const metrics = [
  {
    label: "Forecast Accuracy",
    value: "91.4%",
    description: "Overall prediction reliability",
    icon: Target,
  },
  {
    label: "Mean Absolute Error",
    value: "12.6",
    description: "Average AQI prediction error",
    icon: Activity,
  },
  {
    label: "Peak Detection",
    value: "88.7%",
    description: "Correctly identifies pollution peaks",
    icon: TrendingUp,
  },
];

function ModelMetrics() {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#101B20] p-5 sm:p-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#64757d]">
          Model Performance
        </p>

        <h2 className="mt-1 text-lg font-semibold text-[#F5F7F8]">
          Prediction quality
        </h2>
      </div>

      <div className="mt-6 space-y-3">
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

                  <div>
                    <p className="text-sm font-medium text-[#F5F7F8]">
                      {metric.label}
                    </p>

                    <p className="mt-1 text-xs text-[#64757d]">
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

export default ModelMetrics;