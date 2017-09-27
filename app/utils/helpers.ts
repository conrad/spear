export const copyArray: any = (arr: Array<any>) => {
  let results: Array<any> = []; 
  arr.map(val => {
    results.push(val);
  });

  return results;
};
