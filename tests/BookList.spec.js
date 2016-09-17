import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';

import { PureBookList } from '../src/components/bookList';
import { initialState } from '../src/sampleData';

function shallowSetup() {
    const stubProps = {
      books: initialState.booksById,
      employees: initialState.employeesById,
      activities: initialState.activitiesById,
      actions: {}
    };
    const enzymeWrapper = shallow(<PureBookList { ...stubProps } />);

    return { stubProps, enzymeWrapper }
}

describe('<BookList />', ()=> {
    it('contains 7 <BookListItem /> components', ()=> {
        expect(shallowSetup().enzymeWrapper
                             .find("BookListItem")).to.have.length(7);
    });
});
