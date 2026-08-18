import { useState } from "react";

import ForecastHeader from "../components/forecast/ForecastHeader";
import ForecastTabs from "../components/forecast/ForecastTabs";
import ForecastChart from "../components/forecast/ForecastChart";
import PeakRisk from "../components/forecast/PeakRisk";
import EnvironmentalFactors from "../components/forecast/EnvironmentalFactors";

const forecastData = {
  24: [
    { time: "Now", aqi: 142 },
    { time: "12 PM", aqi: 151 },
    { time: "2 PM", aqi: 169 },
    { time: "4 PM", aqi: 187 },
    { time: "6 PM", aqi: 181 },
    { time: "8 PM", aqi: 164 },
    { time: "10 PM", aqi: 151 },
  ],

  48: [
    { time: "8 AM", aqi: 128 },
    { time: "12 PM", aqi: 143 },
    { time: "4 PM", aqi: 176 },
    { time: "8 PM", aqi: 159 },
    { time: "12 AM", aqi: 137 },
    { time: "4 AM", aqi: 119 },
    { time: "8 AM", aqi: 131 },
  ],

  72: [
    { time: "8 AM", aqi: 131 },
    { time: "12 PM", aqi: 148 },
    { time: "4 PM", aqi: 172 },
    { time: "8 PM", aqi: 155 },
    { time: "12 AM", aqi: 129 },
    { time: "4 AM", aqi: 116 },
    { time: "8 AM", aqi: 124 },
  ],
};

function Forecast() {
  const [selectedHours, setSelectedHours] = useState(24);

  return (
    <div className="mx-auto max-w-[1600px] space-y-8">
      <ForecastHeader />

      <div className="flex justify-start">
        <ForecastTabs
          selectedHours={selectedHours}
          onChange={setSelectedHours}
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.5fr_0.75fr]">
        <ForecastChart data={forecastData[selectedHours]} />
        <PeakRisk />
      </div>

      <EnvironmentalFactors />
    </div>
  );
}

export default Forecast;