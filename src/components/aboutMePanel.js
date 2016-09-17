import React, { Component, PropTypes } from 'react';

import FormBtn from './formBtn';

export default class AboutMePanel extends Component {
    static propTypes = {
        triggerPopUpComponentFunc: PropTypes.func.isRequired
    }
    constructor(props, context) {
        super(props, context);

        this.closeThisForm = this.closeThisForm.bind(this);

        this._triggerPopUpComponentFunc = this.props.triggerPopUpComponentFunc;
    }
    closeThisForm() {
        this._triggerPopUpComponentFunc('AboutMePanel', false);
    }
    render() {
        return(
          <div className='formContainer'>
              <div className='container aboutMePanel'>
                  <div className='row'>
                      <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                          <h3>About this Demo Web App</h3>
                          <hr />
                      </div>
                  </div>
                  <div className='row'>
                      <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                          <p>This sample web app was built with React.JS by implementing the Redux architecture.</p>
                          <p>Highlights:</p>
                          <ul>
                              <li>ES 2015 syntax by utilising the Babel Transpiler</li>
                              <li>Flat Document DB Table Structure for easier integration with SQL Database</li>
                              <li>Unit testing implementation (Mocha, Chai, and Enzyme)</li>
                              <li>SASS - CSS Preprocessor</li>
                              <li>Google Map API integration</li>
                          </ul>
                          <p>
                            <span>Author: Yudiman Kwanmas</span>&nbsp;
                            <span><a href="https://au.linkedin.com/in/yudiman-kwanmas-4a5415100" target="_BLANK">[Linkedin]</a></span>&nbsp;
                            <span><a href="https://github.com/you-d" target="_BLANK">[Github]</a></span>
                          </p>
                          <p>
                            Disclaimer:<br/>
                            This web app is a prototype to demonstrate my knowledge in writing front-end code
                            with React.JS by implementing the Redux Architecture.
                            This web app is not meant to be used in production environment.
                          </p>
                          <br/>
                      </div>
                  </div>
                  <div className='row'>
                      <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                          <FormBtn clickHandlerFunc={ this.closeThisForm }
                                   assignedClassName='closePanelButton'
                                   buttonLabel='Close' />
                      </div>
                      <br/>
                  </div>
              </div>
          </div>
        );
    }
}

// for unit testing purpose
// (AirBnb preferred technique to accomodate react components testing with Enzyme)
export { AboutMePanel as PureAboutMePanel };
