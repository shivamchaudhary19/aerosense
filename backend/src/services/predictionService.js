const path = require("path");
const { spawn } = require("child_process");

const {
  getCurrentEnvironment,
} = require("./environmentService");


function getPythonCommand(mlDirectory) {
  if (process.platform === "win32") {
    return path.join(
      mlDirectory,
      ".venv",
      "Scripts",
      "python.exe"
    );
  }

  return path.join(
    mlDirectory,
    ".venv",
    "bin",
    "python"
  );
}


function runPythonPrediction(environment) {
  return new Promise(
    (resolve, reject) => {
      const mlDirectory = path.resolve(
        __dirname,
        "../../../ml"
      );

      const scriptPath = path.join(
        mlDirectory,
        "src",
        "predictor.py"
      );

      const pythonCommand =
        getPythonCommand(
          mlDirectory
        );

      const python = spawn(
        pythonCommand,
        [scriptPath],
        {
          cwd: mlDirectory,
        }
      );

      let output = "";
      let errorOutput = "";

      let settled = false;

      const timeout = setTimeout(() => {
        if (settled) {
          return;
        }

        settled = true;

        python.kill();

        reject(
          new Error(
            "AQI prediction timed out"
          )
        );
      }, 30000);


      python.stdin.write(
        JSON.stringify(environment)
      );

      python.stdin.end();


      python.stdout.on(
        "data",
        (data) => {
          output += data.toString();
        }
      );


      python.stderr.on(
        "data",
        (data) => {
          errorOutput += data.toString();
        }
      );


      python.on(
        "error",
        (error) => {
          if (settled) {
            return;
          }

          settled = true;

          clearTimeout(timeout);

          reject(
            new Error(
              `Unable to start ML predictor: ${error.message}`
            )
          );
        }
      );


      python.on(
        "close",
        (code) => {
          if (settled) {
            return;
          }

          settled = true;

          clearTimeout(timeout);


          if (code !== 0) {
            reject(
              new Error(
                errorOutput.trim() ||
                  `ML predictor exited with code ${code}`
              )
            );

            return;
          }


          try {
            const result =
              JSON.parse(
                output.trim()
              );


            if (!result.success) {
              reject(
                new Error(
                  result.error ||
                    "ML prediction failed"
                )
              );

              return;
            }


            if (
              !result.data ||
              typeof result.data.predictedAQI !==
                "number"
            ) {
              reject(
                new Error(
                  "Invalid AQI prediction returned by ML model"
                )
              );

              return;
            }


            resolve(
              result.data
            );
          } catch (error) {
            reject(
              new Error(
                "Invalid prediction response from Python"
              )
            );
          }
        }
      );
    }
  );
}


async function getPrediction(
  location
) {
  const cleanLocation = String(
    location || ""
  ).trim();

  if (!cleanLocation) {
    const error = new Error(
      "Location is required"
    );

    error.statusCode = 400;

    throw error;
  }


  const environment =
    await getCurrentEnvironment(
      cleanLocation
    );


  const predictionInput = {
    pm2_5:
      environment.airQuality.pm2_5,

    pm10:
      environment.airQuality.pm10,

    no2:
      environment.airQuality.no2,

    o3:
      environment.airQuality.o3,

    so2:
      environment.airQuality.so2,

    co:
      environment.airQuality.co,

    temperature:
      environment.weather.temperature,

    humidity:
      environment.weather.humidity,

    wind_speed:
      environment.weather.windSpeed,
  };


  const prediction =
    await runPythonPrediction(
      predictionInput
    );


  return {
    location:
      environment.location,

    currentAQI:
      environment.airQuality.aqi,

    currentCategory:
      environment.airQuality.category,

    prediction,
  };
}


module.exports = {
  getPrediction,
};