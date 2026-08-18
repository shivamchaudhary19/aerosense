import { useCallback, useEffect, useState } from "react";
import {
  BrainCircuit,
  Activity,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { useOutletContext } from "react-router-dom";

import ModelStatus from "../components/ai/ModelStatus";
import PredictionPipeline from "../components/ai/PredictionPipeline";
import ModelMetrics from "../components/ai/ModelMetrics";
import PredictionRun from "../components/ai/PredictionRun";
import { getPrediction } from "../services/api";

function AIModel() {
  const { location } = useOutletContext();

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const loadPrediction = useCallback(
    async (isRefresh = false) => {
      try {
        if (isRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError("");

        const data = await getPrediction(location);

        setPrediction(data);
      } catch (err) {
        setError(
          err?.message ||
            "Failed to load prediction model data."
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

    loadPrediction();
  }, [location, loadPrediction]);

  if (loading) {
    return (
      <div className="mx-auto flex min-h-[500px] max-w-[1600px] items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-[#29C7F6]" />

          <p className="mt-4 text-sm text-[#8A9AA3]">
            Loading AI prediction model...
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
                AI prediction unavailable
              </p>

              <p className="mt-2 text-sm leading-6 text-[#8A9AA3]">
                {error}
              </p>
            </div>

            <button
              type="button"
              onClick={() => loadPrediction(true)}
              disabled={refreshing}
              className="flex shrink-0 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs font-medium text-[#F5F7F8] transition-colors hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RefreshCw
                size={14}
                className={
                  refreshing ? "animate-spin" : ""
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
      <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs text-[#8A9AA3] sm:text-sm">
            <BrainCircuit
              size={15}
              className="shrink-0 text-[#29C7F6]"
            />

            <span>Predictive Intelligence</span>
          </div>

          <h1 className="mt-2 break-words text-2xl font-semibold tracking-tight text-[#F5F7F8] sm:text-3xl">
            AI Prediction Model
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64757d]">
            Understand how AeroSense transforms environmental
            signals into future pollution predictions and
            actionable intelligence.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.025] px-3 py-2 text-xs text-[#8A9AA3]">
            <span className="h-2 w-2 rounded-full bg-[#35D07F]" />
            Model operational
          </div>

          <button
            type="button"
            onClick={() => loadPrediction(true)}
            disabled={refreshing}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.025] px-3 py-2 text-xs text-[#8A9AA3] transition-colors hover:bg-white/[0.05] hover:text-[#F5F7F8] disabled:opacity-50"
          >
            <RefreshCw
              size={14}
              className={
                refreshing ? "animate-spin" : ""
              }
            />
            Refresh
          </button>

          <div className="flex items-center gap-2 rounded-lg border border-[#29C7F6]/10 bg-[#29C7F6]/[0.04] px-3 py-2 text-xs text-[#29C7F6]">
            <Sparkles size={14} />
            Predictive engine
          </div>
        </div>
      </section>

      <ModelStatus data={prediction} />

      <PredictionPipeline data={prediction} />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <ModelMetrics data={prediction} />
        <PredictionRun
          data={prediction}
          location={location}
        />
      </div>

      <section className="rounded-2xl border border-[#29C7F6]/15 bg-[#101B20] p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#29C7F6]/10 text-[#29C7F6]">
            <Activity size={19} />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#29C7F6]">
              Intelligence Layer
            </p>

            <h2 className="mt-1 text-lg font-semibold text-[#F5F7F8]">
              Prediction is only the beginning
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#64757d]">
              AeroSense uses predicted pollution conditions
              to power hotspot detection, smart alerts and
              government recommendations. The prediction
              engine remains separate from the action layer
              so forecasts and recommendations can be
              evaluated independently.
            </p>
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-2 rounded-xl border border-white/10 bg-[#101B20] px-4 py-4 text-xs text-[#64757d] sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <span>
          Live prediction output from the AeroSense ML
          backend.
        </span>

        <span className="text-[#8A9AA3]">
          Location: {location}
        </span>
      </div>
    </div>
  );
}

export default AIModel;