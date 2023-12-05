import React, { Component } from 'react';
import { connect } from "react-redux";
import { addTerm } from '../redux/stateInputSlice';
import { createRef } from 'react';
import Box from '@mui/material/Box';

var Latex = require('react-latex')

function stateToLatexString(){
    return '$e^{1}$'
}


class _stateDisplayLaTeX extends Component {
  constructor(props) {
    super(props);
    this.LatexString = stateToLatexString(props.value);
    this.ref = React.createRef();
  }
    
  render() {
      return <div ref={this.ref} > 
                <Latex output="mathml">
                    $\\gamma$
                </Latex> 
            </div>
    }
  }

  const mapStateToProps = state => {
    return {
        value: state.stateInput.terms
    }
}

const StateDisplayLaTeX = connect(mapStateToProps, () => {return {}}) (_stateDisplayLaTeX);
export default StateDisplayLaTeX;
