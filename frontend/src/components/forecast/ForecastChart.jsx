import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

function ForecastChart({ data = [], selectedHours = 24 }) {
  const peakAQI =
    data.length > 0
      ? Math.max(
          ...data.map((item) => Number(item.aqi) || 0)
        )
      : null;

  return (
    <section className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#101B20] p-4 sm:p-5 lg:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#64757d] sm:text-xs">
            Predicted AQI
          </p>

          <h2 className="mt-1 text-base font-semibold text-[#F5F7F8] sm:text-lg">
            Air quality trajectory
          </h2>

          <p className="mt-1 text-xs leading-5 text-[#64757d]">
            Estimated pollution levels over the selected forecast period.
          </p>
        </div>

        {peakAQI !== null && (
          <div className="w-fit shrink-0 rounded-lg border border-[#FFB547]/20 bg-[#FFB547]/10 px-3 py-1.5 text-xs font-medium text-[#FFB547]">
            Peak: {peakAQI} AQI
          </div>
        )}
      </div>

      <div className="mt-6 h-[280px] w-full sm:h-[330px] lg:h-[360px]">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: -15,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient
                  id="forecastGradient"
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
                tick={{
                  fill: "#64757d",
                  fontSize: 10,
                }}
                axisLine={false}
                tickLine={false}
                minTickGap={18}
              />

              <YAxis
                domain={[0, "auto"]}
                tick={{
                  fill: "#64757d",
                  fontSize: 10,
                }}
                axisLine={false}
                tickLine={false}
                width={35}
              />

              <ReferenceLine
                y={150}
                stroke="#FFB547"
                strokeDasharray="5 5"
                strokeOpacity={0.5}
              />

              <Tooltip
                contentStyle={{
                  background: "#101B20",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  color: "#F5F7F8",
                }}
                labelStyle={{
                  color: "#8A9AA3",
                  marginBottom: "4px",
                }}
                itemStyle={{
                  color: "#29C7F6",
                }}
                formatter={(value) => [
                  `${value} AQI`,
                  "Prediction",
                ]}
              />

              <Area
                type="monotone"
                dataKey="aqi"
                stroke="#29C7F6"
                strokeWidth={2.5}
                fill="url(#forecastGradient)"
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
          <div className="flex h-full items-center justify-center text-sm text-[#64757d]">
            No forecast data available
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] text-[#64757d] sm:text-xs">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#29C7F6]" />
          Predicted AQI
        </div>

        <div className="flex items-center gap-2">
          <span className="h-px w-4 border-t border-dashed border-[#FFB547]" />
          Elevated-risk threshold
        </div>

        <span className="ml-auto">
          {selectedHours}H view
        </span>
      </div>
    </section>
  );
}

export default ForecastChart;