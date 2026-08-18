import {
  Database,
  SlidersHorizontal,
  BrainCircuit,
  LineChart,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

function PredictionPipeline({ data }) {
  const stages = [
    {
      number: "01",
      title: "Environmental Data",
      description:
        "AQI, weather and atmospheric observations",
      icon: Database,
    },
    {
      number: "02",
      title: "Feature Processing",
      description:
        "Prepare environmental signals for prediction",
      icon: SlidersHorizontal,
    },
    {
      number: "03",
      title: "Random Forest Model",
      description:
        "Estimate future pollution conditions",
      icon: BrainCircuit,
    },
    {
      number: "04",
      title: "AQI Prediction",
      description:
        "Generate location-specific prediction",
      icon: LineChart,
    },
  ];

  const predictionAvailable =
    Boolean(
      data?.predictedAQI ??
        data?.prediction?.predictedAQI ??
        data?.prediction?.aqi
    );

  return (
    <section className="rounded-2xl border border-white/10 bg-[#101B20] p-5 sm:p-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#64757d]">
          Prediction Architecture
        </p>

        <h2 className="mt-1 text-lg font-semibold text-[#F5F7F8]">
          How AeroSense predicts pollution
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64757d]">
          Environmental signals are processed through the
          machine-learning pipeline before being converted
          into AQI predictions.
        </p>
      </div>

      <div className="mt-6 grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-center">
        {stages.map((stage, index) => {
          const Icon = stage.icon;

          return (
            <div
              key={stage.number}
              className="contents"
            >
              <div className="min-w-0 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#29C7F6]/10 text-[#29C7F6]">
                    <Icon size={17} />
                  </div>

                  <span className="text-[10px] font-semibold tracking-[0.14em] text-[#29C7F6]">
                    {stage.number}
                  </span>
                </div>

                <h3 className="mt-4 text-sm font-medium text-[#F5F7F8]">
                  {stage.title}
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#64757d]">
                  {stage.description}
                </p>

                {index === 3 && (
                  <div className="mt-3 flex items-center gap-1.5 text-[10px] text-[#35D07F]">
                    <CheckCircle2 size={12} />

                    <span>
                      {predictionAvailable
                        ? "Prediction available"
                        : "Awaiting prediction"}
                    </span>
                  </div>
                )}
              </div>

              {index < stages.length - 1 && (
                <ArrowRight
                  size={17}
                  className="mx-auto hidden text-[#64757d] lg:block"
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default PredictionPipeline;