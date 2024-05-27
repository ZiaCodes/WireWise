import { useEffect, useState } from "react";
import { getAllUsers } from "../../apis/auth";
import { Link } from "react-router-dom";

import { MdOutlineElectricBolt } from "react-icons/md";
import { BiSolidReport } from "react-icons/bi";
import { ImHome } from "react-icons/im";
import { IoSettings } from "react-icons/io5";
import { MdCompare } from "react-icons/md";
import { SiNginxproxymanager } from "react-icons/si";
import { ToastOption } from "../Wrapper/ToastOption";


const commonClass = 'shadow-none flex justify-center items-center'
const BottomNav = () => {

    const [user,setUser] = useState({});
    const [allUserData , setAllUserData] = useState([]);
    const [mode,setMode] = useState(null);

    const getAllUsersData = async() =>{
        let res = await getAllUsers();
        if(res.error) 
            return toast.error(`${response.error}`, ToastOption);
        
        let activeUser = res?.filter((user) => user.isOnline === true);
        setAllUserData(activeUser)
        
    }

    useEffect(()=>{
        getAllUsersData();
    },[allUserData.length])



    useEffect(()=>{
        let localUser = JSON?.parse(localStorage?.getItem('userProfile'));
        setUser(localUser?.user);
    },[])

    useEffect(()=>{
        setMode(localStorage.getItem('m_mode'));
      },[mode])
  return (
  <>
    <div 
    className='fixed w-full top-0 
    flex justify-between items-center bg-transparent backdrop-blur-3xl
    shadow-md z-50'
    >
        <p className="m-4 flex justify-center 
        items-center gap-2 uppercase
        text-blue-800 font-bold"
        >
        <SiNginxproxymanager 
        className="text-red-600 text-3xl"
        /> 
        <span className="lg:block md:block hidden">
        <b className="text-red-600">
        {
            mode === 'Incident' ? " Incident" : " Request"
        }</b> Mangement
        </span>
        </p>

        {
            user ? 
                <Link className="activeUserDashBoard" to={`/settings/${user?.id}`} >
                    {
                        allUserData.length > 0 ? 
                        allUserData?.map((usr,i) => {
                            return (
                                <div key={i} className="tooltip">
                                    <img 
                                    className="lg:w-10 lg:h-10 w-7 h-7 shadow-md border bg-white border-red-600 rounded-full"
                                    src={`https://api.dicebear.com/8.x/adventurer/svg?seed=${usr.name}`} alt={user.name} 
                                    />
                                    <span className="tooltiptext">{usr.name}</span>
                                </div>
                            )
                        }) : <MdOutlineElectricBolt title="Loading active users" className="animate-spin text-xl text-green-600 mr-4"/>
                    }
                </Link> : null
        }
    </div>
    {user ? <div 
        className='fixed w-full bottom-0 p-2
        grid grid-cols-4  divide-x
        bg-slate-900 text-white backdrop-blur-3xl shadow-md z-50'
    >
    

    <Link title="Home" className={commonClass} to='/'>
        <ImHome 
        className=" text-xl text-center  "
        />
    </Link>

    <Link title="Report" className={commonClass} to='/report'>
        <BiSolidReport 
        className=" text-xl text-center  "
        />
    </Link>

    <Link title="fav" className={commonClass} to='/watchlist'>
        <MdCompare 
        className=" text-xl text-center"
        />
    </Link>

    <Link title="setting" className={commonClass} to='/settings'>
        <IoSettings 
        className=" text-xl text-center  "
        />
    </Link>

    </div> : null}
    </>
  )
}

export default BottomNav

