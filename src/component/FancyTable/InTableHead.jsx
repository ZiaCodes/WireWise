import React from 'react'

const tableHeadtitle = [
    {id: 1, name:"User/Ticket"},
    {id: 2, name:"Age/Slab"},
    {id: 3, name:"Team/Location"},
    {id: 4, name:"Status"}
]
const commonStyle = 'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'


const InTableHead = () => {
  return (
    <thead>
        <tr>
            {
            tableHeadtitle.map((item) =>{
                return ( <th
                    className={commonStyle}>
                        {item.name}
                    </th>)
                })
            }
        </tr>
    </thead>
  )
}

export default InTableHead