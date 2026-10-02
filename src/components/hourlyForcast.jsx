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
        lg:w-72
        mt-8
        lg:mt-12
        mb-6
        bg-gray-900/80
        backdrop-blur-lg
        border border-gray-700
        rounded-2xl
        p-4
        text-white
        h-[620px]
        lg:shrink-0
      "
    >

      {/* =========================
          HEADER
      ========================= */}

      <div className="flex gap-2 justify-between items-center">

        <h2 className="text-sm sm:text-base font-semibold mb-4">
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
            mb-4
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
          HOURLY SCROLL AREA
      ========================= */}

      <div className="overflow-y-auto h-[550px] pr-1">

        {hourlyForcast.map(
          (hour, index) => (
            <div
              key={index}
              className="
                bg-gray-800
                border
                mb-3
                border-gray-600
                rounded-lg
                px-4
                sm:px-5
                py-3
                flex
                justify-between
                items-center
                text-sm
                hover:border-blue-500/50
                transition
              "
            >

              {/* TIME + ICON */}

              <div className="flex items-center gap-2 min-w-0">

                <div className="text-lg sm:text-xl w-7 text-center shrink-0">
                  {hour.icon}
                </div>

                <h2 className="text-white text-xs sm:text-sm whitespace-nowrap">
                  {hour.time}
                </h2>

              </div>

              {/* TEMPERATURE */}

              <h3 className="font-semibold text-xs sm:text-sm ml-2 whitespace-nowrap">
                {hour.tem}
              </h3>

            </div>
          )
        )}

      </div>

    </div>
  );
};

export default HourlyForcast;