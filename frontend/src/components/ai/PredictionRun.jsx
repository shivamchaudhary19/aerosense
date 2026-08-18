import {
  MapPin,
  Clock3,
  Timer,
  ShieldCheck,
} from "lucide-react";

function PredictionRun() {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#101B20] p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#64757d]">
            Latest Prediction Run
          </p>

          <h2 className="mt-1 text-lg font-semibold text-[#F5F7F8]">
            Prediction status
          </h2>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#35D07F]/10 text-[#35D07F]">
          <ShieldCheck size={17} />
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <InfoRow
          icon={MapPin}
          label="Location"
          value="Noida, India"
        />

        <InfoRow
          icon={Timer}
          label="Forecast horizon"
          value="72 hours"
        />

        <InfoRow
          icon={Clock3}
          label="Generated"
          value="2 min ago"
        />

        <InfoRow
          icon={ShieldCheck}
          label="Confidence"
          value="91.4%"
        />
      </div>

      <div className="mt-5 rounded-xl border border-[#35D07F]/10 bg-[#35D07F]/[0.04] p-4">
        <p className="text-xs font-medium text-[#35D07F]">
          Prediction completed
        </p>

        <p className="mt-1 text-xs leading-5 text-[#64757d]">
          The latest forecast has been generated successfully and is available
          across the Dashboard, Forecast and Alert systems.
        </p>
      </div>
    </section>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3">
      <div className="flex min-w-0 items-center gap-3">
        <Icon size={15} className="shrink-0 text-[#64757d]" />

        <span className="truncate text-sm text-[#8A9AA3]">
          {label}
        </span>
      </div>

      <span className="shrink-0 text-sm font-medium text-[#F5F7F8]">
        {value}
      </span>
    </div>
  );
}

export default PredictionRun;