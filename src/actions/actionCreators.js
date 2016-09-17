import * as ActionTypes from '../constants/actions';

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
