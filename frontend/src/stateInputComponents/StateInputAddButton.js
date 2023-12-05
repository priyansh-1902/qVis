import React, { Component } from 'react';
import { connect } from "react-redux";
import { addTerm } from '../redux/stateInputSlice';

import Button from '@mui/material/Button';

class StateInputAddButton extends Component {
  constructor(props) {
    super(props);
  }
    render() {
      return <div className='flex flex-row justify-center my-2'>
        <Button variant="contained" onClick={() => {this.props.addRow('', '')}}> Add Harmonic </Button>
        </div>
    }
  }

const mapDispatchToProps = dispatch => {
    return {
        addRow: (harmonic, coeff) => {dispatch(addTerm({harmonic: harmonic, coeff: coeff}))}
    }
}
export default connect(() => {return {}}, mapDispatchToProps)(StateInputAddButton);