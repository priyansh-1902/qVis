import React, { Component } from 'react';
import { connect } from "react-redux";
import { addTerm } from '../redux/stateInputSlice';

import { createRef } from 'react';
import Box from '@mui/material/Box';
import {renderMathInElement} from 'katex';


// class _stateDisplayLaTeX extends Component {
//   constructor(props) {
//     super(props);
//     // this.LatexString = stateToLatexString(props.value);
//     this.ref = React.createRef();
//   }
    
//   render() {
//       renderMathInElement(this.ref.current);
//       return <div ref={this.ref} > $\psi$</div>
//     }
//   }

//   const mapStateToProps = state => {
//     return {
//         value: state.stateInput.terms
//     }
// }

// const StateDisplayLaTeX = connect(mapStateToProps, () => {return {}}) (_stateDisplayLaTeX);
// export default StateDisplayLaTeX;
