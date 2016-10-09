import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { find } from 'lodash';

import * as SpecialModeTypes from '../constants/specialMode';
import SearchBar from './searchBar';
import BookListItem from './bookListItem';
import GoogleMapPanel from './googleMapPanel';
import BorrowBookBtn from './borrowBookBtn';
import BorrowBookForm from './borrowBookForm';
import AboutMeBtn from './aboutMeBtn';
import AboutMePanel from './aboutMePanel';

export default class BookList extends Component {
    static propTypes = {
        books : PropTypes.object.isRequired,
        libraries : PropTypes.object.isRequired,
        activities : PropTypes.object.isRequired,
        specialMode : PropTypes.object.isRequired,
        actions : PropTypes.object.isRequired
    }
    constructor(props, context) {
        super(props, context);

        this._books = null;
        this._libraries = null;
        this._activities = null;
        this._specialMode = null;
        this._actions = this.props.actions;

        this._libraryInfoPanelPlaceholder = null;

        this.handleSearchBarInput = this.handleSearchBarInput.bind(this);
        this.popUpLibInfoComponent = this.popUpLibInfoComponent.bind(this);

        this.popUpComponent = this.popUpComponent.bind(this);

        this._popUpPlaceHolder = null;

        this.state = { filterText : '' };
    }
    componentDidMount() {
        this._libraryInfoPanelPlaceholder = document.getElementById('libraryInfoPanelPlaceholder');

        this._popUpPlaceHolder = document.getElementById('popUpPlaceholder');

        let popUpComponent = this.popUpComponent;
    }
    handleSearchBarInput(inputVal) {
        this.setState({ filterText: inputVal });
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
        this._specialMode = this.props.specialMode;

        return (
            <section className="bookList">
                <div className="row">
                    <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9">
                        <div><strong>Currently Borrowed Books</strong></div>
                        <div className='navMenu'>
                            <BorrowBookBtn popUpComponentFunc={ this.popUpComponent } />
                            <AboutMeBtn popUpComponentFunc={ this.popUpComponent } />
                        </div>
                        <div className='floatReset'></div>
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
                    (()=> {
                      switch(this._specialMode.mode) {
                          case SpecialModeTypes.SPECIAL_MODE_PENDING_INIT_DATA_FETCH :
                              return (
                                <div className="row spinnerRow">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <i className="fa fa-refresh fa-spin" aria-hidden="true"></i>
                                        <span>Fetching Data...</span>
                                    </div>
                                </div>
                              );
                          case SpecialModeTypes.SPECIAL_MODE_ERROR_INIT_DATA_FETCH :
                              return (
                                <div className="row errorMsgRow">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
                                        <span>Oops! Something went wrong </span>
                                        <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
                                    </div>
                                </div>
                              );
                      }

                    })()
                }
                {
                    Object.keys(this._activities).map( (aKey)=> {
                        let _library = find(this._libraries, ['id', this._activities[aKey].library_id]);
                        let _book = find(this._books, ['id', this._activities[aKey].book_id]);

                        if (_library == undefined || _book == undefined) {
                          return;
                        } else {
                          return (
                              <BookListItem key={ this._activities[aKey].id }
                                            activity={ this._activities[aKey] }
                                            book={ _book }
                                            library={ _library }
                                            borrowedDate={ this._activities[aKey].starting_date }
                                            filterText={ this.state.filterText }
                                            actions={ this._actions }
                                            triggerPopUpLibInfoFunc={ this.popUpLibInfoComponent } />
                          );
                        }
                    })
                }
                <div id='popUpPlaceholder'></div>
                <div id="libraryInfoPanelPlaceholder"></div>
            </section>
        );
    }
}

// for unit testing purpose
// (AirBnb preferred technique to accomodate react components testing with Enzyme)
export { BookList as PureBookList };
