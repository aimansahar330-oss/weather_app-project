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

      <div className="grid grid-cols-4 gap-5 mt-10">

        {weatherStats.map((stats, index) => (
          <div
            key={index}
            className="bg-gray-900/80 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-2xl text-white h-32 justify-between flex flex-col px-6 py-5 hover:border-blue-500/50 transition duration-300"
          >

            <h3 className="text-base font-medium text-gray-400">
              {stats.title}
            </h3>

            <p className="text-2xl font-bold">
              {stats.value}
            </p>

          </div>
        ))}

      </div>

      {/* =========================
          7 DAY FORECAST
      ========================= */}

      <div className="mt-10">

        <div className="flex items-center justify-between mb-4">

          <div>
            <h2 className="text-xl font-bold">
              7-Day Forecast
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Weather for the upcoming days
            </p>
          </div>

        </div>

        <div className="grid grid-cols-7 gap-3">

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
                  ${
                    index === 0
                      ? "ring-1 ring-blue-500/30"
                      : ""
                  }
                `}
              >

                {/* DAY */}

                <h3
                  className={`
                    text-sm font-semibold
                    ${
                      index === 0
                        ? "text-blue-400"
                        : "text-gray-200"
                    }
                  `}
                >
                  {forecast.day}
                </h3>

                {/* WEATHER ICON */}

                <div className="flex justify-center items-center my-2">
<div className="text-4xl">
  {forecast.icon}
</div>

                </div>

                {/* CONDITION */}

                <p className="text-[11px] text-gray-400 text-center truncate w-full">
                  {forecast.condition}
                </p>

                {/* TEMPERATURE */}

                <div className="flex items-center gap-2 mt-2">

                  <span className="font-bold text-white">
                    {forecast.maxTem}
                  </span>

                  <span className="text-gray-500">
                    /
                  </span>

                  <span className="font-medium text-gray-500">
                    {forecast.minTem}
                  </span>

                </div>

              </div>
            )
          )}

        </div>

      </div>
    </>
  );
};

export default ForcastState;