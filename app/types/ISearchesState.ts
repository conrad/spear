import ISearch from "./ISearch";

export default interface ISearchesState {
  searches: ISearch[],
  currentSearchIndex: number,
  newSearchName: string,
  isNewSearchUsed: boolean,
  file?: File,
  isValidFile: boolean,
  newPhrase: string,
  isNewPhraseUsed: boolean,
}
