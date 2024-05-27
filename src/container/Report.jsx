import React, { useEffect, useState } from 'react'
import MainContainer from '../component/Wrapper/MainContainer'
import VendorCard from '../component/vendor/VendorCard';

import DonutChart from '../charts/DonutChart';
import AnotherChart, { LocationChart } from '../charts/LineChart';
import AllCharts from '../charts/AllCharts';
import useDocumentTitle from '../hooks/useDocumentTitle';
import RequestReport from './RequestReport';
import { useNavigate } from 'react-router-dom';
import { ToastOption } from '../component/Wrapper/ToastOption';
import { toast } from 'react-toastify';

const Report = () => {
  useDocumentTitle("Report Page")
  const [callData, setCallData] = useState([]);
  const [vendorName, setVendorName] = useState([]);
  const [changeData, setChangeData] = useState(false)
  const [aboveLength, setAboveLength] = useState([]);
  const [belowLength, setBelowLength] = useState([]);
  const [openLength, setOpenLength] = useState([]);
  const [closeLength, setCloseLength] = useState([]);
  const [incidentLength, setIncidentLength] = useState([]);
  const [alertLength, setAlertLength] = useState([]);
  const [requestLength, setRequestLength] = useState([]);
  const [apReq, setApReq] = useState([]);
  const [workInProgress, setWorkInprogress] = useState([]);
  const [newAssign,setNewAssign] = useState([]);
  const [transfer, setTransfer] = useState([]);
  const [reopne, setReopne] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [locationCount, setLocationCOunt] = useState([]);
  const [mode,setMode] = useState(localStorage.getItem('m_mode'));
  const [user,setUser] = useState({});
  const navigate = useNavigate();


  const opneTicket =() =>{

      let open = [];
      let close = [];
      let incident = [];
      let alert = [];
      let request = [];
      let above = [];
      let below = [];
      let length = [];
      const vendors = Object?.groupBy(callData, vData => vData.vendor);
      localStorage.setItem('SKYLINK',JSON.stringify(vendors?.SKYLINK));
      localStorage.setItem('EMBEE',JSON.stringify(vendors?.EMBEE));
      localStorage.setItem('ITSOL',JSON.stringify(vendors?.ITSOL));
      localStorage.setItem('MDSINHA',JSON.stringify(vendors?.MDSINHA));
      localStorage.setItem('TECHNET',JSON.stringify(vendors?.TECHNET));
      localStorage.setItem('WIZER',JSON.stringify(vendors?.WIZER));
      localStorage.setItem('NATH&SONS',JSON.stringify(vendors?.[`NATH&SONS`]));
      localStorage.setItem('LASETEK',JSON.stringify(vendors?.LASETEK));
      localStorage.setItem('DEBUG',JSON.stringify(vendors?.DEBUG));
  
      const nwArr = Object.values(vendors);
      let aPReq = [];
      let wInprog = [];
      let newAssignment = [];
      let transfer = [];
      let reOpne = [];
  
      for(let i=0;i<nwArr?.length;i++){
        let opn =0;
        let cls=0;
        let inc =0;
        let alt=0;
        let req=0;
        let abv =0;
        let blw =0;
        let len =0;
        let ar =0;
        let wip =0;
        let newAss =0;
        let trans = 0;
        let reOpn = 0;
  
        for(let j=0;j<nwArr[i]?.length;j++){
          if(nwArr[i][j]?.status !=='Resolved'){
            opn++;
          }else{
            cls++;
          }
          if(nwArr[i][j]?.type === 'Incident'){
            inc++;
          }else if(nwArr[i][j]?.type === 'Alert'){
            alt++;
          }else{
            req++;
          }
  
          if(nwArr[i][j]?.slab === 'Below 3'){
            blw++;
          }else{
            abv++;
          }
  
          if(nwArr[i][j].status === 'AP required'){
            ar++;
          }
    
          if(nwArr[i][j].status === 'Work is in Progress'){
            wip++;
          }
  
          if(nwArr[i][j].status === 'Transfer'){
            trans++;
          }
  
          if(nwArr[i][j].status === 'New Assignment'){
            newAss++;
          }
  
          if(nwArr[i][j].status === 'Reopened'){
            reOpn++;
          }
  
        }
  
  
        open.push(opn);
        close.push(cls);
        incident.push(inc);
        alert.push(alt);
        request.push(req);
        above.push(abv);
        below.push(blw);
        length.push(len);
        aPReq.push(ar);
        wInprog.push(wip)
        newAssignment.push(newAss);
        transfer.push(trans);
        reOpne.push(reOpn);
  
      }
      setOpenLength(open);
      setCloseLength(close);
      setIncidentLength(incident);
      setAlertLength(alert);
      setAboveLength(above);
      setBelowLength(below);
      setRequestLength(request);
      setApReq(aPReq);
      setWorkInprogress(wInprog);
      setNewAssign(newAssignment)
      setTransfer(transfer);
      setReopne(reOpne);
  
  }

  
  function groupingVendor(){
    // console.log(callData.map((val) => val.vendor))
    const vendorCallGroup = Object?.groupBy(callData, vData => vData.vendor);
    setVendorName(Object.keys(vendorCallGroup));
    
  }

  useEffect(()=>{
    const localTableData = JSON.parse(localStorage.getItem('formateIncidentData'));
    if(localTableData){
      setCallData(localTableData);
      setChangeData(!changeData)
    }
  },[])

  useEffect(()=>{
    groupingVendor();
    opneTicket();
    getLocationData();
  },[changeData])


  function randomColor(colorNum, colors){
    if (colors < 1) colors = 1; // defaults to one color - avoid divide by zero
    return "hsl(" + (colorNum * (360 / colors) % 360) + ",100%,50%)";
}


const getLocationData = () =>{
  let locationCount = Object.groupBy(callData, loc => loc.location );
  setLocationCOunt(locationCount);
  
}

useEffect(()=>{
  let localuser = JSON?.parse(localStorage?.getItem('userProfile'));
  // console.log(localuser)
  if(localuser){
      setUser(localuser.user);
      
      let role = localuser?.user?.role;
      if(role === 'admin'){
          return console.log("welcome to admin page")
      }else{

          toast.warning('You are not authorized!', ToastOption);
          return navigate('/',{replace:true})
      }
  }

},[])


if(mode === 'Request'){
  return <RequestReport/>
}

  return (
    <>
    <MainContainer>

    <AllCharts 
      above={aboveLength.reduce((partialSum, a) => partialSum + a, 0)}
      below={belowLength.reduce((partialSum, a) => partialSum + a, 0)}
      open={openLength.reduce((partialSum, a) => partialSum + a, 0)}
      newAssignment={newAssign.reduce((partialSum, a) => partialSum + a, 0)}
      workInProgress={workInProgress.reduce((partialSum, a) => partialSum + a, 0)}
      aPRequired={apReq.reduce((partialSum, a) => partialSum + a, 0)}
      transfer={transfer.reduce((partialSum, a) => partialSum + a, 0)}
      reopen={reopne.reduce((partialSum, a) => partialSum + a, 0)}
    />

    <div className='flex justify-between items-center h-96 mt-80 lg:mt-4'>
        <DonutChart 
          label={vendorName.map((name)=> name)} 
          dataset={[
            {
              label:["Total"],
              data:vendorName.map((_,i)=> openLength[i]+closeLength[i]),
              backgroundColor: vendorName.map((_,i) => randomColor(Math.floor(Math.random() * 999), 10))
          },
        ]
      }
      />
    </div>

    <div className='flex justify-between items-center h-96'>
      <AnotherChart
        label={callData.map((tn,i) => tn.ticketNo)} 
        dataset={[
          {
            label:"Age",
            data:callData.map((tn,i) => tn.age).sort(function(a, b){return b-a}),
            backgroundColor: callData.map((_,i) => randomColor(Math.floor(Math.random() * 999), 10))
        }
      ]
    }
    />

    </div>

  </MainContainer>
      <div className='flex justify-center items-center flex-wrap gap-14 p-10'>
        {
          vendorName.map((vendorDetails,i) =>{
            return(
              <VendorCard 
              key={i}
              ticketType="incident"
              liveStausStyle={openLength[i] !== 0 ? 'text-xl text-green-500 float-right animate-pulse' : "text-xl text-gray-500 float-right"}
              vendorName={vendorDetails}
              total={openLength[i]+closeLength[i]}
              openCall={openLength[i]}
              closedCall={closeLength[i]}
              incidentCall={incidentLength[i] + alertLength[i]}
              // alertCall={alertLength[i]}
              // requestCall={requestLength[i]}
              above={aboveLength[i]}
              below={belowLength[i]}
              />
            )
            
          })
        }
      </div>

      <div>
        
        <div className='flex justify-between items-center h-96 lg:mt-4 mb-16'>
        <LocationChart 
          label={Object.keys(locationCount)} 
          dataset={[
            {
              label:["Day",],
              data:Object.values(locationCount).map((data,i) => data.length),
              backgroundColor: callData.map((_,i) => randomColor(Math.floor(Math.random() * 999), 10))
          },
        ]
      }
      />
    </div>
    </div>
  </>
  )
}

export default Report