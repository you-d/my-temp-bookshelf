import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { crossBrowserAddEventListener } from '../helper';

export default class FormBtn extends Component {
    static propTypes = {
        clickHandlerFunc : PropTypes.func.isRequired,
        assignedClassName : PropTypes.string.isRequired,
        buttonLabel : PropTypes.string.isRequired
    }
    constructor(props, context) {
        super(props, context);

        this._clickHandlerFunc = this.props.clickHandlerFunc;
        this._assignedClassName = this.props.assignedClassName;
        this._buttonLabel = this.props.buttonLabel;
    }
    componentDidMount() {
        crossBrowserAddEventListener( ReactDOM.findDOMNode(this),
                                      'click',
                                      ()=> { this._clickHandlerFunc(); }
                                    );
    }
    render() {
        return (
            <div className={ this._assignedClassName }>{ this._buttonLabel }</div>
        );
    }
}
