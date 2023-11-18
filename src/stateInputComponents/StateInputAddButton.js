import React, { Component } from 'react';
import { connect } from "react-redux";
import { addTerm } from '../redux/stateInputSlice';

class StateInputAddButton extends Component {
  constructor(props) {
    super(props);
  }
    render() {
      return <div className='flex flex-row justify-center'>
        <button className="border-2 border-black m-5 px-5" onClick={() => {this.props.addRow('', '')}}> Add Harmonic </button>
        </div>
    }
  }

const mapDispatchToProps = dispatch => {
    return {
        addRow: (harmonic, coeff) => {dispatch(addTerm({harmonic: harmonic, coeff: coeff}))}
    }
}
export default connect(() => {return {}}, mapDispatchToProps)(StateInputAddButton);