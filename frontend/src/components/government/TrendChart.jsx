import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const trendData = [
  { time: "8 AM", aqi: 118 },
  { time: "10 AM", aqi: 126 },
  { time: "12 PM", aqi: 139 },
  { time: "2 PM", aqi: 151 },
  { time: "4 PM", aqi: 178 },
  { time: "6 PM", aqi: 187 },
  { time: "8 PM", aqi: 174 },
  { time: "10 PM", aqi: 158 },
];

function TrendChart() {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#101B20] p-5 sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#64757d]">
            City Trend
          </p>

          <h2 className="mt-1 text-lg font-semibold text-[#F5F7F8]">
            Predicted AQI trajectory
          </h2>
        </div>

        <span className="w-fit rounded-lg border border-white/10 bg-white/[0.025] px-3 py-1.5 text-xs text-[#8A9AA3]">
          Next 24 hours
        </span>
      </div>

      <div className="mt-6 h-[280px] sm:h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={trendData}
            margin={{
              top: 10,
              right: 5,
              left: -20,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient
                id="governmentTrend"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#29C7F6"
                  stopOpacity={0.24}
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
            />

            <YAxis
              domain={[50, 210]}
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
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "10px",
              }}
              labelStyle={{
                color: "#8A9AA3",
              }}
              itemStyle={{
                color: "#29C7F6",
              }}
              formatter={(value) => [`${value} AQI`, "Predicted"]}
            />

            <Area
              type="monotone"
              dataKey="aqi"
              stroke="#29C7F6"
              strokeWidth={2.5}
              fill="url(#governmentTrend)"
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
    </section>
  );
}

export default TrendChart;