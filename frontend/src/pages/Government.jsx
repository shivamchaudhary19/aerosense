import { useCallback, useEffect, useState } from "react";
import {
  Building2,
  Activity,
  RefreshCw,
} from "lucide-react";
import { useOutletContext } from "react-router-dom";

import GovernmentStats from "../components/government/GovernmentStats";
import HotspotTable from "../components/government/HotspotTable";
import TrendChart from "../components/government/TrendChart";
import PolicySummary from "../components/government/PolicySummary";
import { getGovernmentSummary } from "../services/api";

function Government() {
  const { location } = useOutletContext();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const loadGovernmentData = useCallback(
    async (isRefresh = false) => {
      try {
        if (isRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError("");

        const result =
          await getGovernmentSummary(location);

        setData(result);
      } catch (err) {
        setError(
          err?.message ||
            "Failed to load government intelligence."
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [location]
  );

  useEffect(() => {
    if (!location) return;

    loadGovernmentData();
  }, [location, loadGovernmentData]);

  if (loading) {
    return (
      <div className="mx-auto flex min-h-[500px] max-w-[1600px] items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-[#29C7F6]" />

          <p className="mt-4 text-sm text-[#8A9AA3]">
            Loading government intelligence...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-[1600px]">
        <section className="rounded-2xl border border-[#FF5A5F]/20 bg-[#101B20] p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-medium text-[#FF5A5F]">
                Unable to load government data
              </p>

              <p className="mt-2 text-sm leading-6 text-[#8A9AA3]">
                {error}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                loadGovernmentData(true)
              }
              disabled={refreshing}
              className="flex shrink-0 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs font-medium text-[#F5F7F8] transition-colors hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RefreshCw
                size={14}
                className={
                  refreshing
                    ? "animate-spin"
                    : ""
                }
              />

              Retry
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1600px] space-y-6 sm:space-y-8">
      {/* Header */}
      <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs text-[#8A9AA3] sm:text-sm">
            <Building2
              size={15}
              className="shrink-0 text-[#29C7F6]"
            />

            <span>
              Government Intelligence
            </span>
          </div>

          <h1 className="mt-2 break-words text-2xl font-semibold tracking-tight text-[#F5F7F8] sm:text-3xl">
            {location} Air Quality Command Center
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64757d]">
            Monitor pollution risks, prioritize
            intervention zones, and turn forecasts
            into actionable decisions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.025] px-3 py-2 text-xs text-[#8A9AA3]">
            <span className="h-2 w-2 rounded-full bg-[#35D07F]" />

            Live data
          </div>

          <button
            type="button"
            onClick={() =>
              loadGovernmentData(true)
            }
            disabled={refreshing}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.025] px-3 py-2 text-xs text-[#8A9AA3] transition-colors hover:bg-white/[0.05] hover:text-[#F5F7F8] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw
              size={14}
              className={
                refreshing
                  ? "animate-spin"
                  : ""
              }
            />

            Refresh
          </button>
        </div>
      </section>

      {/* Stats */}
      <GovernmentStats data={data} />

      {/* Trend + policy */}
      <div className="grid gap-5 xl:grid-cols-[1.35fr_0.85fr]">
        <TrendChart data={data} />

        <PolicySummary data={data} />
      </div>

      {/* Hotspots */}
      <HotspotTable data={data} />

      {/* Footer status */}
      <div className="flex flex-col gap-2 rounded-xl border border-white/10 bg-[#101B20] px-4 py-4 text-xs text-[#64757d] sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div className="flex items-center gap-2">
          <Activity
            size={14}
            className="text-[#29C7F6]"
          />

          <span>
            Predictive monitoring system
          </span>
        </div>

        <span>
          {data?.source ||
            "CPCB / data.gov.in"}
        </span>
      </div>
    </div>
  );
}

export default Government;