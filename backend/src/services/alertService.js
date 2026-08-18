const { getCPCBData } = require("./cpcbService");

function createAlerts(airQuality) {
  const alerts = [];

  const {
    aqi,
    primaryPollutant,
    pm2_5,
    pm10,
    no2,
    o3,
    so2,
    nh3,
    co,
  } = airQuality;

  // Overall AQI alerts
  if (aqi > 400) {
    alerts.push({
      severity: "critical",
      title: "Severe air pollution",
      message:
        "Air quality is severely polluted. Avoid outdoor exposure and follow local health advisories.",
      pollutant: primaryPollutant,
      aqi,
    });
  } else if (aqi > 300) {
    alerts.push({
      severity: "high",
      title: "Very poor air quality",
      message:
        "Air pollution is very high. Sensitive groups should avoid prolonged outdoor exposure.",
      pollutant: primaryPollutant,
      aqi,
    });
  } else if (aqi > 200) {
    alerts.push({
      severity: "high",
      title: "Poor air quality",
      message:
        "Air pollution is high. Consider reducing prolonged outdoor activity.",
      pollutant: primaryPollutant,
      aqi,
    });
  } else if (aqi > 100) {
    alerts.push({
      severity: "moderate",
      title: "Moderately polluted air",
      message:
        "Air quality has entered the moderately polluted range. Sensitive individuals should consider reducing prolonged outdoor exposure.",
      pollutant: primaryPollutant,
      aqi,
    });
  }

  // PM2.5
  if (Number.isFinite(pm2_5) && pm2_5 > 60) {
    alerts.push({
      severity: "moderate",
      title: "Elevated PM2.5",
      message:
        "Fine particulate matter is elevated and may affect respiratory health.",
      pollutant: "PM2.5",
      value: pm2_5,
      unit: "µg/m³",
    });
  }

  // PM10
  if (Number.isFinite(pm10) && pm10 > 100) {
    alerts.push({
      severity: "moderate",
      title: "Elevated PM10",
      message:
        "Coarse particulate matter is elevated. Consider limiting prolonged outdoor exposure.",
      pollutant: "PM10",
      value: pm10,
      unit: "µg/m³",
    });
  }

  // Ozone
  if (Number.isFinite(o3) && o3 > 100) {
    alerts.push({
      severity: "moderate",
      title: "Elevated ozone",
      message:
        "Ground-level ozone is elevated. Consider reducing strenuous outdoor activity.",
      pollutant: "OZONE",
      value: o3,
      unit: "µg/m³",
    });
  }

  // NO2
  if (Number.isFinite(no2) && no2 > 80) {
    alerts.push({
      severity: "moderate",
      title: "Elevated nitrogen dioxide",
      message:
        "NO₂ levels are elevated and may indicate increased combustion-related pollution.",
      pollutant: "NO2",
      value: no2,
      unit: "µg/m³",
    });
  }

  // SO2
  if (Number.isFinite(so2) && so2 > 80) {
    alerts.push({
      severity: "moderate",
      title: "Elevated sulfur dioxide",
      message:
        "SO₂ levels are elevated. Sensitive individuals should limit prolonged outdoor exposure.",
      pollutant: "SO2",
      value: so2,
      unit: "µg/m³",
    });
  }

  // NH3
  if (Number.isFinite(nh3) && nh3 > 400) {
    alerts.push({
      severity: "moderate",
      title: "Elevated ammonia",
      message:
        "Ammonia levels are elevated. Sensitive individuals should limit prolonged outdoor exposure.",
      pollutant: "NH3",
      value: nh3,
      unit: "µg/m³",
    });
  }

  // CO
  if (Number.isFinite(co) && co > 10000) {
    alerts.push({
      severity: "moderate",
      title: "Elevated carbon monoxide",
      message:
        "Carbon monoxide levels are elevated and may indicate increased combustion-related pollution.",
      pollutant: "CO",
      value: co,
      unit: "µg/m³",
    });
  }

  return alerts;
}

async function getAlerts(location) {
  if (!location) {
    throw new Error("Location is required");
  }

  const cpcb = await getCPCBData(location);

  const highestRisk = cpcb.highestRisk;
  const primaryStation = cpcb.stations?.find(
    (station) =>
      station.station === highestRisk?.station
  );

  const pollutants =
    primaryStation?.pollutants || {};

  const alerts = createAlerts({
    aqi: cpcb.currentAQI,
    primaryPollutant: cpcb.primaryPollutant,

    pm2_5: pollutants["PM2.5"]?.value,
    pm10: pollutants.PM10?.value,
    no2: pollutants.NO2?.value,
    o3: pollutants.OZONE?.value,
    so2: pollutants.SO2?.value,
    nh3: pollutants.NH3?.value,
    co: pollutants.CO?.value,
  });

  return {
    location: cpcb.location,
    country: cpcb.country,

    currentAQI: cpcb.currentAQI,
    category: cpcb.category,
    primaryPollutant: cpcb.primaryPollutant,

    station: highestRisk?.station || null,

    stationAQI: highestRisk?.aqi || null,

    stationCategory:
      highestRisk?.category || null,

    stationLastUpdate:
      highestRisk?.lastUpdate || null,

    stationCoordinates:
      highestRisk?.coordinates || null,

    stationCount:
      cpcb.stationCount || 0,

    source: cpcb.source,
    methodology: cpcb.methodology,

    alerts,
  };
}

module.exports = {
  getAlerts,
  createAlerts,
};