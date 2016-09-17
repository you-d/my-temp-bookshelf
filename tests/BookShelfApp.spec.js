import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';

import { PureBookShelfApp } from '../src/containers/BookShelfApp';
import { initialState } from '../src/sampleData';

function shallowSetup() {
    const stubProps = {
      booksById: initialState.booksById,
      employeesById: initialState.employeesById,
      activitiesById: initialState.activitiesById
    };
    const enzymeWrapper = shallow(<PureBookShelfApp { ...stubProps } />);

    return { stubProps, enzymeWrapper }
}

describe('<BookShelfApp />', ()=> {

    it('contains a <Header /> component', ()=> {
        expect(shallowSetup().enzymeWrapper
                             .find("Header")).to.have.length(1);
    });
    it('contains a <BookList /> component', ()=> {
        expect(shallowSetup().enzymeWrapper
                             .find("BookList")).to.have.length(1);
    });
});
