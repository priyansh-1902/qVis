import React, { Component } from 'react';
import StateInputRow from './StateInputRow';

import StateInputAddButton from './StateInputAddButton';

class StateInputGrid extends Component {
    render() {
      return <div className='grid grid-cols-1 self-center place-items-center'>
        <StateInputRow />
        <StateInputRow />
        <StateInputRow />
        <StateInputRow />
        <StateInputAddButton />
      </div>
    }
  }


  export default StateInputGrid;