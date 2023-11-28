// Understanding LifeCycle Method Wrapping 
// https://gist.github.com/alexcjohnson/a4b714eee8afd2123ee00cb5b3278a5f

import React, { Component } from 'react';
import { GraphInit, GraphRender } from './GraphD3Functions';

import { connect } from 'react-redux';

class GraphSVG extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        GraphInit();
        GraphRender(this.props.wavefunction);
    }

    render() {
        GraphRender(this.props.wavefunction);
        return (<div className="mx-auto flex self-center place-items-center" id="GRAPH_SVG" />);
    }
}

const mapStateToProps = state => {
    return {
        wavefunction: state.stateInput.terms
    }
}
export default connect(mapStateToProps, () => {return {}})(GraphSVG);