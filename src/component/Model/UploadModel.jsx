import { useState } from "react";
import * as XLSX from 'xlsx';
import { LuLoader } from "react-icons/lu";
import { TbReload } from "react-icons/tb";
import {  toast } from 'react-toastify';
import { ToastOption } from "../Wrapper/ToastOption";


const UploadModel = () =>{

  const [xlData , setXlData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);

  const fileReader =(oEvent) => {
       
    localStorage.removeItem('XLDATA');
    localStorage.removeItem('formateIncidentData');
    localStorage.removeItem('ITSOL');
    localStorage.removeItem('MDSINHA');
    localStorage.removeItem('TECHNET')
    localStorage.removeItem('NATH&SONS')
    localStorage.removeItem('SKYLINK')
    localStorage.removeItem('WIZER')
    localStorage.removeItem('LASETEK')
    localStorage.removeItem('DEBUG')
    localStorage.removeItem('EMBEE')
    localStorage.removeItem('MDSINHA')

    setIsLoading(true);
    var oFile = oEvent.target.files[0];
    // var sFilename = oFile.name;
    setFileName(oFile);

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
        let incidentData = result?.Incident || result?.incident;
        if(!incidentData) {
            setIsLoading(false);
           return toast.error('Invalid Excel file', ToastOption);
        }else{
            localStorage.setItem('XLDATA', JSON.stringify(incidentData));
            setXlData(incidentData);
            setIsLoading(false);
            setFileUploaded(true);
            toast.success('Data parsed successfully', ToastOption);
        }
       
    };
    reader.readAsArrayBuffer(oFile);
  }

    return (
      <>
      {
        !fileUploaded ? 
        <div className="animate-scale-up">
        <div className="modal-body">
          <button className="upload-area">
            <span className="upload-area-icon">
              { !isLoading ? <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="340.531" height="419.116" viewBox="0 0 340.531 419.116">
                <g id="files-new" clipPath="url(#clip-files-new)">
                  <path id="Union_2" data-name="Union 2" d="M-2904.708-8.885A39.292,39.292,0,0,1-2944-48.177V-388.708A39.292,39.292,0,0,1-2904.708-428h209.558a13.1,13.1,0,0,1,9.3,3.8l78.584,78.584a13.1,13.1,0,0,1,3.8,9.3V-48.177a39.292,39.292,0,0,1-39.292,39.292Zm-13.1-379.823V-48.177a13.1,13.1,0,0,0,13.1,13.1h261.947a13.1,13.1,0,0,0,13.1-13.1V-323.221h-52.39a26.2,26.2,0,0,1-26.194-26.195v-52.39h-196.46A13.1,13.1,0,0,0-2917.805-388.708Zm146.5,241.621a14.269,14.269,0,0,1-7.883-12.758v-19.113h-68.841c-7.869,0-7.87-47.619,0-47.619h68.842v-18.8a14.271,14.271,0,0,1,7.882-12.758,14.239,14.239,0,0,1,14.925,1.354l57.019,42.764c.242.185.328.485.555.671a13.9,13.9,0,0,1,2.751,3.292,14.57,14.57,0,0,1,.984,1.454,14.114,14.114,0,0,1,1.411,5.987,14.006,14.006,0,0,1-1.411,5.973,14.653,14.653,0,0,1-.984,1.468,13.9,13.9,0,0,1-2.751,3.293c-.228.2-.313.485-.555.671l-57.019,42.764a14.26,14.26,0,0,1-8.558,2.847A14.326,14.326,0,0,1-2771.3-147.087Z" transform="translate(2944 428)" fill="var(--c-action-primary)"/>
                </g>
              </svg> : <LuLoader className="animate-spin text-center text-3xl"/>}
            </span>
            {
              !isLoading  ? <>
                <span className="upload-area-title">Drop file here to upload.</span>
                  <span className="relative upload-area-description">
                    Alternatively, you can select a file by 
                    <br/><strong>clicking here</strong>

                    <input 
                    className='absolute w-24 left-20 opacity-0 cursor-pointer'
                    type="file" 
                    accept=".xlsx,.xls"
                    onInput={(e) => fileReader(e)}
                    name="upload"
                    />
                </span>
              </> : <>
                <span className="text-slate-950 animate-pulse">Parsing data..</span>
                  <span className="relative upload-area-description">
                    {fileName?.name} 
                    <br/>
                    <p className="text-xs opacity-60">{`File Size: ${Math.round(fileName?.size / 1024)} KB` }</p>

                    <input 
                    className='absolute w-24 left-20 opacity-0 cursor-pointer'
                    type="file" 
                    accept=".xlsx,.xls"
                    onInput={(e) => fileReader(e)}
                    name="upload"
                    />
                </span>
              </>
            }
          </button> 
        </div>
      </div> : 
      <div className="modal" >
        <span className="flex flex-col justify-center items-center gap-2">
          <TbReload onClick={() => location.reload()}
            className="bg-green-600 rounded-full text-white w-20 h-20 p-2 text-center text-3xl hover:scale-105 cursor-pointer"/> Click the icon to load your data  
        </span>
      </div>
      }
      </>
    )
  }

  export default UploadModel