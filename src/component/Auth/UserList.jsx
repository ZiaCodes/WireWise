import React, { useEffect } from 'react'
import { getAllUsers } from '../../apis/auth';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { useNavigate } from 'react-router-dom';
import { ToastOption } from '../Wrapper/ToastOption';

import { GiElectric } from "react-icons/gi";
import { CgSpinnerTwoAlt } from 'react-icons/cg';
import { MdNotificationsActive } from 'react-icons/md';
import { useState } from 'react';
import { toast } from 'react-toastify';


const UserList = () => {
    const [allUserData, setAllUserData] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const [user, setUser] = useState({});

    const navigate = useNavigate();

    useDocumentTitle('Admin | All User')

    const getAllUsersData = async() =>{
        let res = await getAllUsers();
        if(res.error) 
            return toast.error(`${response.error}`, ToastOption);
        
        let filterUser = res?.filter((data) => data._id !== user.id);
        if(filterUser){
            setAllUserData(filterUser);
        }
        
    }

    const notifyUser = () =>{
        toast.loading('Notifying user',ToastOption);
      }


      useEffect(()=>{
        getAllUsersData();
    },[isLoading])

    useEffect(()=>{
        let localuser = JSON?.parse(localStorage?.getItem('userProfile'));
        setUser(localuser?.user);
        if(localuser){
            
            let role = localuser?.user?.role;
            if(role === 'admin'){
                return console.log("welcome to All user page")
            }else{

                toast.warning('You are not authorized!', ToastOption);
                return navigate('/settings',{replace:true})
            }
        }

    },[])

  return (
    <section className="mt-20 flex justify-end mr-6">

        <div className="animatedUsers-face lg:block hidden">
            <div className="user-face">
                {
                    allUserData.map((data) =>{
                        return(
                            <UserFaces arr={[`https://api.dicebear.com/8.x/adventurer/svg?seed=${data.name}`]}/>
                        )
                    })
                }
            </div>
        </div>
        <div className="box" id="box">
            <p className='text-center p-2'>All Users</p>
            {
                allUserData.length > 0 ? allUserData.map((userData) =>{
                    return(
                        <div key={userData._id} className="list">
                            <div className="imgbox">
                                <img 
                                    src={`https://api.dicebear.com/8.x/adventurer/svg?seed=${userData.name}`}
                                    alt="img"
                                />
                            </div>
                                <div className="content">
                                    <h2 
                                        onClick={notifyUser}
                                        className="rank">
                                        <small>
                                            <MdNotificationsActive/>
                                        </small>
                                    </h2>
                                    <h4 className='flex gap-0.5 justify-center items-start'>
                                        {userData.name} { userData.isOnline ? <GiElectric className="text-red-600 text-xs animate-pulse"/> : null }
                                    </h4>
                                    <p className='supporting-text'>{userData.email}</p>
                                    <p className='supporting-text'>{userData.company}</p>
                                    <p className='supporting-text'>{userData.role}</p>
                                    
                                </div>
                        </div>
                    )
                }) : 
                <div  className='flex justify-center items-center gap-2 mt-10'>
                    <CgSpinnerTwoAlt className='animate-spin text-4xl'/> Please wait ..
                </div>
            }
        </div>
    </section>
  )
}

export default UserList


const UserFaces = ({arr}) => {
    let x, y, size;
  
    const getRandomInt = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    };
  
    function getRandomColor() {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  
    return arr.map((value, i) => {
      x = getRandomInt(10, 70);
      y = getRandomInt(10, 70);
      size = getRandomInt(1, 10);
      return (
        <div
          key={i}
          style={{
            position: "absolute",
            top: `${y + i}%`,
            left: `${x + i}%`,
            width: `${size}vw`,
            height: `${size}vw`,
            borderRadius: `${size}vw`,
            background: getRandomColor()
          }}
        >
        <img  src={value} title="Imtsl" alt="avatar" />
        </div>
      );
    });
  };