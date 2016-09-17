import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { crossBrowserAddEventListener } from '../helper';

import BorrowBookBtn from './borrowBookBtn';
import BorrowBookForm from './borrowBookForm';
import AboutMeBtn from './aboutMeBtn';
import AboutMePanel from './aboutMePanel';

export default class Header extends Component {
    static PropTypes = {
        actions : PropTypes.object.isRequired
    }
    constructor(props, context) {
        super(props, context);

        this._actions = this.props.actions;

        this.popUpComponent = this.popUpComponent.bind(this);

        this._popUpPlaceHolder = null;
    }
    componentDidMount() {
        this._popUpPlaceHolder = document.getElementById('popUpPlaceholder');

        let popUpComponent = this.popUpComponent;
    }
    popUpComponent(whichComponent, mount) {
        switch(whichComponent) {
            case 'BorrowBookForm' :
                if(mount) {
                    ReactDOM.render(<BorrowBookForm actions={ this._actions } triggerPopUpComponentFunc={ this.popUpComponent } />,
                                    this._popUpPlaceHolder);
                } else {
                    ReactDOM.unmountComponentAtNode(this._popUpPlaceHolder);
                }
                break;
            case 'AboutMePanel' :
                if(mount) {
                    ReactDOM.render(<AboutMePanel triggerPopUpComponentFunc={ this.popUpComponent } />,
                                    this._popUpPlaceHolder);
                } else {
                    ReactDOM.unmountComponentAtNode(this._popUpPlaceHolder);
                }
                break;
        }
    }
    render() {
        return (
            <section className='row'>
                <div className='header col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                    <div>my<span><strong>TempBookshelf</strong></span></div>
                    <div className='navMenu'>
                        <BorrowBookBtn popUpComponentFunc={ this.popUpComponent } />
                        <AboutMeBtn popUpComponentFunc={ this.popUpComponent } />
                    </div>
                    <div className='floatReset'></div>
                </div>
                <div id='popUpPlaceholder'></div>
            </section>
        );
    }
}
