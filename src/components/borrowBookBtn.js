import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { crossBrowserAddEventListener } from '../helper.js';

export default class BorrowBookBtn extends Component {
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
                                      ()=> { this._popUpComponent('BorrowBookForm', true) }
                                    );
    }
    render() {
        return (
            <div>
                <i className='fa fa-book' aria-hidden='true'></i>
                <span>Add Borrowed Book</span>
            </div>
        );
    }
}
