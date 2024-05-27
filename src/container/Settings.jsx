import React,{useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import MainContainer from '../component/Wrapper/MainContainer'
import useDocumentTitle from '../hooks/useDocumentTitle';
import { useTheme } from '../context';
import { ToastOption } from '../component/Wrapper/ToastOption'; 
import {  toast } from 'react-toastify';
import { IoSettings } from "react-icons/io5";
import { MdDarkMode,MdOutlineLightMode,MdDeveloperMode } from "react-icons/md";
import { IoIosNavigate, IoMdPersonAdd } from "react-icons/io";
import { FaDiceTwo } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { FaKeyboard } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { updateUserActiveStatus } from '../apis/auth';
import ShortCutkeys from '../component/util/ShortCutkeys';

const commonStyle = 'flex justify-start items-center cursor-pointer '
const Settings = () => {

    const [theme, setTheme] = useState(localStorage?.getItem('theme'));
    const [user, setUser] = useState("");
    const [mode,setMode] = useState(localStorage?.getItem('m_mode'));
    const [navStyle, setNavStyle] = useState(localStorage?.getItem('navigationStyle'));
    const [devMode, setDevMode] = useState('Off');
    const [shortCutBox , setShortCutBox] = useState(false);

    const navigate = useNavigate();
    const {toggleTheme} = useTheme();

    useDocumentTitle(`Setting Page | ${user?.name}`)
    

    const changeMMode = () =>{
        const localMode = localStorage?.getItem('m_mode');

        if(localMode === 'Incident'){
            setMode('Request');
            localStorage.setItem('m_mode','Request');
            toast.success('Mode changed to Request!', ToastOption);
        }else{
            setMode('Incident');
            localStorage.setItem('m_mode','Incident');
            toast.success('Mode changed to Incident!', ToastOption);
        }
    }

    const handleResetDashBoard = () =>{
        localStorage.removeItem('XLDATA');
        localStorage.removeItem('formateIncidentData');
        localStorage.removeItem('formateRequestData');
        localStorage.removeItem('Request');
        localStorage.removeItem('WatchListData');
        toast.success('Data Formated!', ToastOption);
    }


    const handleNavStyle = () =>{
        
        if(navStyle === 'Menu'){
            setNavStyle('Simple');
            localStorage?.setItem('navigationStyle','Simple')
        }else{
            setNavStyle('Menu');
            localStorage?.setItem('navigationStyle','Menu')
        }
        toast.success('Navigation changed!',ToastOption);
    }

    const handleDevMode = () =>{
        toast.error('Feature coming soon!', ToastOption);
    }

    const logoutFromApplication = async() =>{
        let res = await updateUserActiveStatus({userId: user.id, isOnline: false})
        if(res.error) return toast.error(`${res.error}`,ToastOption);

        toast.success(`Log-out successfully.`, ToastOption);
    }

    const handleLogout = () =>{
        logoutFromApplication();
        localStorage.removeItem('userProfile');
        navigate('/auth/login',{ replace: true });
        window.location.reload();
    }
    

    useEffect(()=>{
        let Jwt = JSON?.parse(localStorage?.getItem('userProfile'));
        if(Jwt?.user){
            setUser(Jwt?.user);
        }
    },[]);

    if(shortCutBox){
        return <ShortCutkeys onclick={()=>setShortCutBox(false)}/>
    }

    
    return(
        <MainContainer>
        <div className='setting-wrapper'>
         <div className="setting-header">
          <div className="setting-logo">
            <span className="avatar-circle">
                <img src={`https://api.dicebear.com/8.x/adventurer/svg?seed=${user.name}`} alt="avatar" />
            </span>
                <h1 className='flex flex-col justify-center items-start'>
                <Link className='p-0 capitalize font-thin shadow-none' to={`/settings/${user?.id}`}>{user?.name}</Link>
                <p className=' opacity-75 font-extralight text-xs relative'>Application access : {user.role}</p>
                </h1>
            </div>
            <button className='setting-theme-btn '
             onClick={() =>{
                toggleTheme();
                setTheme(localStorage?.getItem('theme'));
            }} >
                {
                    theme !== 'lightMode' ? 
                    <MdOutlineLightMode/> : <MdDarkMode/>
                }
            </button>
        </div> 
        <div className="setting-body">
          <div className="setting-title">
                <IoSettings/>
                General Setting
            </div>
        <p className="setting-description">
            Change your setting according to your prefernce.
        </p>
        <ul className="flex justify-self-end gap-2 mt-7 flex-col">
            <li className={commonStyle + ' gap-2'}>
                <FaUserCircle/>
                <Link className='p-0 hover:underline underline-offset-2 shadow-none capitalize font-normal' to={`/settings/${user?.id}`}>
                    My profile
                </Link>
            </li>
            <hr className='opacity-25' />
            <li  className={commonStyle + ' gap-2'}>
                <IoMdPersonAdd/>
                <Link className='p-0 hover:underline underline-offset-2 shadow-none capitalize font-normal' to={`/settings/admin-page`}>
                    Add User 
                </Link>
            </li> 
            <hr className='opacity-25' />
            <li 
                onClick={handleNavStyle}
                className={commonStyle + ' gap-1'}>
                    <IoIosNavigate/> Navigation style : {navStyle}
            </li>
            <hr className='opacity-25'/>
                <li className={commonStyle + ' gap-1'} onClick={changeMMode}>
                    <FaDiceTwo/>Application mode : {mode}
                </li>
                <hr className='opacity-25' />
                <li className={commonStyle + ' gap-1'} onClick={handleDevMode}>
                    <MdDeveloperMode/>Developer Option : {devMode}
                </li>
                <hr className='opacity-25' />
                <li onClick={() =>{
                    setShortCutBox(true);
                }} className={commonStyle + ' gap-1'}>
                    <FaKeyboard/>
                    Shortcut keys
                </li>

        </ul>
        </div>
        <div className="setting-footer">
            <button 
                className="btn-secondary"
                onClick={handleResetDashBoard}
            >Reset Data</button>
            <button 
                onClick={handleLogout}
            className="btn-primary"
            >Logout</button>
        </div> 
        </div>

    </MainContainer>
    )

}

export default Settings



            