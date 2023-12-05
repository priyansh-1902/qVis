import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateHarmonic, updateCoeff } from '../redux/stateInputSlice';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

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
      return <Box sx={{ width: 150 }}>
                <Slider
                  min={0} max={1} step={0.001}
                  defaultValue={1}
                  value={this.props.value[this.props.name].coeff}
                  onChange={(evt) => this.props.updateCoeff(this.props.name, evt.target.value)}
                  size="small"
                  aria-label="_sliderInput"
                  valueLabelDisplay="auto"
                  />
              </Box>
    }
}

class _removeStateRowIcon extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <IconButton size="small" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <CancelIcon />
          </IconButton>
      </div>
    )
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
         <_removeStateRowIcon/>
        <HarmonicInput name={this.props.name}/>
        <CoeffInput name={this.props.name}/>
        <SliderInput name={this.props.name}/>
      </div>
    }
}

export default StateInputRow;