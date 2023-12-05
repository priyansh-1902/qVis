import React, { Component } from 'react';
import StateInputGrid from './StateInputGrid';
import StateInputAddButton from './StateInputAddButton';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import StateDisplayLaTeX from './StateDisplayLaTex';

class StateInput extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <StateInputGrid />
            <StateInputAddButton />
            {/* <StateDisplayLaTeX /> */}
        </div> 
    }
}

export default StateInput;