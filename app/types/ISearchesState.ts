import ISearch from "./ISearch";
import IPhrase from "./IPhrase";

export default interface ISearchesState {
  searches: ISearch[],
  currentSearchIndex: number,
  newSearchName: string,
  isNewSearchUsed: boolean,
  file?: File,
  isValidFile: boolean,
  newPhrase: IPhrase,
  isNewPhraseUsed: boolean,
}
