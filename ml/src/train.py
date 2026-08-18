import os

import joblib
import pandas as pd

from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score
from sklearn.model_selection import train_test_split


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

DATA_PATH = os.path.join(
    BASE_DIR,
    "data",
    "environment.csv",
)

MODEL_DIR = os.path.join(
    BASE_DIR,
    "models",
)

MODEL_PATH = os.path.join(
    MODEL_DIR,
    "aqi_model.joblib",
)


FEATURES = [
    "pm2_5",
    "pm10",
    "no2",
    "o3",
    "so2",
    "co",
    "temperature",
    "humidity",
    "wind_speed",
]


def train_model():
    data = pd.read_csv(DATA_PATH)

    X = data[FEATURES]
    y = data["aqi"]

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42,
    )

    model = RandomForestRegressor(
        n_estimators=200,
        random_state=42,
    )

    model.fit(X_train, y_train)

    predictions = model.predict(X_test)

    mae = mean_absolute_error(y_test, predictions)
    r2 = r2_score(y_test, predictions)

    os.makedirs(MODEL_DIR, exist_ok=True)

    joblib.dump(
        {
            "model": model,
            "features": FEATURES,
        },
        MODEL_PATH,
    )

    print("Model trained successfully.")
    print(f"MAE: {mae:.2f}")
    print(f"R²: {r2:.2f}")
    print(f"Model saved to: {MODEL_PATH}")


if __name__ == "__main__":
    train_model()