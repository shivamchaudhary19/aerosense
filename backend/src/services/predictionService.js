const path = require("path");
const { spawn } = require("child_process");
const { getCurrentEnvironment } = require("./environmentService");

function runPythonPrediction(environment) {
  return new Promise((resolve, reject) => {
    const mlDirectory = path.resolve(__dirname, "../../../ml");
    const scriptPath = path.join(mlDirectory, "src", "predictor.py");

    const pythonCommand =
      process.platform === "win32"
        ? path.join(mlDirectory, ".venv", "Scripts", "python.exe")
        : path.join(mlDirectory, ".venv", "bin", "python");

    const python = spawn(pythonCommand, [scriptPath], {
        cwd: mlDirectory,
        });

        python.stdin.write(JSON.stringify(environment));
        python.stdin.end();

    let output = "";
    let errorOutput = "";

    python.stdout.on("data", (data) => {
      output += data.toString();
    });

    python.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    python.on("error", (error) => {
      reject(error);
    });

    python.on("close", (code) => {
      if (code !== 0) {
        reject(
          new Error(
            errorOutput || `Python process exited with code ${code}`
          )
        );
        return;
      }

      try {
        const result = JSON.parse(output.trim());
        resolve(result);
      } catch {
        reject(
          new Error("Invalid prediction response from Python")
        );
      }
    });
  });
}

async function getPrediction(location) {
  const environment = await getCurrentEnvironment(location);

  const predictionInput = {
    pm2_5: environment.airQuality.pm2_5,
    pm10: environment.airQuality.pm10,
    no2: environment.airQuality.no2,
    o3: environment.airQuality.o3,
    so2: environment.airQuality.so2,
    co: environment.airQuality.co,
    temperature: environment.weather.temperature,
    humidity: environment.weather.humidity,
    wind_speed: environment.weather.windSpeed,
  };

  const prediction = await runPythonPrediction(predictionInput);

  return {
    location: environment.location,
    currentAQI: environment.airQuality.aqi,
    currentCategory: environment.airQuality.category,
    prediction,
  };
}

module.exports = {
  getPrediction,
};