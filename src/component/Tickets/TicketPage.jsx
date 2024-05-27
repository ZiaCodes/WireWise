import React,{ useEffect,useState } from 'react';
import MainContainer from '../Wrapper/MainContainer'
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { Link, useParams } from 'react-router-dom';

import { FaClipboardUser } from "react-icons/fa6";
import { IoLocation } from "react-icons/io5";
import { BsCalendarDateFill } from "react-icons/bs";
import { PiTimerFill } from "react-icons/pi";
import { TbListDetails,TbMessagePlus } from "react-icons/tb";
import { FaUsersCog } from "react-icons/fa";
import { PiNotepadFill } from "react-icons/pi";

const TicketPage = () => {

  const vendorParam = useParams()
  const {ticket} = vendorParam;
  
    useDocumentTitle(`Ticket Page : ${ticket}`)
    const [targetTicket,setTargetTicket] = useState({});
    const [isClicked, setIsClicked] = useState(false);
    const [isClickedComment, setIsClickedComment] = useState(false);
    const [isClickedWorkNote, setIsClickedWorkNote] = useState(false);


    console.log(targetTicket.workNote)

    const findingTicket = () =>{
      const data = JSON.parse(localStorage?.getItem('formateIncidentData'));
      for(let i=0;i<data?.length;i++){
        if(data[i].ticketNo == ticket){
          setTargetTicket(data[i])
        }
      }
    }


const readMoreTxt = () =>{
  
  if(isClicked){
    let element = document.querySelector('.ticket__description');
    setIsClicked(false);
    element.classList.add('long__text')
  }else{
    let element = document.querySelector('.ticket__description');
    setIsClicked(true);
    element.classList.remove('long__text')
  }

}

const readMoreTxtComment = () =>{
  if(isClickedComment){
    let element = document.querySelector('.ticket__comments');
    setIsClickedComment(false);
    element.classList.add('long__text')
  }else{
    let element = document.querySelector('.ticket__comments');
    setIsClickedComment(true);
    element.classList.remove('long__text')
  }

}

const readMoreWorkNote = () =>{
  if(isClickedWorkNote){
    let element = document.querySelector('.ticket__worknote');
    setIsClickedWorkNote(false);
    element.classList.add('long__text')
  }else{
    let element = document.querySelector('.ticket__worknote');
    setIsClickedWorkNote(true);
    element.classList.remove('long__text')
  }
}

// text formatter



useEffect(()=>{
  findingTicket();    
},[ticket])

  return (
    <MainContainer>
        <div className='flex justify-start font-bold items-left m-4'>
          <span className={targetTicket.status !== 'Resolved' ? 'font-bold text-white bg-red-600 p-2 rounded-sm' : 'font-bold text-white bg-green-600 p-2 rounded-sm'}>
            <a className='shadow-none p-0' target='_blank'
            href={`https://tatasteel.service-now.com/now/nav/ui/search/0f8b85d0c7922010099a308dc7c2606a/params/search-term/${ticket}/global-search-data-config-id/c861cea2c7022010099a308dc7c26041/back-button-label/Incident%20-%2005750836/search-context/now%2Fnav%2Fui`}>
            {ticket}
            </a>
          </span>
          <span className='vendorToolTip animate-pulse'>
              {
                targetTicket.status !== 'Resolved' ? 'P' : 'R'
              }
          </span>
        </div>

        <hr />

        <div className='m-4'>
          <p className='flex gap-2 items-center p-2'>
            <FaClipboardUser className='text-xl'/> {targetTicket.name}
          </p>

          <p className='flex gap-2 items-center p-2'>
            <IoLocation className='text-xl animate-bounce'/> {targetTicket.location}
          </p>

          <p className='flex gap-2 items-center p-2'>
            <BsCalendarDateFill className='text-xl'/> {targetTicket.Date}
          </p>

          <p className='flex gap-2 items-center p-2'>
            <FaUsersCog className='text-xl'/> 
             {
              localStorage.getItem(targetTicket.vendor) ? <Link className='shadow-none p-0' to={`/team/incident/${targetTicket.vendor}`}>
              {targetTicket.vendor} TEAM
              </Link> : `${targetTicket.vendor} TEAM`
             }
             
          </p>


          <p className={ targetTicket.age > 3 ? `flex gap-2 items-center p-2 text-red-600` : `flex gap-2 items-center p-2 text-green-600` }>
            <PiTimerFill className='text-xl animate-spin'/> {targetTicket.age} Days
          </p>

          <p className='flex gap-2 items-center p-2'>
            <PiNotepadFill className='text-xl'/> {targetTicket.remarks}
          </p>


          <p className='flex gap-2 items-center p-2'>
            <TbListDetails className='text-xl'/><pre>{targetTicket.ticketSummary}</pre>
          </p>
          
        </div>

        <hr />

        <div className='m-4'>
          <p className='long__text ticket__description'>
            <pre>{targetTicket.ticketDetails} </pre>
          </p>
           {
            isClicked ? <span
            onClick={readMoreTxt}
             className='cursor-pointer text-green-600 underline'>
              Read Less..
            </span>  : <span
            onClick={readMoreTxt}
             className='cursor-pointer text-green-600 underline'>
              Read More..
            </span> 
           }
        </div>

        <hr/>

        <div className='m-4'>
        <p className='long__text ticket__comments'>
            <pre>{targetTicket.comment} </pre>
          </p>
           {
            isClickedComment ? <span
            onClick={readMoreTxtComment}
             className='cursor-pointer text-green-600 underline'>
              Read Less..
            </span>  : <span
            onClick={readMoreTxtComment}
             className='cursor-pointer text-green-600 underline'>
              Read More..
            </span> 
           }
        </div>


        <hr />

        <div className='m-4'>
        <p className='long__text ticket__worknote '>
        <pre>{targetTicket.workNote}</pre>
          </p>
           {
            isClickedWorkNote ? <span
            onClick={readMoreWorkNote}
             className='cursor-pointer text-green-600 underline'>
              Read Less..
            </span>  : <span
            onClick={readMoreWorkNote}
             className='cursor-pointer text-green-600 underline'>
              Read More..
            </span> 
           }
        </div>

        <hr />

        <div className='m-4'>
          <p className='flex items-center gap-2'>
            <TbMessagePlus/> Two Way Communication 
          </p>

          <p className='m-4 animate-pulse'>Feature coming soon</p>
        </div>

        <div className='h-20 invisible'>
          Hello world
        </div>
    </MainContainer>
  )
}

export default TicketPage