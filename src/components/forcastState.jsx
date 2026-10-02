import React from "react";

const ForcastState = ({
  weatherStats,
  dailyForcast,
}) => {
  return (
    <>
      {/* =========================
          WEATHER STATS
      ========================= */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 mt-6 sm:mt-10">
        {weatherStats.map((stats, index) => (
          <div
            key={index}
            className="
              bg-gray-900/80
              backdrop-blur-lg
              border border-gray-700
              rounded-2xl
              shadow-2xl
              text-white
              h-32
              justify-between
              flex
              flex-col
              px-5
              sm:px-6
              py-5
              hover:border-blue-500/50
              transition
              duration-300
              min-w-0
            "
          >
            <h3 className="text-sm sm:text-base font-medium text-gray-400">
              {stats.title}
            </h3>

            <p className="text-xl sm:text-2xl font-bold">
              {stats.value}
            </p>
          </div>
        ))}
      </div>

      {/* =========================
          7-DAY FORECAST
      ========================= */}
      <div className="mt-8 sm:mt-10">
        <div className="mb-4">
          <h2 className="text-lg sm:text-xl font-bold">
            7-Day Forecast
          </h2>

          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Weather for the upcoming days
          </p>
        </div>

        {/* Mobile = horizontal scroll
            Desktop = normal row/grid */}
        <div className="overflow-x-auto sm:overflow-x-visible pb-3 sm:pb-0">
          <div
            className="
              flex
              gap-3
              w-max
              sm:w-full
              sm:grid
              sm:grid-cols-4
              lg:grid-cols-7
            "
          >
            {dailyForcast.slice(0, 7).map(
              (forecast, index) => (
                <div
                  key={index}
                  className={`
                    bg-gray-900/80
                    backdrop-blur-lg
                    border
                    border-gray-700
                    rounded-2xl
                    shadow-2xl
                    text-white

                    min-h-40
                    w-32
                    sm:w-auto

                    px-3
                    py-4

                    flex
                    flex-col
                    items-center
                    justify-between

                    hover:-translate-y-1
                    hover:border-blue-500/60

                    transition-all
                    duration-300

                    shrink-0
                    sm:shrink

                    ${
                      index === 0
                        ? "ring-1 ring-blue-500/30"
                        : ""
                    }
                  `}
                >
                  <h3
                    className={`
                      text-xs
                      sm:text-sm
                      font-semibold
                      text-center
                      ${
                        index === 0
                          ? "text-blue-400"
                          : "text-gray-200"
                      }
                    `}
                  >
                    {forecast.day}
                  </h3>

                  <div className="flex justify-center items-center my-2">
                    <div className="text-3xl sm:text-4xl">
                      {forecast.icon}
                    </div>
                  </div>

                  <p className="text-[10px] sm:text-[11px] text-gray-400 text-center truncate w-full">
                    {forecast.condition}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-bold text-white text-sm sm:text-base">
                      {forecast.maxTem}
                    </span>

                    <span className="text-gray-500">
                      /
                    </span>

                    <span className="font-medium text-gray-500 text-sm sm:text-base">
                      {forecast.minTem}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ForcastState;