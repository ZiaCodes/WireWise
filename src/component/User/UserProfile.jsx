import React, { useEffect, useState } from 'react'
import MainContainer from '../Wrapper/MainContainer';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { forgetPassword } from '../../apis/auth';
import { ToastOption } from '../Wrapper/ToastOption';

import { HiDesktopComputer } from "react-icons/hi";
import { BiSolidContact } from "react-icons/bi";
import { ImOffice } from "react-icons/im";
import { MdSecurity } from "react-icons/md";
import { FaUserSecret } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoLocation } from "react-icons/io5";
import { GrLocationPin } from "react-icons/gr";
import { MdSyncProblem,MdDangerous, MdReportProblem, MdVerified, MdAttachEmail } from "react-icons/md";
import { toast } from 'react-toastify';

const findEmailByADID = (email) =>{
    let isADEmail = email.startsWith('8');
    if(isADEmail)
        return "ADID Email is not supported."
    
    return email;
}

const commonStyle = 'capitalize p-0 shadow-none transition-all font-light text-xs  hover:underline hover:text-red-600 cursor-pointer'

const UserProfile = () => {
    const [user,setUser] = useState({});
    const [osName,setOsName] = useState("");
    const [ipDetails,setIpDetails] = useState({});
    useDocumentTitle(`Profile | ${user?.name}`);

    const forgetPasswordHandle = async() =>{
        let targetEmail = findEmailByADID(user.email);
        if(targetEmail != user.email){
            return toast.error(`${targetEmail}`, ToastOption);
        }
        let res = await forgetPassword(targetEmail);
        if(res.error){
            return toast.error(`${res.error}`, ToastOption);
        }
        
        toast.success(`${res.message}`, ToastOption);

    }

    const changePasswordHandle = () =>{

        toast.error("Feature coming soon.", ToastOption);
    }


    useEffect(()=>{
        let localuser = JSON?.parse(localStorage?.getItem('userProfile'));
        if(localuser?.user){
            setUser(localuser.user);
        }

    },[])

    const getIPAddress = async() =>{
        const request = await fetch(`https://ipinfo.io/json?token=${import.meta.env.VITE_APP_IP_TOKEN}`)
        const jsonResponse = await request.json()
        setIpDetails(jsonResponse);
    }


    function getOS() {
        var userAgent = window.navigator.userAgent,
            platform = window.navigator.platform,
            macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
            windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
            iosPlatforms = ['iPhone', 'iPad', 'iPod'],
            os = null;
      
        if (macosPlatforms.indexOf(platform) !== -1) {
          os = 'Mac OS';
        } else if (iosPlatforms.indexOf(platform) !== -1) {
          os = 'iOS';
        } else if (windowsPlatforms.indexOf(platform) !== -1) {
          os = 'Windows';
        } else if (/Android/.test(userAgent)) {
          os = 'Android';
        } else if (!os && /Linux/.test(platform)) {
          os = 'Linux';
        }
      
        setOsName(os);
      }

      useEffect(()=>{
        getOS();
        getIPAddress()
      },[])
  return (
    <MainContainer>
        <div className='flex justify-start items-left m-4 gap-8'>
            <div className='w-40 h-40 overflow-hidden shadow-md p-2 hover:p-4 animate-scale'>
                <img src={`https://api.dicebear.com/8.x/adventurer/svg?seed=${user.name}`} alt="avatar" />
            </div>
            <div className='flex flex-col justify-start items-start'>
                <div className='flex justify-center items-center gap-2'>
                    <p className='text-2xl font-bold'>{user?.name}</p>
                    {
                        user.isVerified ? 
                        <MdVerified className='text-xl text-blue-600 animate-scale'/> : 
                        <MdReportProblem className='text-xl text-red-600'/>
                    }
                </div>
                <p className='font-thin text-gray-500'>{user?.gender}, {user?.age}</p>
            </div>
        </div>

        <hr className='bg-black opacity-50'/>
        <div className='flex flex-col m-4'>
            <p className='font-thin mb-4'>Basic Details</p>
            <div className='flex items-center gap-4'>
                <label htmlFor="name"><MdAttachEmail/> </label>
                <p>{user?.email}</p>
            </div>

            <div className='flex items-center gap-4'>
                <label htmlFor="name"><BiSolidContact/></label>
                <p className='capitalize'>{user?.phoneNumber}</p>
            </div>

            <div className='flex items-center gap-4'>
                <label htmlFor="name"><ImOffice/> </label>
                <p>{user?.company}</p>
            </div>
            <div className='flex items-center gap-4'>
                <label htmlFor="name">
                    <MdSecurity/>
                </label>
                <p className='capitalize'>{ipDetails.org}</p>
            </div>
            <div className='flex items-center gap-4'>
                <label htmlFor="name">
                    <IoLocation/>
                </label>
                <p className='capitalize'>{ipDetails.city}-{ipDetails.postal}, {ipDetails.country}</p>
            </div>
        </div>

        <hr className='bg-black opacity-50'/>

        <div className='flex flex-col m-4 gap-1'>
            <p className='font-thin mb-4'>Application Details</p>
            <div className='flex items-center gap-4'>
                <label htmlFor="name">
                    <FaUserSecret/>
                </label>
                <p className='capitalize'>{user?.role} (Role)</p>
            </div>
            <div className='flex items-center gap-4'>
                <label htmlFor="name">
                    <HiDesktopComputer/>
                </label>
                <p className='capitalize'>{osName}</p>
            </div>
            <div className='flex items-center gap-4'>
                <label htmlFor="name">
                    <GrLocationPin/>
                </label>
                <p className='capitalize'>{ipDetails.ip}</p>
            </div>
        </div>

        <hr className='bg-black opacity-50'/>
        <div className='flex flex-col m-4 gap-1'>
            <p className='font-thin mb-4'>Access Control</p>
            <div 
                className='flex justify-start items-center gap-4'>
                <label htmlFor="name"><RiLockPasswordFill/> </label>
                <a onClick={changePasswordHandle} className={commonStyle} href='#'>
                    Change Password
                </a>
            </div>
            <div 
            onClick={forgetPasswordHandle}
                className='flex justify-start items-center gap-4'>
                <label htmlFor="name"><MdSyncProblem/> </label>
                <p className={commonStyle}>
                    Forget Password
                </p>
            </div>
            <div className='flex justify-start items-center gap-4'>
                <label htmlFor="name"><MdDangerous className='text-red-600'/> </label>
                <p onClick={changePasswordHandle} className={commonStyle}>
                    Delete Account
                </p>
            </div>
        </div>
    </MainContainer>
  )
}

export default UserProfile