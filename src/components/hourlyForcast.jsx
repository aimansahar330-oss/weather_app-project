
import React from "react";

const HourlyForcast = ({
  hourlyForcast,
  forecastDays,
  selectedDay,
  setSelectedDay,
}) => {
  return (
    <div
      className="
        w-full
        mt-8
        lg:mt-12
        mb-6
        bg-gray-900/80
        backdrop-blur-lg
        border border-gray-700
        rounded-2xl
        p-4
        text-white
      "
    >

      {/* =========================
          HEADER
      ========================= */}

      <div className="flex gap-2 justify-between items-center">

        <h2 className="text-sm sm:text-base font-semibold">
          Hourly Forecast
        </h2>

        <select
          value={selectedDay}
          onChange={(e) =>
            setSelectedDay(
              Number(e.target.value)
            )
          }
          className="
            bg-gray-800
            border
            border-gray-600
            rounded-lg
            px-2
            py-1
            text-xs
            sm:text-sm
            outline-none
            max-w-[120px]
          "
        >

          {forecastDays.map(
            (day, index) => (
              <option
                key={day.date}
                value={index}
              >
                {index === 0
                  ? "Today"
                  : new Date(
                      `${day.date}T00:00:00`
                    ).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "long",
                      }
                    )}
              </option>
            )
          )}

        </select>

      </div>

      {/* =========================
          HORIZONTAL HOURLY CARDS
      ========================= */}

      <div className="overflow-x-auto pb-3 mt-4">

        <div className="flex gap-3 w-max">

          {hourlyForcast.map(
            (hour, index) => (
              <div
                key={index}
                className="
                  bg-gray-800
                  border
                  border-gray-600
                  rounded-xl
                  px-5
                  py-4
                  w-32
                  sm:w-36
                  min-h-24
                  shrink-0
                  flex
                  flex-col
                  justify-between
                  hover:border-blue-500/50
                  transition
                "
              >

                {/* TIME */}

                <h2 className="text-white text-xs sm:text-sm text-center">
                  {hour.time}
                </h2>

                {/* ICON */}

                <div className="text-2xl text-center my-1">
                  {hour.icon}
                </div>

                {/* TEMP */}

                <h3 className="font-semibold text-sm text-center">
                  {hour.tem}
                </h3>

              </div>
            )
          )}

        </div>

      </div>

    </div>
  );
};

export default HourlyForcast;
