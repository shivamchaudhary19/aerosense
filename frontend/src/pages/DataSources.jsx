import {
  Database,
  Activity,
  ShieldCheck,
} from "lucide-react";

import SourceCard from "../components/data/SourceCard";
import PipelineStatus from "../components/data/PipelineStatus";
import DataFreshness from "../components/data/DataFreshness";

const sources = [
  {
    name: "Weather Intelligence",
    category: "Meteorological data",
    type: "weather",
    dataType: "Temperature, humidity, wind",
    updated: "5 min ago",
    description:
      "Provides atmospheric conditions used to understand pollutant dispersion and forecast environmental changes.",
  },
  {
    name: "Air Quality Network",
    category: "Air quality observations",
    type: "airQuality",
    dataType: "AQI, PM2.5, PM10",
    updated: "2 min ago",
    description:
      "Supplies current air-quality observations that establish the baseline for forecasting and hotspot detection.",
  },
  {
    name: "Remote Sensing",
    category: "Satellite observations",
    type: "satellite",
    dataType: "Aerosol and atmospheric signals",
    updated: "18 min ago",
    description:
      "Adds broader spatial information to identify environmental patterns beyond individual monitoring stations.",
  },
  {
    name: "Mobility Signals",
    category: "Traffic and mobility",
    type: "traffic",
    dataType: "Traffic intensity indicators",
    updated: "8 min ago",
    description:
      "Provides mobility signals that can help identify potential local emission patterns around high-traffic areas.",
  },
];

function DataSources() {
  return (
    <div className="mx-auto max-w-[1600px] space-y-8">
      <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-[#8A9AA3]">
            <Database size={15} className="text-[#29C7F6]" />
            Intelligence Infrastructure
          </div>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#F5F7F8]">
            Data Sources
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64757d]">
            Monitor the environmental signals feeding AeroSense's prediction
            and decision-support pipeline.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.025] px-3 py-2 text-xs text-[#8A9AA3]">
            <span className="h-2 w-2 rounded-full bg-[#35D07F]" />
            4 sources connected
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-[#29C7F6]/10 bg-[#29C7F6]/[0.04] px-3 py-2 text-xs text-[#29C7F6]">
            <ShieldCheck size={14} />
            Pipeline secure
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#64757d]">
            Connected Sources
          </p>

          <h2 className="mt-1 text-lg font-semibold text-[#F5F7F8]">
            Environmental data network
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {sources.map((source) => (
            <SourceCard
              key={source.name}
              source={source}
            />
          ))}
        </div>
      </section>

      <PipelineStatus />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <DataFreshness />

        <section className="rounded-2xl border border-[#29C7F6]/15 bg-[#101B20] p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#29C7F6]/10 text-[#29C7F6]">
              <Activity size={19} />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#29C7F6]">
                System Architecture
              </p>

              <h2 className="mt-1 text-lg font-semibold text-[#F5F7F8]">
                From raw signals to action
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#64757d]">
                Multiple environmental signals are processed together before
                reaching the forecast, hotspot and alert layers.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <ArchitectureStep
              number="01"
              title="Collect"
              text="Gather environmental and contextual signals."
            />

            <ArchitectureStep
              number="02"
              title="Process"
              text="Normalize and prepare inputs for prediction."
            />

            <ArchitectureStep
              number="03"
              title="Predict"
              text="Generate future AQI and pollution-risk signals."
            />

            <ArchitectureStep
              number="04"
              title="Act"
              text="Convert predictions into alerts and interventions."
            />
          </div>
        </section>
      </div>

      <div className="flex flex-col gap-2 rounded-xl border border-white/10 bg-[#101B20] px-5 py-4 text-xs text-[#64757d] sm:flex-row sm:items-center sm:justify-between">
        <span>
          Data source statuses are currently displayed using prototype data.
        </span>

        <span className="text-[#8A9AA3]">
          Live integrations will be connected through the backend.
        </span>
      </div>
    </div>
  );
}

function ArchitectureStep({ number, title, text }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
      <span className="shrink-0 text-[10px] font-semibold tracking-[0.14em] text-[#29C7F6]">
        {number}
      </span>

      <div>
        <p className="text-sm font-medium text-[#F5F7F8]">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-[#64757d]">
          {text}
        </p>
      </div>
    </div>
  );
}

export default DataSources;