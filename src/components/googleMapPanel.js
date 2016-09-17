import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import FormBtn from './formBtn';

export default class GoogleMapPanel extends Component {
    static propTypes = {
        libraryName: PropTypes.string.isRequired,
        libraryAddr: PropTypes.string.isRequired,
        triggerPopUpLibInfoFunc: PropTypes.func.isRequired
    }
    constructor(props, context) {
        super(props, context);

        this.closeThisForm = this.closeThisForm.bind(this);

        this._libraryName = this.props.libraryName;
        this._libraryAddr = this.props.libraryAddr;
        this._triggerPopUpLibInfoFunc = this.props.triggerPopUpLibInfoFunc;

        this.renderAddGoogleMapLibrary = this.renderAddGoogleMapLibrary.bind(this);
        this.renderAddInitMapScript = this.renderAddInitMapScript.bind(this);

        this._googleMapPlaceHolder = null;
    }
    componentDidMount() {
        this.renderAddInitMapScript();
        this.renderAddGoogleMapLibrary();
    }
    renderAddGoogleMapLibrary() {
        let _apiKey = "AIzaSyDHKRK-WJZ6jUPKAMG_5Cas0D71Jd244rw";
        let _src = "https://maps.googleapis.com/maps/api/js?key=" + _apiKey + "&callback=initMap";
        let _el = document.createElement('script');
        _el.src = _src;
        _el.async = true;
        _el.defer = true;

        ReactDOM.findDOMNode(this).appendChild(_el);
    }
    renderAddInitMapScript() {
        let _el = document.createElement('script');
        _el.innerHTML =
        'function initMap() {' +
            'let _googleMapPlaceHolder = document.getElementById("googleMapPlaceHolder");' +
            'let _resultsMap = new google.maps.Map(_googleMapPlaceHolder, {' +
                'zoom: 15' +
            '});' +
            'let _geoCoder = new google.maps.Geocoder();' +
            '_geoCoder.geocode( {"address": "' + this._libraryAddr + '" }, (results, status)=> {' +
                'if(status === "OK") {' +
                    '_resultsMap.setCenter(results[0].geometry.location);' +
                    'let marker = new google.maps.Marker({' +
                        'map: _resultsMap,' +
                        'position: results[0].geometry.location' +
                    '});' +
                '} else {' +
                    'console.error("Geocode was not successful for the following reason: " + status);' +
                '}' +
            '});' +
        '}';

        ReactDOM.findDOMNode(this).appendChild(_el);
    }
    closeThisForm() {
        this._triggerPopUpLibInfoFunc(false);
    }
    render() {
        return(
          <div className='formContainer'>
              <div className='container aboutMePanel'>
                  <div className='row'>
                      <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                          <h3>{ this._libraryName }</h3>
                          <hr />
                      </div>
                  </div>
                  <div className='row'>
                      <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                          <p>{ this._libraryAddr }</p>
                          <div id="googleMapPlaceHolder"></div>
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
export { GoogleMapPanel as PureGoogleMapPanel };
