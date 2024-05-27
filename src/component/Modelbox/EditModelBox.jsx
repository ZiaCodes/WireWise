import React from 'react'
import { MdDateRange } from "react-icons/md";
import { IoIosNavigate } from 'react-icons/io';
import { MdOutlineWork } from "react-icons/md";
import { IoTime } from "react-icons/io5";
import { IoSettings } from 'react-icons/io5';
import { RiTeamFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { IoMdCloseCircle } from "react-icons/io";
import { IoLocation } from "react-icons/io5";


const commonStyle = 'flex justify-start items-center cursor-pointer '
const EditModelBox = ({
    user,
    parentTicketNo,
    handleCloseModel,
    handleChange,
    cabNumber,
    ReportedDate,
    age,
    slab,
    costCenter,
    team,
    location,
    do_service,
    do_supply,
    substatus,
    remarks
}) => {
  return (
    <div className='setting-wrapper bg-white'>
         <div className="setting-header">
          <div className="setting-logo">
            <span className="avatar-circle">
                <img src="https://api.dicebear.com/8.x/adventurer/svg?seed=zia" alt="avatar" />
            </span>
                <h1 className='flex flex-col justify-center items-start'>
                <Link className='p-0 capitalize font-thin shadow-none' to={`/settings/`}>{user}</Link>
                <p className=' opacity-75 font-extralight text-xs relative'>Parent Ticket : {parentTicketNo}</p>
                </h1>
            </div>
            <button className='text-3xl'
            onClick={handleCloseModel}
              >
               <IoMdCloseCircle/>
            </button>
        </div> 
        <div className="setting-body">
          <div className="setting-title">
                <IoSettings/>
                {cabNumber}
            </div>
        <p className="setting-description">
            Cabling Request against the parent ticekt no - {parentTicketNo}
        </p>
        <ul className="flex justify-self-end gap-2 mt-7 flex-col">
            <li className={commonStyle + ' gap-2'}>
                <MdDateRange/>
                <input onChange={handleChange} type="text" value={ReportedDate} />
            </li>
            
            <li  className={commonStyle + ' gap-2'}>
                <IoTime/>
                <input onChange={handleChange} type="text" value={age} />
            </li> 
            
            <li 
                className={commonStyle + ' gap-1'}>
                    <IoIosNavigate/> 
                    <input onChange={handleChange} type="text" value={slab}/>
            </li>
            
                <li className={commonStyle + ' gap-1'} >
                    <MdOutlineWork/>
                    <input onChange={handleChange} type="text"  value={substatus}/>
                </li>
                
                <li className={commonStyle + ' gap-1'} >
                    <RiTeamFill/>
                    <input onChange={handleChange} type="text" value={team} />
                </li>
                
                <li  className={commonStyle + ' gap-1'}>
                    <IoLocation/>
                    <input onChange={handleChange} type="text" value={location}/>
                </li>

        </ul>
        </div>
        <div className="setting-footer">
            <button 
                className="btn-secondary"
                onClick={handleCloseModel}
            >Cancel</button>
            <button 
                
            className="btn-primary"
            >Update</button>
        </div> 
        </div>
  )
}

export default EditModelBox