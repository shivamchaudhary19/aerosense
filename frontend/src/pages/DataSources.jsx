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
    name: "CPCB Air Quality Network",
    category: "Air quality observations",
    type: "airQuality",
    dataType: "AQI, PM2.5, PM10, NO₂, O₃, SO₂",
    updated: "Live",
    status: "Connected",
    description:
      "Government monitoring data used as the primary source for current AQI, pollutant levels, station monitoring and hotspot analysis.",
  },
  {
    name: "OpenWeather",
    category: "Meteorological data",
    type: "weather",
    dataType: "Temperature, humidity, wind, clouds",
    updated: "Live",
    status: "Connected",
    description:
      "Provides atmospheric conditions used by AeroSense to understand environmental conditions and support pollution forecasting.",
  },
  {
    name: "AeroSense ML Dataset",
    category: "Machine-learning data",
    type: "model",
    dataType: "Pollutants + environmental factors",
    updated: "Model trained",
    status: "Connected",
    description:
      "Structured environmental observations used to train the Random Forest AQI prediction model.",
  },
  {
    name: "Prediction Engine",
    category: "AI inference layer",
    type: "prediction",
    dataType: "Location-specific AQI prediction",
    updated: "On request",
    status: "Operational",
    description:
      "Processes current environmental conditions through the trained ML model to generate location-specific AQI predictions.",
  },
];

function DataSources() {
  return (
    <div className="mx-auto w-full max-w-[1600px] min-w-0 space-y-6 sm:space-y-8">
      {/* Header */}
      <section className="flex min-w-0 flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs text-[#8A9AA3] sm:text-sm">
            <Database
              size={15}
              className="shrink-0 text-[#29C7F6]"
            />

            <span>Intelligence Infrastructure</span>
          </div>

          <h1 className="mt-2 break-words text-2xl font-semibold tracking-tight text-[#F5F7F8] sm:text-3xl">
            Data Sources
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64757d]">
            Monitor the environmental signals and AI services
            powering AeroSense prediction and decision support.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.025] px-3 py-2 text-xs text-[#8A9AA3]">
            <span className="h-2 w-2 rounded-full bg-[#35D07F]" />
            4 systems operational
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-[#29C7F6]/10 bg-[#29C7F6]/[0.04] px-3 py-2 text-xs text-[#29C7F6]">
            <ShieldCheck size={14} />
            Pipeline secure
          </div>
        </div>
      </section>

      {/* Connected sources */}
      <section>
        <div className="mb-4">
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#64757d] sm:text-xs">
            Connected Infrastructure
          </p>

          <h2 className="mt-1 text-lg font-semibold text-[#F5F7F8]">
            AeroSense data network
          </h2>
        </div>

        <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2">
          {sources.map((source) => (
            <SourceCard
              key={source.name}
              source={source}
            />
          ))}
        </div>
      </section>

      {/* Processing pipeline */}
      <PipelineStatus />

      {/* Freshness + architecture */}
      <div className="grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <DataFreshness />

        <section className="min-w-0 rounded-2xl border border-[#29C7F6]/15 bg-[#101B20] p-5 sm:p-6">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#29C7F6]/10 text-[#29C7F6]">
              <Activity size={19} />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#29C7F6] sm:text-xs">
                System Architecture
              </p>

              <h2 className="mt-1 text-lg font-semibold text-[#F5F7F8]">
                From raw signals to action
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#64757d]">
                Environmental observations are processed before
                reaching the forecast, hotspot, alert and
                decision-support layers.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <ArchitectureStep
              number="01"
              title="Collect"
              text="Gather air-quality and environmental observations."
            />

            <ArchitectureStep
              number="02"
              title="Process"
              text="Normalize and prepare environmental inputs."
            />

            <ArchitectureStep
              number="03"
              title="Predict"
              text="Generate location-specific AQI predictions."
            />

            <ArchitectureStep
              number="04"
              title="Act"
              text="Convert intelligence into alerts and interventions."
            />
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="flex min-w-0 flex-col gap-2 rounded-xl border border-white/10 bg-[#101B20] px-4 py-4 text-[11px] text-[#64757d] sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:text-xs">
        <span>
          AeroSense integrates live environmental data with its
          prediction engine.
        </span>

        <span className="text-[#8A9AA3]">
          Additional data integrations can be added in future versions.
        </span>
      </div>
    </div>
  );
}

function ArchitectureStep({
  number,
  title,
  text,
}) {
  return (
    <div className="flex min-w-0 items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
      <span className="shrink-0 text-[10px] font-semibold tracking-[0.14em] text-[#29C7F6]">
        {number}
      </span>

      <div className="min-w-0">
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