 
import MyForm from './components/form';
import LoadBalancerDemo from './loadBalancer';
import Alternate from './components/alternate';
import Random from './components/random';

function App() {
  return (
    <div >
     {/* <MyForm></MyForm> */}
     <LoadBalancerDemo></LoadBalancerDemo>
     <Alternate></Alternate>
     <Random></Random>
    </div>
  );
}

export default App;
