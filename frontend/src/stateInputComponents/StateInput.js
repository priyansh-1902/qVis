import React, { Component } from 'react';
import StateInputGrid from './StateInputGrid';
import StateInputAddButton from './StateInputAddButton';


class StateInput extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <StateInputGrid />
            <StateInputAddButton />
        </div> 
    }
}

export default StateInput;