// Understanding LifeCycle Method Wrapping 
// https://gist.github.com/alexcjohnson/a4b714eee8afd2123ee00cb5b3278a5f

import React, { Component } from 'react';
import GraphInit from './GraphD3Functions';

class GraphSVG extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    componentDidMount() {
        GraphInit(this.el, this.state);
    }

    render() {
        return (<div className="mx-auto flex self-center place-items-center" ref={el => this.el = el} />);
    }
}


export default GraphSVG;