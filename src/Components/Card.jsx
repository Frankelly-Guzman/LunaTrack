import React from 'react'

const Card = ({ headerText, subHeaderText }) => {
  return (
    <>
        <div className='flex flex-col justify-center items-center text-white bg-slate-800/80 w-full h-full p-4 rounded-lg gap-2 shadow-lg'>
    <h1 className='text-xl font-bold'>{headerText}</h1>
    <h2 className='text-lg'>{subHeaderText}</h2>
</div>
    </>
  )
}

export default Card