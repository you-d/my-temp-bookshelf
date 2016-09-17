import React, { Component, PropTypes } from 'react';

import { ddmmyyyyStringConvertor, isNotEmpty } from '../helper.js';

import ReturnBookBtn from './returnBookBtn';
import LibraryMapBtn from './libraryMapBtn';

export default class BookListItem extends Component {
    static propTypes = {
        activity: PropTypes.object.isRequired,
        book: PropTypes.object.isRequired,
        library: PropTypes.object.isRequired,
        borrowedDate: PropTypes.string.isRequired,
        filterText: PropTypes.string.isRequired,
        actions: PropTypes.object.isRequired,
        triggerPopUpLibInfoFunc: PropTypes.func.isRequired
    }
    constructor(props, context) {
        super(props, context);

        this._activity = null;
        this._book = null;
        this._library = null;
        this._borrowedDate = null;
        this._filterText = null;
        this._returnBookFunc = null;
        this._triggerPopUpLibInfoFunc = null;
    }
    render() {
        this._activity = this.props.activity;
        this._book = this.props.book;
        this._library = this.props.library;
        this._borrowedDate = ddmmyyyyStringConvertor( new Date(this.props.borrowedDate), '/' );
        this._filterText = this.props.filterText;
        this._returnBookFunc = this.props.actions.returnBook;
        this._triggerPopUpLibInfoFunc = this.props.triggerPopUpLibInfoFunc;

        let _condition_1 = isNotEmpty(this._filterText);
        let _condition_2 = (this._book['title'].toLowerCase().indexOf(this._filterText.toLowerCase()) === -1 ||
                            this._book['title'].toLowerCase().indexOf(this._filterText.toLowerCase()) !== 0);
        let _condition_3 = (this._book['author'].toLowerCase().indexOf(this._filterText.toLowerCase()) === -1 ||
                            this._book['author'].toLowerCase().indexOf(this._filterText.toLowerCase()) !== 0);
        let _condition_4 = isNotEmpty(this._activity['ending_date']);

        if ( (_condition_1 && _condition_2 && _condition_3) || _condition_4 ) {
            return null;
        } else {
            return (
                <div className="row tableRow">
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                      { this._book['title'] }
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                      { this._book['author'] }
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                      <LibraryMapBtn libraryName={ this._library['name'] }
                                     libraryAddr={ this._library['address'] }
                                     triggerPopUpLibInfoFunc={ this._triggerPopUpLibInfoFunc } />
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                      { this._borrowedDate }
                    </div>
                    <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1">
                      <ReturnBookBtn activityId={ this._activity['id'] }
                                     returnBookFunc={ this._returnBookFunc } />
                    </div>
                </div>
            );
        }
    }
}
