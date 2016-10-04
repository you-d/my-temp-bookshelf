import axios from 'axios';
import { cloneDeep } from 'lodash';
import { initialState } from './sampleData';
import * as Port from '../config/port';

const _config = {
    headers: { 'Accept': 'application/json',
               'Content-Type': 'application/json' }
};

let _protocol = Port.host == 'localhost' ? 'http://' : 'https://';

export const initialStateTemplate = {
    books: [], booksById: {},
    libraries: [], librariesById: {},
    activities: [], activitiesById: {}
};

export function constructData(_booksData, _librariesData, _activitiesData) {
    // warning: must not directly assign _theState to initialStateTemplate.
    // Otherwise, the state will become impure - therefore UI won't be re-rendered.
    let _theState = cloneDeep(initialStateTemplate);

    _booksData.map( (aBook)=> {
        _theState.books.push(aBook.id);
        (_theState.booksById)[aBook.id] = { id: aBook.id,
                                            title: aBook.title,
                                            author: aBook.author,
                                            isbn: aBook.isbn };
    } );
    _librariesData.map( (aLibrary)=> {
        _theState.libraries.push(aLibrary.id);

        (_theState.librariesById)[aLibrary.id] = { id: aLibrary.id,
                                                   name: aLibrary.name,
                                                   address: aLibrary.address };

    } );
    _activitiesData.map( (anActivity)=> {
        _theState.activities.push(anActivity.id);
        (_theState.activitiesById)[anActivity.id] = { id: anActivity.id,
                                                      library_id: anActivity.library_id,
                                                      book_id: anActivity.book_id,
                                                      starting_date: anActivity.starting_date,
                                                      ending_date: anActivity.ending_date };
    } );

    // return the JSON object
    return _theState;
}

export function getBooks() {
    return axios.get(_protocol + Port.host + ':' + Port.apiPort + '/book', _config);
}

export function getLibraries() {
    return axios.get(_protocol + Port.host + ':' + Port.apiPort + '/library', _config);
}

export function getActivities() {
    return axios.get(_protocol + Port.host + ':' + Port.apiPort + '/activity', _config);
}