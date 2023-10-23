import React, { Component } from 'react';

import GraphSVG from './GraphSVG';

class GraphDiv extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (<div className="items-center justify-center">
                    <GraphSVG />
                </div>)
    }
}

export default GraphDiv;