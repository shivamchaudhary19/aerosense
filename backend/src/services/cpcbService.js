const CPCB_API_URL =
  "https://api.data.gov.in/resource/3b01bcb8-0b14-4abf-b6f2-c1bfd384ba69";

/*
 * CPCB-style concentration → sub-index breakpoints.
 *
 * IMPORTANT:
 * These are used for our application-side calculation.
 * The raw CPCB monitoring observations remain the source data.
 */
const BREAKPOINTS = {
  "PM2.5": [
    [0, 30, 0, 50],
    [30, 60, 50, 100],
    [60, 90, 100, 200],
    [90, 120, 200, 300],
    [120, 250, 300, 400],
    [250, Infinity, 400, 500],
  ],

  PM10: [
    [0, 50, 0, 50],
    [50, 100, 50, 100],
    [100, 250, 100, 200],
    [250, 350, 200, 300],
    [350, 430, 300, 400],
    [430, Infinity, 400, 500],
  ],

  NO2: [
    [0, 40, 0, 50],
    [40, 80, 50, 100],
    [80, 180, 100, 200],
    [180, 280, 200, 300],
    [280, 400, 300, 400],
    [400, Infinity, 400, 500],
  ],

  OZONE: [
    [0, 50, 0, 50],
    [50, 100, 50, 100],
    [100, 168, 100, 200],
    [168, 208, 200, 300],
    [208, 748, 300, 400],
    [748, Infinity, 400, 500],
  ],

  SO2: [
    [0, 40, 0, 50],
    [40, 80, 50, 100],
    [80, 380, 100, 200],
    [380, 800, 200, 300],
    [800, 1600, 300, 400],
    [1600, Infinity, 400, 500],
  ],

  NH3: [
    [0, 200, 0, 50],
    [200, 400, 50, 100],
    [400, 800, 100, 200],
    [800, 1200, 200, 300],
    [1200, 1800, 300, 400],
    [1800, Infinity, 400, 500],
  ],

  CO: [
    [0, 1, 0, 50],
    [1, 2, 50, 100],
    [2, 10, 100, 200],
    [10, 17, 200, 300],
    [17, 34, 300, 400],
    [34, Infinity, 400, 500],
  ],
};

const POLLUTANTS = [
  "PM2.5",
  "PM10",
  "NO2",
  "OZONE",
  "SO2",
  "NH3",
  "CO",
];

/*
 * City aliases.
 */
function normalizeCity(city) {
  const aliases = {
    delhi: "Delhi",
    "new delhi": "Delhi",

    noida: "Noida",
    "greater noida": "Greater Noida",

    mumbai: "Mumbai",
    bombay: "Mumbai",

    bengaluru: "Bengaluru",
    bangalore: "Bengaluru",

    kolkata: "Kolkata",
    calcutta: "Kolkata",

    chennai: "Chennai",
    madras: "Chennai",

    hyderabad: "Hyderabad",

    pune: "Pune",

    ahmedabad: "Ahmedabad",

    jaipur: "Jaipur",

    lucknow: "Lucknow",

    kanpur: "Kanpur",

    ghaziabad: "Ghaziabad",

    gurugram: "Gurugram",
    gurgaon: "Gurugram",
  };

  const normalized = String(city || "")
    .trim()
    .toLowerCase();

  return aliases[normalized] || String(city || "").trim();
}

/*
 * Convert a concentration to its sub-index.
 */
function calculateSubIndex(pollutant, concentration) {
  const value = Number(concentration);

  if (!Number.isFinite(value) || value < 0) {
    return null;
  }

  const ranges = BREAKPOINTS[pollutant];

  if (!ranges) {
    return null;
  }

  const range = ranges.find(
    ([low, high]) => value >= low && value <= high
  );

  if (!range) {
    return 500;
  }

  const [
    concentrationLow,
    concentrationHigh,
    indexLow,
    indexHigh,
  ] = range;

  if (concentrationHigh === Infinity) {
    return 500;
  }

  const index =
    ((indexHigh - indexLow) /
      (concentrationHigh - concentrationLow)) *
      (value - concentrationLow) +
    indexLow;

  return Math.round(
    Math.max(0, Math.min(500, index))
  );
}

/*
 * AQI category.
 */
function getCategory(aqi) {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Satisfactory";
  if (aqi <= 200) return "Moderate";
  if (aqi <= 300) return "Poor";
  if (aqi <= 400) return "Very Poor";

  return "Severe";
}

/*
 * Safely extract CPCB average concentration.
 */
function getAverageValue(record) {
  return Number(
    record.avg_value ??
      record.pollutant_avg
  );
}

/*
 * Normalize pollutant IDs returned by data.gov.in.
 */
function normalizePollutantId(pollutantId) {
  if (!pollutantId) {
    return null;
  }

  const value = String(pollutantId)
    .trim()
    .toUpperCase();

  if (value === "PM2.5") return "PM2.5";
  if (value === "PM10") return "PM10";
  if (value === "NO2") return "NO2";
  if (value === "O3") return "OZONE";
  if (value === "OZONE") return "OZONE";
  if (value === "SO2") return "SO2";
  if (value === "NH3") return "NH3";
  if (value === "CO") return "CO";

  return null;
}

/*
 * Normalize CO.
 *
 * CPCB dataset commonly exposes CO in µg/m³.
 * Our breakpoint table expects mg/m³.
 */
function normalizeConcentration(
  pollutant,
  value
) {
  if (pollutant === "CO") {
    return value / 1000;
  }

  return value;
}

/*
 * Calculate AQI for one monitoring station.
 */
function calculateStationAQI(records) {
  const pollutants = {};

  for (const record of records) {
    const pollutant =
      normalizePollutantId(
        record.pollutant_id
      );

    if (!pollutant) {
      continue;
    }

    const value =
      getAverageValue(record);

    if (!Number.isFinite(value)) {
      continue;
    }

    pollutants[pollutant] = {
      value,

      station: record.station || null,

      lastUpdate:
        record.last_update || null,

      city: record.city || null,

      state: record.state || null,

      latitude:
        record.latitude || null,

      longitude:
        record.longitude || null,
    };
  }

  const subIndices = {};

  for (const pollutant of POLLUTANTS) {
    const pollutantData =
      pollutants[pollutant];

    if (!pollutantData) {
      continue;
    }

    const normalizedValue =
      normalizeConcentration(
        pollutant,
        pollutantData.value
      );

    const subIndex =
      calculateSubIndex(
        pollutant,
        normalizedValue
      );

    if (subIndex !== null) {
      subIndices[pollutant] =
        subIndex;
    }
  }

  const available =
    Object.entries(subIndices);

  if (available.length === 0) {
    return null;
  }

  const [
    primaryPollutant,
    highestSubIndex,
  ] = available.reduce(
    (highest, current) =>
      current[1] > highest[1]
        ? current
        : highest
  );

  const primaryData =
    pollutants[primaryPollutant];

  return {
    aqi: highestSubIndex,

    category:
      getCategory(highestSubIndex),

    primaryPollutant,

    subIndices,

    pollutants,

    station:
      primaryData?.station || null,

    lastUpdate:
      primaryData?.lastUpdate || null,

    state:
      primaryData?.state || null,

    city:
      primaryData?.city || null,

    coordinates: {
      latitude:
        primaryData?.latitude || null,

      longitude:
        primaryData?.longitude || null,
    },
  };
}

/*
 * Median helper.
 */
function calculateMedian(values) {
  if (!values.length) {
    return null;
  }

  const sorted = [...values].sort(
    (a, b) => a - b
  );

  const middle =
    Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (
      (sorted[middle - 1] +
        sorted[middle]) /
      2
    );
  }

  return sorted[middle];
}

/*
 * Calculate representative city AQI.
 *
 * Median is deliberately used instead of maximum
 * because one extreme station should not automatically
 * represent the entire city.
 */
function calculateCityAQI(
  stationResults
) {
  const values =
    stationResults
      .map((station) => station.aqi)
      .filter(Number.isFinite);

  return Math.round(
    calculateMedian(values)
  );
}

/*
 * Calculate average station AQI.
 */
function calculateAverageAQI(
  stationResults
) {
  if (!stationResults.length) {
    return null;
  }

  const total =
    stationResults.reduce(
      (sum, station) =>
        sum + station.aqi,
      0
    );

  return Math.round(
    total / stationResults.length
  );
}

/*
 * Create a pollutant summary across stations.
 */
function createPollutantSummary(
  stationResults
) {
  const summary = {};

  for (const pollutant of POLLUTANTS) {
    const observations =
      stationResults
        .map(
          (station) =>
            station.pollutants?.[
              pollutant
            ]
        )
        .filter(Boolean);

    if (!observations.length) {
      continue;
    }

    const values =
      observations
        .map(
          (item) =>
            Number(item.value)
        )
        .filter(Number.isFinite);

    if (!values.length) {
      continue;
    }

    const average =
      values.reduce(
        (sum, value) =>
          sum + value,
        0
      ) / values.length;

    const highest =
      Math.max(...values);

    const lowest =
      Math.min(...values);

    summary[pollutant] = {
      average: Number(
        average.toFixed(2)
      ),

      highest,

      lowest,

      stationCount:
        observations.length,
    };
  }

  return summary;
}

/*
 * Create a clean station representation
 * for frontend consumption.
 */
function formatStation(
  station,
  index
) {
  return {
    id: `${normalizeStationId(
      station.station
    )}-${index}`,

    rank: index + 1,

    station:
      station.station,

    aqi:
      station.aqi,

    category:
      station.category,

    primaryPollutant:
      station.primaryPollutant,

    subIndices:
      station.subIndices,

    pollutants:
      station.pollutants,

    lastUpdate:
      station.lastUpdate,

    state:
      station.state,

    city:
      station.city,

    coordinates:
      station.coordinates,

    latitude:
      Number(
        station.coordinates?.latitude
      ) || null,

    longitude:
      Number(
        station.coordinates?.longitude
      ) || null,
  };
}

/*
 * Stable station ID for frontend usage.
 */
function normalizeStationId(name) {
  return String(name || "station")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/*
 * Main CPCB service.
 */
async function getCPCBData(location) {
  if (!process.env.DATA_GOV_API_KEY) {
    throw new Error(
      "DATA_GOV_API_KEY is not configured"
    );
  }

  const city =
    normalizeCity(location);

  if (!city) {
    throw new Error(
      "Location is required"
    );
  }

  const url =
    new URL(CPCB_API_URL);

  url.searchParams.set(
    "api-key",
    process.env.DATA_GOV_API_KEY
  );

  url.searchParams.set(
    "format",
    "json"
  );

  url.searchParams.set(
    "filters[city]",
    city
  );

  url.searchParams.set(
    "limit",
    "500"
  );

  const response =
    await fetch(url);

  if (!response.ok) {
    throw new Error(
      `CPCB API request failed with status ${response.status}`
    );
  }

  const data =
    await response.json();

  if (!Array.isArray(data.records)) {
    throw new Error(
      "Invalid CPCB API response"
    );
  }

  if (data.records.length === 0) {
    throw new Error(
      `No CPCB monitoring data found for ${city}`
    );
  }

  /*
   * Group observations by station.
   */
  const stations =
    new Map();

  for (const record of data.records) {
    const station =
      record.station;

    if (!station) {
      continue;
    }

    if (!stations.has(station)) {
      stations.set(
        station,
        []
      );
    }

    stations
      .get(station)
      .push(record);
  }

  /*
   * Calculate AQI independently for
   * every monitoring station.
   */
  const stationResults = [];

  for (const [
    station,
    records,
  ] of stations.entries()) {
    const result =
      calculateStationAQI(records);

    if (!result) {
      continue;
    }

    stationResults.push({
      station,
      ...result,
    });
  }

  if (!stationResults.length) {
    throw new Error(
      `Unable to calculate CPCB AQI for ${city}`
    );
  }

  /*
   * Highest AQI first.
   */
  stationResults.sort(
    (a, b) => b.aqi - a.aqi
  );

  const highestRisk =
    stationResults[0];

  const lowestRisk =
    stationResults[
      stationResults.length - 1
    ];

  /*
   * Representative city AQI.
   */
  const cityAQI =
    calculateCityAQI(
      stationResults
    );

  const averageAQI =
    calculateAverageAQI(
      stationResults
    );

  /*
   * Format station data for
   * dashboard / heatmap / alerts.
   */
  const formattedStations =
    stationResults.map(
      (station, index) =>
        formatStation(
          station,
          index
        )
    );

  return {
    location: city,

    country: "IN",

    currentAQI:
      cityAQI,

    category:
      getCategory(cityAQI),

    primaryPollutant:
      highestRisk.primaryPollutant,

    source:
      "Central Pollution Control Board / data.gov.in",

    methodology:
      "CPCB-style calculation from CPCB monitoring data using median station AQI",

    stationCount:
      formattedStations.length,

    averageAQI,

    highestRisk: {
      aqi:
        highestRisk.aqi,

      category:
        highestRisk.category,

      station:
        highestRisk.station,

      primaryPollutant:
        highestRisk.primaryPollutant,

      lastUpdate:
        highestRisk.lastUpdate,

      coordinates:
        highestRisk.coordinates,
    },

    lowestRisk: {
      aqi:
        lowestRisk.aqi,

      category:
        lowestRisk.category,

      station:
        lowestRisk.station,

      primaryPollutant:
        lowestRisk.primaryPollutant,

      lastUpdate:
        lowestRisk.lastUpdate,

      coordinates:
        lowestRisk.coordinates,
    },

    pollutantSummary:
      createPollutantSummary(
        stationResults
      ),

    stations:
      formattedStations,
  };
}

module.exports = {
  getCPCBData,
  calculateSubIndex,
  calculateStationAQI,
  calculateCityAQI,
  getCategory,
};