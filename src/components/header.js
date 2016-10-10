import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import NavLink from './navLink'

/* SFC - w/ implicit return (and ES6 destructuring) */
const Header = ()=> (
    <section className='row'>
        <div className='header col-lg-12 col-md-12 col-sm-12 col-xs-12'>
            <div>my<span><strong>TempBookshelf</strong></span></div>
            <div className='navMenu'>
                <div>
                    <i className='fa fa-cube' aria-hidden='true'></i>
                    <NavLink to='/' onlyActiveOnIndex={ true }>Home</NavLink>
                </div>
                <div>
                    <i className='fa fa-cube' aria-hidden='true'></i>
                    <NavLink to='/page1'>Page 1</NavLink>
                </div>
                <div>
                    <i className='fa fa-cube' aria-hidden='true'></i>
                    <NavLink to='/page2'>Page 2</NavLink>
                </div>
            </div>
            <div className='floatReset'></div>
        </div>
    </section>
);

export default Header;

/* Non-SFC approach
export default class Header extends Component {
    render() {
        return (
            <section className='row'>
                <div className='header col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                    <div>my<span><strong>TempBookshelf</strong></span></div>
                    <div className='navMenu'>
                        <div>
                            <i className='fa fa-cube' aria-hidden='true'></i>
                            <NavLink to='/' onlyActiveOnIndex={ true }>Home</NavLink>
                        </div>
                        <div>
                            <i className='fa fa-cube' aria-hidden='true'></i>
                            <NavLink to='/page1'>Page 1</NavLink>
                        </div>
                        <div>
                            <i className='fa fa-cube' aria-hidden='true'></i>
                            <NavLink to='/page2'>Page 2</NavLink>
                        </div>
                    </div>
                    <div className='floatReset'></div>
                </div>
            </section>
        );
    }
}
*/
