import React, { Component } from 'react';
import { connect } from "react-redux";

import { clearTerms, addTerm } from "../redux/stateInputSlice"
import StateInputRow from "./StateInputRow"

class StateInputGrid extends Component {
  constructor(props) {
    super(props);
    
    //When the grid get initalized, we remove all terms and add a new one
    this.props.clearTerms();
    this.props.addTerm();

    this.rows = [<StateInputRow key={0} name={'term1'}/>]
  }


  render() {
    while(this.rows.length < this.props.numRows) {
      this.rows.push(<StateInputRow key={this.rows.length} name={'term' + (this.rows.length+1)}/>)
    }
    
    return <div className='grid grid-cols-1 self-center place-items-center'>
            {this.rows}
        </div>
    }
}

const mapStateToProps = state => {
    return {
        numRows: state.stateInput.numTerms
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clearTerms: () => dispatch(clearTerms()),
        addTerm: () => dispatch(addTerm())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StateInputGrid);