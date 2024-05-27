import React,{ useEffect,Suspense } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Loader from './component/util/Loader';
import { useState } from 'react';
import { useTheme } from './context';

const Navigation = React.lazy(()=> import('./component/Navigation/Navigation'))
import toggleTone from './component/Table/tone/toggle.mp3'
import MainRoutes from './routes';

function App() {

  const [user, setUser] = useState(JSON.parse(localStorage?.getItem('userProfile')));
  const {toggleTheme} = useTheme();

  
  const navigate = useNavigate();
  
    useEffect(()=>{
      let Jwt = JSON.parse(localStorage?.getItem('userProfile'));
      if(Jwt?.user){
        setUser(Jwt.user);
      }

      if(!Jwt?.user?.jwtToken){
          navigate('/auth/login',{replace:true});
        }
    },[])


  useEffect(()=>{
    const isModeExist = localStorage?.getItem('m_mode');
    const localMenuStyle = localStorage?.getItem('navigationStyle');
    if(!localMenuStyle){
      localStorage.setItem('navigationStyle','Simple');
    }
    if(!isModeExist){
      localStorage.setItem('m_mode','Incident');
    }
  },[])

  function playToggle(){
    new Audio(toggleTone).play();
  }


  const keyNavigateHandler = (e) =>{

    // console.log(e=e || window.event)

    if( e.ctrlKey && e.key === 'r'){
      window.location.reload(); 
    }

    if(!user?.user) return;
    if( e.altKey && e.key === 'h'){
      playToggle();
      navigate('/')      
    }

    if( e.altKey && e.key === 'r'){
      playToggle();
      navigate('/report')      
    }

    if( e.altKey && e.key === 'w'){
      playToggle();
      navigate('/watchlist')      
    }

    if( e.altKey && e.key === 's'){
      playToggle();
      navigate('/settings')      
    }

    if( e.altKey && e.key === 'p'){
      playToggle();
      navigate(`/settings/${user?.user.id}`)      
    }

    if( e.ctrlKey && e.key === 'r'){
      window.location.reload(); 
    }

    if(e.ctrlKey && e.key === '.'){
      playToggle();
      let localStyle = localStorage.getItem('navigationStyle');

      if(localStyle === 'Simple'){
        localStorage.setItem('navigationStyle','Menu');
      }else{
        localStorage.setItem('navigationStyle','Simple');
      }
    }

    if(e.ctrlKey && e.key === 'x'){
      playToggle();
      toggleTheme();
    }
  }

  useEffect(()=>{
    window.addEventListener('keydown',keyNavigateHandler);

    return () =>{
      window.removeEventListener('keydown',keyNavigateHandler)
    }
  },[])



  return (
    <>
    <ToastContainer 
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      style={{width:'250px',margin:'10px'}}

    />
    <Navigation/>
    <Suspense fallback={<Loader/>}>
      <MainRoutes/>
    </Suspense>
    </>
  )
}

export default App
