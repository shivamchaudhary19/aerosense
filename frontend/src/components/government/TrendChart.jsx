import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function TrendChart({ data }) {
  const trendData = getTrendData(data);

  return (
    <section className="min-w-0 rounded-2xl border border-white/10 bg-[#101B20] p-4 sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#64757d]">
            City Trend
          </p>

          <h2 className="mt-1 text-lg font-semibold text-[#F5F7F8]">
            Predicted AQI trajectory
          </h2>
        </div>

        <span className="w-fit shrink-0 rounded-lg border border-white/10 bg-white/[0.025] px-3 py-1.5 text-xs text-[#8A9AA3]">
          Next 24 hours
        </span>
      </div>

      <div className="mt-5 h-[260px] w-full min-w-0 sm:mt-6 sm:h-[320px]">
        {trendData.length > 0 ? (
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
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
                minTickGap={12}
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

              <Tooltip
                contentStyle={{
                  background: "#101B20",
                  border:
                    "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                }}
                labelStyle={{
                  color: "#8A9AA3",
                }}
                itemStyle={{
                  color: "#29C7F6",
                }}
                formatter={(value) => [
                  `${value} AQI`,
                  "Predicted",
                ]}
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
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-[#64757d]">
            Forecast trend unavailable
          </div>
        )}
      </div>
    </section>
  );
}

function getTrendData(data) {
  const candidates = [
    data?.trend,
    data?.trendData,
    data?.forecast,
    data?.predictions,
    data?.prediction?.predictions,
  ];

  const source =
    candidates.find(Array.isArray) || [];

  return source
    .map((item, index) => {
      const aqi = Number(
        item?.aqi ??
          item?.estimatedAQI ??
          item?.predictedAQI ??
          item?.value
      );

      if (!Number.isFinite(aqi)) {
        return null;
      }

      return {
        time:
          item?.time ??
          formatTime(
            item?.dateTime ??
              item?.timestamp
          ) ??
          `Point ${index + 1}`,
        aqi,
      };
    })
    .filter(Boolean);
}

function formatTime(value) {
  if (!value) return null;

  const date = new Date(
    String(value).replace(
      " ",
      "T"
    )
  );

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleTimeString(
    "en-IN",
    {
      hour: "numeric",
      minute: "2-digit",
    }
  );
}

export default TrendChart;