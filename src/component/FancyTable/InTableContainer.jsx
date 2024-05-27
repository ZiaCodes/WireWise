import MainContainer from '../Wrapper/MainContainer'
import InTableHead from './InTableHead';

const InTableContainer = ({children}) => {

  return (
    <MainContainer>
        <div className="container mx-auto px-4 sm:px-8 mb-10">
            <div className="py-8">
                <div 
                    className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div
                    className="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
                >
                    <table className="min-w-full leading-normal">
                        <InTableHead/>
                    <tbody>
                        {children}
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
        </div>
    </MainContainer>
  )
}

export default InTableContainer