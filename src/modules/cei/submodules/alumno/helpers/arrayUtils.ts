
export const arrayDivisorByCondition = (isValid: Function, array?: Array<any>) => {
  return array?.reduce(([current, history], elem) => {
    return isValid(elem) ? [[...current, elem], history] : [current, [...history, elem]];
  }, [[], []]);
}

