import * as ActionTypes from '../constants/actions';
import axios from 'axios';
import * as Data from '../data';

export function borrowBook(title, author, isbn, library_name, library_addr, starting_date) {
    return {
        type: ActionTypes.BORROW_BOOK,
        title, author, isbn,
        library_name, library_addr,
        starting_date
    };
}

export function returnBook(id, ending_date) {
    return {
        type: ActionTypes.RETURN_BOOK,
        id,
        ending_date
    };
}

function populateInitialStateAsyncPending() {
    return {
        type: ActionTypes.POPULATE_INIT_STATE_PENDING
    };
}

function populateInitialStateAsyncSucceeded(booksResponseData,
                                            librariesResponseData,
                                            activitiesResponseData) {
    return {
        type: ActionTypes.POPULATE_INIT_STATE_SUCCEEDED,
        booksResponseData,
        librariesResponseData,
        activitiesResponseData
    };
}

function populateInitialStateAsyncFailed(error) {
    return {
        type: ActionTypes.POPULATE_INIT_STATE_FAILED,
        error
    };
}

// Using redux-thunk, the following action creators return a function to perform asynchronous dispatch.
// This function is called in containers/App.js
export function populateInitialStateAsync() {
    return (dispatch, getState)=> {
        // dispatch the pending state
        dispatch( populateInitialStateAsyncPending() );

        // ref: stackoverflow.com/questions/35439019/redux-promise-with-axios-and-how-to-deal-with-errors
        axios.all([ Data.getBooks(), Data.getLibraries(), Data.getActivities() ])
             .then(axios.spread( (booksResponse, librariesResponse, activitiesResponse)=> {
                 if (booksResponse.status == 200 &&
                     librariesResponse.status == 200 &&
                     activitiesResponse.status == 200) {
                        // TODO : Check the structural correctness of the retrieved data

                        // DEV_NOTE :
                        // deliberately delay sending the action to reducer by 3 secs
                        // because I'd like to show the cool loading animation.
                        setTimeout( ()=> {
                          dispatch( populateInitialStateAsyncSucceeded(booksResponse.data,
                                                                       librariesResponse.data,
                                                                       activitiesResponse.data) );
                        }, 3000 );

                 }
             }))
             .catch( (error)=> {
                 dispatch( populateInitialStateAsyncFailed(error) );
             });
    };
}
