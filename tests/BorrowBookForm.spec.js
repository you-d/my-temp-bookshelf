import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';

import { PureBorrowBookForm } from '../src/components/borrowBookForm';

function shallowSetup() {
    const stubProps = {
      actions: {},
      triggerPopUpComponentFunc: ()=> { return true; }
    };
    const enzymeWrapper = shallow(<PureBorrowBookForm { ...stubProps } />);

    return { stubProps, enzymeWrapper }
}

describe('<BorrowBookForm />', ()=> {
    it('contains 5 <InputTypeText /> components', ()=> {
        expect(shallowSetup().enzymeWrapper
                             .find("InputTypeText")).to.have.length(5);
    });
});
