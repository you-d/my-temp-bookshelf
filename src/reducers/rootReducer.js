import { clone } from 'lodash';
import { calculateNewDateBasedOnPivotDate } from '../helper';
import { initialStateTemplate, constructData } from '../data';
import * as SpecialModeTypes from '../constants/specialMode';

// Hint: do not populate initial state from the local storage in reducer.
// The proper way is through the createStore method.
// In reducer, we can simply assign an empty object or {} as the default state value.
// http://redux.js.org/docs/api/createStore.html
// http://stackoverflow.com/questions/36619093/why-do-i-get-reducer-returned-undefined-during-initialization-despite-pr/36620420#36620420
// http://github.com/reactjs/redux/issues/272
let _initState = clone(initialStateTemplate);
export default function booksReducer(state = _initState, action) {
    switch(action.type) {
        case 'POPULATE_INIT_STATE_PENDING':
            return { ...state,
                     specialMode : SpecialModeTypes.SPECIAL_MODE_PENDING_INIT_DATA_FETCH };
        case 'POPULATE_INIT_STATE_SUCCEEDED':
            // construct the new state based on the retrieved actions
            let _newState = constructData(action.booksResponseData,
                                          action.librariesResponseData,
                                          action.activitiesResponseData);

            let _finalState = Object.assign( {}, state, _newState );

            return _finalState;
        case 'POPULATE_INIT_STATE_FAILED':
            console.error("ERROR - fetching persisted state operation has failed. Return an empty state instead. " + action.error);

            return { ...state,
                     specialMode : SpecialModeTypes.SPECIAL_MODE_ERROR_INIT_DATA_FETCH };
        case 'BORROW_BOOK':
            const newActivityId = state.activities[state.activities.length - 1] + 1;
            const newBookId = state.books[state.books.length - 1] + 1;
            const newLibraryId = state.libraries[state.libraries.length - 1] + 1;

            return {
                books: state.books.concat(newBookId),
                booksById: {
                    ...state.booksById,
                    [newBookId] : { id: newBookId,
                                    title: action.title,
                                    author: action.author,
                                    isbn: action.isbn
                                  }
                },
                libraries: state.libraries.concat(newLibraryId),
                librariesById: {
                    ...state.librariesById,
                    [newLibraryId] : { id: newLibraryId,
                                       name: action.library_name,
                                       address: action.library_addr
                                     }
                },
                activities: state.activities.concat(newActivityId),
                activitiesById: {
                    ...state.activitiesById,
                    [newActivityId] : { id: newActivityId,
                                        library_id: newLibraryId,
                                        book_id: newBookId,
                                        starting_date: action.starting_date,
                                        ending_date: ''
                                      }
                },
            }
        case 'RETURN_BOOK':
            return { ...state,
                     activitiesById: {
                       ...state.activitiesById,
                       [action.id] : { id: action.id,
                                       library_id: state.activitiesById[action.id].library_id,
                                       book_id: state.activitiesById[action.id].book_id,
                                       starting_date: state.activitiesById[action.id].starting_date,
                                       ending_date: action.ending_date
                                     }
                     }
                   };
        default:
            return state;
    }
}
