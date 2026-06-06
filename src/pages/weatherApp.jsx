import React from 'react';
import ForcastState from '../components/forcastState';
import HourlyForcast from '../components/hourlyForcast';
import { IoMdRainy } from 'react-icons/io';
import { MdSearch, MdMyLocation } from 'react-icons/md';
import { MdAccessibilityNew, MdCloud, MdOutlineSnowboarding, MdOutlineWbSunny, MdSunnySnowing, MdThunderstorm, MdTsunami, MdWaterDrop, MdWbCloudy, MdWbShade, MdWbSunny, MdWbTwilight } from 'react-icons/md';


const WeatherApp = ()  => {
  const weatherStats = [
    {
      title: "Feels like",
      value: "60%"
    },
    {
      title: "Humidity",
      value: "48%"
    },
    {
      title: "Wind",
      value: "16km/h"
    },
    {
      title: "precipitation",
      value: "0mm"
    },
  ]

  const dailyForcast = [
    {
      day: "Mon",
      icon: <MdWbSunny className='text-yellow-400' />,
      tem: "25°",
      tem: "25°"
    },
    {
      day: "Tue",
      icon: <MdWbCloudy  className='text-gray-300'/> ,
      tem: "25°",
      tem: "25°"
    },
    {
      day: "Wed",
      icon: <MdThunderstorm className='text-blue-400' />,
      tem: "25°",
      tem: "25°"
    },
    {
      day: "Thur",
      icon: <MdWaterDrop  className='text-gray-40'/>,
      tem: "25°",
      tem: "25°"
    },
    {
      day: "Fri",
      icon: <IoMdRainy  className='text-yellow-400'/>,
      tem: "25°",
      tem: "25°"
    },
    {
      day: "Sat",
      icon: <MdWbSunny />,
      tem: "25°",
      tem: "25°"
    },
    {
      day: "Sun",
      icon: <MdCloud className='text-gray-400' />,
      tem: "25°",
      tem: "25°"
    },

  ]

  const hourlyForcast = [
    {
      icon: <MdCloud />,
      time: "3pm",
      tem: "25°"
    },
     {
      icon: <MdSunnySnowing />,
      time: "3pm",
      tem: "25°"
    },
     {
      icon: <MdWbSunny  className='text-yellow-400'/>,
      time: "3pm",
      tem: "25°"
    },
     {
      icon: <MdCloud  className='text-gray-400'/>,
      time: "3pm",
      tem: "25°"
    },
    {
      icon: <MdWbTwilight  className='text-yellow-400'/>,
      time: "3pm",
      tem: "25°"
    },
    {
      icon: <MdWbSunny  className='text-yellow-400'/>,
      time: "3pm",
      tem: "25°"
    },
     {
      icon: <MdWbSunny  className='text-yellow-400'/>,
      time: "3pm",
      tem: "25°"
    },
     {
      icon: <MdWbSunny  className='text-yellow-400'/>,
      time: "3pm",
      tem: "25°"
    },
  ]



  return (
    <div className='w-full bg-blue-950'>
    
      <h1 className='text-white px-12 py-12 font-bold text-2xl'>Weather Now</h1>
      <p className='text-white font-bold text-3xl text-center'>How the sky looking today?</p>

      {/* search bar */}

      <div className='flex justify-center mt-6'>
        <div className='flex items-center gap-3 bg-white/10 backdrop-blur-lg border border-gray-600 rounded-2xl py-3 px-4 w-96'>
        <MdSearch className='text-gray-300 text-2xl' />

        <input type="text" placeholder='search city'
        className='bg-transparent outline-none text-white w-full placeholder-gray-400' />

        <button className="bg-blue-800/90 hover:bg-blue-600 p-2 rounded-lg">
          <MdMyLocation className="text-white text-xl" />
        </button>
        </div>

        {/* start */}
      
      </div>
      <div className='px-24 flex gap-4'>

        <div className='flex flex-col flex-1'>
      {/* banner */}
      <div className='w-190 h-64 mt-12 flex items-center justify-between rounded-2xl px-8 bg-blue-900/90'>
        <div>
        <h2 className='text-white text-2xl font-medium'>Pakistan, Islamabad</h2>
        <h2 className='text-gray-300 text-lg mt-2'> Tuesday 7 April,2026</h2>
        </div>
         {/* Right Side  of banner*/}
          <div className="flex items-center gap-8">
            <MdWbSunny className="text-yellow-400 text-7xl" />
            <h1 className="text-white text-6xl font-semibold">20°</h1>
          </div>

      </div>
      <ForcastState weatherStats={weatherStats}
      dailyForcast={dailyForcast} />
      
       </div>
       <HourlyForcast hourlyForcast={hourlyForcast} />
      
      
      </div>
    </div>
    
  )
}

export default WeatherApp;