import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { crossBrowserAddEventListener } from '../helper.js';

export default class LibraryMapBtn extends Component {
    static propTypes = {
        libraryName: PropTypes.string.isRequired,
        libraryAddr: PropTypes.string.isRequired,
        triggerPopUpLibInfoFunc: PropTypes.func.isRequired
    }
    constructor(props, context) {
        super(props, context);

        this._libraryName = this.props.libraryName;
        this._libraryAddr = this.props.libraryAddr;
        this._triggerPopUpLibInfoFunc = this.props.triggerPopUpLibInfoFunc;
    }
    componentDidMount() {
        crossBrowserAddEventListener( ReactDOM.findDOMNode(this),
                                      'click',
                                      ()=> { this._triggerPopUpLibInfoFunc(true,
                                                                           this._libraryName,
                                                                           this._libraryAddr);
                                           }
                                    );
    }
    render() {
        return (
            <div>
                <div>{ this._libraryName }</div>
            </div>
        );
    }
}
