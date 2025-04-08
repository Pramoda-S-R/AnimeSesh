import React from 'react'

const Loader = () => {
  return (
    <div className="flex sm:flex-row flex-col gap-5 mx-auto px-10 sm:items-start items-center mb-10">
      <div className="skeleton h-96 w-64"></div>
      <div className="flex flex-col gap-5 max-w-5xl">
        <div className='skeleton h-9 w-72'></div>
        <div className='skeleton h-5 w-24'></div>
        <div className='skeleton h-5 w-24'></div>
        <div className='skeleton h-44 w-[60vw]'></div>
        <div className='skeleton h-6 w-16'></div>
      </div>
    </div>
  )
}

export default Loader
