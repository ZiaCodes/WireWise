import React from 'react'

const Instruction = ({children,sheetName,TypeName}) => {
  return (
    <div className='relative flex flex-wrap p-4 flex-col justify-center mt-8 items-center gap-8'>
      <div className='flex p-2 gap-2 flex-col flex-wrap justify-center items-left'>
        <h1 className='font-bold uppercase'>Instruction:</h1>
        <p className='flex flex-wrap gap-2'>Step-1 : Download the  
          <a 
          className='text-red-600 shadow-none m-0 p-0 capitalize hover:underline' 
          href={sheetName}
          download
          >{TypeName} Dashboard sheet</a></p>
        {/* <p>Step-2 : Fill your own data</p> */}
        <p>step-2 : Upload the same Excel sheet</p>
        <p><b>Note:</b> Please keep same sheetName i.e-{TypeName}</p>
      </div>
      {/* <p className='text-slate-500'>--------- OR ---------</p> */}
      {children}
      
    </div>
  )
}

export default Instruction