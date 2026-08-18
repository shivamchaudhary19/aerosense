import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function ForecastPreview({ data }) {
  const forecastData =
    Array.isArray(data?.predictions)
      ? data.predictions
          .map((item) => {
            const aqi = Number(
              item?.estimatedAQI
            );

            return {
              time: formatTime(item?.dateTime),
              aqi: Number.isFinite(aqi)
                ? Math.round(aqi)
                : null,
              category:
                item?.category || "Unknown",
            };
          })
          .filter(
            (item) => item.aqi !== null
          )
      : [];

  const peakAQI =
    forecastData.length > 0
      ? Math.max(
          ...forecastData.map(
            (item) => item.aqi
          )
        )
      : null;

  return (
    <section className="min-w-0 rounded-2xl border border-white/10 bg-[#101B20] p-4 sm:p-5 lg:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#64757d] sm:text-xs">
            AQI Forecast
          </p>

          <h3 className="mt-1 text-base font-semibold text-[#F5F7F8] sm:text-lg">
            Next 24 hours
          </h3>

          <p className="mt-1 text-xs text-[#64757d]">
            Predicted air-quality trend
          </p>
        </div>

        <div className="flex w-fit max-w-full items-center gap-2 rounded-lg border border-white/10 bg-white/[0.025] px-3 py-1.5 text-xs text-[#8A9AA3]">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#29C7F6]" />

          <span className="max-w-[180px] truncate">
            {data?.location?.name || "—"}
          </span>
        </div>
      </div>

      <div className="mt-5 h-[230px] w-full min-w-0 sm:mt-6 sm:h-[260px]">
        {forecastData.length > 0 ? (
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <AreaChart
              data={forecastData}
              margin={{
                top: 10,
                right: 8,
                left: -20,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient
                  id="aqiForecastGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#29C7F6"
                    stopOpacity={0.25}
                  />

                  <stop
                    offset="100%"
                    stopColor="#29C7F6"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                stroke="rgba(255,255,255,0.06)"
                vertical={false}
              />

              <XAxis
                dataKey="time"
                interval="preserveStartEnd"
                minTickGap={20}
                tick={{
                  fill: "#64757d",
                  fontSize: 10,
                }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                domain={[0, "auto"]}
                width={40}
                tick={{
                  fill: "#64757d",
                  fontSize: 10,
                }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                contentStyle={{
                  background: "#101B20",
                  border:
                    "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  color: "#F5F7F8",
                  fontSize: "12px",
                }}
                labelStyle={{
                  color: "#8A9AA3",
                  marginBottom: "4px",
                }}
                formatter={(
                  value,
                  name,
                  props
                ) => [
                  `${value} AQI`,
                  props?.payload?.category ||
                    "Predicted AQI",
                ]}
              />

              <Area
                type="monotone"
                dataKey="aqi"
                stroke="#29C7F6"
                strokeWidth={2}
                fill="url(#aqiForecastGradient)"
                dot={false}
                activeDot={{
                  r: 5,
                  fill: "#29C7F6",
                  stroke: "#071014",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 text-center text-sm text-[#64757d]">
            Forecast data unavailable
          </div>
        )}
      </div>

      {forecastData.length > 0 && (
        <div className="mt-4 flex flex-col gap-2 border-t border-white/[0.07] pt-4 text-[10px] text-[#64757d] sm:flex-row sm:items-center sm:justify-between sm:text-[11px]">
          <span>
            {forecastData.length} forecast points
          </span>

          <span>
            Peak forecast:{" "}
            <span className="font-medium text-[#FFB547]">
              {peakAQI}
            </span>{" "}
            AQI
          </span>
        </div>
      )}
    </section>
  );
}

function formatTime(dateTime) {
  if (!dateTime) {
    return "—";
  }

  const raw = String(dateTime);

  const date = new Date(
    raw.includes("T")
      ? raw
      : raw.replace(" ", "T")
  );

  if (Number.isNaN(date.getTime())) {
    return raw;
  }

  return date.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export default ForecastPreview;