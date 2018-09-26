import IPhrase from "../types/IPhrase";

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
    if (!(lastChar === ' ' && input[i] === ' ')) {
      result += input[i]
    }
    lastChar = input[i]
  }

  return result
}

export const createPhrase = (text?: string, phraseIndex?: number, searchIndex?: number, isCaseSensitive?: boolean, isExactMatch?: boolean): IPhrase => {
  return {
    text: text ? text : '',
    phraseIndex: phraseIndex ? phraseIndex : -1,
    isCaseSensitive: isCaseSensitive ? isCaseSensitive : true,
    isExactMatch: isExactMatch ? isExactMatch : true,
    searchIndex: searchIndex ? searchIndex : -1
  }
}

export const isPhraseInSearch = (phrase: IPhrase, phrases: IPhrase[]): boolean => {
  for (let i: number = 0; i < phrases.length; i++) {
    if (phrases[i].isExactMatch === phrase.isExactMatch 
      && phrases[i].isCaseSensitive === phrase.isCaseSensitive 
      && phrases[i].text === phrase.text) {
        return true
      }
  }

  return false
}
