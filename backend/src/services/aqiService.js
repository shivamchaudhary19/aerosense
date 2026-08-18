const breakpoints = {
  pm10: [
    [0, 50, 0, 50],
    [51, 100, 51, 100],
    [101, 250, 101, 200],
    [251, 350, 201, 300],
    [351, 430, 301, 400],
    [431, Infinity, 401, 500],
  ],

  pm2_5: [
    [0, 30, 0, 50],
    [31, 60, 51, 100],
    [61, 90, 101, 200],
    [91, 120, 201, 300],
    [121, 250, 301, 400],
    [251, Infinity, 401, 500],
  ],

  no2: [
    [0, 40, 0, 50],
    [41, 80, 51, 100],
    [81, 180, 101, 200],
    [181, 280, 201, 300],
    [281, 400, 301, 400],
    [401, Infinity, 401, 500],
  ],

  o3: [
    [0, 50, 0, 50],
    [51, 100, 51, 100],
    [101, 168, 101, 200],
    [169, 208, 201, 300],
    [209, 748, 301, 400],
    [749, Infinity, 401, 500],
  ],

  co: [
    [0, 1, 0, 50],
    [1.1, 2, 51, 100],
    [2.1, 10, 101, 200],
    [10.1, 17, 201, 300],
    [17.1, 34, 301, 400],
    [34.1, Infinity, 401, 500],
  ],

  so2: [
    [0, 40, 0, 50],
    [41, 80, 51, 100],
    [81, 380, 101, 200],
    [381, 800, 201, 300],
    [801, 1600, 301, 400],
    [1601, Infinity, 401, 500],
  ],
};

function calculateSubIndex(concentration, ranges) {
  if (concentration === null || concentration === undefined) {
    return null;
  }

  const value = Number(concentration);

  if (!Number.isFinite(value) || value < 0) {
    return null;
  }

  const range = ranges.find(
    ([cLow, cHigh]) => value >= cLow && value <= cHigh
  );

  if (!range) {
    return null;
  }

  const [cLow, cHigh, iLow, iHigh] = range;

  if (cHigh === Infinity) {
    return 500;
  }

  const subIndex =
    ((iHigh - iLow) / (cHigh - cLow)) *
      (value - cLow) +
    iLow;

  return Math.round(subIndex);
}

function getAQICategory(aqi) {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Satisfactory";
  if (aqi <= 200) return "Moderately Polluted";
  if (aqi <= 300) return "Poor";
  if (aqi <= 400) return "Very Poor";
  return "Severe";
}

function calculateAQI(components) {
  const pollutants = {
    pm10: components.pm10,
    pm2_5: components.pm2_5,
    no2: components.no2,
    o3: components.o3,
    so2: components.so2,
    co: components.co / 1000,
  };

  const subIndices = {};

  for (const [pollutant, concentration] of Object.entries(
    pollutants
  )) {
    const subIndex = calculateSubIndex(
      concentration,
      breakpoints[pollutant]
    );

    if (subIndex !== null) {
      subIndices[pollutant] = subIndex;
    }
  }

  const entries = Object.entries(subIndices);

  if (entries.length === 0) {
    throw new Error("Insufficient pollutant data to calculate AQI");
  }

  const [primaryPollutant, aqi] = entries.reduce(
    (highest, current) =>
      current[1] > highest[1] ? current : highest
  );

  return {
    aqi,
    category: getAQICategory(aqi),
    primaryPollutant,
    subIndices,
  };
}

module.exports = {
  calculateAQI,
};