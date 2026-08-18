const { getCurrentEnvironment } = require("./environmentService");

function getRecommendations(environment) {
  const { airQuality } = environment;

  const recommendations = [];

  if (airQuality.aqi <= 50) {
    recommendations.push({
      priority: "low",
      title: "Continue routine monitoring",
      action: "Maintain regular air-quality monitoring and public awareness.",
    });
  }

  if (airQuality.aqi > 50 && airQuality.aqi <= 100) {
    recommendations.push({
      priority: "moderate",
      title: "Increase monitoring",
      action: "Increase monitoring frequency and continue public awareness measures.",
    });
  }

  if (airQuality.aqi > 100 && airQuality.aqi <= 200) {
    recommendations.push({
      priority: "high",
      title: "Issue public health advisory",
      action: "Advise sensitive groups to reduce prolonged outdoor exposure.",
    });

    recommendations.push({
      priority: "high",
      title: "Strengthen pollution monitoring",
      action: "Increase monitoring of major pollution sources and high-risk areas.",
    });
  }

  if (airQuality.aqi > 200 && airQuality.aqi <= 300) {
    recommendations.push({
      priority: "high",
      title: "Implement emission-control measures",
      action: "Consider stricter controls on major emission sources and construction activity.",
    });

    recommendations.push({
      priority: "high",
      title: "Expand public health advisories",
      action: "Advise the public to minimize prolonged outdoor exposure.",
    });
  }

  if (airQuality.aqi > 300) {
    recommendations.push({
      priority: "critical",
      title: "Activate emergency pollution measures",
      action: "Consider emergency emission-control measures and restrict activities contributing to pollution.",
    });

    recommendations.push({
      priority: "critical",
      title: "Issue severe health advisory",
      action: "Strongly advise residents to avoid prolonged outdoor exposure.",
    });
  }

  if (airQuality.pm2_5 > 60) {
    recommendations.push({
      priority: "high",
      title: "Control particulate emissions",
      action: "Investigate and control major sources of PM2.5 emissions.",
    });
  }

  if (airQuality.pm10 > 100) {
    recommendations.push({
      priority: "moderate",
      title: "Control dust emissions",
      action: "Increase dust-control measures around construction and road activity.",
    });
  }

  return recommendations;
}

async function getGovernmentSummary(location) {
  const environment = await getCurrentEnvironment(location);

  return {
    location: environment.location,
    currentAQI: environment.airQuality.aqi,
    category: environment.airQuality.category,
    primaryPollutant: environment.airQuality.primaryPollutant,
    recommendations: getRecommendations(environment),
  };
}

module.exports = {
  getGovernmentSummary,
};