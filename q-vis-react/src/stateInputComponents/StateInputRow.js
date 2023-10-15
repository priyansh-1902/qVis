import React, { Component } from 'react';

class StateInputRow extends Component {
    render() {
      return <div className="flex flex-row">
        <input className="mx-2 my-0.5 rounded border-2 border-black"type="text" />
        <input className="mx-2 my-0.5 rounded border-2 border-black" type="text" />
        <input type="range" min="0" max="1000000"/>
      </div>
    }
  }

export default StateInputRow;