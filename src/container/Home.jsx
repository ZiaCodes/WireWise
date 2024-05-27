import React,{Suspense} from 'react';
import Loader from '../component/util/Loader';
import MainContainer from '../component/Wrapper/MainContainer';
const TableLayout = React.lazy(() => import('../component/Table/TableLayout'));

const Home = () => {
  return (
    <MainContainer>
      <Suspense fallback={<Loader/>}>
      <TableLayout/>
    </Suspense>
    </MainContainer>
  )
}

export default Home