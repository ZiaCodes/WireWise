import { MdBugReport } from "react-icons/md";
import { ImHome } from "react-icons/im";
import { IoSettings } from "react-icons/io5";
import { Link } from "react-router-dom";


const NavLinks = () => {
  return (
    <ul 
        className="flex flex-col 
        text-red bg-transparent backdrop-blur-3xl
        right-0 top-16 shadow-lg p-8
        w-60 gap-4 flex-wrap z-50
        fixed
        "
    >
        <li className="bg-purple-600 text-white">
            <Link to='/'>
            <ImHome/>
             Home
            </Link>
        </li>
        
        <li className="bg-yellow-300 text-white">
            <Link to='/report'>
            <MdBugReport/>
             Report
            </Link>
        </li>
        <li className="bg-slate-600 text-white">
            <Link to='/settings'>
            <IoSettings/>
            Setting
            </Link>
        </li>
        
    </ul>
  )
}

export default NavLinks