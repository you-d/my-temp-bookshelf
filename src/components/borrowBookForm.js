import React, { Component, PropTypes } from 'react';

import InputTypeText from './inputTypeText';
import FormBtn from './formBtn';

import * as HelperModule from '../helper.js';

export default class BorrowBookForm extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        triggerPopUpComponentFunc: PropTypes.func.isRequired
    }
    constructor(props, context) {
        super(props, context);

        this.handleFormSubmission = this.handleFormSubmission.bind(this);
        this.closeThisForm = this.closeThisForm.bind(this);
        this.getEnteredValue = this.getEnteredValue.bind(this);

        this.state = {
            inputBookTitle : { val: '', valid: true },
            inputBookAuthor : { val: '', valid: true },
            inputBookISBN : { val: '', valid: true },
            inputLibraryName : { val: '', valid: true },
            inputLibraryAddr : { val: '', valid: true }
        };

        this._borrowBookFunc = this.props.actions.borrowBook;
        this._triggerPopUpComponentFunc = this.props.triggerPopUpComponentFunc;

        this._formLeftCol = 'col-lg-4 col-md-4 col-sm-4 col-xs-4';
        this._formRightCol = 'col-lg-8 col-md-8 col-sm-8 col-xs-8';
    }
    getEnteredValue(signature, enteredVal) {
        switch(signature) {
            case 'title' :
              this.setState( { inputBookTitle: { val : enteredVal, valid : true } } );
              break;
            case 'author' :
              this.setState( { inputBookAuthor: { val : enteredVal, valid : true } } );
              break;
            case 'isbn' :
              this.setState( { inputBookISBN: { val : enteredVal, valid : true } } );
              break;
            case 'name' :
              this.setState( { inputLibraryName: { val : enteredVal, valid : true } } );
              break;
            case 'address' :
              this.setState( { inputLibraryAddr: { val : enteredVal, valid : true } } );
              break;
        }
    }
    handleFormSubmission() {
        let verdicts = { 'inputBookTitle' : { pass : false, state : this.state.inputBookTitle },
                         'inputBookAuthor' : { pass : false, state : this.state.inputBookAuthor },
                         'inputBookISBN' : { pass : false, state : this.state.inputBookISBN },
                         'inputLibraryName' : { pass : false, state : this.state.inputLibraryName },
                         'inputLibraryAddr' : { pass : false, state : this.state.inputLibraryAddr }
                       };
        let finalVerdict = true;

        verdicts['inputBookTitle'].pass =
            HelperModule.isNotEmpty(verdicts['inputBookTitle'].state.val) &&
            HelperModule.isAlphaNumeric(verdicts['inputBookTitle'].state.val.replace(/\s/g, ''));
        verdicts['inputBookAuthor'].pass =
            HelperModule.isNotEmpty(verdicts['inputBookAuthor'].state.val) &&
            HelperModule.isAlphabeticalOnly(verdicts['inputBookAuthor'].state.val.replace(/\s/g, ''));
        verdicts['inputBookISBN'].pass =
            HelperModule.isNotEmpty(verdicts['inputBookISBN'].state.val) &&
            HelperModule.isValidISBNFormat(verdicts['inputBookISBN'].state.val.toString());
        verdicts['inputLibraryName'].pass =
            HelperModule.isNotEmpty(verdicts['inputLibraryName'].state.val) &&
            HelperModule.isAlphaNumeric(verdicts['inputLibraryName'].state.val.replace(/\s/g, ''));
        verdicts['inputLibraryAddr'].pass =
            HelperModule.isNotEmpty(verdicts['inputLibraryAddr'].state.val);

        Object.keys(verdicts).map( (aKey) => {
            if (!verdicts[aKey].pass) {
              switch(aKey.toString()) {
                  case 'inputBookTitle' :
                      this.setState( { inputBookTitle : { val : verdicts[aKey].state.val.toString(), valid : false } } );
                      break;
                  case 'inputBookAuthor' :
                      this.setState( { inputBookAuthor : { val : verdicts[aKey].state.val.toString(), valid : false } } );
                      break;
                  case 'inputBookISBN' :
                      this.setState( { inputBookISBN : { val : verdicts[aKey].state.val.toString(), valid : false } } );
                      break;
                  case 'inputLibraryName' :
                      this.setState( { inputLibraryName : { val : verdicts[aKey].state.val.toString(), valid : false } } );
                      break;
                  case 'inputLibraryAddr' :
                      this.setState( { inputLibraryAddr : { val : verdicts[aKey].state.val.toString(), valid : false } } );
                      break;
              }
            }

            finalVerdict = finalVerdict && verdicts[aKey].pass;
        } );

        if (finalVerdict) {
          // submit user inputs
          this._borrowBookFunc(verdicts['inputBookTitle'].state.val.trim().toString(),
                               verdicts['inputBookAuthor'].state.val.trim().toString(),
                               verdicts['inputBookISBN'].state.val.trim().toString(),
                               verdicts['inputLibraryName'].state.val.trim().toString(),
                               verdicts['inputLibraryAddr'].state.val.trim().toString(),
                               new Date().toString());

          /*
          console.log(verdicts['inputBookTitle'].state.val.trim().toString());
          console.log(verdicts['inputBookAuthor'].state.val.trim().toString());
          console.log(verdicts['inputBookISBN'].state.val.trim().toString());
          console.log(verdicts['inputLibraryName'].state.val.trim().toString());
          console.log(verdicts['inputLibraryAddr'].state.val.trim().toString());
          */
          this.closeThisForm();
        }
    }
    closeThisForm() {
        this._triggerPopUpComponentFunc('BorrowBookForm', false);
    }
    render() {
        return(
          <div className='formContainer'>
              <div className='container borrowBookForm'>
                  <form role='form'>
                      <div className='row'>
                          <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                              <h3>Borrow Book</h3>
                              <hr />
                          </div>
                      </div>
                      <div className='row form-group'>
                          <div className={ this._formLeftCol }>
                              <label>Book Title:*</label>
                          </div>
                          <div className={ this._formRightCol }>
                              <InputTypeText valueContainerFunc={ this.getEnteredValue }
                                             isValidInput={ this.state.inputBookTitle.valid }
                                             signature={ 'title' } />
                          </div>
                      </div>
                      <div className='row form-group'>
                          <div className={ this._formLeftCol }>
                              <label>Book Author:*</label>
                          </div>
                          <div className={ this._formRightCol }>
                              <InputTypeText valueContainerFunc={ this.getEnteredValue }
                                             isValidInput={ this.state.inputBookAuthor.valid }
                                             signature={ 'author' } />
                          </div>
                      </div>
                      <div className='row form-group'>
                          <div className={ this._formLeftCol }>
                              <label>Barcode/ISBN:*</label>
                          </div>
                          <div className={ this._formRightCol }>
                              <InputTypeText valueContainerFunc={ this.getEnteredValue }
                                             isValidInput={ this.state.inputBookISBN.valid }
                                             signature={ 'isbn' } />
                          </div>
                      </div>
                      <div className='row form-group'>
                          <div className={ this._formLeftCol }>
                              <label>Library Name:*</label>
                          </div>
                          <div className={ this._formRightCol }>
                              <InputTypeText valueContainerFunc={ this.getEnteredValue }
                                             isValidInput={ this.state.inputLibraryName.valid }
                                             signature={ 'name' } />
                          </div>
                      </div>
                      <div className='row form-group'>
                          <div className={ this._formLeftCol }>
                              <label>Library Addr:*</label>
                          </div>
                          <div className={ this._formRightCol }>
                              <InputTypeText valueContainerFunc={ this.getEnteredValue }
                                             isValidInput={ this.state.inputLibraryAddr.valid }
                                             signature={ 'address' } />
                          </div>
                      </div>
                      <div className="row form-group">
                          <div className={ this._formLeftCol }></div>
                          <div className={ this._formRightCol }>
                              <FormBtn clickHandlerFunc={ this.handleFormSubmission }
                                       assignedClassName='borrowBookButton'
                                       buttonLabel='Ok' />
                              <FormBtn clickHandlerFunc={ this.closeThisForm }
                                       assignedClassName='cancelButton'
                                       buttonLabel='Cancel' />
                              <div className='floatReset'></div>
                          </div>
                      </div>
                  </form>
              </div>
          </div>
        );
    }
}

// for unit testing purpose
// (AirBnb preferred technique to accomodate react components testing with Enzyme)
export { BorrowBookForm as PureBorrowBookForm };
