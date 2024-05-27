import React, { useEffect, useState,useRef } from 'react'

import * as XLSX from 'xlsx';
import {  toast } from 'react-toastify';
import { FaFilePdf } from "react-icons/fa6";
import { SiMicrosoftexcel } from "react-icons/si";
import { Margin, usePDF } from "react-to-pdf";
import { useClickAway } from 'react-hook-click-away';

import useDocumentTitle from '../../hooks/useDocumentTitle'
import useUserActivity from '../../hooks/useUserActivity'
import { ToastOption } from '../Wrapper/ToastOption';
import errorTone from './tone/error.mp3';
import deleteTone from './tone/remove.mp3'
import resetTone from './tone/reset.mp3'
import softTone from './tone/delete.mp3'

const Pagination = React.lazy(()=> import('../util/Pagination'));
const FloatingBtn = React.lazy(()=> import('../util/FloatingBtn'));
const TableContainer = React.lazy(()=> import('./TableContainer')); 
const TableHead = React.lazy(()=> import('./TableHead'));
const TableBody = React.lazy(()=> import('./TableBody'));
const ContextMenu = React.lazy(()=> import('../util/ContextMenu'));
const Request = React.lazy(()=> import('../../container/Request'));
const Instruction = React.lazy(()=> import('../util/Instruction')); 
const UploadModel = React.lazy(()=> import('../Model/UploadModel'));
const SearchHandle = React.lazy(()=> import('../util/SearchHandle'));
const ModelBox = React.lazy(()=> import('../util/ModelBox'));


const TableLayout = () => {

  useDocumentTitle('Dashboard Page');
  useUserActivity();

  const [isVerified, setIsVerified] = useState(false);
  const [tableData , setTableData] = useState([]);
  const [page,setPage] = useState(10);
  const pageSet = [10,50,100,150,300,500];
  const [isloading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [EditObject, setEditObject] = useState({
    tn: "",
    date:"",
    age:"" , 
    slab:"",
    type:"" , 
    user:"",    
    loc:"",
    team:"",
    status:"",
    remarks:"",
  });

  const [contextTicket, setContextTicket] = useState("");
  const [ContextEditTicket, setContextEditTicket] = useState(EditObject);
  const [mode, setMode] = useState(localStorage?.getItem('m_mode'));
  const [isFileUploadModelActive, setIsFileUploadModelActive] = useState(true);
  const [watchListData , setWatchListData] = useState([]);

  const initialContextMenu = {
    show: false,
    x:0,
    y:0
  }

  const [contextMenu,setContextMenu] = useState(initialContextMenu);
  const contextMenuClose = () => setContextMenu(initialContextMenu);
  const contextRef = useRef(null);

  useClickAway(contextRef, () => {
    setContextMenu(initialContextMenu);
  });


  const getTableData = () =>{
    setIsLoading(true);
    const tableSet = [];
    const localData = JSON.parse(localStorage?.getItem('XLDATA'));

    if(localData){
      const IncidentTable = localData;
      for(let i=1;i<IncidentTable?.length;i++){
        var tempObj = {
          ticketNo: IncidentTable[i][0],
          Date: ExcelDateToJSDate(IncidentTable[i][1]).toDateString(),
          age: Math.round(IncidentTable[i][2]),
          slab: IncidentTable[i][3],
          serviceNowStatus: IncidentTable[i][4],
          type: IncidentTable[i][5],
          name: IncidentTable[i][6],
          ticketDetails: IncidentTable[i][7],
          ticketSummary: IncidentTable[i][8],
          workNote: IncidentTable[i][9],
          comment: IncidentTable[i][10],
          location: IncidentTable[i][11],
          subLocation: IncidentTable[i][12],
          vendor: IncidentTable[i][13],
          status: IncidentTable[i][14],
          remarks: IncidentTable[i][15],
          update: IncidentTable[i][16],
          serviceNow: IncidentTable[i][17]
        }
        tableSet.push(tempObj);
      }
      setTableData(tableSet)
      localStorage.setItem('formateIncidentData',JSON.stringify(tableSet));
      setIsClicked(!isClicked);
    }
    setIsLoading(false);
    
  }

  const countingStatus =  Object.groupBy(tableData, filter => filter.status);
  const statusArr = Object.keys(countingStatus)
  

  useEffect(()=>{
    const oldtable = JSON.parse(localStorage?.getItem('formateIncidentData'));
    if(oldtable){
      setTableData(oldtable);
      localStorage.removeItem('XLDATA')
    }else{
      getTableData();
    }

  },[isClicked])
  

  function ExcelDateToJSDate(date) {
    return new Date(Math.round((date - 25569)*86400*1000));
  }

  function playErr(){
    new Audio(errorTone).play()
  }

  function playDel(){
    new Audio(deleteTone).play()
  }

  function playReset(){
    new Audio(resetTone).play()
  }


  function playOther(){
    new Audio(softTone).play()
  }
  
  

  const deleteRowItem = (ticketNo)=>{
    if(isVerified){
      playDel();
      let newTableData = [];
      let storeData = JSON.parse(localStorage.getItem("formateIncidentData"));
      newTableData = storeData.filter(item => item.ticketNo !== ticketNo)
      localStorage.setItem("formateIncidentData",JSON.stringify(newTableData));
      setIsClicked(!isClicked);
      toast.success('Item removed!', ToastOption);
    }else{
      playErr();
      toast.error('You do not have permission to delete',ToastOption);
    }
  }

  const editRowItem = (data) =>{
    if(isVerified){
      setIsOpen(true);

    setEditObject({
      tn: data.ticketNo,
      date:data.Date,
      age:data.age,
      slab:data.slab,
      type:data.type,
      user:data.name,
      loc:data.location,
      team:data.vendor,
      status:data.status,
      remarks:data.remarks,
      subloc:data.subLocation

    })
    toast.info(`Edit user ${data.name}`, ToastOption);
    }else{
      playErr();
      toast.error('You do not have permission to edit', ToastOption);
    }
      
  }

  const { toPDF, targetRef } = usePDF({
    filename: "im-sheet.pdf",
    page: { margin: Margin.MEDIUM },
  });


  // json to excel
  const downloadExcel = (data) => {
    if(isVerified){
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, "im-datasheet.xlsx");
      toast.success('Downloaded Success!', ToastOption);
    }else{
      toast.error("You don't have permission to downlaod as excel sheet", ToastOption);
    }
  };


  useEffect(()=>{
    const userInfo = JSON.parse(localStorage?.getItem('userProfile'));

    if(userInfo){
      setIsVerified(userInfo?.user?.isVerified);
    }
  },[isVerified])

  const KeyToResetData = (e) =>{
    if(e.ctrlKey && e.altKey && e.key === 'i'){
      playReset();
      setTableData([])
      localStorage.removeItem('XLDATA');
      localStorage.removeItem('formateIncidentData');
      return toast.success('Data Formated!',ToastOption);

    }
  }

  useEffect(()=>{
    window.addEventListener('keydown',KeyToResetData);

    return () =>{
      window.removeEventListener('keydown',KeyToResetData)
    }
  },[])

  if(mode === 'Request'){
    return <Request/>
  }

  useEffect(()=>{
    let localWatchData = JSON.parse(localStorage.getItem('WatchListData'));

    if(!localWatchData) 
      return localStorage.setItem("WatchListData",JSON.stringify([]));

    setWatchListData(localWatchData);
    
  },[])
  
  return(
    <>
    {contextMenu.show && 
    <ContextMenu 
      contextRef={contextRef} 
      x={contextMenu.x} 
      y={contextMenu.y} 
      closeContextMenu={contextMenuClose}
      ticketNumber={contextTicket}
      serviceNowLink={`your-link${contextTicket}`}
      openEditWindow={()=>editRowItem(ContextEditTicket)}
      deleteContextTicket={()=>deleteRowItem(contextTicket)}
      addToFavList={()=> {
        watchListData.push(ContextEditTicket);
        localStorage.setItem('WatchListData',JSON.stringify(watchListData))
      }}
    />}
    {
      isOpen ? 
      <ModelBox 
        ticketNo="Edit mode"
        tn={EditObject.tn}
        date={EditObject.date}
        age={EditObject.age}
        slab={EditObject.slab}
        type={EditObject.type}
        user={EditObject.user}
        loc={EditObject.loc}
        team={EditObject.team}
        status={EditObject.status}
        remarks={EditObject.remarks}
        subloc={EditObject.subloc}
        handleChange={({target}) => {
        const {value, name} = target;
        setEditObject({...EditObject, [name]:value});
        // console.log(EditObject)
      }}
      handleCancel={()=> setIsOpen(!isOpen)}
      handleSave={()=>{
        const targetTicket = tableData.filter(val => val.ticketNo === EditObject.tn);

        for(let i=0;i<tableData.length;i++){
          if(tableData[i].ticketNo === targetTicket[0].ticketNo){
            // console.log(tableData[i].ticketNo, targetTicket[0].ticketNo);
              tableData[i].status = EditObject.status;
              tableData[i].vendor = EditObject.team;
              tableData[i].remarks = EditObject.remarks;
              tableData[i].loc = EditObject.loc;

          }
        }
        localStorage.setItem('formateIncidentData',JSON.stringify(tableData));
        toast.success('Updated Successfully!', ToastOption);

          setIsOpen(false)

      }}
       /> : null
    }
    
    <SearchHandle searchValue={search} method={(e) =>{
      setSearch(e.target.value)
    } }/>

    <div className='flex flex-wrap justify-left items-center gap-4 font-bold uppercase ml-4'>
        {
          statusArr.length > 0 ? <p className='p-2 bg-purple-500 text-white rounded-md animate-scale'>Total : {tableData?.length} </p> : null
        }
        {
          statusArr?.map((name,i) =>{
            return (
              <button key={i}
              onClick={() => {
                setSearch(name);
              }}
              className={name ==='Pending' || name==='Reopened' ? "p-2 bg-red-600 text-white cursor-pointer rounded-md animate-scale": " rounded-md p-2 bg-green-600 text-white cursor-pointer animate-scale"}>
                {name}
              </button>
            )
          })
        }
        
          {
            statusArr.length > 0 ? 
            <>
              <button 
            onClick={toPDF}
            className='outline-none animate-scale flex border border-red-600 p-2 rounded-md justify-center items-center gap-2'>
            <FaFilePdf/>
            PDF
          </button>    

          <button 
            onClick={()=>downloadExcel(tableData)}
            className='outline-none animate-scale flex border border-red-600 p-2 rounded-md justify-center items-center gap-2'>
            <SiMicrosoftexcel/>
            EXCEL
          </button>
            </> : null
          }   
        </div>
    {
      !tableData?.length > 0 ? 
      <Instruction sheetName="./incident.xlsx" TypeName="Incident">
        {
          isFileUploadModelActive ? 
          <UploadModel onClick={() => setIsFileUploadModelActive(false)}/> 
          : null
        }
      </Instruction>
      :
      <TableContainer propsTable={targetRef}>
      <TableHead/>

          {
             tableData.filter((dataField)=>{
              if(search === ""){
                return dataField;
              }else if(dataField.status.trim().toLowerCase().includes(search.trim().toLowerCase())){
                return dataField
              }else if(dataField.vendor.toLowerCase().trim().includes(search.toLowerCase().trim())){
                return dataField
              }else if(dataField.location.toLowerCase().trim().includes(search.toLowerCase().trim())){
                return dataField
              }else if(dataField.name.trim().toLowerCase().includes(search.trim().toLowerCase())){
                return dataField
              }else if(dataField.slab.trim().toLowerCase().includes(search.trim().toLowerCase())){
                return dataField
              }else if(dataField.subLocation.trim().toLowerCase().includes(search.trim().toLowerCase())){
                return dataField
              }else if(dataField.remarks.trim().toLowerCase().includes(search.trim().toLowerCase())){
                return dataField
              }else if(dataField.ticketNo.toString().trim().includes(search.trim())){
                return dataField
              }
            }).map((dataField,index)=>{
              return(
                <TableBody
                style={ (dataField.age > 3 && dataField.status !=="Resolved" ?
                   "text-red-600" : ( dataField.status === "Resolved" ? "text-green-600 " : null)) }
                key={index}
                serialNumber={index+1}
                ticketNo={dataField.ticketNo}
                reportedDate={dataField.Date}
                age={dataField.age}
                ageSlab={dataField.slab}
                type={dataField.type}
                userName={dataField.name}
                location={dataField.location}
                subLocation={dataField.subLocation}
                vendor={dataField.vendor}
                status={dataField.status}
                remarks={dataField.remarks}
                handleDelete={() =>deleteRowItem(dataField.ticketNo)}
                handleEdit={() =>editRowItem(dataField)} 
                handleContextMenu={(e) => {
                  e.preventDefault(); 
                  const {pageX, pageY} = e;
                  setContextMenu({show:true, x:pageX, y:pageY})
                  setContextTicket(dataField.ticketNo)
                  setContextEditTicket(dataField)
                }}
              />
              )
            })
          } 
      </TableContainer>
    }

    {
          tableData?.length ? <Pagination
          handlePage={(e)=> setPage(e.target.value)}
          >
          {
            pageSet.map((pageNumber,i) =>{
              return(
                <option  key={i} value={pageNumber}>
                  {pageNumber}
                </option>
              )
            })
          }
          </Pagination> : null
        }
       

        {
          (tableData.length > 10 && tableData?.length ) && <FloatingBtn/> 
        }
       

    </>
  )
}


export default TableLayout
