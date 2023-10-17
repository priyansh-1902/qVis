import logo from './logo.svg';
import './App.css';
import StateInputGrid from './stateInputComponents/StateInputGrid';
import StateInputAddButton from './stateInputComponents/StateInputAddButton';


export default function App() {
  
    return (
      <div>
        <h1 className='text-center text-3xl font-bold m-8'>Visualizing the States of a Quantum Harmonic Oscillator</h1>
        <StateInputGrid />
      </div>
    )
};
