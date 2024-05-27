import { useEffect, useState } from "react";
import NavLinks from "./NavLinks";
import { Link } from "react-router-dom";
import BottomNav from "./BottomNav";

import { SiNginxproxymanager } from "react-icons/si";
import { MdMenuOpen,MdMenu } from "react-icons/md";
const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAuth,setIsAuth] = useState(false);
    const [mode,setMode] = useState('Incident');

    const handlMenu = () =>{
        setIsOpen(!isOpen);
    }

    useEffect(()=>{
        let Jwt = JSON.parse(localStorage.getItem('userProfile'));
        if(Jwt?.user?.jwtToken){
            setIsAuth(true);
        }
      },[isAuth])

      useEffect(()=>{
        setMode(localStorage.getItem('m_mode'));
      },[mode])

if(localStorage?.getItem('navigationStyle') === 'Simple'){
    return <BottomNav/>
}

  return (
    <>
    <nav 
    className='fixed w-full top-0
    flex justify-between items-center
    bg-transparent backdrop-blur-3xl shadow-md z-50'
    >
    <p className="m-4 flex justify-center 
    items-center gap-2 uppercase
    text-blue-800 font-bold"
    >

    <SiNginxproxymanager 
    className="text-red-600 text-3xl "
    />
    <b className="text-red-600">
        {
            mode === 'Incident' ? "Incident" : "Request"
        }</b>Mangement
    </p>

    {
        isAuth ? 
        <>
        {
        !isOpen ? 
        <MdMenu 
            className="text-4xl mr-4
            text-red-600 cursor-pointer"
            onClick={handlMenu}
        /> :
        <MdMenuOpen 
            className="text-4xl mr-4 
            text-red-600 cursor-pointer"
            onClick={handlMenu}
        />
    }
        </> : null
    }

    </nav>
    {
        isOpen ? <NavLinks/> : null
    }
    </>
  )
}

export default Navigation


const SimpleNavigation = () =>{
    return (
        <nav 
            className='fixed w-full top-0 
            flex justify-between items-center
            bg-white shadow-md z-50'
        >
            <p className="m-4 flex justify-center 
            items-center gap-2 uppercase
            text-blue-800 font-bold"
            >
            <SiNginxproxymanager 
            className="text-red-600 text-3xl"
            />
            </p>

            <ul className="flex mr-2 gap-2">
                <li className="cursor-pointer text-black lg:text-xl lg:p-2 text-xs rounded-sm">
                <Link className="p-0 shadow-none" to='/'>
                    Dashboard
                </Link>
                </li>
                <li className="cursor-pointer text-black lg:text-xl lg:p-2 text-xs rounded-sm">
                    <Link className="p-0 shadow-none" to='/report'>
                        Report
                    </Link>
                </li>
                <li className="cursor-pointer text-black lg:text-xl lg:p-2 text-xs rounded-sm">
                    <Link className="p-0 shadow-none" to='/settings'>
                        Setting
                    </Link>
                </li>
            </ul>
        </nav>
    )
}