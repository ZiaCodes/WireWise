import React, { useEffect, useState } from 'react'
import MainContainer from '../Wrapper/MainContainer'
import { Link, useParams } from 'react-router-dom'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from "recharts";
import TableContainer from '../Table/TableContainer';
import {VendorTableHead} from '../Table/TableHead';
import { VendorTableBody } from '../Table/TableBody';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import InTableContainer from '../FancyTable/InTableContainer';

  
  const getIntroOfPage = (label) => {
    if (label === "Resolved") {
      return "Calls which are resolved";
    }
    if (label === "Pending") {
      return "Calls which are not resolved";
    }

    if (label === "Below 3") {
        return "Age Less than 3 days";
    }
    if (label === "Above 3") {
        return "Age greater than 3 days";
    }
    return "";
  };
  
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label} : ${payload[0].value}`}</p>
          <p className="intro">{getIntroOfPage(label)}</p>
        </div>
      );
    }
  
    return null;
  };

const Vendor = () => {

    const [tickets,setTickets] = useState([]);
    const [aboveLength, setAboveLength] = useState(0);
    const [belowLength, setBelowLength] = useState(0);
    const [openLength, setOpenLength] = useState(0);
    const [closeLength, setCloseLength] = useState(0);
    const vendorParam = useParams()
    const {vendor} = vendorParam;

    useDocumentTitle(`Vendor Page : ${vendor}`)
    const StatusData = [
        {
          name: "Resolved",
          status: closeLength,
          fill:'#008000'
        },
        {
          name: "Pending",
          status: openLength,
          fill:'#ff0000'
        },
      ];

      const slabData = [
        {
          name: "Below 3",
          ageSlab: belowLength,
          fill:'#008000'
        },
        {
          name: "Above 3",
          ageSlab: aboveLength,
          fill:'#ff0000'
        },
      ];

    const getVendorData = () =>{
        const vendorData = JSON.parse(localStorage?.getItem(vendor))
        setTickets(vendorData);
    }
    useEffect(()=>{
        getVendorData();
    },[])


    const tciketStatusData = () =>{
      let open = 0;
      let close = 0;
      let abv =0;
      let blw = 0;

      for(let i=0;i<tickets?.length;i++){
        if(tickets[i].status != 'Resolved'){
          open++;
        }else{
          close++;
        }

        if(tickets[i].age > 3){
          abv++;
        }else{
          blw++;
        }
      }

      setOpenLength(open);
      setCloseLength(close);
      setAboveLength(abv);
      setBelowLength(blw)
      
    }

    useEffect(()=>{
      tciketStatusData();
    },[tickets])

  return (
    <>
    <MainContainer>
        <div className='flex justify-start font-bold items-left m-4'>
                <span className='font-bold text-white bg-red-600 p-2 rounded-sm'>
                    {vendor}
                </span>
                <span className='vendorToolTip'>
                    {tickets?.length}
                </span>

        </div>

        <div className='lg:flex-nowrap flex-wrap w-full h-96 gap-8 flex p-12 justify-center items-center '>
      <ResponsiveContainer  >
      <BarChart
          width={500}
          height={300}
          data={StatusData}
          key={1}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="status" barSize={20} fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      <ResponsiveContainer width='100%' height='100%'>
      <BarChart
          width={100}
          height={200}
          data={slabData}
          key={1}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="ageSlab" barSize={20} fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      </div>
    </MainContainer>

    <div className='lg:mt-10 mt-80'>
    <InTableContainer>
    {
        tickets?.length > 0 ?
        tickets?.map((ticket,index) =>{
            return(
                <tr 
                    className={`${ticket.age}` > 3 && `${ticket.status}` !== 'Resolved' ?
                          "text-red-600 hover:text-gray-600" : "text-gray-600 hover:text-slate-600"} 
                          key={index}
                    >
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex">
                        <div className="ml-3">
                            <p className=" whitespace-no-wrap">
                            {ticket.name}
                            </p>
                            <p className=" whitespace-no-wrap">
                            <Link className='p-0 shadow-none hover:underline' 

                            to={`/incident/${ticket.ticketNo}`}
                            >
                            {ticket.ticketNo}
                            </Link>
                            </p>
                        </div>
                        </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className=" whitespace-no-wrap">{ticket.age} Days</p>
                        <p className=" whitespace-no-wrap">{ticket.slab}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className=" whitespace-no-wrap">{ticket.vendor}</p>
                        <p className=" whitespace-no-wrap capitalize">{ticket.location}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span
                        className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                        >
                        <span
                            aria-hidden
                            className={`${ticket.status}` !=="Resolved" ? "absolute inset-0 opacity-50 rounded-full bg-red-200" : "absolute inset-0 opacity-50 rounded-full bg-green-200"}
                        ></span>
                        <span title={ticket.remarks} className="relative">
                            {ticket.status}
                        </span>
                        </span>
                    </td>
                </tr>
            )
        }) : 
        <p className="text-center p-2">No Data</p>
    }
      </InTableContainer>
    </div>

    <div className='invisible mb-20'>
      Hello world
    </div>
    </>
  )
}

export default Vendor