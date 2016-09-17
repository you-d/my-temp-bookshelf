import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { find } from 'lodash';

import SearchBar from './searchBar';
import BookListItem from './bookListItem';
import GoogleMapPanel from './googleMapPanel';

export default class BookList extends Component {
    static propTypes = {
        books : PropTypes.object.isRequired
    }
    constructor(props, context) {
        super(props, context);

        this._books = null;
        this._libraries = null;
        this._activities = null;
        this._actions = this.props.actions;

        this._libraryInfoPanelPlaceholder = null;

        this.handleSearchBarInput = this.handleSearchBarInput.bind(this);
        this.popUpLibInfoComponent = this.popUpLibInfoComponent.bind(this);

        this.state = { filterText : '' };
    }
    componentDidMount() {
        this._libraryInfoPanelPlaceholder = document.getElementById('libraryInfoPanelPlaceholder');
    }
    handleSearchBarInput(inputVal) {
        this.setState({ filterText: inputVal });
    }
    popUpLibInfoComponent(mount, lib_name='', lib_addr='') {
        if(mount) {
            if(lib_name != '' && lib_addr != '') {
                ReactDOM.render(<GoogleMapPanel triggerPopUpLibInfoFunc={ this.popUpLibInfoComponent }
                                                libraryName={ lib_name } libraryAddr={ lib_addr } />,
                                this._libraryInfoPanelPlaceholder);
            }
        } else {
            ReactDOM.unmountComponentAtNode(this._libraryInfoPanelPlaceholder);
        }
    }
    render() {
        this._books = this.props.books;
        this._libraries = this.props.libraries;
        this._activities = this.props.activities;

        return (
            <section className="bookList">
                <div className="row">
                    <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9">
                        <strong>Currently Borrowed Books</strong>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                        <SearchBar onUserInput={ this.handleSearchBarInput } />
                    </div>
                </div>
                <div className="row tableRow">
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4"><strong>Book Title</strong></div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2"><strong>Book Author</strong></div>
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3"><strong>Borrowed From</strong></div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2"><strong>Borrowed Date</strong></div>
                    <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1"></div>
                </div>
                {
                  Object.keys(this._activities).map( (aKey)=> {
                      return (
                          <BookListItem key={ this._activities[aKey].id }
                                        activity={ this._activities[aKey] }
                                        book={ find(this._books, ['id', this._activities[aKey].book_id]) }
                                        library={ find(this._libraries, ['id', this._activities[aKey].library_id]) }
                                        borrowedDate={ this._activities[aKey].starting_date }
                                        filterText={ this.state.filterText }
                                        actions={ this._actions }
                                        triggerPopUpLibInfoFunc={ this.popUpLibInfoComponent } />
                      );
                  })
                }
                <div id="libraryInfoPanelPlaceholder"></div>
            </section>
        );
    }
}

// for unit testing purpose
// (AirBnb preferred technique to accomodate react components testing with Enzyme)
export { BookList as PureBookList };
