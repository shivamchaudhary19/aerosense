import {
  BrainCircuit,
  Activity,
  Sparkles,
} from "lucide-react";

import ModelStatus from "../components/ai/ModelStatus";
import PredictionPipeline from "../components/ai/PredictionPipeline";
import ModelMetrics from "../components/ai/ModelMetrics";
import PredictionRun from "../components/ai/PredictionRun";

function AIModel() {
  return (
    <div className="mx-auto max-w-[1600px] space-y-8">
      <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-[#8A9AA3]">
            <BrainCircuit size={15} className="text-[#29C7F6]" />
            Predictive Intelligence
          </div>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#F5F7F8]">
            AI Prediction Model
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64757d]">
            Understand how AeroSense transforms environmental signals into
            future pollution predictions and actionable intelligence.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.025] px-3 py-2 text-xs text-[#8A9AA3]">
            <span className="h-2 w-2 rounded-full bg-[#35D07F]" />
            Model operational
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-[#29C7F6]/10 bg-[#29C7F6]/[0.04] px-3 py-2 text-xs text-[#29C7F6]">
            <Sparkles size={14} />
            Predictive engine
          </div>
        </div>
      </section>

      <ModelStatus />

      <PredictionPipeline />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <ModelMetrics />
        <PredictionRun />
      </div>

      <section className="rounded-2xl border border-[#29C7F6]/15 bg-[#101B20] p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#29C7F6]/10 text-[#29C7F6]">
            <Activity size={19} />
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#29C7F6]">
              Intelligence Layer
            </p>

            <h2 className="mt-1 text-lg font-semibold text-[#F5F7F8]">
              Prediction is only the beginning
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#64757d]">
              AeroSense uses predicted pollution conditions to power hotspot
              detection, smart alerts and government recommendations. The
              prediction engine remains separate from the action layer so that
              forecasts and recommendations can be evaluated independently.
            </p>
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-2 rounded-xl border border-white/10 bg-[#101B20] px-5 py-4 text-xs text-[#64757d] sm:flex-row sm:items-center sm:justify-between">
        <span>
          Model metrics are currently displayed using prototype values.
        </span>

        <span className="text-[#8A9AA3]">
          Real ML outputs will be connected through the backend.
        </span>
      </div>
    </div>
  );
}

export default AIModel;