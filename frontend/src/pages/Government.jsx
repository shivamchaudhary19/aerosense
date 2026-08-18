import {
  Building2,
  Activity,
  RefreshCw,
} from "lucide-react";

import GovernmentStats from "../components/government/GovernmentStats";
import HotspotTable from "../components/government/HotspotTable";
import TrendChart from "../components/government/TrendChart";
import PolicySummary from "../components/government/PolicySummary";

function Government() {
  return (
    <div className="mx-auto max-w-[1600px] space-y-8">
      <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-[#8A9AA3]">
            <Building2 size={15} className="text-[#29C7F6]" />
            Government Intelligence
          </div>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#F5F7F8]">
            Air Quality Command Center
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64757d]">
            Monitor predicted pollution risks, prioritize intervention zones,
            and turn forecasts into actionable decisions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.025] px-3 py-2 text-xs text-[#8A9AA3]">
            <span className="h-2 w-2 rounded-full bg-[#35D07F]" />
            Data operational
          </div>

          <button className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.025] px-3 py-2 text-xs text-[#8A9AA3] transition-colors hover:bg-white/[0.05] hover:text-[#F5F7F8]">
            <RefreshCw size={14} />
            Refresh
          </button>
        </div>
      </section>

      <GovernmentStats />

      <div className="grid gap-5 xl:grid-cols-[1.35fr_0.85fr]">
        <TrendChart />
        <PolicySummary />
      </div>

      <HotspotTable />

      <div className="flex flex-col gap-2 rounded-xl border border-white/10 bg-[#101B20] px-5 py-4 text-xs text-[#64757d] sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Activity size={14} className="text-[#29C7F6]" />
          Predictive monitoring system
        </div>

        <span>
          Current interface is using demo data.
        </span>
      </div>
    </div>
  );
}

export default Government;