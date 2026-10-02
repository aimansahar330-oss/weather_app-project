import React from "react";

const HourlyForcast = ({
  hourlyForcast,
  forecastDays,
  selectedDay,
  setSelectedDay,
}) => {
  return (
    <div className="w-72 mt-12 mb-6 bg-gray-900/80 backdrop-blur-lg border border-gray-700 rounded-2xl p-4 text-white h-[620px]">

      {/* HEADER */}
      <div className="flex gap-2 justify-between items-center">

        <h2 className="text-sm font-semibold mb-4">
          Hourly Forecast
        </h2>

        <select
          value={selectedDay}
          onChange={(e) =>
            setSelectedDay(Number(e.target.value))
          }
          className="bg-gray-800 border mb-4 border-gray-600 rounded-lg px-2 py-1 text-xs outline-none"
        >
          {forecastDays.map((day, index) => (
            <option
              key={day.date}
              value={index}
            >
              {index === 0
                ? "Today"
                : new Date(
                    `${day.date}T00:00:00`
                  ).toLocaleDateString("en-US", {
                    weekday: "long",
                  })}
            </option>
          ))}
        </select>

      </div>

      {/* HOURLY SCROLL AREA */}
      <div className="overflow-y-auto h-[550px] pr-1 scrollbar-thin">

        {hourlyForcast.map((hour, index) => (
          <div
            key={index}
            className="bg-gray-800 border mb-3 border-gray-600 rounded-lg px-5 py-3 flex justify-between items-center text-sm"
          >

            <div className="flex items-center gap-2">

              <div className="text-xl w-7 text-center">
                {hour.icon}
              </div>

              <h2 className="text-white">
                {hour.time}
              </h2>

            </div>

            <h3 className="font-semibold">
              {hour.tem}
            </h3>

          </div>
        ))}

      </div>

    </div>
  );
};

export default HourlyForcast;