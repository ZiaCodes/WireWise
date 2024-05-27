import * as XLSX from 'xlsx';
import React, { useEffect, useState } from 'react'
import ReqContainer from '../component/Request/ReqContainer';
import ContextMenu from '../component/util/ContextMenu';
import { useRef } from 'react';
import { useClickAway } from 'react-hook-click-away';
import ReqBody from '../component/Request/ReqBody';
import Instruction from '../component/util/Instruction';
import SearchHandle from '../component/util/SearchHandle';
import { toast } from 'react-toastify';
import { ToastOption } from '../component/Wrapper/ToastOption';
import EditModelBox from '../component/Modelbox/EditModelBox';

const paginationStyle = "hover:text-white border border-white bg-green-400 p-2 w-8 h-8 flex justify-center items-center cursor-pointer hover:bg-red-600 "
const Request = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [tableData , setTableData] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [isClicked, setIsClicked] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [EditObject, setEditObject] = useState({
    cabNo: "",
    parentTicektNo:"",
    reportedDate:"",
    age:"" , 
    slab:"",
    user:"" , 
    costCenter:"",    
    team:"",
    location:"",
    SubStatus:"",
    doService:"",
    doSupply:"",
    remarks:"",
  });
  
  const [contextTicket, setContextTicket] = useState("");
  const [ContextEditTicket, setContextEditTicket] = useState(EditObject);

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

  const selectedPageHandler = (selectedPage) =>{
    if(selectedPage >=1 && selectedPage <= Math.ceil(tableData.length/10) && selectedPage !== page)
      setPage(selectedPage)
  }


  const fileReader =(oEvent) => {
       
    localStorage.removeItem('formateRequestData');
    setIsLoading(true);
    var oFile = oEvent.target.files[0];
    // var sFilename = oFile.name;

    var reader = new FileReader();
    // var result = {};

    reader.onload = function (e) {
        var data = e.target.result;
        data = new Uint8Array(data);
        var workbook = XLSX.read(data, {type: 'array'});
        // console.log(workbook);
        var result = {};
        workbook.SheetNames.forEach(function (sheetName) {
            var roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {header: 1});
            if (roa.length) result[sheetName] = roa;
        });
        // see the result, caution: it works after reader event is done.
        if(!result.Request){
          return toast.error('Invalid Sheet Name', ToastOption)
        }
        localStorage.setItem('Request',JSON.stringify(result.Request));
        setIsLoading(false);

        toast.success('Data Parsed, refresh', ToastOption)
       
    };
    reader.readAsArrayBuffer(oFile);
}


  const getTableData = () =>{
    setIsLoading(true);
    const tableSet = [];
    const localData = JSON?.parse(localStorage?.getItem('Request'));

    if(localData){
      const IncidentTable = localData;
      for(let i=1;i<IncidentTable?.length;i++){
        var tempObj = {
          CabNo: IncidentTable[i][0],
          ticketNo: IncidentTable[i][1],
          Date: ExcelDateToJSDate(IncidentTable[i][2]).toDateString(),
          age: Math.round(IncidentTable[i][3]),
          slab: Math.round(IncidentTable[i][3]) > 30 ? "Above 30" : "Below 30",
          user: IncidentTable[i][4],
          ApprovalGroup: IncidentTable[i][5],
          SubStatus: IncidentTable[i][6],
          requestSummary: IncidentTable[i][7],
          details: IncidentTable[i][8],
          team: IncidentTable[i][9],
          costCenter: IncidentTable[i][10],
          Do_service: IncidentTable[i][11],
          Do_supply: IncidentTable[i][12],
          location: IncidentTable[i][13],
        }
        tableSet.push(tempObj);
      }
      setTableData(tableSet)
      localStorage.setItem('formateRequestData',JSON.stringify(tableSet));
      setIsClicked(!isClicked);
    }
    setIsLoading(false);
    
  }

  function ExcelDateToJSDate(date) {
    return new Date(Math.round((date - 25569)*86400*1000));
  }

  useEffect(()=>{
    const oldtable = JSON?.parse(localStorage?.getItem('formateRequestData'));
    if(oldtable){
      localStorage?.removeItem('Request')
      setTableData(oldtable);
    }else{
      getTableData()
    }
  },[isClicked])

  const KeyToResetData = (e) =>{
    if(e.ctrlKey && e.altKey && e.key === 'd'){
      setTableData([])
      localStorage.removeItem('formateRequestData');
      return toast.success('Data Formated!',ToastOption);

    }
  }

  useEffect(()=>{
    window.addEventListener('keydown',KeyToResetData);

    return () =>{
      window.removeEventListener('keydown',KeyToResetData)
    }
  },[])


  const deleteRowItem = (CabNo)=>{
    if(isVerified){
      let newTableData = [];
      let storeData = JSON.parse(localStorage.getItem("formateRequestData"));
      newTableData = storeData.filter(item => item.CabNo !== CabNo)
      localStorage.setItem("formateRequestData",JSON.stringify(newTableData));
      setIsClicked(!isClicked);
      toast.success('Item removed!', ToastOption);
    }else{
      toast.error('You do not have permission to delete',ToastOption);
    }
  }

  const editRowItem = (data) =>{
    console.log(data)
    if(isVerified){
      setIsOpen(true);

    setEditObject({
      cabNo: data.CabNo,
      parentTicektNo:data.ticketNo,
      user: data.user,
      reportedDate: data.Date,
      age: data.age, 
      slab: data.slab, 
      costCenter: data.costCenter,    
      team: data.team,
      location: data.location,
      subStatus: data.SubStatus,
      doService: data.Do_service,
      doSupply:data.Do_supply,
      remarks:"",

    })
    toast.info(`Edit user ${data.user}`, ToastOption);
    }else{
      playErr();
      toast.error('You do not have permission to edit', ToastOption);
    }
  }


  useEffect(()=>{
    const userInfo = JSON.parse(localStorage?.getItem('userProfile'));

    if(userInfo){
      setIsVerified(userInfo?.user?.isVerified);
    }
  },[isVerified])

  return(
    <>
    {contextMenu.show && 
      <ContextMenu 
        contextRef={contextRef} 
        x={contextMenu.x} 
        y={contextMenu.y} 
        closeContextMenu={contextMenuClose}
        deleteContextTicket={()=>deleteRowItem(contextTicket)}
        openEditWindow={()=>editRowItem(ContextEditTicket)}
        ticketNumber={contextTicket}
        serviceNowLink={`https://tatasteel.service-now.com/now/nav/ui/search/0f8b85d0c7922010099a308dc7c2606a/params/search-term/${contextTicket}/global-search-data-config-id/c861cea2c7022010099a308dc7c26041/back-button-label/ServiceNow/search-context/now%2Fnav%2Fui`}
      />
    }

  {
      isOpen ? 
      <EditModelBox 
      user={EditObject.user}
      parentTicketNo={EditObject.parentTicektNo}
      handleCloseModel={() => setIsOpen(!isOpen)}
      cabNumber={EditObject.cabNo}
      ReportedDate={EditObject.reportedDate}
      age={EditObject.age + ' Days'}
      slab={EditObject.slab}
      team={EditObject.team}
      substatus={EditObject.SubStatus}
      location={EditObject.location}
      remarks={EditObject.remarks || " No Remarks"}
      handleChange={({target}) => {
      const {value, name} = target;
      setEditObject({...EditObject, [name]:value});
      // console.log(EditObject)
      }}
      handleCancel={()=> setIsOpen(!isOpen)}
      
       /> : null
    }

    <SearchHandle 
      searchValue={search} 
      method={(e) =>{
      setSearch(e.target.value)
      }}
    />
    {
      !tableData.length > 0  ? 
      <div>
        <InstructioToUpload 
          fileReader={(e) => fileReader(e)}
        />
      </div>
       : <ReqContainer>

    {
      tableData.filter((dataField)=>{
        if(search === ""){
          return dataField;
        }else if(dataField.SubStatus.trim().toLowerCase().includes(search.trim().toLowerCase())){
          return dataField
        }else if(dataField.team.toLowerCase().trim().includes(search.toLowerCase().trim())){
          return dataField
        }else if(dataField.location.toLowerCase().trim().includes(search.toLowerCase().trim())){
          return dataField
        }else if(dataField.user.trim().toLowerCase().includes(search.trim().toLowerCase())){
          return dataField
        }else if(dataField.slab.trim().toLowerCase().includes(search.trim().toLowerCase())){
          return dataField
        }else if(dataField.ticketNo.toString().trim().toLowerCase().includes(search.trim().toLowerCase())){
          return dataField
        }else if(dataField.CabNo.toString().trim().includes(search.trim())){
          return dataField
        }
      }).slice((page*10 - 10) , page*10).map((ticket,index) =>{
          return(
            <ReqBody
              key={index}
              index={(index+1)+ (10*page - 10)}
              CabNo={ticket.CabNo}
              ticketNo={ticket.ticketNo}
              Date={ticket.Date}
              age={ticket.age}
              slab={ticket.slab}
              user={ticket.user}
              costCenter={ticket.costCenter}
              team={ticket.team}
              location={ticket.location}
              Do_service={ticket.Do_service}
              Do_supply={ticket.Do_supply}
              SubStatus={ticket.SubStatus}
              handleContextMenu={(e) => {
                e.preventDefault(); 
                const {pageX, pageY} = e;
                setContextMenu({show:true, x:pageX, y:pageY})
                setContextTicket(ticket.CabNo)
                setContextEditTicket(ticket)
              }}
            />
          )
        })
    }
  </ReqContainer>
}
    {
      tableData.length > 0 && <div className='flex select-none flex-wrap justify-center items-center'>
        <span 
        onClick={()=> selectedPageHandler(page - 1)} 
        className={page > 1 ? 'hover:text-white rounded-tl-lg rounded-bl-lg p-2 h-8 flex justify-center items-center border border-white hover:hover:bg-red-600 cursor-pointer bg-green-400' : 'opacity-0'}>
          Prev
        </span>
        {
          [...Array(Math.ceil(tableData.length / 10))].map((_,index) =>{
            return <span
            onClick={()=> selectedPageHandler(index + 1)} 
            className={page === index+1 ? ' cursor-pointer font-bold p-2 bg-red-600 h-10 rounded-tr-lg rounded-bl-lg flex justify-center items-center text-white' : paginationStyle}
             key={index}>
              {index + 1}
              </span>
          })
        }          
        <span 
        onClick={()=> selectedPageHandler(page + 1)} 
        className={page < Math.ceil(tableData.length /10) ? 'hover:text-white rounded-tr-lg rounded-br-lg p-2 flex justify-center items-center border border-white h-8 hover:bg-red-600 cursor-pointer bg-green-400' : 'opacity-0'}>
            Next
        </span>
      </div>
    }
    <div className='p-4 w-full h-32 invisible'>
      Dummy Invisible Data
    </div>
    </>
  )
}

export default Request


const InstructioToUpload = ({fileReader}) =>{
  return( 
    <Instruction sheetName="./u_cabling_call_details.xlsx" TypeName="Request">
      <div className="animate-scale-up">
        <div className="modal-body">
          <button className="upload-area">
            <span className="upload-area-icon">
              <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="340.531" height="419.116" viewBox="0 0 340.531 419.116">
                <g id="files-new" clipPath="url(#clip-files-new)">
                  <path id="Union_2" data-name="Union 2" d="M-2904.708-8.885A39.292,39.292,0,0,1-2944-48.177V-388.708A39.292,39.292,0,0,1-2904.708-428h209.558a13.1,13.1,0,0,1,9.3,3.8l78.584,78.584a13.1,13.1,0,0,1,3.8,9.3V-48.177a39.292,39.292,0,0,1-39.292,39.292Zm-13.1-379.823V-48.177a13.1,13.1,0,0,0,13.1,13.1h261.947a13.1,13.1,0,0,0,13.1-13.1V-323.221h-52.39a26.2,26.2,0,0,1-26.194-26.195v-52.39h-196.46A13.1,13.1,0,0,0-2917.805-388.708Zm146.5,241.621a14.269,14.269,0,0,1-7.883-12.758v-19.113h-68.841c-7.869,0-7.87-47.619,0-47.619h68.842v-18.8a14.271,14.271,0,0,1,7.882-12.758,14.239,14.239,0,0,1,14.925,1.354l57.019,42.764c.242.185.328.485.555.671a13.9,13.9,0,0,1,2.751,3.292,14.57,14.57,0,0,1,.984,1.454,14.114,14.114,0,0,1,1.411,5.987,14.006,14.006,0,0,1-1.411,5.973,14.653,14.653,0,0,1-.984,1.468,13.9,13.9,0,0,1-2.751,3.293c-.228.2-.313.485-.555.671l-57.019,42.764a14.26,14.26,0,0,1-8.558,2.847A14.326,14.326,0,0,1-2771.3-147.087Z" transform="translate(2944 428)" fill="var(--c-action-primary)"/>
                </g>
              </svg> 
            </span>
            <span className="upload-area-title">Drop file here to upload.</span>
              <span className="relative upload-area-description">
                Alternatively, you can select a file by 
                <br/><strong>clicking here</strong>
                <input 
                className='absolute w-24 left-20 opacity-0 cursor-pointer'
                type="file" 
                accept=".xlsx,.xls"
                onInput={fileReader}
                name="upload"
                />
            </span>
          </button> 
        </div>
      </div>
    </Instruction>
)}