import React, { Component } from 'react';
import StateInputRow from './StateInputRow';

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
  
  renderRows = (value) => {
    const rows = [];
    for(let i = 0; i<value ; i++ ){
      rows.push(
        <StateInputRow key={i} getCoef={this.getRowCoef} getNumber={this.getRowNumber}/>
      )
    }
    return rows
  }

    render() {
      return <div className='grid grid-cols-1 self-center place-items-center'>
        {this.renderRows(this.props.numRows)}
      </div>
    }
  }


  export default StateInputGrid;