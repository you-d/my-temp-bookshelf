import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { crossBrowserAddEventListener } from '../helper.js';

export default class ReturnBookBtn extends Component {
    static propTypes = {
        activityId: PropTypes.number.isRequired,
        returnBookFunc: PropTypes.func.isRequired
    }
    constructor(props, context) {
        super(props, context);

        this._activityId = this.props.activityId;
        this._returnBookFunc = this.props.returnBookFunc;
    }
    componentDidMount() {
        crossBrowserAddEventListener( ReactDOM.findDOMNode(this),
                                      'click',
                                      ()=> { this._returnBookFunc(this._activityId,
                                                                  new Date().toString());
                                           }
                                    );
    }
    render() {
        return (
            <div>
                <div className="returnButton">Return</div>
            </div>
        );
    }
}
