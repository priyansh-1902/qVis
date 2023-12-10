import React, { Component } from 'react';
import { connect } from "react-redux";
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css'; // Import Katex CSS


function stateToLatexString(state){
    const terms = Object.entries(state);
    return terms.map(([key, value])=> value.coeff + '\\ket{' + value.harmonic + '}').join('+')
    
}


class _stateDisplayLaTeX extends Component {
  constructor(props) {
    super(props);
    this.LatexString = stateToLatexString(props.value);
  }
    
  render() {
    this.LatexString = stateToLatexString(this.props.value);
      return <div > 
                <BlockMath math={this.LatexString} />
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
