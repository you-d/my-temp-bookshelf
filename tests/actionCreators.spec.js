import React from 'react';
import { expect } from 'chai';

import * as ActionTypes from '../src/constants/actions';
import { borrowBook, returnBook } from '../src/actions/actionCreators';

/*** actionCreators test specifications ***/
/*** Goal: ensure the right action is being created. ***/
const _testBookTitle = "Test Book";
const _testBookAuthor = "Mr. Test";
const _testISBN = "333 333";
const _library_name = "State Library of Victoria";
const _library_address = "328 Swanston St, Melb, Vic, 3000";
const _starting_date = new Date().toString();

const expectedActionBorrowBook = {
    type: ActionTypes.BORROW_BOOK,
    title: _testBookTitle,
    author: _testBookAuthor,
    isbn: _testISBN,
    library_name: _library_name,
    library_addr: _library_address,
    starting_date: _starting_date
};

const _testId = 3;
const _ending_date = new Date().toString();
const expectedActionReturnBook = {
    type: ActionTypes.RETURN_BOOK,
    id: _testId,
    ending_date: _ending_date
};
describe('ActionCreators', function() {
    describe('function: borrowBook', function() {
        it("expect the right action to be created", function() {
            return expect( borrowBook(_testBookTitle, _testBookAuthor, _testISBN,
                                      _library_name, _library_address, _starting_date) ).
                   to.deep.equal( expectedActionBorrowBook );
        });
    });
    describe('function: returnBook', function() {
        it("expect the right action to be created", function() {
            return expect( returnBook(_testId, _ending_date) ).
                   to.deep.equal( expectedActionReturnBook );
        });
    });
});
