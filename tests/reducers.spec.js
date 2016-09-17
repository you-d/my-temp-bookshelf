import React from 'react';
import { expect } from 'chai';

import { initialState } from '../src/sampleData';
import { default as booksReducer } from '../src/reducers/rootReducer';

/*** reducers test specifications ***/
/*** Goal #1: ensure that the next state is the state you would expect given the
           current state and a specific action. ***/
/*** Goal #2: ensure the reducers doesn't mutate the state object. They must be
             pure functions. ***/

/*** Case #1 : Borrow A Book ***/
const _sampleTimeStamp = "Tue Sep 06 2016 18:36:19 GMT+1000 (AEST)";
const _sampleBorrowBookAction = {
    type: "BORROW_BOOK",
    title: "Test Book",
    author: "Mr. Test",
    isbn: "333 444",
    library_name: "State Library of Victoria",
    library_address: "328 Swanston St, Melb, VIC, 3000",
    starting_date: _sampleTimeStamp,
};
const _sampleNewActivityId = initialState.activities[initialState.activities.length - 1] + 1;
const _sampleNewBookId = initialState.books[initialState.books.length - 1] + 1;
const _sampleNewLibraryId = initialState.libraries[initialState.libraries.length - 1] + 1;
const _sampleBorrowBookNewState = {
    books: initialState.books.concat(_sampleNewBookId),
    booksById: {
        ...initialState.booksById,
        [_sampleNewBookId] : { id: _sampleNewBookId,
                               title: _sampleBorrowBookAction.title,
                               author: _sampleBorrowBookAction.author,
                               isbn: _sampleBorrowBookAction.isbn
                             }
    },
    libraries: initialState.libraries.concat(_sampleNewLibraryId),
    librariesById: {
        ...initialState.librariesById,
        [_sampleNewLibraryId] : { id: _sampleNewLibraryId,
                                  name: _sampleBorrowBookAction.library_name,
                                  address: _sampleBorrowBookAction.library_addr
                                }
    },
    activities: initialState.activities.concat(_sampleNewActivityId),
    activitiesById: {
        ...initialState.activitiesById,
        [_sampleNewActivityId] : { id: _sampleNewActivityId,
                                   library_id: _sampleNewLibraryId,
                                   book_id: _sampleNewBookId,
                                   starting_date: _sampleTimeStamp,
                                   ending_date: ""
                                 }
    },
};

/*** Case #2 : Return a Book ***/
const _sampleReturnBookAction = {
    type: "RETURN_BOOK",
    id: 1,
    ending_date: _sampleTimeStamp
}
const _sampleReturnBookNewState = {
    ...initialState,
    activitiesById: {
      ...initialState.activitiesById,
      [1] : { id: 1,
              library_id: initialState.activitiesById[1].library_id,
              book_id: initialState.activitiesById[1].book_id,
              starting_date: initialState.activitiesById[1].starting_date,
              ending_date: _sampleTimeStamp
            }
    }
};

describe('Reducers', function() {
    describe('booksReducer', function() {
        it("must return the initialState given an undefined state", function() {
            expect( booksReducer(undefined, {}) ).to.deep.equal( initialState );
        });
        it("must return an updated copy of the initial state - case: borrow a book", function() {
            expect( booksReducer(initialState, _sampleBorrowBookAction) ).
            to.deep.equal( _sampleBorrowBookNewState );
        });
        it("must return an updated copy of the initial state - case: return a book", function() {
            expect( booksReducer(initialState, _sampleReturnBookAction) ).
            to.deep.equal( _sampleReturnBookNewState );
        });
    });
});
