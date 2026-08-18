const { getCurrentEnvironment } = require("./environmentService");

function createAlerts(environment) {
  const { airQuality } = environment;
  const alerts = [];

  if (airQuality.aqi > 300) {
    alerts.push({
      severity: "critical",
      title: "Severe Air Quality",
      message: "Air pollution is at a severe level. Avoid prolonged outdoor exposure.",
      pollutant: airQuality.primaryPollutant,
    });
  } else if (airQuality.aqi > 200) {
    alerts.push({
      severity: "high",
      title: "Poor Air Quality",
      message: "Air pollution is high. Limit prolonged outdoor activities.",
      pollutant: airQuality.primaryPollutant,
    });
  } else if (airQuality.aqi > 100) {
    alerts.push({
      severity: "moderate",
      title: "Elevated Air Pollution",
      message: "Air quality is unhealthy for sensitive groups. Consider reducing prolonged outdoor exposure.",
      pollutant: airQuality.primaryPollutant,
    });
  }

  if (airQuality.pm2_5 > 60) {
    alerts.push({
      severity: "high",
      title: "High PM2.5",
      message: "Fine particulate matter is elevated and may affect respiratory health.",
      pollutant: "pm2_5",
      value: airQuality.pm2_5,
    });
  }

  if (airQuality.pm10 > 100) {
    alerts.push({
      severity: "moderate",
      title: "High PM10",
      message: "Coarse particulate matter levels are elevated.",
      pollutant: "pm10",
      value: airQuality.pm10,
    });
  }

  if (airQuality.no2 > 80) {
    alerts.push({
      severity: "moderate",
      title: "Elevated NO₂",
      message: "Nitrogen dioxide levels are elevated.",
      pollutant: "no2",
      value: airQuality.no2,
    });
  }

  if (airQuality.o3 > 100) {
    alerts.push({
      severity: "moderate",
      title: "Elevated Ozone",
      message: "Ground-level ozone concentration is elevated.",
      pollutant: "o3",
      value: airQuality.o3,
    });
  }

  return alerts;
}

async function getAlerts(location) {
  const environment = await getCurrentEnvironment(location);

  return {
    location: environment.location,
    currentAQI: environment.airQuality.aqi,
    category: environment.airQuality.category,
    alerts: createAlerts(environment),
  };
}

module.exports = {
  getAlerts,
};