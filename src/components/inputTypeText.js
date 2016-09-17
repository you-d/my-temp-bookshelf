import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { crossBrowserAddEventListener } from '../helper';

export default class InputTypeText extends Component {
    static propTypes = {
        signature: PropTypes.string.isRequired,
        isValidInput: PropTypes.bool.isRequired,
        valueContainerFunc: PropTypes.func.isRequired
    }
    constructor(props, context) {
        super(props, context);

        this._signature = this.props.signature;
        this._isValidInput = this.props.isValidInput;
        this._valueContainerFunc = this.props.valueContainerFunc;

        this.state = { assignedClassName : '' }
    }
    componentDidMount() {
        // alternatively, we could do the inline apporach by setting the
        // onChange attribute to :
        // onChange={ (e)=> this._valueContainerFunc(this._signature, e.target.value) }
        // However, there's no guarantee that older browsers will support the onChange
        // attribute.
        crossBrowserAddEventListener(ReactDOM.findDOMNode(this),
                                     'change',
                                     (e)=> { this._valueContainerFunc(this._signature,
                                                                      e.target.value.trim())
                                           });

        if (this._isValidInput) {
            this.setState( { assignedClassName : 'form-control input-sm inputFieldDefault' } );
        } else {
            this.setState( { assignedClassName : 'form-control input-sm inputFieldError' } );
        }
    }
    componentWillReceiveProps(nextProps) {
        if (!nextProps.isValidInput) {
            this.setState( { assignedClassName : 'form-control input-sm inputFieldError' } );
        } else {
            this.setState( { assignedClassName : 'form-control input-sm inputFieldDefault' } );
        }
    }
    render() {
        return (
            <input type='text' className={ this.state.assignedClassName } />
        );
    }
}
