import { initialState } from '../sampleData';
import { calculateNewDateBasedOnPivotDate } from '../helper';

export default function booksReducer(state = initialState, action) {
    switch(action.type) {
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
