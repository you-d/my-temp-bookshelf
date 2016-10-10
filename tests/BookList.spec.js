import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';

import { PureBookList } from '../src/components/bookList';
import { initialState } from '../src/sampleData';

function shallowSetup() {
    const stubProps = {
      books: initialState.booksById,
      libraries: initialState.librariesById,
      activities: initialState.activitiesById,
      specialMode : initialState.specialMode,
      actions: {}
    };
    const enzymeWrapper = shallow(<PureBookList { ...stubProps } />);

    return { enzymeWrapper }
}

describe('<BookList />', ()=> {
    it('contains 7 <BookListItem /> components', ()=> {
        expect(shallowSetup().enzymeWrapper
                             .find("BookListItem")).to.have.length(7);
    });
});
