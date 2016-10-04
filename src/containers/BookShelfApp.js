import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions/actionCreators';
import { crossBrowserAddEventListener } from '../helper';

import Header from '../components/header';
import BookList from '../components/bookList';

// takes the store's current state as an argument, and then it expects the return value to be
// an object that describes mapping from that state to props for our wrapped component.
function mapStateToProps(state) {
    return { booksById : state.default.booksById,
             librariesById : state.default.librariesById,
             activitiesById: state.default.activitiesById };
}

// the undecorated version of the component
class BookShelfApp extends Component {
    static propTypes = {
        booksById : PropTypes.object.isRequired,
        librariesById : PropTypes.object.isRequired,
        activitiesById : PropTypes.object.isRequired
    }
    constructor(props, context) {
        super(props, context);

        this._booksById = null;
        this._librariesById = null;
        this._activitiesById = null;
        this._actions = bindActionCreators(ActionCreators, this.props.dispatch);

    }
    render() {
        // the members of this.props are injected by react-redux
        this._booksById = this.props.booksById;
        this._librariesById = this.props.librariesById;
        this._activitiesById = this.props.activitiesById;

        return (
            <div className="container desktop-only">
                <Header actions={ this._actions } />
                <BookList books={ this._booksById }
                          libraries={ this._librariesById }
                          activities={ this._activitiesById }
                          actions={ this._actions } />
            </div>
        );
    }
}

// the decorated version of the component
export default connect( mapStateToProps )(BookShelfApp);
// for unit testing purpose
// (AirBnb preferred technique to accomodate react components testing with Enzyme)
export { BookShelfApp as PureBookShelfApp };
