import React from 'react'
import { MdKeyboardDoubleArrowUp } from "react-icons/md";

const FloatingBtn = () => {
  return (
    <div 
    className=' fixed bottom-16 right-14 w-12 h-12
    rounded-full flex justify-center hover:bg-blue-600 cursor-pointer
    items-center bg-blue-800 shadow-lg'
    onClick={()=> scrollTo(0, 0)}
    >
      <MdKeyboardDoubleArrowUp className='text-white text-2xl'/>
    </div>
  )
}

export default FloatingBtn