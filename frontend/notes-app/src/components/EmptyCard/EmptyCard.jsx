import React from 'react';

const  EmptyCard = ( {imgSrc , message }) => {
  return (
    <div className='flex flex-col items-center justify-center mt-20'>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz0X-Vc6WDJz6gPYOCZmXhfMmiNq7dwNjIGY0pptaEMWkYxA_xzNb3cCkA_A0tbnYcadY&usqp=CAU" alt="No notes" className='w-60'/>

        <p className='w-1/2 text-sm font-medium text-black-500 text-center leading-7 mt-5'>
            {message}
        </p>
    </div>
  )
}

export default EmptyCard;
