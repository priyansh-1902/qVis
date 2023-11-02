import React, { Component } from 'react';
import StateInputRow from './StateInputRow';

import StateInputAddButton from './StateInputAddButton';

class StateInputGrid extends Component {
  constructor(props) {
    super(props);
    
  }
  getRowCoef= (Coef)=> {
    console.log("parent received data from row " + Coef);
  };
  getRowNumber= (number)=> {
    console.log("parent received data from row " + number);
  };
  textInputChange = (event) => {
    this.setState({ value: event.target.value });
  };
  

    render() {
      return <div className='grid grid-cols-1 self-center place-items-center'>
        <StateInputRow getCoef={this.getRowCoef} getNumber={this.getRowNumber}/>
        <StateInputRow />
        <StateInputRow />
        <StateInputRow />
        <StateInputAddButton />
      </div>
    }
  }


  export default StateInputGrid;