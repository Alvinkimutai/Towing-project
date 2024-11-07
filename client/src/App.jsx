import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='h-full bg-gray-50 '>
      <div className='space-y-6' >
        <h1 className='flex justify-center text-blue-900 text-4xl'>Towtruck Services</h1>
        <h1 className='flex justify-center text-blue-900 text-4xl font-serif'>Main Services</h1>
        <div className='flex flex-row flex justify-center flex space-x-8 '>
          <div className='bg-gray-200 p-8 rounded-2xl'>
            <h2>Flat-Bed towtruck</h2>
            <img src='https://rescueplus.co.ke/wp-content/uploads/2023/10/best-car-recovery-.jpg' alt="Description" className="w-full max-w-sm aspect-[16/9] object-cover mx-auto rounded-lg "></img>
            <p className='max-w-xs'>This type of truck has a flat-level platform “the bed’, which can be inclined and slid to load and unload vehicles. Flatbed tow trucks are ideal for inoperable vehicles, low-clearance cars, and motorcycles. Flatbeds are used where traditional towing methods might damage the vehicle, like in case of flat tires or transmission problems.</p>
          </div>
          <div className='bg-gray-200 p-8 rounded-2xl'>
            <h2>Hook and chain towtruck</h2>
            <img src='https://autoaidtowing.com/img/hook.jpg' alt="Description" className="w-full max-w-sm aspect-[16/9] object-cover mx-auto rounded-lg " ></img>
            <p className='max-w-xs'>Hook and chain tow trucks, also known as sling tow trucks, have been a staple in the towing industry for decades. Their design features a simple yet effective mechanism—a metal hook attached to a chain or strap. This hook securely latches onto the disabled vehicle, allowing the tow truck to lift and transport it to its destination.</p>
          </div>
        </div>
        <div>
          <h1 className='flex justify-center text-blue-900 text-4xl font-serif'>Subsidiary Services</h1>
          <div className='flex flex-row flex justify-center flex space-x-8 '>
          <div className='bg-gray-200 p-8 rounded-2xl'>
            <h2>Tractor Transport</h2>
            <img src='https://executivetowingservices.com.au/wp-content/uploads/2021/12/Tractor-1-640x480.jpg' className="w-full max-w-sm aspect-[16/9] object-cover mx-auto rounded-lg " ></img>
            <p className='max-w-xs'>From smaller tractors that single-family farms use to the giant towing equipment for larger-scale operations, the tractor is the workhorse of the farming industry. When it’s time to ship your tractor from one location to the next, trust the heavy equipment specialists at Tractor Transport. </p>
          </div>
          <div className='bg-gray-200 p-8 rounded-2xl'>
            <h2>Low Loader Services</h2>
            <img src='https://towingservices.co.ke/images/low-loader.jpg' className="w-full max-w-sm aspect-[16/9] object-cover mx-auto rounded-lg " ></img>
            <p className='max-w-xs'>Our low loaders trailers are well designed with common features including spring fitted ramps, outriggers, heavy-duty winches and specialised braking system that ensures safety of personnel and load. This makes our low loaders suitable for transporting various payloads including abnormal, wide, and out of gauge plant and equipment.</p>
          </div>
          <div className='bg-gray-200 p-8 rounded-2xl'>
            <h2>Crane & Hiab services</h2>
            <img src='https://img.linemedia.com/img/s/construction-equipment-mobile-crane-XCMG-XCA180L8C---1718611193950542810_common--24061710503966902700.jpg' className="w-full max-w-sm aspect-[16/9] object-cover mx-auto rounded-lg " ></img>
            <p className='max-w-xs'>Cranes are typically used for large-scale lifting operations, such as construction projects, industrial setups, or heavy machinery installations. HIAB services, utilize a truck-mounted crane to load and unload heavy loads directly onto a vehicle, making them ideal for more flexible and mobile lifting tasks, especially in tight spaces or when access is limited</p>
          </div>
          <div className='bg-gray-200 p-8 rounded-2xl'>
            <h2>Forklift services</h2>
            <img src='https://i.ytimg.com/vi/pz_nUVO3AmI/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGGUgWyhVMA8=&rs=AOn4CLAYrTii3yvb4mEFbBVNGLBfdwEG5Q'className="w-full max-w-sm aspect-[16/9] object-cover mx-auto rounded-lg " ></img>
            <p className='max-w-xs'>Our forklift rental services are a great way to solve your material handling needs. We provide the flexibility you need, and you can rent them for as short or long as you want. All our machines come with insurance and go through periodic inspections for safety.</p>
          </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
