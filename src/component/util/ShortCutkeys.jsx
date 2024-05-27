import React from 'react'
import { IoCloseCircle } from 'react-icons/io5'

const commonStyle = 'flex justify-between items-center p-1'

const ShortCutkeys = ({onclick}) => {
  return (
    <div className='h-screen w-screen z-[999999999999999999999999999999] animate-scale'>
        <div className='setting-wrapper'>
        <div className="setting-header">
            <div className='setting-logo'>
                <h1 className='flex justify-center items-start flex-col font-bold'>
                List of Shortcut keys
                <p className=' opacity-75 font-extralight text-xs relative'>Useful Key combination </p>
                </h1>
            </div>
            <IoCloseCircle onClick={onclick} className='text-3xl cursor-pointer '/>
        </div>
        <div className="setting-body">
            <p className='font-bold'>General keys</p>
            <hr className='pb-1'/>
            <ul>
                <li className={commonStyle}>Serach      <code >Ctrl + m</code></li>
                <li className={commonStyle}>Home        <code >Alt + h</code></li>
                <li className={commonStyle}>Report      <code >Alt + r</code></li>
                <li className={commonStyle}>WatchList   <code >Alt + w</code></li>
                <li className={commonStyle}>Setting     <code >Alt + s</code></li>
                <li className={commonStyle}>Profile     <code >Alt + p</code></li>
            </ul>
            <br />
            <p className=' font-bold'>Advanced keys</p>
            <hr className='pb-1'/>
            <ul>
                <li className={commonStyle}>
                Reset Incident Data  <code >Alt + Ctrl + i</code>
                </li>
                <li className={commonStyle}>
                Reset Request Data  <code >Alt + Ctrl + d</code>
                </li>
                <li className={commonStyle}>
                Toggle Navigation  <code > Ctrl + . </code> 
                </li>
                <li className={commonStyle}>
                Toggle Theme  <code > Ctrl + X </code> 
                </li>
                <li className={commonStyle}>
                Refresh page  <code > Ctrl + R </code> 
                </li>
            </ul>
        </div>
        </div>
    </div>
  )
}

export default ShortCutkeys