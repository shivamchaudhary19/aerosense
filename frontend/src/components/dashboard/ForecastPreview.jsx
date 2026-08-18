import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const forecastData = [
  { time: "Now", aqi: 142 },
  { time: "12 PM", aqi: 151 },
  { time: "2 PM", aqi: 169 },
  { time: "4 PM", aqi: 187 },
  { time: "6 PM", aqi: 181 },
  { time: "8 PM", aqi: 164 },
  { time: "10 PM", aqi: 151 },
];

function ForecastPreview() {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#101B20] p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#64757d]">
            AQI Forecast
          </p>

          <h3 className="mt-1 text-lg font-semibold text-[#F5F7F8]">
            Next 24 hours
          </h3>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.025] px-3 py-1.5 text-xs text-[#8A9AA3]">
          Noida
        </div>
      </div>

      <div className="mt-6 h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={forecastData}
            margin={{ top: 10, right: 5, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="aqiGradient" x1="0" y1="0" x2="0" y2="1">
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
            />

            <Area
              type="monotone"
              dataKey="aqi"
              stroke="#29C7F6"
              strokeWidth={2}
              fill="url(#aqiGradient)"
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

export default ForecastPreview;