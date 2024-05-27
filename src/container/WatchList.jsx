import { useEffect,useState } from "react";
import MainContainer from '../component/Wrapper/MainContainer';
import useDocumentTitle from "../hooks/useDocumentTitle";
import { toast } from "react-toastify";
import { ToastOption } from "../component/Wrapper/ToastOption";
import { useNavigate } from "react-router-dom";

const WatchList = () => {
    useDocumentTitle(`Team Performance`);

    const [cabData , setCabData] = useState([]);
    const [team, setTeam] = useState([]);
    const [flag, setFlag] = useState(false);
    const [user,setUser] = useState({});
    const navigate = useNavigate();

    const getTeamList = () =>{
        const uniqueTeam = cabData ? Object?.groupBy(cabData, requestData => requestData.team) : [];
        setTeam(Object?.keys(uniqueTeam))
        setFlag(true);
    }

    const handleRedirectToAllUser = () =>{
        if(user.role === "admin"){
            return navigate('/settings/admin-page/all-user');
        }else{
           return  toast.warning(`You are not authorized!`, ToastOption);
        }
    }

    useEffect(()=>{
        let teamData = JSON?.parse(localStorage?.getItem('formateRequestData'));
        setCabData(teamData);
    },[])

    useEffect(()=>{
        getTeamList();
    },[flag])

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



    
  return (
    <MainContainer>
        <div className="w-full flex flex-wrap justify-evenly items-center h-20 gap-2">
            <div className="flex justify-center items-center gap-6">
                <label htmlFor="Team1">Team 1</label>
                <select name="team1" className="px-4 text-left py-2 w-auto rounded-lg outline-none text-xl">
                    {
                        team?.map((name,i)=>{
                            return <option 
                                className="outline-none border-none"
                                key={i} value={name}>
                                {name}
                            </option>
                        })
                    }
                </select>
            </div>

            <div className="flex justify-center items-center gap-6">
                <label htmlFor="Team1">Team 2</label>
                <select name="team2" className="px-4 py-2 text-left w-auto rounded-lg outline-none text-xl">
                {
                        team?.map((name,i)=>{
                            return <option key={i} value={name}>
                                {name}
                            </option>
                        })
                    }
                </select>
            </div>

        </div>

        <div className="w-full flex flex-wrap justify-evenly items-center h-20 gap-2">
            <button onClick={() => toast.info('Feature Coming soon', ToastOption)} className="bg-green-600 p-2 rounded-md text-white">Compare</button>
        </div>



        
    </MainContainer>
  )
}

export default WatchList


