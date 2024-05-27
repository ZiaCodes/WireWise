import MainContainer from "../Wrapper/MainContainer"
import RequestHeader from "./ReqHeader"

const ReqContainer = ({children}) => {

  return (
    <MainContainer>
        <div className="container mx-auto px-4 sm:px-8 mb-10">
                <div 
                    className="-mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto">
                <div
                    className="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
                >
                    <table className="min-w-full leading-normal">
                        <RequestHeader/>
                    <tbody>
                        {children}
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
    </MainContainer>
  )
}

export default ReqContainer