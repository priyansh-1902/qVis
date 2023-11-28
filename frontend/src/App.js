import logo from './logo.svg';
import './App.css';
import StateInput from './stateInputComponents/StateInput';
import GraphSVG from './graphingComponents/GraphSVG';


export default function App() {
  
    return (
      <div>
        <h1 className='text-center text-3xl font-bold m-8'>Visualizing the States of a Quantum Harmonic Oscillator</h1>
        <StateInput />
        <GraphSVG />
      </div>
    )
};
