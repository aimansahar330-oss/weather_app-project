const GEO_URL =
  "https://geocoding-api.open-meteo.com/v1/search";

const WEATHER_URL =
  "https://api.open-meteo.com/v1/forecast";

// Weather codes -> readable condition
const getCondition = (code) => {
  const conditions = {
    0: "Clear sky",

    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",

    45: "Fog",
    48: "Depositing rime fog",

    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",

    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",

    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",

    66: "Light freezing rain",
    67: "Heavy freezing rain",

    71: "Slight snow",
    73: "Moderate snow",
    75: "Heavy snow",

    77: "Snow grains",

    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",

    85: "Slight snow showers",
    86: "Heavy snow showers",

    95: "Thunderstorm",

    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
  };

  return conditions[code] || "Unknown";
};

// Weather code -> icon
const getWeatherIcon = (code) => {
  if (code === 0) return "☀️";

  if ([1, 2].includes(code)) return "🌤️";

  if (code === 3) return "☁️";

  if ([45, 48].includes(code)) return "🌫️";

  if (
    [51, 53, 55, 56, 57].includes(code)
  ) {
    return "🌦️";
  }

  if (
    [61, 63, 65, 66, 67].includes(code)
  ) {
    return "🌧️";
  }

  if (
    [71, 73, 75, 77, 85, 86].includes(code)
  ) {
    return "❄️";
  }

  if (
    [80, 81, 82].includes(code)
  ) {
    return "🌦️";
  }

  if ([95, 96, 99].includes(code)) {
    return "⛈️";
  }

  return "🌤️";
};

const getWeather = async (city) => {
  // =========================
  // 1. FIND CITY
  // =========================

  const geoResponse = await fetch(
    `${GEO_URL}?name=${encodeURIComponent(
      city
    )}&count=1&language=en&format=json`
  );

  if (!geoResponse.ok) {
    throw new Error(
      "City search failed."
    );
  }

  const geoData =
    await geoResponse.json();

  if (
    !geoData.results ||
    geoData.results.length === 0
  ) {
    throw new Error(
      `City "${city}" nahi mili.`
    );
  }

  const place = geoData.results[0];

  const latitude = place.latitude;
  const longitude = place.longitude;

  // =========================
  // 2. WEATHER DATA
  // =========================

  const params = new URLSearchParams({
    latitude: latitude,
    longitude: longitude,

    current:
      "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m,weather_code",

    hourly:
      "temperature_2m,weather_code",

    daily:
      "weather_code,temperature_2m_max,temperature_2m_min",

    forecast_days: "7",

    timezone: "auto",

    temperature_unit: "celsius",

    wind_speed_unit: "kmh",

    precipitation_unit: "mm",
  });

  const weatherResponse =
    await fetch(
      `${WEATHER_URL}?${params.toString()}`
    );

  if (!weatherResponse.ok) {
    throw new Error(
      "Weather data load nahi ho saka."
    );
  }

  const data =
    await weatherResponse.json();

  // =========================
  // 3. CURRENT
  // =========================

  const current = {
    temp_c:
      data.current?.temperature_2m,

    feelslike_c:
      data.current?.apparent_temperature,

    humidity:
      data.current?.relative_humidity_2m,

    wind_kph:
      data.current?.wind_speed_10m,

    precip_mm:
      data.current?.precipitation,

    condition: {
      text: getCondition(
        data.current?.weather_code
      ),

      icon: getWeatherIcon(
        data.current?.weather_code
      ),
    },
  };

  // =========================
  // 4. 7 DAYS
  // =========================

  const forecastday =
    data.daily.time.map(
      (date, index) => ({
        date,

        day: {
          maxtemp_c:
            data.daily
              .temperature_2m_max[index],

          mintemp_c:
            data.daily
              .temperature_2m_min[index],

          condition: {
            text: getCondition(
              data.daily.weather_code[index]
            ),

            icon: getWeatherIcon(
              data.daily.weather_code[index]
            ),
          },
        },

        hour: [],
      })
    );

  // =========================
  // 5. HOURLY DATA
  // =========================

  data.hourly.time.forEach(
    (time, index) => {
      const date =
        time.split("T")[0];

      const day =
        forecastday.find(
          (item) => item.date === date
        );

      if (day) {
        day.hour.push({
          time: time.replace(
            "T",
            " "
          ),

          temp_c:
            data.hourly
              .temperature_2m[index],

          condition: {
            text: getCondition(
              data.hourly
                .weather_code[index]
            ),

            icon: getWeatherIcon(
              data.hourly
                .weather_code[index]
            ),
          },
        });
      }
    }
  );

  // =========================
  // 6. LOCATION
  // =========================

  const now =
    data.current?.time || "";

  return {
  location: {
    name: place.name,
    country: place.country || "",
    countryCode: place.country_code || "",
    localtime: now.replace("T", " "),
    timezone: data.timezone,
    latitude,
    longitude,
  },

  current,

  forecast: {
    forecastday,
  },
};

};

export { getWeather };