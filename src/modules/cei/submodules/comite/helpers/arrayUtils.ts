
/**
* Separa un arreglo mediante una condicion
* @param {Function} isValid
* @param {Array} array
* @returns
*/
export const arrayDivisorByCondition = (isValid: Function, array?: Array<any>) => {
  return array?.reduce(([current, history], elem) => {
    return isValid(elem) ? [[...current, elem], history] : [current, [...history, elem]];
  }, [[], []]);
}

