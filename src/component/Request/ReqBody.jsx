import React from 'react'
import { Link } from 'react-router-dom';

const commonStyle = 'px-5 py-5 border-b border-gray-200 bg-white text-sm';
const columnCommunStyle = 'whitespace-no-wrap capitalize'
const ReqBody = ({index,CabNo,ticketNo,Date,age,slab,user,costCenter,team,location,Do_service,Do_supply,SubStatus,handleContextMenu}) => {
  return (
        <tr 
            onContextMenu={handleContextMenu}
            className={`${age}` > 30 && `${SubStatus}` !== 'Closed' ?
            "text-red-600 hover:text-gray-600" : "text-gray-600 hover:text-slate-600"} 
            >
              <td className={commonStyle}>
                <p className=" whitespace-no-wrap">{index}</p>
                </td>
                <td className={commonStyle}>
                    <div className="flex">
                    <div className="ml-3">
                        <p className=" whitespace-no-wrap">
                        {CabNo}
                        </p>
                        <p className=" whitespace-no-wrap">
                            <Link className='p-0 shadow-none hover:underline' 
                            to={`/request/${ticketNo}`}
                            >
                            {ticketNo}
                            </Link>
                        </p>
                    </div>
                    </div>
                </td>
                <td className={commonStyle}>
                    <p className=" whitespace-no-wrap">
                        {Date}
                    </p>
                </td>
                <td className={commonStyle}>
                    <p className="whitespace-no-wrap">
                        {age} days
                    </p>
                    <p className={columnCommunStyle}>
                        {slab}
                    </p>
                </td>
                <td className={commonStyle}>
                    <p className=" whitespace-no-wrap">
                        {user}
                    </p>
                    <p className={columnCommunStyle}>
                        CC: {costCenter || "Awaiting"}
                    </p>
                </td>
                <td className={commonStyle}>
                    <p className=" whitespace-no-wrap">
                        {team}
                    </p>
                    <p className={columnCommunStyle}>
                        {location}
                    </p>
                </td>
                <td className={commonStyle}>
                    <p className=" whitespace-no-wrap">
                        {Do_service}
                    </p>
                    <p className={columnCommunStyle}>
                        {Do_supply}
                    </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <span
                    className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                    >
                    <span
                        aria-hidden
                        className={`${SubStatus}` !=="Closed" ? "absolute inset-0 opacity-50 rounded-full bg-red-200" : "absolute inset-0 opacity-50 rounded-full bg-green-200"}
                    ></span>
                    <span title={SubStatus} className="relative">
                        {SubStatus}
                    </span>
                    </span>
                </td>
        </tr>
  )
}

export default ReqBody