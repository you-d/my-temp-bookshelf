/*******************************
 * Reusable Helper functions
 *******************************/
import { reduce, isEqual } from 'lodash';

/**
 * Public function
 * Cross browser helper to addEventListener.
 * ref : https://gist.github.com/eduardocereto/955642
 * @param {HtmlElement} obj - The element to attach event to.
 * @param {string} eType - The event that will trigger the binded function.
 * @param {function(event)} callback - The callback function of the element.
 * @return {boolean} true if it was successfully binded.
 */
export function crossBrowserAddEventListener(obj, eType, callback) {
    let _output = false;
    if(obj.addEventListener) {
        // W3C approach
        obj.addEventListener(eType, callback, false);
        _output = true;
    } else if(obj.attachEvent) {
        // IE approach
        _output = obj.attachEvent('on' + eType, callback);
    } else {
        // Other browsers approach
        eType = 'on' + eType;
        if(typeof obj[eType] === 'function') {
            // Obj already has a function, let's wrap it with our own function
            // inside another function
            callback = ((f1,f2)=>{
                return ()=> {
                    f1.apply(this.arguments);
                    f2.apply(this.arguments);
                }
            }) (obj[evt], callback)
        }
        obj[eType] = callback;
        _output = true;
    }
    return _output;
}

/**
 * Public function
 * Cross browser helper to removeEventListener.
 * @param {HtmlElement} obj - The element to attach event to.
 * @param {string} eType - The event that will trigger the binded function.
 * @param {function(event)} callback - The callback function of the element.
 * @return {boolean} true if it was successfully binded.
 */
export function crossBrowserRemoveEventListener(obj, eType, callback) {
    let _output = false;
    if(obj.removeEventListener) {
        // W3C approach
        obj.removeEventListener(eType, callback, false);
        _output = true;
    } else if(obj.detachEvent) {
        // IE approach
        _output = obj.detachEvent('on' + eType, callback);
    }
    return _output;
}

/**
 * Public function
 * Determine whether the supplied string consists of alphabetical chars only.
 * @param {string} inputString - The supplied string.
 * @return {boolean} true the string consists of alphabetical chars only.
 */
export function isAlphabeticalOnly(inputString) {
    let array = inputString.match(/[^a-zA-Z]/g);
    if (array != null && array.length > 0) {
        return false;
    }
    return true;
}

/**
 * Public function
 * Determine whether the supplied string consists of numerical chars only.
 * @param {string} inputString - The supplied string.
 * @return {boolean} true the string consists of numerical chars only.
 */
export function isNumericalOnly(input) {
    let array = input.match(/[^0-9]/g);
    if (array != null && array.length > 0) {
        return false;
    }
    return true;
}

/**
 * Public function
 * Determine whether the supplied string consists of alphanumeric chars.
 * @param {string} inputString - The supplied string.
 * @return {boolean} true the string consists of numerical chars only.
 */
export function isAlphaNumeric(inputString) {
    let array = inputString.match(/[^a-zA-Z0-9]/g);
    if (array != null && array.length > 0) {
        return false;
    }
    return true;
}

/**
 * Public function
 * Determine whether the supplied string is a valid email format.
 * @param {string} inputString - The supplied string.
 * @return {boolean} true the string is a valid email format.
 */
export function isValidEmailFormat(inputString) {
    if ( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputString) ) {
      return true;
    }
    return false;
}

/**
 * Public function
 * Determine whether the a valid ISBN format is supplied.
 * Taking reference from the following website :
 * http://regexlib.com/Search.aspx?k=isbn
 * The regex is based on the one supplied by 'Santiago Neira' as his regex seems
 * to allow wide range of isbn format variances.
 * @param {string} inputString - The supplied string.
 * @return {boolean} true valid ISBN format.
 */
export function isValidISBNFormat(inputString) {
    if ( /((978[\--– ])?[0-9][0-9\--– ]{10}[\--– ][0-9xX])|((978)?[0-9]{9}[0-9Xx])/.test(inputString) ) {
      return true;
    }
    return false;
}

/**
 * Public function
 * Determine the date days after/before the pivotDate.
 * @param {Date} pivotObj - the Date object that serves as the base date.
 * @param {int} numOfDays - Number of elapsed days.
 * @return {Date} a new Date object.
 */
export function calculateNewDateBasedOnPivotDate(pivotDate, numOfDays) {
   // Hint:
   // JS Date objects possess a auto correct feature that can automagically correct
   // wrong dates (e.g June 31st (30 days) will automatically be corrected into July 1st).
   // That means if we set any date components individually, we may run in a situation
   // of which the autocorrect feature will get in our way. Always instantiate a
   // new Date object whenever we construct a Date object.
   let _calcDate = new Date();
   pivotDate = new Date(pivotDate);

   _calcDate = new Date(pivotDate);
   if(Math.sign(numOfDays) != 0) {
       _calcDate.setDate(_calcDate.getDate() + numOfDays);
       return new Date(_calcDate);
   }

   return _calcDate;
}

/**
 * Public function
 * Convert a Date object into a "dd-mm-yyyy" format in string if the value of
 * the separator parameter equals to "-".
 * @param {Date} dateObj - the Date object to be converted.
 * @param {string} separator - A string that serves as the date separator.
 * @return {string} a string in "dd-mm-yyyy" format assuming "-" as the separator.
 */
export function ddmmyyyyStringConvertor(dateObj, separator) {
    let _yyyy = dateObj.getFullYear();
    let _mm = (parseInt(dateObj.getMonth()) + 1).toString();
    let _dd = dateObj.getDate().toString();

    let _finMM = _mm.length == 1 ? '0' + _mm : _mm;
    let _finDD = _dd.length == 1 ? '0' + _dd : _dd;

    return _finDD + separator.toString() + _finMM + separator.toString() + _yyyy;
}

export function isNotEmpty(inputString) {
    if(inputString == '' || inputString == null) { return false; }
    return true;
}

// return an array containing the list of keys of which the value is different
export function JsonDiff(jsonA, jsonB) {
    let result=[];
    result = reduce(jsonA, (result, value, key)=> {
        return isEqual(value, (jsonB)[key]) ? result : result.concat(key);
    }, []);

    return result;
}
