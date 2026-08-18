const CPCB_API_URL =
  "https://api.data.gov.in/resource/3b01bcb8-0b14-4abf-b6f2-c1bfd384ba69";

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

  const normalized = String(city)
    .trim()
    .toLowerCase();

  return aliases[normalized] || String(city).trim();
}

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
    ([low, high]) =>
      value >= low && value <= high
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

function getCategory(aqi) {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Satisfactory";
  if (aqi <= 200) return "Moderate";
  if (aqi <= 300) return "Poor";
  if (aqi <= 400) return "Very Poor";
  return "Severe";
}

function getAverageValue(record) {
  return Number(
    record.avg_value ??
      record.pollutant_avg
  );
}

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

function calculateStationAQI(records) {
  const pollutants = {};

  for (const record of records) {
    const pollutant = normalizePollutantId(
      record.pollutant_id
    );

    if (!pollutant) {
      continue;
    }

    const value = getAverageValue(record);

    if (!Number.isFinite(value)) {
      continue;
    }

    pollutants[pollutant] = {
      value,
      station: record.station,
      lastUpdate: record.last_update,
      city: record.city,
      state: record.state,
      latitude: record.latitude,
      longitude: record.longitude,
    };
  }

  const subIndices = {};

  for (const [pollutant, data] of Object.entries(
    pollutants
  )) {
    let concentration = data.value;

    if (pollutant === "CO") {
      concentration = concentration / 1000;
    }

    const subIndex = calculateSubIndex(
      pollutant,
      concentration
    );

    if (subIndex !== null) {
      subIndices[pollutant] = subIndex;
    }
  }

  const available = Object.entries(subIndices);

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

  const firstPollutant =
    pollutants[primaryPollutant];

  return {
    aqi: highestSubIndex,

    category:
      getCategory(highestSubIndex),

    primaryPollutant,

    subIndices,

    pollutants,

    station:
      firstPollutant?.station || null,

    lastUpdate:
      firstPollutant?.lastUpdate || null,

    state:
      firstPollutant?.state || null,

    city:
      firstPollutant?.city || null,

    coordinates: {
      latitude:
        firstPollutant?.latitude || null,

      longitude:
        firstPollutant?.longitude || null,
    },
  };
}

/*
 * Calculate a representative city AQI from
 * all available monitoring stations.
 *
 * We use the median rather than the maximum.
 * Maximum is retained separately as the
 * highest-risk station.
 */
function calculateCityAQI(stationResults) {
  const sortedAQIs = stationResults
    .map((station) => station.aqi)
    .sort((a, b) => a - b);

  const middle =
    Math.floor(sortedAQIs.length / 2);

  let median;

  if (sortedAQIs.length % 2 === 0) {
    median =
      (sortedAQIs[middle - 1] +
        sortedAQIs[middle]) /
      2;
  } else {
    median = sortedAQIs[middle];
  }

  return Math.round(median);
}

async function getCPCBData(location) {
  if (!process.env.DATA_GOV_API_KEY) {
    throw new Error(
      "DATA_GOV_API_KEY is not configured"
    );
  }

  const city = normalizeCity(location);

  const url = new URL(CPCB_API_URL);

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

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `CPCB API request failed with status ${response.status}`
    );
  }

  const data = await response.json();

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
   * Group records by monitoring station.
   */
  const stations = new Map();

  for (const record of data.records) {
    const station = record.station;

    if (!station) {
      continue;
    }

    if (!stations.has(station)) {
      stations.set(station, []);
    }

    stations
      .get(station)
      .push(record);
  }

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

  if (stationResults.length === 0) {
    throw new Error(
      `Unable to calculate CPCB AQI for ${city}`
    );
  }

  /*
   * Sort stations from highest AQI to lowest.
   */
  stationResults.sort(
    (a, b) => b.aqi - a.aqi
  );

  /*
   * Highest-risk station.
   */
  const highestRisk =
    stationResults[0];

  /*
   * Representative city AQI.
   */
  const cityAQI =
    calculateCityAQI(stationResults);

  return {
    location: city,
    country: "IN",

    currentAQI: cityAQI,

    category:
      getCategory(cityAQI),

    primaryPollutant:
      highestRisk.primaryPollutant,

    methodology:
      "CPCB-style calculation from CPCB monitoring data using median station AQI",

    source:
      "Central Pollution Control Board / data.gov.in",

    highestRisk: {
      aqi: highestRisk.aqi,

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

    stationCount:
      stationResults.length,

    stations:
      stationResults,
  };
}

module.exports = {
  getCPCBData,
};