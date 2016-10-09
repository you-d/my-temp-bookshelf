import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class SearchBar extends Component {
    static PropTypes = {
        onUserInput : PropTypes.func.isRequired
    }
    constructor(props, context) {
        super(props, context);

        this._onUserInputFunc = this.props.onUserInput;
    }
    render() {
        return (
            <input type="text" placeholder="Search Book Title or Author" className="form-control input-sm"
             onChange={ (e)=> {this._onUserInputFunc(e.target.value.trim().toString())} } />
        );
    }
}
