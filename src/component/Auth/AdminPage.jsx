import React from 'react'
import MainContainer from '../Wrapper/MainContainer'
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { createNewUser } from '../../apis/auth';

import {useState, useEffect } from 'react';
import { IoMdPersonAdd } from "react-icons/io";
import { IoIosLink } from "react-icons/io";
import { CgSpinnerTwoAlt } from 'react-icons/cg';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ToastOption } from '../Wrapper/ToastOption';

let commonStyle = 'p-2 outline-none bg-transparent border-b-2'
const AdminPage =() =>{

    const [isLoading,setIsLoading] = useState(false);
    const [user,setUser] = useState({});

    const navigate = useNavigate();
    useDocumentTitle('Admin Page')

    const [userInfo, setUserInfo] = useState({
        name:"",
        email:"",
        phoneNumber:"",
        gender:"",
        age:"",
        company:"",
        password:""

    });

    const handleRedirectToAllUser = () =>{
        if(user.role === "admin"){
            return navigate('/settings/admin-page/all-user');
        }else{
           return  toast.warning(`You are not authorized!`, ToastOption);
        }
    }


    const handleChange = ({target})=>{
        const {value,name} = target;
        setUserInfo({...userInfo,[name]:value});
      }

    const handleRegister = async(e) =>{
        e.preventDefault()

        setIsLoading(true);
        const response = await createNewUser(userInfo);
        if(response.error){
            setIsLoading(false);
            return toast.error(`${response.error}`, ToastOption);
        }
        
        setIsLoading(false);
        toast.success('User Added Successfully!', ToastOption);
    
      }


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
                return navigate('/settings',{replace:true})
            }
        }

    },[])


    return(
        <MainContainer>
            <div className='admin-page-wrapper'>
            <div className="setting-header">
            <div className="setting-logo">
                <span className="avatar-circle">
                    <IoMdPersonAdd/>
                </span>
                    <h1 className='flex flex-col justify-center items-start'>
                    <p className='p-0 capitalize font-thin shadow-none' >User Registration</p>
                    <p className=' opacity-75 font-extralight text-xs relative'>Add a new user by filling the form</p>
                    </h1>
                </div>
                <button
                    title='View all users'
                onClick={handleRedirectToAllUser} 
                className='setting-theme-btn'>
                    <IoIosLink/>
                </button>
            </div> 
            <div className="admin-page-body">
                <form onSubmit={handleRegister} 
                className='mt-5 flex flex-col flex-wrap gap-4'>
                    <input 
                        value={userInfo.name}
                        onChange={handleChange}
                        className={commonStyle}
                        placeholder='Full Name'
                        name='name'
                        type="text"
                    />
                    <input 
                        value={userInfo.email}
                        onChange={handleChange}
                        className={commonStyle} 
                        placeholder='Email' 
                        name='email'
                        type="email"
                    />
                    <input
                        value={userInfo.phoneNumber}
                        onChange={handleChange}
                        className={commonStyle}
                        placeholder='Phone Number'
                        name='phoneNumber'
                        type="text"
                    />
                    <input 
                        value={userInfo.company}
                        onChange={handleChange}
                        className={commonStyle} 
                        placeholder='Company' 
                        name='company'
                        type="text"
                    />
                    <input
                        value={userInfo.password}
                        onChange={handleChange}
                        className={commonStyle} 
                        placeholder='password' 
                        name='password'
                        type="text"
                        autoComplete='off'
                    />
                    <div className="w-full flex justify-end items-center mt-4">
                    <button 
                        className="btn-addUser-primary"
                        type='submit'
                    >
                        {
                            isLoading ? <CgSpinnerTwoAlt className='text-center animate-spin text-2xl'/> : "Add Now"
                        }
                    </button>
                    </div>
                </form>
            </div>
        </div>
    </MainContainer>

    )
}

export default AdminPage