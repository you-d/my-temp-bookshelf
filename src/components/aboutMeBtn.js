import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { crossBrowserAddEventListener } from '../helper.js';

export default class AboutMeBtn extends Component {
    static propTypes = {
        popUpComponentFunc: PropTypes.func.isRequired
    }
    constructor(props, context) {
        super(props, context);

        this._popUpComponent = this.props.popUpComponentFunc;
    }
    componentDidMount() {
        crossBrowserAddEventListener( ReactDOM.findDOMNode(this),
                                      'click',
                                      ()=> { this._popUpComponent('AboutMePanel', true) }
                                    );
    }
    render() {
        return (
            <div>
                <i className='fa fa-question-circle-o' aria-hidden='true'></i>
                <span>About This App</span>
            </div>
        );
    }
}
