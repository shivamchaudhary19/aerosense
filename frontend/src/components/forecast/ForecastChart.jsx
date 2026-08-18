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

function ForecastChart({ data }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#101B20] p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#64757d]">
            Predicted AQI
          </p>

          <h2 className="mt-1 text-lg font-semibold text-[#F5F7F8]">
            Air quality trajectory
          </h2>
        </div>

        <div className="rounded-lg border border-[#FFB547]/20 bg-[#FFB547]/10 px-3 py-1.5 text-xs font-medium text-[#FFB547]">
          Peak: 187 AQI
        </div>
      </div>

      <div className="mt-8 h-[360px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
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
                fontSize: 11,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              domain={[50, 220]}
              tick={{
                fill: "#64757d",
                fontSize: 11,
              }}
              axisLine={false}
              tickLine={false}
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
              }}
              labelStyle={{
                color: "#8A9AA3",
                marginBottom: "4px",
              }}
              itemStyle={{
                color: "#29C7F6",
              }}
              formatter={(value) => [`${value} AQI`, "Prediction"]}
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
      </div>

      <div className="mt-4 flex items-center gap-6 text-xs text-[#64757d]">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#29C7F6]" />
          Predicted AQI
        </div>

        <div className="flex items-center gap-2">
          <span className="h-px w-4 border-t border-dashed border-[#FFB547]" />
          Elevated-risk threshold
        </div>
      </div>
    </section>
  );
}

export default ForecastChart;