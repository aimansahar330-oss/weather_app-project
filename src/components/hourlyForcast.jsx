import React from 'react'

const hourlyForcast = ({hourlyForcast}) => {
  return (
    <>
     {/* hourly forcast */}
     <div className='w-72 mt-12 mb-6 bg-gray-900/80 backdrop-blur-lg border border-gray-700 rounded-2xl p-4 text-white h-fit'>
        <div className="flex gap-2 w-64 justify-between items-center">
          <h2 className="text-sm font-sm mb-6">Hourly Forecast</h2>
          <select className="bg-gray-800 border mb-6 border-gray-600 rounded-lg px-3 py-1 text-sm outline-none">
              <option>Tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>
              <option>Saturday</option>
              <option>Sunday</option>
            </select>
            </div>

            {hourlyForcast.map((hour) => (
              <div 
                className='bg-gray-800 border mb-4  border-gray-600 rounded-lg px-8 py-4 flex justify-between text-sm outline-none'>
                  <div className="flex items-center -mx-4 gap-2">
                  <div className='text-lg '>{hour.icon}</div>
                <h2 className='text-white'>{hour.time}</h2>
                </div>
                <h3>{hour.tem}</h3>
                </div>
              
    ))}
    </div>
    </> 
  )
}

export default hourlyForcast;
