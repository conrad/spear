export const copyArray: any = (arr: any[]): any[] => {
  let results: Array<any> = []; 
  arr.map(val => {
    results.push(val);
  });

  return results;
};

export const clone: any = (obj: any): any => {
  if (null == obj || "object" != typeof obj) return obj;
  
  let copy = obj.constructor();
  
  for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }
  
  return copy;
}

export const isObjectInArray = (
  arr: Array<any>, 
  objIdentifier: any, 
  identifierField: string
): boolean => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][identifierField] === objIdentifier) {
      return true;
    }
  }

  return false;
}

export const removeExcessSpaces = (input: string): string => {
  let result: string = ''
  let lastChar: string = ''
  for (let i: number = 0; i < input.length; i++) {
    if (lastChar !== ' ' && input[i] !== ' ') {
      result += input[i]
    }
    lastChar = input[i]
  }

  return result
}
