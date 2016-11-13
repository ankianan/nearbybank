/**
 * this.node will hold instance of newly create dom element
 */

import logger from "../redux/middleware/logger.js"
import reduxThunk from 'redux-thunk';
import * as Redux from "redux";
import React from "react";

class Lifecycle extends React.Component {
    createdCallback() {}
    attachedCallback() {}
    detachedCallback() {}
    componentWillMount() { this.createdCallback(...arguments) };
    componentDidMount() { this.attachedCallback(...arguments) };
    componentWillUnmount() { this.detachedCallback(...arguments) };

}

class Api extends Lifecycle {
    reducer() {
        throw "Please define reducer";
    }
    setState(){
        super.setState(...arguments);
    }
}

class Spec extends Api {
    get initialState() {
        return null;
    }
    shouldComponentUpdate() {
        return true;
    }
    render() {
        return null;
    }
}



class Component extends Spec {
    constructor(props) {
        super(...arguments);
    }    
}

export default Component;
