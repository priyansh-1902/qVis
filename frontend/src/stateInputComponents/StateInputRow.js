import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateHarmonic, updateCoeff } from '../redux/stateInputSlice';

class _HarmonicInput extends Component {
    constructor(props) {
      super(props);
    }
    render() {
        return <input value={this.props.value[this.props.name].harmonic} onChange={(evt) => this.props.updateHarmonic(this.props.name, evt.target.value)}
                className="mx-2 my-0.5 rounded border-2 border-black" type="text" />;
    }
}

class _CoeffInput extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      return <input value={this.props.value[this.props.name].coeff} onChange={(evt) => this.props.updateCoeff(this.props.name, evt.target.value)}
             className="mx-2 my-0.5 rounded border-2 border-black" type="text"/>
    }
}


class _SliderInput extends Component {
    constructor(props) {
      super(props);
    }

    render() { 
      return <input type="range" value={this.props.value[this.props.name].coeff*1000000} onChange={(evt) => this.props.updateCoeff(this.props.name, evt.target.value/1000000)}
      min="0" max="1000000" className="mx-4"/>;
    }
}

const mapStateToProps = state => {
    return {
        value: state.stateInput.terms
    }
}

const mapDispatchToHarmonicProps = dispatch => {
    return {
        updateHarmonic: (row, value) => {dispatch(updateHarmonic({row:row, value:value}))}
    }
}

const mapDispatchToCoeffProps = dispatch => {
    return {
        updateCoeff: (row, value) => {dispatch(updateCoeff({row:row, value:value}))}
    }
}


const HarmonicInput = connect(mapStateToProps, mapDispatchToHarmonicProps)(_HarmonicInput);
const CoeffInput = connect(mapStateToProps, mapDispatchToCoeffProps)(_CoeffInput);
const SliderInput = connect(mapStateToProps, mapDispatchToCoeffProps)(_SliderInput);

class StateInputRow extends Component {
    constructor(props) {
      super(props);
    }
    render() {
      return <div className="flex flex-row">
        <HarmonicInput name={this.props.name}/>
        <CoeffInput name={this.props.name}/>
        <SliderInput name={this.props.name}/>
      </div>
    }
}

export default StateInputRow;