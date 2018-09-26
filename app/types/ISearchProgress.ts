import IPhrase from './IPhrase'

export default interface ISearchProgress {
  searchName: string
  phrase: IPhrase
  indices: number[]   // need multiple because could have multiple matches possibly happening at once
}
