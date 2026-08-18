import { AlertTriangle, Clock3, ArrowUpRight } from "lucide-react";

function UpcomingRisk() {
  return (
    <section className="rounded-2xl border border-[#FFB547]/20 bg-[#101B20] p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#64757d]">
            Upcoming Risk
          </p>

          <h3 className="mt-1 text-lg font-semibold text-[#F5F7F8]">
            Evening pollution spike
          </h3>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFB547]/10 text-[#FFB547]">
          <AlertTriangle size={20} />
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[#F5F7F8]">
              Sector 62
            </p>

            <div className="mt-1 flex items-center gap-2 text-xs text-[#8A9AA3]">
              <Clock3 size={13} />
              4:00 PM – 7:00 PM
            </div>
          </div>

          <div className="text-right">
            <p className="text-2xl font-semibold text-[#FFB547]">187</p>
            <p className="text-[10px] uppercase tracking-wider text-[#64757d]">
              predicted AQI
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-start gap-3">
        <ArrowUpRight
          size={18}
          className="mt-0.5 shrink-0 text-[#FFB547]"
        />

        <p className="text-sm leading-6 text-[#8A9AA3]">
          Air quality is expected to deteriorate during the evening due to
          unfavorable dispersion conditions. Consider reducing prolonged
          outdoor activity during the predicted peak.
        </p>
      </div>
    </section>
  );
}

export default UpcomingRisk;