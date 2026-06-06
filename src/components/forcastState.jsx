import React from 'react'

 const ForcastState = ({weatherStats,dailyForcast}) => {
  return (
    <>
     {/* weather state */}
      <div className='flex gap-6 mt-10'>
          {weatherStats.map((stats) => (
            <div className=' bg-gray-900/80 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-2xl text-white  w-43 h-32  justify-between flex flex-col px-6 py-6'>
              <h3 className='text-lg font-semibold'>{stats.title}</h3>
              <p className='text-2xl font-bold'>{stats.value}</p>
            </div>
        ))}
        </div>
         {/* daily  forcast */}
        <div className='flex gap-4 mt-10'>
          {dailyForcast.map((forcast) => (
            <div className=' bg-gray-900/80 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-2xl text-white  w-24 h-38  justify-between flex flex-col px-6 py-3'>
              <h3 className='text-lg font-semibold'>{forcast.day}</h3>
              <div className='flex justify-center mt-6 text-3xl '>{forcast.icon}</div>
              <div className='flex  justify-between mt-auto -mx-4'>
              <h3 className=' font-normal'>{forcast.tem}</h3>
              <h3 className=' font-normal'>{forcast.tem}</h3>
              </div>
            </div>
          ))}
      </div>
  
      
        </>
  )
}

export default ForcastState;


