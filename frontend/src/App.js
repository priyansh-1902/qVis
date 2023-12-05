import StateInput from './stateInputComponents/StateInput';
import GraphSVG from './graphingComponents/GraphSVG';
import Header from './header/Header';


export default function App() {
  
    return (
      <div>
        <Header />
        <h1 className='text-center text-3xl font-bold m-8'>Quantum Harmonic Oscillator</h1>
        <StateInput />
        <GraphSVG />
      </div>
    )
};