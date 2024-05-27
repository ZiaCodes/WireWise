import React from 'react'
import { SiNginxproxymanager } from "react-icons/si";
const Loader = () => {
  return (
    <div className='flex justify-center items-center h-screen w-screen'>
        <SiNginxproxymanager className='text-red-600 w-20 h-20 animate-spin'/>
    </div>
  )
}

export default Loader