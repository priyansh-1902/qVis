import React, { Component } from 'react';
import StateInputGrid from './StateInputGrid';
import StateInputAddButton from './StateInputAddButton';


class StateInput extends Component{
    constructor(props) {
        super(props);
        this.state = {
            numRows : 1
        }
      }
    //   getInputRows = this.state.numRows
      incrementInputRows = () => {
        this.setState(
            {numRows : this.state.numRows + 1}
        )
      }
      render() {
        return <div>
            <StateInputGrid numRows={this.state.numRows}/>
            <StateInputAddButton onClickFunc={this.incrementInputRows}/>
        </div>
        
      }
}

export default StateInput;