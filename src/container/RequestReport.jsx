import React, { useEffect, useRef, useState } from 'react'
import MainContainer from '../component/Wrapper/MainContainer'
import HorizentalChart from '../charts/HorizentalChart';
import VendorCard from '../component/vendor/VendorCard';
import { HiViewGridAdd } from "react-icons/hi";
import { TbLayoutGridRemove } from "react-icons/tb";
import { toast } from 'react-toastify';
import { ToastOption } from '../component/Wrapper/ToastOption';

const ColorPallet = ["#874CCC","#F27BBD","#FFC94A","#5755FE","#41B06E","#D20062","#1C1678","#67729D"]


const RequestReport = () => {
  const [reqData, setReqData] = useState([]);
  const [overView , setOverView] = useState({});
  const [locationWiseData , setLocationWiseData] = useState([]);
  const [locationSubStatus, setLocationSubStatus] = useState([]);
  const [teamName, setTeamName] = useState([]);
  const [toTalRequestCall, setTotalRequestCall] = useState([])
  const [page, setPage] = useState(1);
  const [flag , setFlag] = useState(false);
  const dataCleanedRef = useRef(null);


  // cleaning and formatting request excel data

  const cleaningExcelRequestData = () =>{

    dataCleanedRef.current = null
    for(let i=0;i<reqData.length;i++){
      reqData[i].team = reqData[i].team.toString().replace(/\s+/g, ' ').trim();
      reqData[i].team = reqData[i].team.toString().toUpperCase();
      reqData[i].location = reqData[i].location.toString().toUpperCase();
      localStorage.setItem('formateRequestData',JSON?.stringify(reqData));
    }
    console.log("Data cleaned successfully")
    dataCleanedRef.current = true;
  }

  // getting over-view of request cabling calls
  const getInsightData = () =>{
    const subStatusData = Object?.groupBy(reqData, requestData => requestData.SubStatus);
    setOverView(subStatusData);
    getLocationSinght();
    setFlag(true);
  }

  const getLocationSinght = () =>{
    const tempLocationData = Object?.groupBy(reqData, requestData => requestData.location);
    setLocationWiseData(tempLocationData)
    let tempData = [];
    for(let i=0;i<Object.keys(tempLocationData)?.length;i++){
      let location = Object?.groupBy(Object.values(tempLocationData)[i], data => data.SubStatus );
      tempData.push(location)
    } 
    setLocationSubStatus(tempData);
  }

  function randomColor(colorNum, colors){
    if (colors < 1) colors = 1; // defaults to one color - avoid divide by zero
    return "hsl(" + (colorNum * (360 / colors) % 360) + ",100%,50%)";
}


const getVendorInsightData = () =>{
  const teamWiseData = Object?.groupBy(reqData, requestData => requestData.team);
  setTeamName(Object.keys(teamWiseData))
  let totalRequest = [];
  for(let i=0;i<Object.values(teamWiseData).length;i++){
    totalRequest.push(Object.values(teamWiseData)[i].length);
  }
  setTotalRequestCall(totalRequest);
  
}


  useEffect(()=>{
    let localRequestData = JSON?.parse(localStorage?.getItem('formateRequestData'));
    if(localRequestData) 
      setReqData(localRequestData);
  },[])

  useEffect(()=>{
    getInsightData();
    getVendorInsightData();
  },[flag])

  useEffect(()=>{
    cleaningExcelRequestData();
  },[dataCleanedRef.current])

  const selectedPageHandler = (selectedPage) =>{
    if(selectedPage >=1 && selectedPage <= Math.ceil(reqData.length/10) && selectedPage !== page)
      setPage(selectedPage)
    
    else 
       toast.error('No More data',ToastOption)
  }


  return (
    <MainContainer>
    <div className='lg:flex-nowrap flex-wrap w-full lg:h-[60vh] h-96 flex justify-center items-center '>
      <HorizentalChart
        label={ Object.keys(overView)} 
        dataset={[
          {
            label:"Total",
            data: (Object.values(overView)).map(val => val.length),
            backgroundColor: ColorPallet.map(val => val),
            borderRadius: 5,
          }
            ]
          }
      />
    </div> 

    {
      locationSubStatus.map((value,index) =>{
        return(
          <div key={index} className='lg:flex-nowrap flex-wrap w-full lg:h-[60vh] h-96 flex justify-center items-center mt-14 '>
            <HorizentalChart
              label={ Object.keys(value)} 
              dataset={[
                {
                  label:Object.keys(locationWiseData)[index],
                  data: Object.values(value).map(val => val.length),
                  backgroundColor: ColorPallet.map(val => val),
                  borderRadius: 5,
                }
                  ]
                }
            />
          </div>
        )
      })
    }
    <div 
      className='flex relative overflow-hidden 
      justify-between items-center p-1 rounded-md 
      float-right mr-6 mt-10 border
      border-stone-500 w-auto'
    >
       <TbLayoutGridRemove 
         onClick={() => selectedPageHandler(page - 1)}
         className='text-2xl z-10 cursor-pointer'
         />

        <input 
          className='bg-transparent w-auto text-center outline-none border-none'
          type="text"
          readOnly
          onChange={() => {}}
          value={`Visible: ${(10*page - 10)+1}-${((10*page - 10)+10)}`}
        />
        <HiViewGridAdd 
         onClick={() => selectedPageHandler(page + 1)}
         className='text-2xl z-10 cursor-pointer'
         />

    </div>

    <div  className={`lg:flex-nowrap flex-wrap w-full h-[60vh] flex justify-center items-center` }>
      <HorizentalChart
        label={reqData.slice((page*10 - 10) , page*10).map(val => val.CabNo)} 
        dataset={[
          {
            label: ["Age"],
            data: reqData.slice((page*10 - 10) , page*10).map(val => val.age) ,
            backgroundColor: reqData.map((_,i) => randomColor(Math.floor(Math.random() * 999), reqData.length)),
            borderRadius: 5,
          }
        ]}
      />
    </div>

    <div className='flex justify-center items-center flex-wrap gap-14 p-10'>
    {
      teamName.map((name,i) =>{
        return(
          <VendorCard
            key={i}
            ticketType="request"
            liveStausStyle= 'text-xl text-green-500 float-right animate-pulse'
            vendorName={name ? name : "#NA"}
            total={toTalRequestCall[i]}
            openCall='0'
            closedCall="0"
            requestCall={toTalRequestCall[i]}
            above="0"
            below="0"
          />
        )
      })
    }
  </div>

    <div className='invisible mb-12'>
      Hello World
    </div>
 
    </MainContainer>
  )
}

export default RequestReport