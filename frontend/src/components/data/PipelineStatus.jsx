import {
  Database,
  Cpu,
  BrainCircuit,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const stages = [
  {
    name: "Data Ingestion",
    description: "Collecting environmental signals",
    icon: Database,
    status: "Operational",
  },
  {
    name: "Data Processing",
    description: "Cleaning and normalizing inputs",
    icon: Cpu,
    status: "Operational",
  },
  {
    name: "Prediction Engine",
    description: "Generating AQI forecasts",
    icon: BrainCircuit,
    status: "Operational",
  },
];

function PipelineStatus() {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#101B20] p-5 sm:p-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#64757d]">
          Processing Pipeline
        </p>

        <h2 className="mt-1 text-lg font-semibold text-[#F5F7F8]">
          Data-to-prediction flow
        </h2>
      </div>

      <div className="mt-6 grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-center">
        {stages.map((stage, index) => {
          const Icon = stage.icon;

          return (
            <div key={stage.name} className="contents">
              <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#29C7F6]/10 text-[#29C7F6]">
                    <Icon size={17} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#F5F7F8]">
                      {stage.name}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#64757d]">
                      {stage.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-[#35D07F]">
                  <CheckCircle2 size={12} />
                  {stage.status}
                </div>
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

export default PipelineStatus;