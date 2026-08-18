import {
  AlertTriangle,
  Clock3,
  MapPin,
  TrendingUp,
} from "lucide-react";

function PeakRisk() {
  return (
    <section className="rounded-2xl border border-[#FFB547]/20 bg-[#101B20] p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#64757d]">
            Peak Risk
          </p>

          <h2 className="mt-1 text-lg font-semibold text-[#F5F7F8]">
            Predicted pollution spike
          </h2>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFB547]/10 text-[#FFB547]">
          <AlertTriangle size={20} />
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-[#8A9AA3]">
              <MapPin size={14} className="text-[#29C7F6]" />
              Sector 62
            </div>

            <div className="mt-2 flex items-center gap-2 text-xs text-[#64757d]">
              <Clock3 size={13} />
              4:00 PM – 7:00 PM
            </div>
          </div>

          <div className="text-right">
            <p className="text-4xl font-semibold text-[#FFB547]">187</p>

            <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-[#64757d]">
              Unhealthy
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
        <div className="flex items-start gap-3">
          <TrendingUp
            size={17}
            className="mt-0.5 shrink-0 text-[#FF5A5F]"
          />

          <p className="text-sm leading-6 text-[#8A9AA3]">
            AQI is expected to rise significantly during the evening.
            Prolonged outdoor activity should be reduced during the predicted
            peak period.
          </p>
        </div>
      </div>
    </section>
  );
}

export default PeakRisk;