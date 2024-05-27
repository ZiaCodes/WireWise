import React from 'react'

const tableHeadtitle = [
    {id: 0, name:"#"},
    {id: 1, name:"CAB No/Ticket"},
    {id: 2, name:"Reported Date"},
    {id: 3, name:"Age/Slab"},
    {id: 4, name:"User/Cost Center"},
    {id: 5, name:"Team/Location"},
    {id: 8, name:"DO (Service/Supply)"},
    {id: 6, name:"Substatus"}
]
const commonStyle = 'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'


const RequestHeader = () => {
  return (
    <thead>
        <tr>
            {
            tableHeadtitle.map((item,i) =>{
                return ( 
                <th key={i} className={commonStyle}>
                {item.name}
                </th>)
                })
            }
        </tr>
    </thead>
  )
}

export default RequestHeader