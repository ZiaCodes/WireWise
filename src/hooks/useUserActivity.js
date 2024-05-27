import { useRef, useEffect, useState } from 'react'
import { updateUserActiveStatus } from '../apis/auth';
import { toast } from 'react-toastify';
import { ToastOption } from '../component/Wrapper/ToastOption';

function useUserActivity() {
  const defaultUser = useRef(JSON.parse(localStorage.getItem('userProfile')));
  const initailLoggedIn = useRef(true)
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const checkForInactivity = () =>{
    const expireTime = localStorage.getItem('expireTime');

    if(expireTime < Date.now()){
      initailLoggedIn.current = false;
      setIsLoggedIn(initailLoggedIn.current)
      if(!initailLoggedIn.current){
        updateUserStatus();
      }
    }
  }

  const updateExpireTime = () =>{
    const expireTime = Date.now() + 100000;
    initailLoggedIn.current = true
    setIsLoggedIn(initailLoggedIn.current);
    localStorage.setItem('expireTime',expireTime);

    // if(initailLoggedIn.current){
    //   updateUserStatus();
    // }
  }

  useEffect(()=>{
    const interval = setInterval(() => {
      checkForInactivity();
    },100000);

    return () => clearInterval(interval);
  },[])

  useEffect(()=>{
    // set initial expireTime
    updateExpireTime();

    // set event listners
    window.addEventListener('click',updateExpireTime);
    window.addEventListener('keypress',updateExpireTime);
    window.addEventListener('scroll',updateExpireTime);
    window.addEventListener('mousemove',updateExpireTime);
    window.addEventListener('wheel',updateExpireTime);

    // clean up
    return () =>{
      window.addEventListener('click',updateExpireTime);
      window.addEventListener('keypress',updateExpireTime);
      window.addEventListener('scroll',updateExpireTime);
      window.addEventListener('mousemove',updateExpireTime);
      window.addEventListener('wheel',updateExpireTime);
    }
  },[])

const updateUserStatus = async() =>{
  const user_id = defaultUser.current.user.id;
  const res = await updateUserActiveStatus({userId : user_id, isOnline: initailLoggedIn.current});
  if(res.error) {
     return toast.error(`${res.error}`, ToastOption);
  }

}

  useEffect(()=>{
      updateUserStatus()
  },[isLoggedIn])

}

export default useUserActivity