import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';

ReactDOM.render(<App />, document.getElementById('root'));

/***
 * Dev Note :
 * CLicking the library name link on the table will generate a console log error
 * message from the Google Map API. The error states that Google Map API has been
 * called multiple times on the same page, and it may results in unexpected side effects.
 * This is actually a false alarm as the React component will actually be destroyed
 * everytime users click on the close button on the popup window. I believe this will
 * nullify the side effects - aside from the very inneficient way of rendering the API script
 * multiple times.
 *
 * Considering that the objective of this demo app is solely to demonstrate
 * my knowledge in writing a React.JS front end code with Redux Architecture,
 * Implementing the API without generating the false alarm error is beyond the
 * scope of this portfolio.
 *
 * However, a better (and proper) solution would be to play with the display css
 * attribute of the React component instead. This way, we can ensure that the
 * API script will only be rendered once, and it will always be there as we are just
 * showing, and hiding the component, plus supplying the component with the address for
 * the geocoding feature. With this approach, the false alarm error message will disappear.
 ***/
