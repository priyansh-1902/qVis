import React, { Component } from 'react';

class StateInputAddButton extends Component {
  constructor(props) {
    super(props);
  }
    render() {
      return <div className='flex flex-row justify-center'>
        <button onClick={this.props.onClickFunc} className="border-2 border-black m-5 px-5"> Add Harmonic </button>
        </div>
    }
  }


  export default StateInputAddButton;