
import React, { useEffect, useState } from "react";
import ForcastState from "../components/forcastState";
import HourlyForcast from "../components/hourlyForcast";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { getWeather } from "../services/weatherService";

const WeatherApp = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [selectedDay, setSelectedDay] = useState(0);

  const location = weather?.location;
  const current = weather?.current;

  const forecastDays = (
    weather?.forecast?.forecastday || []
  ).slice(0, 7);

  // =========================
  // WEATHER ICON
  // =========================

  const getWeatherIcon = (icon) => {
    return icon || "🌤️";
  };

  // =========================
  // 24 HOUR -> 12 HOUR
  // =========================

  const format12Hour = (time) => {
    if (!time) return "";

    const [hour, minute] = time.split(":").map(Number);

    const period = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;

    return `${hour12}:${String(minute).padStart(2, "0")} ${period}`;
  };

  // =========================
  // LOCAL DATE + TIME
  // =========================

  const formatLocalDateTime = (localtime) => {
    if (!localtime) return "";

    const [date, time] = localtime.split(" ");

    return `${date} • ${format12Hour(time)}`;
  };

  // =========================
  // SEARCH WEATHER
  // =========================

  const searchWeather = async (searchCity) => {
    if (!searchCity?.trim()) return;

    try {
      const data = await getWeather(searchCity.trim());

      setWeather(data);
      setSelectedDay(0);
      setCity("");
    } catch (error) {
      console.error("Weather error:", error);

      alert(
        error.message ||
        "Weather data load nahi ho saka."
      );
    }
  };

  // =========================
  // INITIAL WEATHER
  // =========================

  useEffect(() => {
    if (!navigator.geolocation) {
      searchWeather("Lahore");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        try {
          const data = await getWeather(
            `${latitude},${longitude}`
          );

          setWeather(data);
        } catch (error) {
          console.error(error);
          searchWeather("Lahore");
        }
      },
      () => {
        searchWeather("Lahore");
      }
    );
  }, []);

  // =========================
  // SEARCH HANDLERS
  // =========================

  const handleSearch = () => {
    searchWeather(city);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // =========================
  // WEATHER STATS
  // =========================

  const weatherStats = [
    {
      title: "Feels like",
      value:
        current?.feelslike_c !== undefined
          ? `${Math.round(current.feelslike_c)}°C`
          : "--",
    },
    {
      title: "Humidity",
      value:
        current?.humidity !== undefined
          ? `${current.humidity}%`
          : "--",
    },
    {
      title: "Wind",
      value:
        current?.wind_kph !== undefined
          ? `${Math.round(current.wind_kph)} km/h`
          : "--",
    },
    {
      title: "Precipitation",
      value:
        current?.precip_mm !== undefined &&
          current?.precip_mm !== null
          ? `${current.precip_mm} mm`
          : "0 mm",
    },
  ];

  // =========================
  // 7 DAY FORECAST
  // =========================

  const dailyForcast = forecastDays.map(
    (day, index) => {
      let dayName;

      if (index === 0) {
        dayName = "Today";
      } else {
        dayName = new Date(
          `${day.date}T00:00:00`
        ).toLocaleDateString(
          "en-US",
          {
            weekday: "long",
          }
        );
      }

      return {
        day: dayName,

        icon: getWeatherIcon(
          day.day?.condition?.icon
        ),

        condition:
          day.day?.condition?.text || "",

        maxTem:
          day.day?.maxtemp_c !== undefined
            ? `${Math.round(
              day.day.maxtemp_c
            )}°`
            : "--",

        minTem:
          day.day?.mintemp_c !== undefined
            ? `${Math.round(
              day.day.mintemp_c
            )}°`
            : "--",
      };
    }
  );

  // =========================
  // 12 HOURLY FORECAST
  // =========================

  const hourlyForcast = (() => {
    const selectedForecast =
      forecastDays[selectedDay];

    if (!selectedForecast) return [];

    let hours = [];

    if (
      selectedDay === 0 &&
      location?.localtime
    ) {
      const [
        localDate,
        localClock,
      ] = location.localtime.split(" ");

      const currentHour = Number(
        localClock.split(":")[0]
      );

      const todayHours =
        selectedForecast.hour.filter(
          (hour) => {
            const [
              hourDate,
              hourClock,
            ] = hour.time.split(" ");

            const hourNumber = Number(
              hourClock.split(":")[0]
            );

            return (
              hourDate === localDate &&
              hourNumber >= currentHour
            );
          }
        );

      const nextDayHours =
        forecastDays[1]?.hour || [];

      hours = [
        ...todayHours,
        ...nextDayHours,
      ];
    } else {
      hours = [
        ...(selectedForecast.hour || []),
      ];
    }

    return hours
      .slice(0, 12)
      .map((hour) => {
        const timeOnly =
          hour.time.split(" ")[1];

        return {
          time: format12Hour(timeOnly),

          tem:
            hour.temp_c !== undefined
              ? `${Math.round(
                hour.temp_c
              )}°C`
              : "--",

          icon: getWeatherIcon(
            hour.condition?.icon
          ),

          condition:
            hour.condition?.text || "",
        };
      });
  })();

  // =========================
  // LOADING
  // =========================

  if (!weather) {
    return (
      <div className="min-h-screen bg-blue-950 flex items-center justify-center text-white px-4">
        <div className="text-center">
          <div className="text-5xl mb-4">
            ☁️
          </div>

          <p className="text-lg">
            Loading weather...
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // UI
  // =========================

  return (
    <div className="min-h-screen bg-blue-950 text-white pb-12 overflow-x-hidden">

      {/* =========================
          HEADER
      ========================= */}

      <div className="pt-8 sm:pt-10 text-center px-4">

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Weather Now
        </h1>

        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          Live weather, forecasts & hourly conditions
        </p>

      </div>

      {/* =========================
          SEARCH
      ========================= */}

      <div className="flex justify-center mt-6 sm:mt-7 px-4">

        <div className="flex items-center bg-white rounded-2xl overflow-hidden w-full max-w-2xl shadow-xl">

          <FaSearch className="text-gray-500 ml-4 sm:ml-5 shrink-0" />

          <input
            type="text"
            value={city}
            onChange={(e) =>
              setCity(e.target.value)
            }
            onKeyDown={handleKeyDown}
            placeholder="Search city..."
            className="flex-1 min-w-0 px-3 sm:px-4 py-3 sm:py-4 text-gray-800 outline-none text-sm sm:text-base"
          />

          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 sm:px-7 py-3 sm:py-4 font-semibold text-sm sm:text-base shrink-0"
          >
            Search
          </button>

        </div>

      </div>

      {/* =========================
          MAIN CONTENT
      ========================= */}

      <div className="px-4 sm:px-5 lg:px-16 xl:px-24 mt-2 flex flex-col lg:flex-row gap-5">

        {/* =========================
            LEFT COLUMN
        ========================= */}

        <div className="flex flex-col flex-1 min-w-0">

          {/* =========================
              CURRENT WEATHER
          ========================= */}

          <div className="w-full mt-8 sm:mt-10 bg-gray-900/80 backdrop-blur-xl border border-gray-700 rounded-3xl shadow-2xl text-white min-h-64 px-5 sm:px-8 py-6 sm:py-8 flex flex-col sm:flex-row justify-between gap-6">

            {/* LOCATION */}

            <div className="flex flex-col justify-between">

              <div>

                <div className="flex items-center gap-2">

                  <FaMapMarkerAlt className="text-blue-400 shrink-0" />

                  <h2 className="text-xl sm:text-2xl font-bold truncate">
                    {location?.name}
                  </h2>

                </div>

                <p className="text-yellow-400 mt-1 text-sm sm:text-base">
                  {location?.country}
                </p>

              </div>

              <p className="text-gray-400 text-xs sm:text-sm mt-5 sm:mt-0">
                {formatLocalDateTime(
                  location?.localtime
                )}
              </p>

            </div>

            {/* CURRENT TEMPERATURE */}

            <div className="flex items-center gap-4 sm:gap-7">

              <div className="text-5xl sm:text-7xl shrink-0">
                {current?.condition?.icon}
              </div>

              <div className="min-w-0">

                <h2 className="text-4xl sm:text-6xl font-extrabold">
                  {current?.temp_c !==
                    undefined
                    ? `${Math.round(
                      current.temp_c
                    )}°C`
                    : "--"}
                </h2>

                <p className="text-gray-300 mt-2 text-sm sm:text-base">
                  Feels like{" "}
                  {current?.feelslike_c !==
                    undefined
                    ? `${Math.round(
                      current.feelslike_c
                    )}°C`
                    : "--"}
                </p>

                <p className="text-blue-300 mt-1 font-medium text-sm sm:text-base">
                  {current?.condition?.text}
                </p>

              </div>

            </div>

          </div>

          {/* =========================
              STATS + WEEKLY
          ========================= */}

          <ForcastState
            weatherStats={weatherStats}
            dailyForcast={dailyForcast}
          />


        </div>

        {/* =========================
            HOURLY FORECAST
        ========================= */}

        <div className="w-full lg:w-72 shrink-0">

          <HourlyForcast
            hourlyForcast={hourlyForcast}
            forecastDays={forecastDays}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
          />
        </div>

      </div>

      {/* =========================
          FOOTER
      ========================= */}

      <footer className="mt-10 sm:mt-12 border-t border-gray-800 bg-gray-950/80 px-4 sm:px-6 py-7 sm:py-8">

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

          <div className="text-center md:text-left">

            <h2 className="text-lg font-bold text-white">
              Weather Now
            </h2>

            <p className="text-sm text-gray-400 mt-1">
              Simple, accurate and real-time weather information.
            </p>

          </div>

          <div className="text-center md:text-right">

            <p className="text-sm text-gray-400">
              Weather data powered by Open-Meteo
            </p>

            <p className="text-xs text-gray-600 mt-1">
              © {new Date().getFullYear()} Weather Now
            </p>

          </div>

        </div>

      </footer>

    </div>
  );
};

export default WeatherApp;
