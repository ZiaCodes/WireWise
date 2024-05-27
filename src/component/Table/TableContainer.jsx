const TableContainer = ({children,propsTable}) => {
  return (
    <div id="parentDivTable" className="flex  flex-col mx-4 overflow-x-auto ">
        <div className="sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-x-auto border rounded-md shadow-sm">
                        <table ref={propsTable}
                         className=" min-w-full text-left text-sm font-light animate-scale-up ">
                            {children}
                        </table>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TableContainer