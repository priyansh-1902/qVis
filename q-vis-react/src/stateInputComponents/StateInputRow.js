import React, { Component } from 'react';

// good post to help understand some stuff related to react event listeners - 
// https://stackoverflow.com/questions/36683770/how-to-get-the-value-of-an-input-field-using-reactjs


// good post to understand passing data between elements - 
// https://medium.com/@jasminegump/passing-data-between-a-parent-and-child-in-react-deea2ec8e654


class StateInputNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {"number": ""}
  }
    render() {
      return <input className="mx-2 my-0.5 rounded border-2 border-black"type="text" onChange={evt => this.updateInputValue(evt)}/>;
    }
    updateInputValue(evt) {
      const newValue = evt.target.value;
      this.setState({
        "number":newValue
      })
      this.props.coeffCallback(newValue);
    }
}

class StateInputCoeff extends Component {
    constructor(props) {
      super(props);
      this.state = {"value": ""}
    }

    render() {
      return <input className="mx-2 my-0.5 rounded border-2 border-black" type="text" 
              value={this.state['value']}
              onChange={evt => this.updateInputValue(evt)}/>;
    }

    updateInputValue(evt) {
      const newValue = evt.target.value;
      this.setState({
        "value":newValue
      })
      this.props.coeffCallback(newValue);
    }
}

class StateInputSlider extends Component {
    constructor(props) {
      super(props);
      this.state = { 'value' :"0" };
    }

    render() {
      return <input type="range" min="0" max="1000000" 
                value={this.state['value']} 
                className="mx-4" 
                onChange={evt => this.updateInputValue(evt)}/>;
    }

    updateInputValue(evt) {
      const newValue = evt.target.value;
      this.setState({
        'value':newValue.toString()
      })
      this.props.sliderCallback(newValue);
    }
}

class StateInputRow extends Component {

    constructor(props) {
      super(props);
      this.state = {number:"", coef:"", slider:"0"};
    }
    getNumberData = (numberValue) => {
      console.log("parent received data from Number " + numberValue);
      this.setState({
        number : numberValue
      }, this.props.getNumber(numberValue))
    }
    getSliderData = (sliderValue) => {
      console.log("parent received data from slider " + sliderValue);
    }

    getCoeffData = (coeffValue) => {
      console.log("parent received data from coeff " + coeffValue);
      this.setState({
        coef : coeffValue
      }, this.props.getCoef(coeffValue))
    }
    
    updateInputNumber = (event) => {
      const newValue = event.target.value;
      this.setState({
          'number' : newValue
        })
      this.props.stateCallback(this.state);
    };
    updateInputCoef = (event) => {
      const newValue = event.target.value;
      this.setState({
          'coeff' : newValue
        })
      console.log('Updated Coef')
      this.props.stateCallback(this.state);
    };
    render() {
      return <div className="flex flex-row">
        <StateInputNumber coeffCallback={this.getNumberData}/>
        <StateInputCoeff coeffCallback={this.getCoeffData} />
        <StateInputSlider sliderCallback={this.getSliderData} />
      </div>
    }
}

export default StateInputRow;