import React, { useState, useEffect, useRef } from "react";

const SearchHandle = ({searchValue,method}) => {
  const inputRef = useRef(null);
  const [isSearchActive, setIsSearchActive] = useState(false);
  
  const keyDownHandler = (e) =>{
    
    if( e.ctrlKey && e.key === 'm'){
      inputRef.current.focus();
      setIsSearchActive(true);
      inputRef.current.classList.add('animate-scale')
    }

    if(e.key === 'Escape'){
      inputRef.current.blur();
      setIsSearchActive(false);
    }
  }

  useEffect(()=>{
    window.addEventListener('keydown',keyDownHandler);

    return () =>{
      window.removeEventListener('keydown',keyDownHandler)
    }
  },[]);
  
  return (
    <div className="user-search-container ">
        <div className="user-search-input">
          <div className="w-full h-full">
            <input
            autoComplete="off"
              ref={inputRef}
              id="searchHandler"
              type="text"
              value={searchValue}
              onChange={method}
              placeholder="Search for a user"
              className="z-50"
              onAnimationEnd={() => {
                console.log('bug is there')
              }}
            />
            <p className="absolute top-1 right-2 font-extrabold">
              {
                !isSearchActive? <>
                <span 
                  className="shadow-md px-1 py-1 text-xs w-8 rounded-md font-bold">
                    ctrl</span>+<span className="shadow-md px-1 py-1 text-xs w-8 rounded-md font-bold">
                    m</span>
                </> : 
                  <span className="shadow-md px-1 py-1 text-xs w-8 rounded-md font-bold">
                  Esc</span>
              }
            </p>
          </div>
        </div>
      </div>
  )
}

export default SearchHandle