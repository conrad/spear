export const copyArray: any = (arr: Array<any>) => {
  let results: Array<any> = []; 
  arr.map(val => {
    results.push(val);
  });

  return results;
};

export const clone: any = (obj: any) => {
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
) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][identifierField] === objIdentifier) {
      return true;
    }
  }

  return false;
}