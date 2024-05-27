import React from 'react'
import MainContainer from '../Wrapper/MainContainer'
import { MdError } from 'react-icons/md'

const NotFound = () => {
  return (
    <MainContainer>
        <div className='flex justify-center items-center gap-2 h-96 lg:mt-52 mt-40'>
            <MdError/>
            <h4>Page Not Found</h4>
        </div>
    </MainContainer>
  )
}

export default NotFound